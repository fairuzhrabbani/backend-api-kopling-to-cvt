-- ============================================================
-- Backend API Store - Database Seed
-- Database : PostgreSQL
-- Tables   : users, categories, products
-- ============================================================

BEGIN;

-- ============================================================
-- 1. CATEGORIES
-- ============================================================

INSERT INTO categories (
    id,
    name,
    description,
    created_at,
    updated_at
)
VALUES
    (
        1,
        'Electronics',
        'Electronic devices and accessories',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        2,
        'Fashion',
        'Clothing, shoes, and fashion accessories',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        3,
        'Food',
        'Food and beverage products',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        4,
        'Books',
        'Books, novels, and educational materials',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        5,
        'Home & Living',
        'Home appliances and household products',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );


-- ============================================================
-- 2. USERS
-- ============================================================
--
-- Password:
--
-- admin123
-- user123
--
-- Password sudah di-hash menggunakan bcrypt.
-- Jangan menyimpan plain-text password di database.
--
-- ============================================================

INSERT INTO users (
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
    role
)
VALUES
    (
        1,
        'Admin Store',
        'admin@store.com',
        '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        'admin'
    ),
    (
        2,
        'John Doe',
        'john@store.com',
        '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        'user'
    ),
    (
        3,
        'Jane Doe',
        'jane@store.com',
        '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        'user'
    );


-- ============================================================
-- 3. PRODUCTS
-- ============================================================

INSERT INTO products (
    id,
    name,
    description,
    price,
    stock,
    category_id,
    created_at,
    updated_at
)
VALUES
    (
        1,
        'Wireless Mouse',
        'Wireless optical mouse for laptop and desktop',
        150000,
        50,
        1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        2,
        'Mechanical Keyboard',
        'Mechanical keyboard with RGB backlight',
        750000,
        25,
        1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        3,
        'USB-C Hub',
        'Multi-port USB-C hub with HDMI and USB ports',
        350000,
        30,
        1,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        4,
        'Basic T-Shirt',
        'Comfortable cotton t-shirt',
        120000,
        100,
        2,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        5,
        'Denim Jeans',
        'Classic denim jeans for everyday use',
        350000,
        40,
        2,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        6,
        'Running Shoes',
        'Lightweight running shoes',
        650000,
        35,
        2,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        7,
        'Coffee Beans',
        'Premium roasted coffee beans',
        85000,
        75,
        3,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        8,
        'Green Tea',
        'Premium green tea',
        50000,
        80,
        3,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        9,
        'JavaScript Programming Book',
        'Book for learning modern JavaScript',
        250000,
        20,
        4,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        10,
        'Clean Code',
        'A handbook of agile software craftsmanship',
        300000,
        15,
        4,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        11,
        'Electric Kettle',
        'Electric kettle for boiling water',
        275000,
        25,
        5,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        12,
        'Desk Lamp',
        'LED desk lamp with adjustable brightness',
        180000,
        45,
        5,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );


-- ============================================================
-- 4. RESET SEQUENCES
-- ============================================================
--
-- Supaya INSERT berikutnya tidak bentrok dengan ID yang
-- sudah kita masukkan secara manual.
--
-- ============================================================

SELECT setval(
    pg_get_serial_sequence('categories', 'id'),
    COALESCE((SELECT MAX(id) FROM categories), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('users', 'id'),
    COALESCE((SELECT MAX(id) FROM users), 1),
    true
);

SELECT setval(
    pg_get_serial_sequence('products', 'id'),
    COALESCE((SELECT MAX(id) FROM products), 1),
    true
);


-- ============================================================
-- 5. COMMIT
-- ============================================================

COMMIT;