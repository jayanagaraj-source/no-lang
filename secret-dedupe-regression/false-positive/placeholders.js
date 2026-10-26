// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-FP-003: documentation placeholders, not credentials.
const placeholderApiKey = "YOUR_API_KEY_HERE";
const placeholderPassword = "<password>";
const awsDocExampleKeyId = "AKIAIOSFODNN7EXAMPLE";
const maskedToken = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

module.exports = { placeholderApiKey, placeholderPassword, awsDocExampleKeyId, maskedToken };
