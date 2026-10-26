// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-TP-004: high-entropy value assigned to an api-key-named variable.
const apiKey = "tgfk_9Qx7Lm2Vb8Nc4Zr6Ts1Wy3Pd5";

// TG-SECRET-TP-006: same idea as an object property (Gitleaks generic-api-key matches; Semgrep p/gitleaks does not).
const settings = { api_key: "Zq8Xv3Nm7Lp2Kc9Rb4Tw6Hy1Jf5Gd0Sa" };

module.exports = { apiKey, settings };
