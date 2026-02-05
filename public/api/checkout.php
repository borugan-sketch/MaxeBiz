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

// Validation
if (!$input || !isset($input['customer']) || !isset($input['cart'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$type = $input['type'] ?? 'order'; // 'order' or 'rfq'
$paymentMethod = $input['paymentMethod'] ?? 'offline';

try {
    if ($pdo) {
        $pdo->beginTransaction();
    }

    $total = 0;
    $orderItems = [];

    // Process Cart
    foreach ($input['cart'] as $item) {
        // Fetch product logic (price checking, stock checking) would go here
        // For brevity/robustness in this demo, we trust the ID but re-fetch price if needed
        // Assuming $item has {id, quantity, price} passed from frontend logic which calculated tiers

        // In a real app, RE-CALCULATE price based on tiers here to prevent tampering
        // $fetchedPrice = calculateTierPrice($pdo, $item['id'], $item['quantity']);

        $price = $item['price']; // Using frontend price for this MVP/Demo
        $total += $price * $item['quantity'];

        if ($pdo && $type === 'order') {
             $updateStmt = $pdo->prepare("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?");
             $updateStmt->execute([$item['quantity'], $item['id']]);
        }

        $orderItems[] = [
            'name' => $item['name'],
            'qty' => $item['quantity'],
            'price' => $price
        ];
    }

    $orderId = 'DEMO-' . rand(1000, 9999);
    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO orders (customer_email, customer_phone, delivery_address, total_amount, status, type, payment_method) VALUES (?, ?, ?, ?, 'pending', ?, ?) RETURNING id");
        $stmt->execute([
            $input['customer']['email'],
            $input['customer']['phone'],
            $input['customer']['address'],
            $total,
            $type,
            $paymentMethod
        ]);
        $orderId = $stmt->fetchColumn();
    }

    if ($pdo) $pdo->commit();

    // Construct WhatsApp Message
    $prefix = ($type === 'rfq') ? "RFQ (Request for Quote)" : "New Order";
    $msg = "*$prefix #$orderId*\n";
    $msg .= "Customer: " . $input['customer']['email'] . "\n";
    if ($type === 'order') {
        $msg .= "Payment: " . ucfirst($paymentMethod) . "\n";
    }
    $msg .= "Total: $" . number_format($total, 2) . "\n\n";
    $msg .= "Items:\n";
    foreach ($orderItems as $oi) {
        $msg .= "- {$oi['qty']}x {$oi['name']} @ $" . number_format($oi['price'], 2) . "\n";
    }

    // Default admin number
    $waLink = "https://wa.me/15550000000?text=" . urlencode($msg);

    echo json_encode([
        'success' => true,
        'orderId' => $orderId,
        'whatsapp_url' => $waLink,
        'mailto_url' => "mailto:admin@store.com?subject=$prefix #$orderId&body=" . urlencode($msg)
    ]);

} catch (Exception $e) {
    if ($pdo && $pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>