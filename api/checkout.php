<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'db.php';

$pdo = getDB();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['customer']) || !isset($input['cart'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

// Mock success if no DB
if (!$pdo) {
    echo json_encode([
        'success' => true,
        'orderId' => 999,
        'whatsapp_url' => 'https://wa.me/1234567890?text=New+Order+999'
    ]);
    exit;
}

try {
    $pdo->beginTransaction();

    $total = 0;
    $orderItems = [];

    // Process Cart Items
    foreach ($input['cart'] as $item) {
        $stmt = $pdo->prepare("SELECT price, stock_quantity, name FROM products WHERE id = ?");
        $stmt->execute([$item['id']]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$product) {
            throw new Exception("Product ID {$item['id']} not found");
        }

        if ($product['stock_quantity'] < $item['quantity']) {
            throw new Exception("Insufficient stock for {$product['name']}");
        }

        $price = $product['price'];
        $total += $price * $item['quantity'];

        // Update Stock
        $updateStmt = $pdo->prepare("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?");
        $updateStmt->execute([$item['quantity'], $item['id']]);

        $orderItems[] = [
            'product_id' => $item['id'],
            'variant_id' => $item['variantId'] ?? null,
            'quantity' => $item['quantity'],
            'price' => $price,
            'name' => $product['name']
        ];
    }

    // Create Order
    $stmt = $pdo->prepare("INSERT INTO orders (customer_email, customer_phone, delivery_address, total_amount, status) VALUES (?, ?, ?, ?, 'pending') RETURNING id");
    $stmt->execute([
        $input['customer']['email'],
        $input['customer']['phone'],
        $input['customer']['address'],
        $total
    ]);
    $orderId = $stmt->fetchColumn();

    // Insert Order Items
    $itemStmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, variant_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?, ?)");
    foreach ($orderItems as $oi) {
        $itemStmt->execute([$orderId, $oi['product_id'], $oi['variant_id'], $oi['quantity'], $oi['price']]);
    }

    $pdo->commit();

    // Construct WhatsApp Message
    $msg = "*New Order #$orderId*\n";
    $msg .= "Customer: " . $input['customer']['email'] . "\n";
    $msg .= "Total: $" . number_format($total, 2) . "\n\n";
    $msg .= "Items:\n";
    foreach ($orderItems as $oi) {
        $msg .= "- {$oi['quantity']}x {$oi['name']} @ $" . number_format($oi['price'], 2) . "\n";
    }

    $waLink = "https://wa.me/15550000000?text=" . urlencode($msg);

    echo json_encode([
        'success' => true,
        'orderId' => $orderId,
        'whatsapp_url' => $waLink
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>