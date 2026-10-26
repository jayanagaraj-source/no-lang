# sast-fp-regression

Before-fix baseline for the SAST false positives in issues #6, #7 and #9. These are fixtures only: nothing is built, routed or run, and no TigerGate rule was changed.

| Part | File | What it reproduces |
|---|---|---|
| A | `javascript/xss-output.js`, `xss-controls.js`, `xss-controls-typed.ts` | `TG-TAINT-JS-XSS` on file reads and command output passed to `res.send`; the path traversal SAFE-004/005/006/010/013 logic copied as XSS negative controls |
| B | `java/XssServletRegression.java` | `XSS_SERVLET_PARAMETER-1` on any `getParameter`; `JAVA-011` on `parseInt` and fully encoded output |
| C | `go/xss-response.go` | `no-direct-write-to-responsewriter` on file, command and constant output |
| D | `python/xss-response.py` | `direct-use-of-httpresponse` on database values and constants |
| E | `php/xpath-sql.php` | `TG-TAINT-PHP-SQL-INJECTION` on `DOMXPath::query`, search clients and GraphQL clients |
| F | `python/sql-injection.py` | `TG-SQL-INJECTION-PY-INLINE` and `TG-TAINT-PY-SQL-INJECTION` on `int()` and `float()` |
| G | `c/format-string.c` | `insecure-use-printf-fn` on literal formats; `CPP-002` coverage |
| H | `javascript/log-format.js` | `unsafe-formatstring` on internal values; `LOG-003` log injection |
| I | `php/xss-output.php` | Command, file and XML output echoed, with each vulnerability class recorded separately |

## Conventions

- **Markers:** every case's sink line ends with its ID (`FP-…`, `TP-…`, `SAFE-…`, `REVIEW-…`). `manifest.json` stores the ID, file, marker line and enclosing handler (`case_span`), so cases can be matched by ID even if lines move.
- **Classification:**
  - `confirmed_false_positive`: provably safe for the reported class
  - `candidate_false_positive`: probably safe, but depends on context
  - `review_required`: ambiguous
  - `true_positive`: positive control
  - `safe_negative`: must not fire
- **Evidence:** `observed_local` holds only results from the local run described below. `expected-results.md` keeps the Dashboard and CLI columns as `Pending scan`.

## How the local run matches the worker (Part K)

| Worker behavior | Local run |
|---|---|
| Fetches the org-resolved ruleset from `GET /api/internal/sast-ruleset.yaml` | Fetched read-only from the local backend: 917 rules (catalog, custom and taint) |
| Registry packs come from org config; with none set, `allSemgrepRulesets` minus `p/bandit` and `p/comment` | Same 41 packs. `org_sast_ruleset_config` has no rows for this org |
| Flags `scan --json --no-rewrite-rule-ids --metrics off --timeout 30 --jobs 2 --max-memory 1500 --dataflow-traces` | Same |
| `scanscope.CodeScanExcludes()` and `ExcludedUpstreamRules` | Same: 106 excludes and 5 excluded rules, printed from the real package |
| Semgrep 1.168.0 | Same version |
| Then `dedupeSemgrepResults`, `findingfold` and the secret-copy split, before storing | **Not applied.** The local counts are pre-fold, so the dashboard may store fewer rows per line |

**Limitations**

- **Target only:** the run covered this folder, not the whole repo.
- **Not run:** `findingfold` and dedupe weren't applied, so the local counts are pre-fold.
- **The CLI uses a different Semgrep version:** its image pins 1.37.0, and its rule config hasn't been checked, so CLI results may differ.
- **`LOG-003` can't fire:** its catalog entry's only pattern is the literal string `pattern`, and the served ruleset leaves it out.
- **No local parser for PHP and Java:** Semgrep reported 0 parse errors on all files, which serves as the syntax check.

## Scan instructions (not run)

