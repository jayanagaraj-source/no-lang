<?php
// SQL / XPath classification fixtures. Static-scan only; not routed or executed.

// ---- Candidate misclassifications: non-SQL query() methods ----

function findUserXml(DOMDocument $doc) {
    $xpath = new DOMXPath($doc);
    return $xpath->query("//user[name='" . $_GET['name'] . "']"); // FP-SQL-PHP-001
}

function searchCatalog(SearchClient $client) {
    return $client->query($_GET['q']); // FP-SQL-PHP-002
}

function runGraphql(GraphQLClient $graphql) {
    return $graphql->query($_POST['query'], ['limit' => 10]); // FP-SQL-PHP-003
}

// ---- Positive controls ----

function userByIdPdo(PDO $pdo) {
    return $pdo->query("SELECT * FROM users WHERE id = " . $_GET['id']); // TP-SQL-PHP-001
}

function userByNameMysqli(mysqli $conn) {
    return mysqli_query($conn, "SELECT * FROM users WHERE name = '" . $_GET['name'] . "'"); // TP-SQL-PHP-002
}

function findAccountXml(DOMDocument $doc) {
    $xpath = new DOMXPath($doc);
    return $xpath->query("//account[@id='" . $_GET['account'] . "']"); // TP-XPATH-PHP-001
}

// ---- Safe negative control ----

function userByIdPrepared(PDO $pdo) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_GET['id']]); // SAFE-SQL-PHP-001
    return $stmt->fetchAll();
}
