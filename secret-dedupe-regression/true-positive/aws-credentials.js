// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-TP-002: AWS access key ID shape (AKIA + 16 [A-Z0-9]).
// Deliberately not the AWS documentation example key, which SuppressSecret drops.
const awsAccessKeyId = "AKIATGFAKEDEDUPE0001";

module.exports = { awsAccessKeyId };
