// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-DUP-002: the TP-001 token value again, in a different file.
// Native dedupe keys on (rule, value), so only one of the two files keeps a stored native finding.
const mirroredGithubToken = "ghp_TGfake7Qx2Lm9Vb4Nc8Zr1Ts6Wy3Pd5Hk0Ja";

module.exports = { mirroredGithubToken };
