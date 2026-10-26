# SonarCloud vs TigerGate Comparison — `no-lang`

> Fill in from real scan output only. "Not tested" means no scan has been recorded yet. Do not estimate values.

## Results

| File | Expected LOC (raw count) | SonarCloud LOC @997a8a8 | SonarCloud LOC (next scan) | TigerGate CLI LOC | TigerGate Dashboard LOC | SonarCloud findings @997a8a8 | SonarCloud findings (next scan) | TigerGate findings |
|---|---|---|---|---|---|---|---|---|
| `Dockerfile` | 14 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `LICENSE` | 22 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `Makefile` | 24 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `README.md` | 30 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `docker-compose.yml` | 34 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `build-files/build.gradle` | 24 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `build-files/build.gradle.kts` | 26 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `build-files/settings.gradle` | 18 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `build-files/settings.gradle.kts` | 17 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `gradle.properties` | 8 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `notes.txt` | 17 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `config.txt` | 18 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `README-security.md` | 20 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `CHANGELOG.md` | 13 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `deploy.sh` | 17 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `setup.sh` | 16 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `.env.example` | 9 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `application.properties` | 13 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `application.yml` | 21 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `deployment.yaml` | 39 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `service.yaml` | 22 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `config.json` | 23 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `config.xml` | 15 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `main.tf` | 47 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `index.html` | 24 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `app.js` | 19 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `main.py` | 18 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `build-files/pom.xml` | 27 | 27 @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| `Makefile.test` | 9 | 0 (not indexed) @997a8a8 | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |
| **Total** | 604 | 27 @997a8a8 (xml=27) | Pending verification | Not tested | Not tested | 0 @997a8a8 | Pending verification | Not tested |

The `@997a8a8` columns show that scan, when the build files were still at the repo root (`pom.xml`, not `build-files/pom.xml`).
The "next scan" columns are for the first analysis after the build files moved. TigerGate columns: not tested.

## SonarCloud scan history (observed)

| Commit | Date (IST) | Files indexed | LOC | Languages | Issues | Source |
|---|---|---|---|---|---|---|
| `46af553` (5 files) | 2026-10-24 01:19 | Dockerfile, docker-compose.yml | 14 | Docker 14 | 9 (Dockerfile 8, docker-compose.yml 1) | SonarCloud UI screenshots |
| `997a8a8` (31 files) | 2026-10-26 11:55 | **pom.xml only** (root path) | **27** | XML 27 | **0** (0 hotspots) | Public Web API, see below |
| Next commit (build files moved to `build-files/`) | — | Pending verification | Pending verification | Pending verification | Pending verification | — |

The `46af553` analysis no longer exists in SonarCloud. The project was deleted and re-imported, so the API lists only one analysis.

## Why only `pom.xml` was scanned at `997a8a8`

**Verified (from SonarCloud's public Web API, 2026-10-26):**
- `api/project_analyses/search`: 1 analysis, revision `997a8a8`. `api/ce/component`: status SUCCESS, 0 warnings.
- `api/components/tree`: the only file indexed is `pom.xml`.
- `api/measures/component`: `ncloc=27`, `ncloc_language_distribution=xml=27`. `pom.xml` has exactly 27 non-blank, non-comment lines.
- `api/issues/search` and `api/hotspots/search`: 0 results.
- The repo has `pom.xml`, `build.gradle` and `build.gradle.kts` at the root, and **no** `src/main` or `src/test` directory.

**Documented (docs.sonarsource.com/sonarqube-cloud/advanced-setup/automatic-analysis/):**
- For Java projects, the scanner "checks for the presence of a pom.xml, build.gradle, or build.gradle.kts file".
- For those projects, `sonar.sources`, `sonar.tests`, `sonar.inclusions` and `sonar.test.inclusions` are **not supported**, because "we assume that your files will follow the standard directory layout ... (`**/src/main/**/*` and `**/src/test/**/*`)".
- "Automatic analysis logs are not available."

**Conclusion (inferred, but consistent with every observation above):** this commit added root-level Maven/Gradle build files. That switched Automatic Analysis to the Java standard-layout scope, which here covers only the build file (`pom.xml`). No `src/main` exists, so nothing else was indexed. There are no analysis logs to confirm this directly.

**Consequence:** `.sonarcloud.properties` with `sonar.sources=.` would **not** fix this. That property is explicitly unsupported for Maven/Gradle projects under Automatic Analysis. No configuration file was added.

**Ways to restore whole-repo scanning:**
1. **(Applied in commit "test: reorganize build files for SonarCloud LOC analysis".)** Move `pom.xml`, `build.gradle`, `build.gradle.kts`, `settings.gradle` and `settings.gradle.kts` into a subdirectory such as `build-files/`. Contents stay the same, but paths change. Per the docs, root-level detection is what triggers Java mode.
2. Not applied: switch to CI-based analysis (SonarScanner CLI with `sonar.sources=.`). This changes the analysis mode, and Automatic Analysis must be turned off.

**Hypothesis under test:** with no `pom.xml`, `build.gradle` or `build.gradle.kts` at the root, Automatic Analysis stops using Java standard-layout scope and indexes the whole repo.
This is **not guaranteed**. The docs do not say how build files in a subdirectory are treated in Automatic Analysis, apart from noting that CI-based analysis is required for Gradle builds that are not at the root.

**Comparison finding:** with Automatic Analysis, adding one Maven/Gradle build file at the root shrank SonarCloud's scan from 2 files and 14 LOC to 1 file and 27 LOC, and dropped issues from 9 to 0. TigerGate should be checked for any similar scope switch.

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
