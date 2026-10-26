# Expected results — SAST false-positive baseline

Observed column = **local worker-equivalent Semgrep run** (see README). Dashboard / CLI columns stay `Pending scan` until those scans are recorded.

| Fixture ID | Language | Expected current rule | Local result (target rule) | Dashboard | CLI | Correct classification | Future expected result |
|---|---|---|---|---|---|---|---|
| `FP-FMT-C-001` | c | insecure-use-printf-fn | not reproduced: — | Pending scan | Pending scan | False positive | no finding |
| `FP-FMT-C-002` | c | insecure-use-printf-fn | not reproduced: — | Pending scan | Pending scan | False positive | no finding |
| `FP-FMT-C-003` | c | insecure-use-printf-fn | not reproduced: — | Pending scan | Pending scan | False positive | no finding |
| `FP-FMT-C-004` | c | insecure-use-printf-fn | not reproduced: — | Pending scan | Pending scan | False positive | no finding |
| `TP-FMT-C-001` | c | CPP-002, insecure-use-printf-fn | detected: CPP-002 | Pending scan | Pending scan | True positive | finding |
| `TP-FMT-C-002` | c | CPP-002, insecure-use-printf-fn | detected: CPP-002 | Pending scan | Pending scan | True positive | finding |
| `TP-FMT-C-003` | c | CPP-002, insecure-use-printf-fn | MISSED: — | Pending scan | Pending scan | True positive | finding |
| `FP-FMT-C-005` | c | insecure-use-printf-fn | FP reproduced: insecure-use-printf-fn | Pending scan | Pending scan | False positive | no finding |
| `FP-FMT-C-006` | c | insecure-use-printf-fn | FP reproduced: insecure-use-printf-fn | Pending scan | Pending scan | False positive | no finding |
| `TP-FMT-C-004` | c | CPP-002, insecure-use-printf-fn | detected: CPP-002, insecure-use-printf-fn | Pending scan | Pending scan | True positive | finding |
| `FP-XSS-GO-001` | go | no-direct-write-to-responsewriter | FP reproduced: no-direct-write-to-responsewriter | Pending scan | Pending scan | Candidate FP (review) | no finding |
| `FP-XSS-GO-002` | go | no-direct-write-to-responsewriter | FP reproduced: no-direct-write-to-responsewriter | Pending scan | Pending scan | Candidate FP (review) | no finding |
| `FP-XSS-GO-003` | go | no-direct-write-to-responsewriter | not reproduced: — | Pending scan | Pending scan | False positive | no finding |
| `REVIEW-XSS-GO-004` | go | no-direct-write-to-responsewriter | flagged: no-direct-write-to-responsewriter | Pending scan | Pending scan | Review required | review |
| `TP-XSS-GO-001` | go | no-direct-write-to-responsewriter | detected: no-direct-write-to-responsewriter | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-GO-002` | go | no-direct-write-to-responsewriter | detected by another rule: — | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-GO-003` | go | no-direct-write-to-responsewriter | MISSED: — | Pending scan | Pending scan | True positive | finding |
| `FP-XSS-JAVA-001` | java | XSS_SERVLET_PARAMETER-1 | FP reproduced: gitlab.find_sec_bugs.XSS_SERVLET-2.XSS_SERVLET_PARAMETER-1 | Pending scan | Pending scan | False positive | no finding |
| `FP-XSS-JAVA-002` | java | JAVA-011, XSS_SERVLET_PARAMETER-1 | FP reproduced: JAVA-011 | Pending scan | Pending scan | False positive | no finding |
| `FP-XSS-JAVA-003` | java | XSS_SERVLET_PARAMETER-1 | FP reproduced: gitlab.find_sec_bugs.XSS_SERVLET-2.XSS_SERVLET_PARAMETER-1 | Pending scan | Pending scan | False positive | no finding |
| `FP-XSS-JAVA-004` | java | JAVA-011 | FP reproduced: JAVA-011 | Pending scan | Pending scan | False positive | no finding |
| `TP-XSS-JAVA-001` | java | XSS_SERVLET_PARAMETER-1, JAVA-011 | detected: gitlab.find_sec_bugs.XSS_SERVLET-2.XSS_SERVLET_PARAMETER-1 | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-JAVA-002` | java | XSS_SERVLET_PARAMETER-1, JAVA-011 | detected by another rule: — | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-JAVA-003` | java | XSS_SERVLET_PARAMETER-1, JAVA-011 | detected: JAVA-011 | Pending scan | Pending scan | True positive | finding |
| `SAFE-XSS-JAVA-001` | java | XSS_SERVLET_PARAMETER-1, JAVA-011 | clean: — | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `FP-FMT-JS-001` | javascript | unsafe-formatstring | FP reproduced: unsafe-formatstring | Pending scan | Pending scan | Candidate FP (review) | no finding |
| `FP-FMT-JS-002` | javascript | unsafe-formatstring | FP reproduced: unsafe-formatstring | Pending scan | Pending scan | Candidate FP (review) | no finding |
| `FP-FMT-JS-003` | javascript | unsafe-formatstring | FP reproduced: unsafe-formatstring | Pending scan | Pending scan | Candidate FP (review) | no finding |
| `TP-LOG-JS-001` | javascript | LOG-003 | MISSED: — | Pending scan | Pending scan | True positive | finding (log injection) |
| `TP-LOG-JS-002` | javascript | LOG-003 | MISSED: — | Pending scan | Pending scan | True positive | finding (log injection) |
| `TP-LOG-JS-003` | javascript | LOG-003 | MISSED: — | Pending scan | Pending scan | True positive | finding (log injection) |
| `TP-LOG-JS-004` | javascript | LOG-003 | MISSED: — | Pending scan | Pending scan | True positive | finding (log injection) |
| `SAFE-XSS-JS-010` | typescript | TG-TAINT-JS-XSS | FLAGGED (FP): TG-TAINT-JS-XSS | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `SAFE-XSS-JS-004` | javascript | TG-TAINT-JS-XSS | FLAGGED (FP): TG-TAINT-JS-XSS | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `SAFE-XSS-JS-005` | javascript | TG-TAINT-JS-XSS | FLAGGED (FP): TG-TAINT-JS-XSS | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `SAFE-XSS-JS-006` | javascript | TG-TAINT-JS-XSS | FLAGGED (FP): TG-TAINT-JS-XSS | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `SAFE-XSS-JS-013` | javascript | TG-TAINT-JS-XSS | FLAGGED (FP): TG-TAINT-JS-XSS | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `SAFE-XSS-JS-ESC` | javascript | TG-TAINT-JS-XSS | clean: — | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `SAFE-XSS-JS-CONST` | javascript | TG-TAINT-JS-XSS | clean: — | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `FP-XSS-JS-001` | javascript | TG-TAINT-JS-XSS | FP reproduced: TG-TAINT-JS-XSS | Pending scan | Pending scan | Candidate FP (review) | review |
| `FP-XSS-JS-002` | javascript | TG-TAINT-JS-XSS | FP reproduced: TG-TAINT-JS-XSS | Pending scan | Pending scan | Candidate FP (review) | review |
| `FP-XSS-JS-003` | javascript | TG-TAINT-JS-XSS | not reproduced: — | Pending scan | Pending scan | Candidate FP (review) | review |
| `REVIEW-XSS-JS-004` | javascript | TG-TAINT-JS-XSS | flagged: TG-TAINT-JS-XSS | Pending scan | Pending scan | Review required | review |
| `FP-XSS-JS-005` | javascript | TG-TAINT-JS-XSS | FP reproduced: TG-TAINT-JS-XSS | Pending scan | Pending scan | Candidate FP (review) | no XSS finding (command-injection rules unaffected) |
| `REVIEW-XSS-JS-006` | javascript | TG-TAINT-JS-XSS | flagged: TG-TAINT-JS-XSS | Pending scan | Pending scan | Review required | review |
| `TP-XSS-JS-001` | javascript | TG-TAINT-JS-XSS | detected: TG-TAINT-JS-XSS | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-JS-002` | javascript | TG-TAINT-JS-XSS | detected by another rule: — | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-JS-003` | javascript | TG-TAINT-JS-XSS | MISSED: — | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-JS-004` | javascript | TG-TAINT-JS-XSS | MISSED: — | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-JS-005` | javascript | TG-TAINT-JS-XSS | MISSED: — | Pending scan | Pending scan | True positive | finding |
| `FP-SQL-PHP-001` | php | TG-TAINT-PHP-SQL-INJECTION | FP reproduced: TG-TAINT-PHP-SQL-INJECTION | Pending scan | Pending scan | False positive | XPath-injection finding instead of SQLi |
| `FP-SQL-PHP-002` | php | TG-TAINT-PHP-SQL-INJECTION | FP reproduced: TG-TAINT-PHP-SQL-INJECTION | Pending scan | Pending scan | False positive | no SQLi finding |
| `FP-SQL-PHP-003` | php | TG-TAINT-PHP-SQL-INJECTION | FP reproduced: TG-TAINT-PHP-SQL-INJECTION | Pending scan | Pending scan | False positive | no SQLi finding |
| `TP-SQL-PHP-001` | php | TG-TAINT-PHP-SQL-INJECTION | detected: TG-TAINT-PHP-SQL-INJECTION | Pending scan | Pending scan | True positive | finding |
| `TP-SQL-PHP-002` | php | TG-TAINT-PHP-SQL-INJECTION | detected: TG-TAINT-PHP-SQL-INJECTION | Pending scan | Pending scan | True positive | finding |
| `TP-XPATH-PHP-001` | php | XPath injection rule | MISSED (only the SQLi rule fired: wrong class): — | Pending scan | Pending scan | True positive | XPath-injection finding |
| `SAFE-SQL-PHP-001` | php | TG-TAINT-PHP-SQL-INJECTION | clean: — | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `REVIEW-XSS-PHP-001` | php | TG-TAINT-PHP-XSS | flagged: TG-TAINT-PHP-XSS | Pending scan | Pending scan | Review required | review |
| `REVIEW-XSS-PHP-002` | php | TG-TAINT-PHP-XSS | not flagged: — | Pending scan | Pending scan | Review required | review |
| `REVIEW-XSS-PHP-003` | php | TG-TAINT-PHP-XSS | flagged: TG-TAINT-PHP-XSS | Pending scan | Pending scan | Review required | review |
| `TP-XSS-PHP-004` | php | TG-TAINT-PHP-XSS | detected: TG-TAINT-PHP-XSS | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-PHP-005` | php | TG-TAINT-PHP-XSS | detected: TG-TAINT-PHP-XSS | Pending scan | Pending scan | True positive | finding |
| `SAFE-XSS-PHP-001` | php | TG-TAINT-PHP-XSS | clean: — | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `TP-XSS-PHP-007` | php | TG-TAINT-PHP-XSS | detected: TG-TAINT-PHP-XSS | Pending scan | Pending scan | True positive | finding |
| `FP-SQL-PY-001` | python | TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | FP reproduced: TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | Pending scan | Pending scan | False positive | no finding |
| `FP-SQL-PY-002` | python | TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | FP reproduced: TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | Pending scan | Pending scan | False positive | no finding |
| `TP-SQL-PY-001` | python | TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | detected: TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | Pending scan | Pending scan | True positive | finding |
| `TP-SQL-PY-002` | python | TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | detected: TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | Pending scan | Pending scan | True positive | finding |
| `SAFE-SQL-PY-001` | python | TG-SQL-INJECTION-PY-INLINE, TG-TAINT-PY-SQL-INJECTION | clean: — | Pending scan | Pending scan | Safe (must not fire) | no finding |
| `REVIEW-XSS-PY-001` | python | direct-use-of-httpresponse | flagged: direct-use-of-httpresponse | Pending scan | Pending scan | Review required | review |
| `FP-XSS-PY-002` | python | direct-use-of-httpresponse | FP reproduced: direct-use-of-httpresponse | Pending scan | Pending scan | False positive | no finding |
| `FP-XSS-PY-003` | python | direct-use-of-httpresponse | not reproduced: — | Pending scan | Pending scan | False positive | no finding |
| `TP-XSS-PY-001` | python | direct-use-of-httpresponse | detected: direct-use-of-httpresponse | Pending scan | Pending scan | True positive | finding |
| `TP-XSS-PY-002` | python | direct-use-of-httpresponse | detected: direct-use-of-httpresponse | Pending scan | Pending scan | True positive | finding |
| `SAFE-XSS-PY-001` | python | direct-use-of-httpresponse | FLAGGED (FP): direct-use-of-httpresponse | Pending scan | Pending scan | Safe (must not fire) | no finding |

## Totals (local run)

| Measure | Count |
|---|---:|
| fixtures | 75 |
| fp cases reproduced | 20 |
| confirmed false positives reproduced | 12 |
| candidate false positives reproduced | 8 |
| fp cases not reproduced | 7 |
| positive controls | 29 |
| positive controls detected by target rule | 16 |
| positive controls detected by other rule | 3 |
| missing detections | 10 |
| safe negatives | 12 |
| safe negatives incorrectly flagged | 6 |
| review required | 7 |
