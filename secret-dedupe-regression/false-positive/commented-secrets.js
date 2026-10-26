// Inert regression fixture for TigerGate secret-scan deduplication. Every value is synthetic
// ("TGfake"/"TGFAKE" marker) and cannot authenticate anywhere. Nothing here is executed.

// TG-SECRET-FP-004: secret-shaped values inside comments.
// Full-line comment (SuppressSecret's LineIsComment drops it):
// const legacyToken = "ghp_TGfake4Tn6Yc1Gv8Bu3Ex9Wd2Ka5Ol7Zm0Qs";

/*
 * Block-comment continuation line (starts with "*"):
 * slack: xoxb-5550001111-5550002222-TgFakeCommentedBlockToken
 */

// Trailing comment on a live line is NOT treated as a comment by SuppressSecret:
const retries = 3; // old key AKIATGFAKEDEDUPE0003

module.exports = { retries };