```sh
# 1. Commit and push (you run these)
cd /home/namlabs/development/Demo/no-lang
git add sast-fp-regression
git commit -m "test: add SAST false-positive regression fixtures"
git push origin main            # or: git push origin HEAD:<test-branch>

# 2. Dashboard: Code Security → Repositories → jayanagaraj-source/no-lang → Scan (full) at that commit.

# 3. CLI, same commit, from the repo root
TIGERGATE_API_KEY=... tigergate scan --type sast --scan-scope full \
  --quality-gate=false --repo jayanagaraj-source/no-lang

# 4. Compare dashboard rows for this folder (read-only query on the local stack)
docker exec -i tigergate-postgres psql -U tigergate -d tigergate -At -F $'\t' -c "
  SET default_transaction_read_only=on;
  SELECT i.file_path, coalesce(i.line_start,i.start_line), i.rule_id, i.severity
  FROM sast_issues i JOIN sast_scans s ON s.id=i.scan_id
  WHERE s.id = (SELECT id FROM sast_scans WHERE repository_id='3508ba91-e09d-4ec0-b09a-c495690da71c'
                AND scan_type='full-scan' ORDER BY created_at DESC LIMIT 1)
    AND i.file_path LIKE 'sast-fp-regression/%' ORDER BY 1,2;"
```

Match each stored row to a case. The row's file must equal the case's `file`, and its line must fall inside the case's `case_span`. Then fill in the Dashboard and CLI columns of `expected-results.md`.

