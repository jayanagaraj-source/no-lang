# tigergate-test-path-traversal

Regression fixtures for TigerGate's JavaScript/TypeScript path traversal (CWE-22) detection.

> Test fixtures only. No file starts a server: every Express router is exported and never mounted or bound to a port. The code is not meant to be run.

## What this tests

| | |
|---|---|
| Existing rule | `gitlab.eslint.detect-non-literal-fs-filename`: Semgrep registry, `p/eslint`, CWE-22, defined in `backend/data/sast-rules.yaml` |
| Proposed replacement | `tigergate.javascript.path-traversal.taint-fs-filename`. A proposed name only; this rule does not exist yet |

The existing rule is a broad audit rule. As described, it flags `fs.*` calls whose path argument is not a literal, whether or not user input reaches it. These fixtures measure two things:

- which real path traversal cases it catches (true positives)
- which safe patterns it wrongly reports (false positives)

They also give a proposed taint-based rule a fixed target to meet.

## Definitions

- **TP (true positive case):** user-controlled data reaches a filesystem or file-serving sink with no effective validation. The scanner **should** report it.
- **SAFE (negative control):** the path is constant, server-generated, allowlisted, strictly validated or properly contained. A correct path traversal rule **should not** report it. If it does, that's a false positive.
- **CONTEXT_DEPENDENT:** whether it's exploitable depends on the threat model or platform. Each case explains the conditions in a header comment in its file.

## Cases

| Folder | Cases | IDs |
|---|---:|---|
| `vulnerable/` | 16 TP | `TG-PATH-TP-001` … `TG-PATH-TP-016` |
| `safe/` | 14 SAFE | `TG-PATH-SAFE-001` … `TG-PATH-SAFE-014` |
| `edge-cases/` | 7 (2 TP, 5 CONTEXT_DEPENDENT) | `TG-PATH-EDGE-001` … `TG-PATH-EDGE-007` |
| **Total** | **37** | |

Each case's sink line ends with its marker comment, for example `// TG-PATH-TP-001`. `expected-findings.json` records each case's file, 1-based start line of the sink call, source, sink and reason, plus two separate expectations:

- `current_rule.prediction`: `LIKELY_REPORTED`, `NOT_REPORTED` or `UNCERTAIN`. **These are predictions, not measured results.** The rule's match pattern comes from the Semgrep registry and isn't stored in TigerGate, so details such as `fs.promises.*` coverage and constant propagation are unknown.
- `proposed_rule.expected`: `REPORT`, `NO_REPORT` or `CONTEXT_DEPENDENT`.

`incidental_sinks` lists two `fs.realpathSync` calls in `edge-cases/symlink-containment.js`. They aren't test cases. If the broad rule reports them, count them as noise, not as TP or FP results.

## Running the first TigerGate scan

This folder currently lives inside the `no-lang` repository. The CLI names the repository after the git `origin` remote, so pass `--repo` explicitly. Otherwise the results are attached to `no-lang`.

```sh
cd tigergate-test-path-traversal
TIGERGATE_API_KEY=... tigergate scan --type sast --scan-scope full \
  --quality-gate=false --repo <owner>/tigergate-test-path-traversal
```

Alternatively, scan it through the dashboard once it's pushed to its own GitHub repository.

## Comparing actual findings with expected ones

1. Export the SAST findings for rule `gitlab.eslint.detect-non-literal-fs-filename`, with file and line for each.
2. For each case in `expected-findings.json`, mark it as **reported** if a finding has the same `file` and `line`. Multi-line calls are reported on their first line.
3. Classify each case:

| Case type | Reported | Not reported |
|---|---|---|
| TP | True positive (detected) | **False negative** |
| SAFE | **False positive** | True negative |
| CONTEXT_DEPENDENT | Record it; no pass or fail | Record it; no pass or fail |

4. Record findings that match no case or incidental sink as **unexpected findings**, and review them by hand.
5. Compare the observed results with `current_rule.prediction`. Any mismatch tells you something about the registry pattern.

## Known limitations of static taint analysis

- **Custom validation isn't recognized.** Regex checks, allowlist lookups and `path.relative` containment are only treated as safe if the rule declares them as sanitizers. Otherwise SAFE-004/005/006/010/013 will still be reported.
- **Weak checks can be mistaken for real ones.** A rule that accepts any `startsWith` or `replace` as a sanitizer will miss TP-008 and TP-009.
- **Data flow across functions and files is limited.** Helper propagation (TP-007) needs interprocedural analysis, and flows across files are often missed.
- **Some risks aren't visible in the code.** Symlinks (EDGE-004), the host OS (EDGE-006) and who controls argv or env (EDGE-002/003) depend on the deployment.
- **Constant propagation varies by engine.** Whether `const p = "/x"; fs.readFileSync(p)` counts as a literal depends on it.
- **Decoding order matters.** A validate-then-decode bug (EDGE-005) is only caught if the rule tracks taint through `decodeURIComponent` and doesn't trust the earlier check.

## Validating the fixtures

```sh
npm install            # dev dependencies only: typescript, @types/express, @types/node
npm run check:js       # node --check on every .js file
npm run check:ts       # tsc --noEmit (strict)
```
