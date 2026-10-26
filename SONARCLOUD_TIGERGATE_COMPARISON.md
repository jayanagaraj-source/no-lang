# SonarCloud vs TigerGate Comparison — `no-lang`

> Fill in from real scan output only. "Not tested" means no scan has been recorded yet. Do not estimate values.

## Results

| File | Expected LOC (raw count) | SonarCloud LOC | TigerGate CLI LOC | TigerGate Dashboard LOC | SonarCloud findings | TigerGate findings |
|---|---|---|---|---|---|---|
| `Dockerfile` | 14 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `LICENSE` | 22 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `Makefile` | 24 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `README.md` | 30 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `docker-compose.yml` | 34 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `build.gradle` | 24 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `build.gradle.kts` | 26 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `settings.gradle` | 18 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `settings.gradle.kts` | 17 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `gradle.properties` | 8 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `notes.txt` | 17 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `config.txt` | 18 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `README-security.md` | 20 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `CHANGELOG.md` | 13 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `deploy.sh` | 17 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `setup.sh` | 16 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `.env.example` | 9 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `application.properties` | 13 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `application.yml` | 21 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `deployment.yaml` | 39 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `service.yaml` | 22 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `config.json` | 23 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `config.xml` | 15 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `main.tf` | 47 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `index.html` | 24 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `app.js` | 19 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `main.py` | 18 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `pom.xml` | 27 | Not tested | Not tested | Not tested | Not tested | Not tested |
| `Makefile.test` | 9 | Not tested | Not tested | Not tested | Not tested | Not tested |
| **Total** | 604 | Not tested | Not tested | Not tested | Not tested | Not tested |

Baseline from before these files were added (SonarCloud, commit `46af553`, 2026-10-24): 14 LOC (Docker only),
9 issues (Dockerfile 8, docker-compose.yml 1). Re-record every row after the new commit is scanned.

## Running the scans

### SonarCloud

1. Optional, to test secret detection in non-language files: in SonarCloud, open **Administration → General Settings → Languages → Secrets**
   and add `**/*.txt,**/*.md,**/*.properties,**/.env*,**/Makefile*,**/*.gradle,**/*.sh` to the text inclusions.
   Run once **without** this change first, so default behavior is recorded too.
2. Commit and push to `main`. Automatic Analysis runs on push. **Note:** GitHub push protection may block dummy
   tokens (it blocked the original commit). Allow them on GitHub only if you confirm they are fake.
3. Alternatively, scan locally with SonarScanner CLI (needs a `SONAR_TOKEN`; disable Automatic Analysis first):
   ```sh
   sonar-scanner \
     -Dsonar.organization=jayanagaraj-source \
     -Dsonar.projectKey=jayanagaraj-source_no-lang \
     -Dsonar.sources=. \
     -Dsonar.host.url=https://sonarcloud.io
   ```
4. Record the results:
   - Per-file LOC: `https://sonarcloud.io/component_measures?id=jayanagaraj-source_no-lang&metric=ncloc&view=list`
   - Detected languages: the **Code** tab, or the project card (e.g. "14 Lines of Code • Docker")
   - Findings per file: **Issues → Filters → File**. Files with zero issues are **not** listed, so record 0 for them.
   - API alternative: `GET https://sonarcloud.io/api/measures/component_tree?component=jayanagaraj-source_no-lang&metricKeys=ncloc&qualifiers=FIL`

### TigerGate

_Exact commands depend on your TigerGate install. Replace the placeholders below with the documented ones._

1. CLI: run the TigerGate CLI scan against the repo root, e.g. `tigergate scan <path-to-no-lang>`,
   and save the raw output (JSON if available) next to this report.
2. Record the CLI-reported LOC per file and in total in the **TigerGate CLI LOC** column.
3. Dashboard: open the project for the same commit and record per-file LOC and findings in the
   **TigerGate Dashboard LOC** and **TigerGate findings** columns.
4. Note any CLI vs Dashboard LOC mismatch. That is a separate finding from the SonarCloud comparison.

## Recording rules

- Record the commit SHA and scan date for each tool.
- LOC: enter the number exactly as the tool reports it. If a file is absent from the tool's output, enter `0 (not listed)`.
- Findings: enter the count plus rule IDs, e.g. `3 (docker:S6471, secrets:S6290, …)`.
- Cross-check against `LOC_SECURITY_TEST_MATRIX.md` (Expected security detection column) to spot misses.
