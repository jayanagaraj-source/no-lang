// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-TP-001: GitHub personal-access-token shape (ghp_ + 36 alphanumerics).
const githubToken = "ghp_TGfake7Qx2Lm9Vb4Nc8Zr1Ts6Wy3Pd5Hk0Ja";

module.exports = { githubToken };
