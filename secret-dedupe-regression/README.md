# secret-dedupe-regression

Regression fixtures for the TigerGate secret-scan duplication bug. Every value is synthetic: it carries a `TGfake`/`TGFAKE` marker, is AWS's published documentation key, or is an obvious placeholder. Nothing here is executed.

## The bug these fixtures reproduce

| Surface | Native Gitleaks | Semgrep `generic.secrets.*` copies |
|---|---|---|
| CLI | Stored after `SuppressSecret` and per-value dedupe | Dropped (`DropSecretRulesFromSAST`) after a successful native scan |
| Dashboard worker (before fix) | Stored after `SuppressSecret` and per-value dedupe | **Also stored**, which causes duplicates, Semgrep-only false positives and inconsistent severity |

## Layout

| Folder | Cases | What it covers |
|---|---|---|
| `true-positive/` | TP-001…TP-006 (7 line cases) | GitHub PAT, AWS key ID, Slack bot token, generic API key (variable and object property), a value repeated in one file |
| `false-positive/` | FP-001…FP-005 (15 line cases) | Translation labels, non-secret identifiers, placeholders, commented values, Markdown examples |
| `duplicate/` | DUP-001…DUP-003 (4 line cases) + DUP-004 (repo-level) | Same line matched by both engines, same value in two files, several secret types in one file |

The folder names deliberately avoid `test`, `tests`, `fixtures`, `mocks` and `testdata`. `SuppressSecret` drops every secret under those directories.

## Verified locally (not a TigerGate scan)

- **Native:** Gitleaks 8.21.2 with the worker's TOML (`[extend] useDefault = true`). Its output was passed through the real `scanscope.SuppressSecret` and `SecretDeduper`, compiled from `workers/pkg/scanscope` in a scratch harness.
- **Semgrep:** 1.168.0 (the worker's pinned version) with `p/gitleaks` and `p/secrets`.

`expected-findings.json` has one entry per line. Each entry records three separate layers:

- `security_validity`: TP, NOT_A_SECRET or CONTEXT_DEPENDENT. This is independent of any scanner.
- `detector_match`: the native rule ID and severity, plus the Semgrep rule IDs and severities. All verified locally.
- `dashboard_before_fix`, `dashboard_after_fix` and `cli`: the findings each surface should store.

Expected totals for this folder:

| Surface | Findings |
|---|---:|
| Dashboard before fix | 28 (10 native + 18 Semgrep copies) |
| Dashboard after fix | 10 (native only) |
| CLI | 10 (native only) |

Notable verified behavior:

- **TP-001 and DUP-002 hold the same value**, so native dedupe keeps only one of them. Which one depends on Gitleaks' report order; locally it was DUP-002.
- **TP-005B, the second occurrence of a repeated value, is deduplicated** by native.
- **FP-004A and FP-004B (fully commented lines) are suppressed by native.** FP-004C, a trailing comment on a live line, is kept on purpose.
- **Six false positives are Semgrep-only:** FP-001A (translation label), FP-002B (`detected-google-gcm-service-account`, ERROR), FP-003C, FP-003D, FP-005B, and FP-004A/B (suppressed by native, but still reported by Semgrep).
- **TP-006 is native-only.** Semgrep `p/gitleaks` doesn't match `api_key:` in an object literal.
- **Severities differ.** Native findings are CRITICAL for AWS, HIGH for Slack and generic keys, and MEDIUM for `github-pat`. The Semgrep copies are INFO.

## Baseline scans (before the fix)

Scan the **same commit** on both surfaces. The repository is `jayanagaraj-source/no-lang`. Filter every result to paths starting with `secret-dedupe-regression/`, because the rest of the repo has its own secret fixtures.

1. Commit and push this folder (only after approval). Record the commit SHA.
   GitHub push protection may block some synthetic token shapes, as it did for the first `no-lang` commit. If it does, decide whether to allow them; don't change the values.
2. **Dashboard:** Code Security → Repositories → `jayanagaraj-source/no-lang` → run a full scan on `main` at that SHA.
3. **CLI**, from the repo root at the same SHA:
   ```sh
   TIGERGATE_API_KEY=... tigergate scan --type all --scan-scope full \
     --quality-gate=false --repo jayanagaraj-source/no-lang
   ```
   The CLI image pins Semgrep 1.37.0 while the worker uses 1.168.0. That doesn't affect stored results, because the CLI drops `generic.secrets.*` anyway. Record the Gitleaks version both report.

Record for each scan:

- scan ID, commit SHA and scan status
- native secret engine status (success, failed or partial)
- native findings and Semgrep `generic.secrets.*` findings, each with rule ID, file, line and severity
- total findings and duplicates: the same file and line reported by both engines
- false positives: findings on FP cases with `security_validity: NOT_A_SECRET`
- suppressed and deduplicated counts, where the logs show them (look for `secret finding suppressed` at debug level)

## After the worker fix

Rescan the **same commit** on the dashboard and with the CLI, then compare each case against `dashboard_after_fix` and `cli`:

1. Native secret findings are unchanged: the same 10, with the same rule IDs, lines and severities.
2. All 18 `generic.secrets.*` copies are gone from the dashboard.
3. Semgrep-only false positives (FP-001A, FP-002B, FP-003C/D, FP-004A/B, FP-005B) are gone.
4. Non-secret Semgrep SAST findings elsewhere in the repo are unchanged. Compare totals outside `secret-dedupe-regression/`.
5. CLI results are unchanged from the baseline.
6. No other modules are affected: SCA, IaC, quality and LOC totals should be unchanged.

**Native-failure fallback** must be tested separately, without breaking the shared scanning environment. Use a worker unit test that makes the native secret scan return an error or an incomplete result, and check that the `generic.secrets.*` findings are then kept.

## Validating the fixtures

```sh
for f in */*.js; do node --check "$f"; done
for f in */*.json expected-findings.json; do jq empty "$f"; done
```
