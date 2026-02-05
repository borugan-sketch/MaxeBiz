<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'db.php';

$pdo = getDB();

if (!$pdo) {
    // --- MOCK DATA FOR DEV/VERIFICATION ---
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
                'hotspot_id' => 1,
                'position_x' => 30.0,
                'position_y' => 40.0,
                'target_product_id' => 2,
                'product' => [
                    'id' => 2,
                    'name' => 'Mock Vintage Jacket',
                    'sku' => 'MOCK-001',
                    'description' => 'A beautiful vintage jacket.',
                    'base_price' => 120.00,
                    'thumbnail_url' => 'https://placehold.co/400x400?text=Jacket',
                    'brand' => 'Gucci',
                    'category' => 'Men',
                    'moq' => 5,
                    'qty_step' => 5,
                    'attributes' => ['Material' => 'Leather', 'Fit' => 'Regular'],
                    'gallery' => [
                        'https://placehold.co/400x400?text=Side',
                        'https://placehold.co/400x400?text=Back'
                    ],
                    'tiers' => [
                        ['min_qty' => 10, 'unit_price' => 110.00],
                        ['min_qty' => 20, 'unit_price' => 100.00]
                    ],
                    'variants' => [
                        ['id' => 1, 'type' => 'Size', 'value' => 'M'],
                        ['id' => 2, 'type' => 'Size', 'value' => 'L']
                    ]
                ]
            ]
        ]
    ]);
    exit;
}

try {
    // 1. Fetch Main Scene
    $stmt = $pdo->query("SELECT * FROM products WHERE is_scene = TRUE LIMIT 1");
    $scene = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$scene) {
        echo json_encode(['error' => 'No scene found']);
        exit;
    }

    // 2. Fetch Hotspots
    $stmt = $pdo->prepare("SELECT h.id as hotspot_id, h.position_x, h.position_y, h.target_product_id
                           FROM hotspots h
                           WHERE h.parent_product_id = ?");
    $stmt->execute([$scene['id']]);
    $hotspots = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Fetch Full Product Details for Targets
    foreach ($hotspots as &$spot) {
        $pid = $spot['target_product_id'];

        // Product Basic Data
        $pStmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $pStmt->execute([$pid]);
        $prod = $pStmt->fetch(PDO::FETCH_ASSOC);

        // Decode JSON attributes
        $prod['attributes'] = json_decode($prod['attributes'] ?? '{}');

        // Variants
        $vStmt = $pdo->prepare("SELECT id, type, value, additional_price FROM variants WHERE product_id = ?");
        $vStmt->execute([$pid]);
        $prod['variants'] = $vStmt->fetchAll(PDO::FETCH_ASSOC);

        // Gallery
        $gStmt = $pdo->prepare("SELECT image_url FROM product_gallery WHERE product_id = ?");
        $gStmt->execute([$pid]);
        $prod['gallery'] = $gStmt->fetchAll(PDO::FETCH_COLUMN);

        // Tiered Prices
        $tStmt = $pdo->prepare("SELECT min_qty, unit_price FROM product_tier_prices WHERE product_id = ? ORDER BY min_qty ASC");
        $tStmt->execute([$pid]);
        $prod['tiers'] = $tStmt->fetchAll(PDO::FETCH_ASSOC);

        // Attach product data to hotspot for frontend convenience
        $spot['product'] = $prod;
    }

    echo json_encode(['scene' => $scene, 'hotspots' => $hotspots]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>