<?php
function getDB() {
    $dsn = getenv('DATABASE_URL');
    if (!$dsn) {
        // For syntax check or local dev without env, we handle this gracefully in consumers
        return null;
    }
    try {
        $pdo = new PDO($dsn);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Connection failed: " . $e->getMessage());
        return null;
    }
}
?>