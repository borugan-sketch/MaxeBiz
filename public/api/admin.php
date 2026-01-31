<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'db.php';

// Simple basic auth for demo
$user = $_SERVER['PHP_AUTH_USER'] ?? '';
$pass = $_SERVER['PHP_AUTH_PW'] ?? '';

if ($user !== 'admin' || $pass !== 'admin123') {
    header('WWW-Authenticate: Basic realm="Store Admin"');
    header('HTTP/1.0 401 Unauthorized');
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$pdo = getDB();

if (!$pdo) {
    // Mock data
    echo json_encode([
        [
            'id' => 1,
            'customer_email' => 'test@example.com',
            'total_amount' => 150.00,
            'status' => 'pending',
            'created_at' => date('Y-m-d H:i:s')
        ]
    ]);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 50");
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($orders);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Update status
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['order_id']) && isset($input['status'])) {
            $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
            $stmt->execute([$input['status'], $input['order_id']]);
            echo json_encode(['success' => true]);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>