<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'db.php';

$pdo = getDB();

// Mock response for testing/development if DB not connected
if (!$pdo) {
    echo json_encode([
        'scene' => [
            'id' => 1,
            'name' => 'Summer Collection 2024',
            'media_type' => 'image',
            'media_url' => 'assets/images/videocom.png',
            'is_scene' => true
        ],
        'hotspots' => [
            [
                'id' => 1,
                'target_product_id' => 2,
                'position_x' => 25.0,
                'position_y' => 40.0,
                'name' => 'Essential Sunglasses',
                'price' => 92.99,
                'description' => 'A essential sunglasses perfect for any occasion.',
                'sku' => 'PROD-002',
                'thumbnail_url' => 'https://placehold.co/400x400?text=Sunglasses',
                'stock_quantity' => 38,
                'variants' => []
            ],
            [
                'id' => 2,
                'target_product_id' => 3,
                'position_x' => 50.0,
                'position_y' => 60.0,
                'name' => 'Essential Sneakers',
                'price' => 149.99,
                'description' => 'A essential sneakers perfect for any occasion.',
                'sku' => 'PROD-003',
                'thumbnail_url' => 'https://placehold.co/400x400?text=Sneakers',
                'stock_quantity' => 92,
                'variants' => [
                    ['id' => 1, 'type' => 'Size', 'value' => 'M'],
                    ['id' => 2, 'type' => 'Size', 'value' => 'L']
                ]
            ]
        ]
    ]);
    exit;
}

try {
    // Fetch the main scene
    $stmt = $pdo->query("SELECT * FROM products WHERE is_scene = TRUE LIMIT 1");
    $scene = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$scene) {
        // Fallback if DB is empty
        echo json_encode(['error' => 'No scene found']);
        exit;
    }

    // Fetch hotspots for this scene
    $stmt = $pdo->prepare("SELECT h.id as hotspot_id, h.position_x, h.position_y, h.target_product_id,
                           p.id, p.name, p.price, p.description, p.sku, p.thumbnail_url, p.stock_quantity, p.media_type, p.media_url
                           FROM hotspots h
                           JOIN products p ON h.target_product_id = p.id
                           WHERE h.parent_product_id = ?");
    $stmt->execute([$scene['id']]);
    $hotspots = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch variants for these products
    foreach ($hotspots as &$spot) {
        $vStmt = $pdo->prepare("SELECT id, type, value, additional_price FROM variants WHERE product_id = ?");
        $vStmt->execute([$spot['target_product_id']]);
        $spot['variants'] = $vStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode(['scene' => $scene, 'hotspots' => $hotspots]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>