# LOC & Security Test Matrix — `no-lang`

> Intentionally insecure scanner fixture. Every credential is a dummy value. Nothing here was executed.

## How lines were counted

- **Total** = physical lines. **Blank** = whitespace-only. **Comments** = comment-only lines in the file's own syntax
  (`#`, `//`, `/* */`, `<!-- -->`, Python docstrings). A line with code plus a trailing comment counts as code.
- **Expected LOC** = Total − Blank − Comments. That is what SonarCloud *would* report **if** it recognizes the language.
  `.txt`, `.json` and `LICENSE` have no comment syntax, so every non-blank line is counted.
- Calibration: this method gives `Dockerfile` = 14, matching the real SonarCloud scan of 2026-10-24.

## Matrix

| Filename | Language | Total lines | Blank | Comments | Expected LOC | Vulnerability test | Scanner category | SonarCloud LOC (prediction) | Expected security detection | Actual security detection | Actual LOC measurement |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `Dockerfile` | Docker | 25 | 11 | 0 | 14 | Hardcoded AWS keys/DB password in ENV, curl|sh, ADD over HTTP, chmod 777, root, :latest | IaC, Secrets | Measured: 14 LOC (verified 2026-10-24) | Yes | 8 issues (SonarCloud) | 14 (SonarCloud) |
| `LICENSE` | Plain text | 27 | 5 | 0 | 22 | None | - | Measured: 0 (verified - project total = Dockerfile only) | No | 0 issues (SonarCloud) | 0 (SonarCloud) |
| `Makefile` | Makefile | 33 | 9 | 0 | 24 | AWS keys, Slack webhook, curl|sudo bash, chmod 777, --privileged | Secrets | Measured: 0 (verified); webhook not flagged | Yes | 0 issues (SonarCloud) | 0 (SonarCloud) |
| `README.md` | Markdown | 43 | 13 | 0 | 30 | AWS keys, GitHub token, Stripe key, DB URL | Secrets | Measured: 0 (verified); secrets not flagged | Yes | 0 issues (SonarCloud) | 0 (SonarCloud) |
| `docker-compose.yml` | YAML (Compose) | 35 | 1 | 0 | 34 | privileged, cap_add ALL, host mounts, docker.sock, 0.0.0.0 ports, secrets | IaC, Secrets | Measured: 0 LOC (verified); 1 issue found | Yes | 1 issue (SonarCloud) | 0 (SonarCloud) |
| `build.gradle` | Groovy (Gradle) | 39 | 6 | 9 | 24 | HTTP repo + allowInsecureProtocol, log4j-core 2.14.1 (CVE-2021-44228), spring-beans 5.3.17 (CVE-2022-22965), JNDI trustURLCodebase | SCA, Misconfig | Likely NOT counted (no Groovy analyzer) — **Unverified** | Yes | Not tested | Not tested |
| `build.gradle.kts` | Kotlin (Gradle) | 42 | 6 | 10 | 26 | HTTP repo, commons-text 1.9 (CVE-2022-42889), snakeyaml 1.33 (CVE-2022-1471), dynamic version `+` | SCA, Misconfig | Likely counted (Kotlin .kts) — **Unverified** | Yes | Not tested | Not tested |
| `settings.gradle` | Groovy (Gradle) | 25 | 3 | 4 | 18 | Plugin + dependency repos over HTTP | Misconfig | Likely NOT counted (no Groovy analyzer) — **Unverified** | Yes | Not tested | Not tested |
| `settings.gradle.kts` | Kotlin (Gradle) | 27 | 3 | 7 | 17 | Plugin repo over HTTP, hardcoded repo password | Misconfig, Secrets | Likely counted (Kotlin .kts) — **Unverified** | Yes | Not tested | Not tested |
| `gradle.properties` | Properties | 19 | 5 | 6 | 8 | Plaintext repo password, GitHub-style token, signing password, TLSv1 | Secrets | Likely NOT counted — **Unverified** | Yes | Not tested | Not tested |
| `notes.txt` | Plain text | 23 | 6 | 0 | 17 | AWS keys, admin password, GitHub token, Stripe test key, Slack webhook | Secrets | NOT counted (no language) — **Unverified** | Yes | Not tested | Not tested |
| `config.txt` | Plain text | 22 | 4 | 0 | 18 | DB passwords, credentials in connection strings, SSL disabled | Secrets | NOT counted (no language) — **Unverified** | Yes | Not tested | Not tested |
| `README-security.md` | Markdown | 30 | 9 | 1 | 20 | DB password, API token, GitHub token, curl -k, CORS * | Secrets | NOT counted (no language) — **Unverified** | Yes | Not tested | Not tested |
| `CHANGELOG.md` | Markdown | 22 | 8 | 1 | 13 | GitHub-style token in docs | Secrets | NOT counted (no language) — **Unverified** | Yes | Not tested | Not tested |
| `deploy.sh` | Shell | 30 | 5 | 8 | 17 | eval with user input, unquoted ssh args, chmod 777, curl|bash, hardcoded password | SAST, Secrets | Uncertain - shell support unverified — **Unverified** | Yes | Not tested | Not tested |
| `setup.sh` | Shell | 30 | 5 | 9 | 16 | Predictable /tmp file, chmod 666/777, sourcing from /tmp, umask 000, password | SAST, Secrets | Uncertain - shell support unverified — **Unverified** | Yes | Not tested | Not tested |
| `.env.example` | Dotenv | 18 | 4 | 5 | 9 | DB password, API token, AWS keys, weak session secret, debug on | Secrets | NOT counted (no language) — **Unverified** | Yes | Not tested | Not tested |
| `application.properties` | Properties (Spring) | 26 | 6 | 7 | 13 | TLS off, plaintext DB creds, actuator *, stack traces, insecure cookies | Secrets, Misconfig | Likely NOT counted — **Unverified** | Yes | Not tested | Not tested |
| `application.yml` | YAML (Spring) | 27 | 4 | 2 | 21 | TLS off, plaintext creds, admin/admin, weak JWT secret, CSRF off, CORS * | Secrets, Misconfig | Uncertain - not a K8s/CloudFormation file — **Unverified** | Yes | Not tested | Not tested |
| `deployment.yaml` | YAML (Kubernetes) | 42 | 0 | 3 | 39 | privileged, runAsUser 0, caps ALL, hostNetwork/hostPID, hostPath /, :latest, secret in env | IaC, Secrets | Likely analyzed (Kubernetes); LOC unverified — **Unverified** | Yes | Not tested | Not tested |
| `service.yaml` | YAML (Kubernetes) | 28 | 0 | 6 | 22 | LoadBalancer open to 0.0.0.0/0, SSH + MySQL exposed, plain HTTP | IaC | Likely analyzed (Kubernetes); LOC unverified — **Unverified** | Yes | Not tested | Not tested |
| `config.json` | JSON | 23 | 0 | 0 | 23 | DB password, AWS keys, TLS verify off, CORS *, weak secret | Secrets, Misconfig | Uncertain - JSON not a counted language — **Unverified** | Yes | Not tested | Not tested |
| `config.xml` | XML | 27 | 5 | 7 | 15 | XXE-enabling parser features, plaintext DB password | Misconfig, Secrets | Likely counted (XML) — **Unverified** | Yes | Not tested | Not tested |
| `main.tf` | Terraform | 61 | 9 | 5 | 47 | Public S3 ACL, public access block off, 0.0.0.0/0 ingress, unencrypted EBS/RDS, public RDS, hardcoded password | IaC, Secrets | Likely counted (Terraform) — **Unverified** | Yes | Not tested | Not tested |
| `index.html` | HTML | 31 | 3 | 4 | 24 | DOM XSS (innerHTML, document.write), HTTP script w/o SRI, HTTP form, target=_blank w/o rel, no CSP | SAST | Likely counted (HTML) — **Unverified** | Yes | Not tested | Not tested |
| `app.js` | JavaScript | 34 | 7 | 8 | 19 | innerHTML XSS, eval, postMessage w/o origin check, Math.random token, hardcoded key, HTTP fetch | SAST, Secrets | Likely counted (JavaScript) — **Unverified** | Yes | Not tested | Not tested |
| `main.py` | Python | 43 | 15 | 10 | 18 | subprocess shell=True, os.system, eval, pickle.loads, MD5 passwords, path traversal, hardcoded password | SAST, Secrets | Likely counted (Python) — **Unverified** | Yes | Not tested | Not tested |
| `pom.xml` | XML (Maven) | 35 | 4 | 4 | 27 | HTTP repo, log4j-core 2.14.1 (CVE-2021-44228), commons-text 1.9 (CVE-2022-42889) | SCA, Misconfig | Likely counted (XML) — **Unverified** | Yes | Not tested | Not tested |
| `Makefile.test` | Makefile | 19 | 5 | 5 | 9 | Password on command line, curl|sh over HTTP, unquoted rm -rf with variable, dummy token | Secrets, SAST | NOT counted (no language; non-standard name) — **Unverified** | Yes | Not tested | Not tested |

