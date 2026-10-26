<?php
// Command / file / XML output echoed to the page. Static-scan only; not routed or executed.

// ---- Output of commands and files (classification per case in manifest.json) ----

function listDirectory() {
    $listing = shell_exec("ls -la " . $_GET['dir']);
    echo $listing; // REVIEW-XSS-PHP-001
}

function pingHost() {
    exec("ping -c 1 " . $_GET['host'], $lines);
    echo implode("<br>", $lines); // REVIEW-XSS-PHP-002
}

function diskUsage() {
    $usage = `du -sh {$_GET['path']}`;
    echo $usage; // REVIEW-XSS-PHP-003
}

function fetchPage() {
    $body = file_get_contents($_GET['url']);
    echo $body; // TP-XSS-PHP-004
}

function showXmlName() {
    $xml = simplexml_load_string($_POST['xml']);
    echo "<h2>" . $xml->name . "</h2>"; // TP-XSS-PHP-005
}

// ---- Safe negative control ----

function banner() {
    echo "<p>Welcome to the status page</p>"; // SAFE-XSS-PHP-001
}

// ---- Positive control ----

function reflect() {
    echo "<p>You searched for " . $_GET['q'] . "</p>"; // TP-XSS-PHP-007
}
