// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-DUP-001: one secret on one line, matched by native Gitleaks and Semgrep p/gitleaks.
const deployToken = "ghp_TGfake9Hb3Wq7Ce1Ry5Tu2Io8Pa4Sd6Fg0Jk";

// TG-SECRET-DUP-003: different secret values and types in the same file.
const backupKeyId = "AKIATGFAKEDEDUPE0002";
const alertsToken = "xoxb-7364918250-4829105736-tGfAkE9qX2lM7vB4nC8zR1tS";

module.exports = { deployToken, backupKeyId, alertsToken };