## Totals

| Scope | Files | Total lines | Blank | Comments | Expected LOC |
|---|---|---|---|---|---|
| Existing files | 5 | 163 | 39 | 0 | 124 |
| New files | 24 | 723 | 122 | 121 | 480 |
| **Repository (excluding these two reports)** | 29 | 886 | 161 | 121 | 604 |

Expected LOC is a raw non-blank, non-comment count across **all** files. It is **not** a SonarCloud prediction:
SonarCloud only counts files in languages it analyzes (2026-10-24 scan: 14 LOC out of 124 raw).

## Known advisories used (real identifiers)

| Dependency | Version | Advisory | Files |
|---|---|---|---|
| org.apache.logging.log4j:log4j-core | 2.14.1 | CVE-2021-44228 (GHSA-jfh8-c2jp-5v3q, Log4Shell) | build.gradle, pom.xml |
| org.springframework:spring-beans | 5.3.17 | CVE-2022-22965 (Spring4Shell) | build.gradle |
| org.apache.commons:commons-text | 1.9 | CVE-2022-42889 (Text4Shell) | build.gradle.kts, pom.xml |
| org.yaml:snakeyaml | 1.33 | CVE-2022-1471 | build.gradle.kts |

## File types needing actual SonarCloud verification

- **Kotlin Gradle** (`*.gradle.kts`): predicted to count as Kotlin.
- **Groovy Gradle** (`*.gradle`): predicted not to count.
- **Shell** (`*.sh`): analyzer availability unverified.
- **YAML**: Kubernetes (`deployment.yaml`, `service.yaml`) vs. generic Spring (`application.yml`). Does either add LOC?
- **JSON** (`config.json`): not a CloudFormation/ARM template.
- **XML** (`config.xml`, `pom.xml`), **Terraform**, **HTML**, **JS**, **Python**: predicted to count.
- **Secrets in non-language files** (`.txt`, `.md`, `.properties`, `.env.example`, `Makefile.test`): predicted **not** scanned unless added to `sonar.text.inclusions`.
