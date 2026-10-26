/* Format-string fixtures. Static-scan only; never built or run. */
#include <stdio.h>
#include <string.h>

static void report(const char *name, int code, const char *user_input) {
    char buffer[128];

    /* ---- Candidate false positives: literal format strings ---- */
    printf("%s\n", "service started"); /* FP-FMT-C-001 */
    fprintf(stderr, "error code %d\n", code); /* FP-FMT-C-002 */
    snprintf(buffer, sizeof(buffer), "%s-%d", name, code); /* FP-FMT-C-003 */
    printf("user said: %s\n", user_input); /* FP-FMT-C-004 */

    /* ---- Positive controls: user input as the format string ---- */
    printf(user_input); /* TP-FMT-C-001 */
    fprintf(stderr, user_input); /* TP-FMT-C-002 */
    snprintf(buffer, sizeof(buffer), user_input); /* TP-FMT-C-003 */
}

int main(int argc, char **argv) {
    char line[256];
    if (argc < 2 || fgets(line, sizeof(line), stdin) == NULL) {
        return 1;
    }
    line[strcspn(line, "\n")] = '\0';
    report(argv[1], argc, line);

    /* ---- argv used directly (the shape insecure-use-printf-fn matches) ---- */
    char copy[64];
    printf("first argument: %s\n", argv[1]); /* FP-FMT-C-005 */
    strncpy(copy, argv[1], sizeof(copy) - 1);
    copy[sizeof(copy) - 1] = '\0';
    printf("copied: %s\n", copy); /* FP-FMT-C-006 */
    printf(argv[1]); /* TP-FMT-C-004 */
    return 0;
}