## Cases
| ID | Location | Classification | Description |
|---|---|---|---|
| `FP-FMT-C-001` | `c/format-string.c:9` | confirmed_false_positive | Literal format. |
| `FP-FMT-C-002` | `c/format-string.c:10` | confirmed_false_positive | Literal format (fprintf). |
| `FP-FMT-C-003` | `c/format-string.c:11` | confirmed_false_positive | Literal format (snprintf). |
| `FP-FMT-C-004` | `c/format-string.c:12` | confirmed_false_positive | User input only as an argument, via a parameter. |
| `TP-FMT-C-001` | `c/format-string.c:15` | true_positive | printf(user_input). |
| `TP-FMT-C-002` | `c/format-string.c:16` | true_positive | fprintf(stderr, user_input). |
| `TP-FMT-C-003` | `c/format-string.c:17` | true_positive | snprintf(buffer, size, user_input). |
| `FP-FMT-C-005` | `c/format-string.c:30` | confirmed_false_positive | Literal format with argv[1] as an argument (the shape seen in tigergate-test-c). |
| `FP-FMT-C-006` | `c/format-string.c:33` | confirmed_false_positive | argv copied to a buffer, printed via a literal %s. |
| `TP-FMT-C-004` | `c/format-string.c:34` | true_positive | printf(argv[1]). |
| `FP-XSS-GO-001` | `go/xss-response.go:17` | candidate_false_positive | Fixed server file. Classified candidate (not confirmed): safe only if that file is not attacker-writable. |
| `FP-XSS-GO-002` | `go/xss-response.go:22` | candidate_false_positive | Fixed command with no user input. |
| `FP-XSS-GO-003` | `go/xss-response.go:26` | confirmed_false_positive | Constant text. |
| `REVIEW-XSS-GO-004` | `go/xss-response.go:33` | review_required | User-chosen file written to the response (path traversal; XSS depends on content). |
| `TP-XSS-GO-001` | `go/xss-response.go:40` | true_positive | Query value in an HTML response. |
| `TP-XSS-GO-002` | `go/xss-response.go:46` | true_positive | template.HTML(user input) bypasses escaping. |
| `TP-XSS-GO-003` | `go/xss-response.go:56` | true_positive | SSRF body copied into a text/html response. |
| `FP-XSS-JAVA-001` | `java/XssServletRegression.java:17` | confirmed_false_positive | getParameter used only for a boolean; nothing is written. |
| `FP-XSS-JAVA-002` | `java/XssServletRegression.java:25` | confirmed_false_positive | Integer.parseInt output cannot carry markup. |
| `FP-XSS-JAVA-003` | `java/XssServletRegression.java:31` | confirmed_false_positive | Stored in session; not rendered here. |
| `FP-XSS-JAVA-004` | `java/XssServletRegression.java:45` | confirmed_false_positive | Complete HTML encoding, ampersand first. |
| `TP-XSS-JAVA-001` | `java/XssServletRegression.java:51` | true_positive | Parameter written directly. |
| `TP-XSS-JAVA-002` | `java/XssServletRegression.java:58` | true_positive | Parameter in text/html without encoding. |
| `TP-XSS-JAVA-003` | `java/XssServletRegression.java:65` | true_positive | Incomplete escaping in a quoted attribute. |
| `SAFE-XSS-JAVA-001` | `java/XssServletRegression.java:71` | safe_negative | Constant body. |
| `FP-FMT-JS-001` | `javascript/log-format.js:11` | candidate_false_positive | Internal task name concatenated into the console.log format argument. |
| `FP-FMT-JS-002` | `javascript/log-format.js:16` | candidate_false_positive | Internal count concatenated before a %d placeholder. |
| `FP-FMT-JS-003` | `javascript/log-format.js:20` | candidate_false_positive | Internal worker id. |
| `TP-LOG-JS-001` | `javascript/log-format.js:26` | true_positive | Username with newline forges log lines. |
| `TP-LOG-JS-002` | `javascript/log-format.js:31` | true_positive | Carriage-return injection via query value. |
| `TP-LOG-JS-003` | `javascript/log-format.js:36` | true_positive | Forged key=value entry. |
| `TP-LOG-JS-004` | `javascript/log-format.js:41` | true_positive | User input breaks JSON log structure. |
| `SAFE-XSS-JS-010` | `javascript/xss-controls-typed.ts:24` | safe_negative | Copied from SAFE-010: typed allowlist (TypeScript). |
| `SAFE-XSS-JS-004` | `javascript/xss-controls.js:22` | safe_negative | Copied from path-traversal SAFE-004: allowlisted server file. |
| `SAFE-XSS-JS-005` | `javascript/xss-controls.js:31` | safe_negative | Copied from SAFE-005: digits-only id. |
| `SAFE-XSS-JS-006` | `javascript/xss-controls.js:43` | safe_negative | Copied from SAFE-006: resolve + relative containment. |
| `SAFE-XSS-JS-013` | `javascript/xss-controls.js:52` | safe_negative | Copied from SAFE-013: strict filename regex. |
| `SAFE-XSS-JS-ESC` | `javascript/xss-controls.js:66` | safe_negative | Fully HTML-escaped reflection. |
| `SAFE-XSS-JS-CONST` | `javascript/xss-controls.js:70` | safe_negative | Constant HTML. |
| `FP-XSS-JS-001` | `javascript/xss-output.js:16` | candidate_false_positive | File read from a user-chosen path then sent. The real bug is path traversal; XSS depends on whether an attacker controls the file's content and the response type. |
| `FP-XSS-JS-002` | `javascript/xss-output.js:21` | candidate_false_positive | Same as FP-XSS-JS-001 via fs.promises.readFile. |
| `FP-XSS-JS-003` | `javascript/xss-output.js:26` | candidate_false_positive | Same as FP-XSS-JS-001 via fs.readFile callback. |
| `REVIEW-XSS-JS-004` | `javascript/xss-output.js:32` | review_required | execSync(user command) output sent. Command injection is real; the attacker controls the command, so HTML in the output is plausible. |
| `FP-XSS-JS-005` | `javascript/xss-output.js:37` | candidate_false_positive | execFileSync with an argument array: output is git log text; attacker influence is limited to a path filter. |
| `REVIEW-XSS-JS-006` | `javascript/xss-output.js:42` | review_required | shelljs exec output sent; command string includes user input. |
| `TP-XSS-JS-001` | `javascript/xss-output.js:48` | true_positive | Direct reflected XSS. |
| `TP-XSS-JS-002` | `javascript/xss-output.js:52` | true_positive | req.body reflected in an explicit text/html response. |
| `TP-XSS-JS-003` | `javascript/xss-output.js:61` | true_positive | Stored XSS: user-uploaded HTML served as text/html. The path is validated; the content is attacker-controlled. |
| `TP-XSS-JS-004` | `javascript/xss-output.js:66` | true_positive | User input echoed by a command and returned as HTML. |
| `TP-XSS-JS-005` | `javascript/xss-output.js:71` | true_positive | SSRF: attacker-chosen URL's body returned as HTML. |
| `FP-SQL-PHP-001` | `php/xpath-sql.php:8` | confirmed_false_positive | DOMXPath::query is XPath, not SQL. Genuine injection, wrong class. |
| `FP-SQL-PHP-002` | `php/xpath-sql.php:12` | confirmed_false_positive | Search client query(), not SQL. |
| `FP-SQL-PHP-003` | `php/xpath-sql.php:16` | confirmed_false_positive | GraphQL client query(), not SQL. |
| `TP-SQL-PHP-001` | `php/xpath-sql.php:22` | true_positive | PDO::query with concatenated input. |
| `TP-SQL-PHP-002` | `php/xpath-sql.php:26` | true_positive | mysqli_query with concatenated input. |
| `TP-XPATH-PHP-001` | `php/xpath-sql.php:31` | true_positive | XPath injection positive control. |
| `SAFE-SQL-PHP-001` | `php/xpath-sql.php:38` | safe_negative | Prepared statement. |
| `REVIEW-XSS-PHP-001` | `php/xss-output.php:8` | review_required | shell_exec output echoed; command injection is the primary bug, and the attacker can shape the output. |
| `REVIEW-XSS-PHP-002` | `php/xss-output.php:13` | review_required | exec() output echoed. |
| `REVIEW-XSS-PHP-003` | `php/xss-output.php:18` | review_required | Backtick output echoed. |
| `TP-XSS-PHP-004` | `php/xss-output.php:23` | true_positive | file_get_contents(user URL) echoed: attacker-controlled content (also SSRF/LFI). |
| `TP-XSS-PHP-005` | `php/xss-output.php:28` | true_positive | Attacker-supplied XML field echoed. |
| `SAFE-XSS-PHP-001` | `php/xss-output.php:34` | safe_negative | Static HTML. |
| `TP-XSS-PHP-007` | `php/xss-output.php:40` | true_positive | Reflected XSS. |
| `FP-SQL-PY-001` | `python/sql-injection.py:20` | confirmed_false_positive | int() before interpolation. |
| `FP-SQL-PY-002` | `python/sql-injection.py:27` | confirmed_false_positive | float() in a numeric comparison; nan/inf can only cause a SQL error, not injection. |
| `TP-SQL-PY-001` | `python/sql-injection.py:37` | true_positive | Raw string in an f-string query. |
| `TP-SQL-PY-002` | `python/sql-injection.py:44` | true_positive | Raw string concatenated into WHERE. |
| `SAFE-SQL-PY-001` | `python/sql-injection.py:53` | safe_negative | Parameterized query. |
| `REVIEW-XSS-PY-001` | `python/xss-response.py:16` | review_required | Database username: often user-chosen, so stored XSS is plausible; not provably safe. |
| `FP-XSS-PY-002` | `python/xss-response.py:21` | confirmed_false_positive | Integer count rendered as str(). |
| `FP-XSS-PY-003` | `python/xss-response.py:25` | confirmed_false_positive | Constant response. |
| `TP-XSS-PY-001` | `python/xss-response.py:32` | true_positive | Request parameter reflected. |
| `TP-XSS-PY-002` | `python/xss-response.py:37` | true_positive | Explicit text/html with untrusted input. |
| `SAFE-XSS-PY-001` | `python/xss-response.py:45` | safe_negative | django.utils.html.escape applied. |
