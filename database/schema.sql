-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Base price for single unit
    media_type VARCHAR(50) DEFAULT 'image',
    media_url TEXT,
    thumbnail_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    is_scene BOOLEAN DEFAULT FALSE,

    -- New Fields
    brand VARCHAR(100),
    category VARCHAR(100),
    moq INTEGER DEFAULT 1, -- Minimum Order Quantity
    qty_step INTEGER DEFAULT 1, -- Multiples of this quantity
    attributes JSONB DEFAULT '{}', -- Key-value pairs for badges

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Gallery (Extra Images)
CREATE TABLE IF NOT EXISTS product_gallery (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

-- Tiered Pricing
CREATE TABLE IF NOT EXISTS product_tier_prices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    min_qty INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Variants Table
CREATE TABLE IF NOT EXISTS variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    additional_price DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hotspots Table
CREATE TABLE IF NOT EXISTS hotspots (
    id SERIAL PRIMARY KEY,
    parent_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    target_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    position_x DECIMAL(5, 2) NOT NULL,
    position_y DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    delivery_address TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    type VARCHAR(50) DEFAULT 'order', -- 'order' or 'rfq'
    payment_method VARCHAR(50), -- 'online', 'offline'
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
    price_at_purchase DECIMAL(10, 2) NOT NULL, -- The specific tier price applied
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_hotspots_parent ON hotspots(parent_product_id);
CREATE INDEX idx_tier_prices_product ON product_tier_prices(product_id);
