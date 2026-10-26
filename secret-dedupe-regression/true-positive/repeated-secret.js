// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-TP-005: the same synthetic token appears twice in this file.
// Native per-(rule, value) dedupe should keep exactly one stored finding.
const primaryToken = "ghp_TGfake2Rw8Kd5Mn1Xc7Vb3Lq9Zt4Hs6Pj0Ya";

function fallbackConfig() {
  return { token: "ghp_TGfake2Rw8Kd5Mn1Xc7Vb3Lq9Zt4Hs6Pj0Ya" };
}

module.exports = { primaryToken, fallbackConfig };
