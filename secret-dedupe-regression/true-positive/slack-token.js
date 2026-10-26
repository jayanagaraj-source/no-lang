// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-TP-003: Slack bot token shape (xoxb-<digits>-<digits>-<alnum>).
const slackBotToken = "xoxb-1234567890-1234567890-TgFakeDedupeRegressionTok";

module.exports = { slackBotToken };
