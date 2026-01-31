-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    media_type VARCHAR(50) DEFAULT 'image', -- image, video, model
    media_url TEXT,
    thumbnail_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    is_scene BOOLEAN DEFAULT FALSE, -- To identify if this product acts as a parent scene/media
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Variants Table
CREATE TABLE IF NOT EXISTS variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- e.g., 'Size', 'Color'
    value VARCHAR(100) NOT NULL, -- e.g., 'M', 'Red'
    additional_price DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hotspots Table
-- Links a parent scene (product) to a target product
CREATE TABLE IF NOT EXISTS hotspots (
    id SERIAL PRIMARY KEY,
    parent_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    target_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    position_x DECIMAL(5, 2) NOT NULL, -- Percentage (0-100)
    position_y DECIMAL(5, 2) NOT NULL, -- Percentage (0-100)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    delivery_address TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, paid, shipped, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    variant_id INTEGER REFERENCES variants(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_hotspots_parent ON hotspots(parent_product_id);
CREATE INDEX idx_variants_product ON variants(product_id);
CREATE INDEX idx_orders_customer ON orders(customer_email);
