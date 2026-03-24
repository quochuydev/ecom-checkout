-- Seed data for ecommerce
-- Run: psql $POSTGRES_URL < seed.sql

-- ============================================================
-- better-auth tables
-- ============================================================
CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS session (
  id TEXT PRIMARY KEY,
  "expiresAt" TIMESTAMP NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account (
  id TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMP,
  "refreshTokenExpiresAt" TIMESTAMP,
  scope TEXT,
  password TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
);

-- ============================================================
-- Images (for categories and products)
-- ============================================================
INSERT INTO "Image" (id, url, "fileName", "createdDate", "updatedDate") VALUES
  ('11111111-0001-0001-0001-000000000001', '/images/GONG-KINH-NAM-1.jpg', 'gong-kinh-nam.jpg', NOW(), NOW()),
  ('11111111-0001-0001-0001-000000000002', '/images/GONG-KINH-NU-1.jpg', 'gong-kinh-nu.jpg', NOW(), NOW()),
  ('11111111-0001-0001-0001-000000000003', '/images/Trong-kinh-can-2-300x166.jpg', 'trong-kinh.jpg', NOW(), NOW()),
  -- Product images
  ('11111111-0002-0001-0001-000000000001', '/images/KM9016-1-1024x1024.png', 'KM9016.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000002', '/images/KM9016-2.png', 'KM9016-2.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000003', '/images/25068-1024x1024.jpg', '25068.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000004', '/images/27773-1-1024x1024.jpg', '27773.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000005', '/images/KL83083-2.png', 'KL83083-2.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000006', '/images/KL83083-3.png', 'KL83083-3.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000007', '/images/KL83019-2.png', 'KL83019-2.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000008', '/images/KL83019-3.png', 'KL83019-3.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000009', '/images/KL6610-2.png', 'KL6610-2.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000010', '/images/KL6610-3.png', 'KL6610-3.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000011', '/images/essilor-crizal-rock-160-1024x1024.jpg', 'essilor-crizal-rock.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000012', '/images/rocky-luxury-161-1024x1024.jpg', 'rocky-luxury.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000013', '/images/chemi-u2-156-1024x1024.jpg', 'chemi-u2.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000014', '/images/f69ad0ba86b009ee50a1-1024x1024.jpg', 'product-14.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000015', '/images/2b00a133b71638486107-1-1024x1024.jpg', 'product-15.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000016', '/images/2025f0dda1d72e8977c6.jpg', 'product-16.jpg', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000017', '/images/Thiet-ke-chua-co-ten.png', 'design-1.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000018', '/images/Thiet-ke-chua-co-ten-2.png', 'design-2.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000019', '/images/Thiet-ke-chua-co-ten-4.png', 'design-4.png', NOW(), NOW()),
  ('11111111-0002-0001-0001-000000000020', '/images/KM9016.png', 'KM9016-main.png', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Product Categories
-- ============================================================
INSERT INTO "ProductCategory" (id, title, slug, "createdDate", "updatedDate", "imageId") VALUES
  ('22222222-0001-0001-0001-000000000001', 'Gọng Kính', 'gong-kinh', NOW(), NOW(), '11111111-0001-0001-0001-000000000001'),
  ('22222222-0001-0001-0001-000000000002', 'Kính Mát', 'kinh-mat', NOW(), NOW(), '11111111-0001-0001-0001-000000000002'),
  ('22222222-0001-0001-0001-000000000003', 'Tròng Kính', 'trong-kinh', NOW(), NOW(), '11111111-0001-0001-0001-000000000003')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Products
-- ============================================================
INSERT INTO "Product" (id, slug, title, description, sku, price, "regularPrice", "createdDate", "updatedDate") VALUES
  ('33333333-0001-0001-0001-000000000001', 'gong-kinh-km9016', 'Gọng Kính KM9016', '<p>Gọng kính kim loại cao cấp KM9016 với thiết kế thanh lịch, phù hợp cho cả nam và nữ. Chất liệu titanium nhẹ, bền, chống gỉ.</p>', 'KM9016', 890000, 1200000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000002', 'gong-kinh-op25068', 'Gọng Kính 25068', '<p>Gọng kính nhựa dẻo 25068, kiểu dáng hiện đại, trọng lượng siêu nhẹ. Phù hợp với nhiều kiểu khuôn mặt.</p>', '25068', 750000, 950000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000003', 'gong-kinh-op27773', 'Gọng Kính 27773', '<p>Gọng kính cat-eye thời trang 27773. Thiết kế nữ tính, thanh mảnh, phù hợp cho bạn gái yêu thích phong cách vintage.</p>', '27773', 680000, 850000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000004', 'kinh-mat-kl83083', 'Kính Mát KL83083', '<p>Kính mát thời trang KL83083 với tròng kính chống UV400. Gọng kim loại mạ vàng sang trọng.</p>', 'KL83083', 1290000, 1590000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000005', 'kinh-mat-kl83019', 'Kính Mát KL83019', '<p>Kính mát phi công KL83019 phong cách cổ điển. Tròng kính polarized chống chói hiệu quả.</p>', 'KL83019', 1190000, 1490000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000006', 'kinh-mat-kl6610', 'Kính Mát KL6610', '<p>Kính mát thể thao KL6610, thiết kế ôm sát khuôn mặt. Phù hợp cho hoạt động ngoài trời.</p>', 'KL6610', 990000, 1290000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000007', 'trong-kinh-essilor-crizal', 'Tròng Kính Essilor Crizal Rock', '<p>Tròng kính Essilor Crizal Rock 1.60 chống ánh sáng xanh, chống trầy xước, dễ lau chùi. Công nghệ Pháp.</p>', 'ESS-CRIZAL-160', 2890000, 3500000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000008', 'trong-kinh-rocky-luxury', 'Tròng Kính Rocky Luxury 1.61', '<p>Tròng kính Rocky Luxury 1.61 siêu mỏng, nhẹ, chống UV. Phù hợp cho người cận nặng.</p>', 'ROCKY-161', 1690000, 2200000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000009', 'trong-kinh-chemi-u2', 'Tròng Kính Chemi U2 1.56', '<p>Tròng kính Chemi U2 1.56 đổi màu thông minh. Tự động điều chỉnh độ đậm theo ánh sáng môi trường.</p>', 'CHEMI-U2-156', 1490000, 1890000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000010', 'gong-kinh-titan-classic', 'Gọng Kính Titan Classic', '<p>Gọng kính titan nguyên khối, siêu nhẹ chỉ 12g. Thiết kế tối giản, sang trọng cho doanh nhân.</p>', 'TITAN-CLS', 1890000, 2400000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000011', 'kinh-mat-sport-pro', 'Kính Mát Sport Pro', '<p>Kính mát thể thao chuyên dụng với tròng polarized và gọng TR90 siêu bền.</p>', 'SP-PRO', 1590000, 1990000, NOW(), NOW()),
  ('33333333-0001-0001-0001-000000000012', 'gong-kinh-vintage-oval', 'Gọng Kính Vintage Oval', '<p>Gọng kính oval phong cách retro, chất liệu acetate cao cấp nhập khẩu từ Ý.</p>', 'VTG-OVAL', 1290000, 1590000, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Image <-> Product associations
-- ============================================================
INSERT INTO "_ImageToProduct" ("A", "B") VALUES
  -- KM9016 - 2 images
  ('11111111-0002-0001-0001-000000000001', '33333333-0001-0001-0001-000000000001'),
  ('11111111-0002-0001-0001-000000000002', '33333333-0001-0001-0001-000000000001'),
  -- 25068
  ('11111111-0002-0001-0001-000000000003', '33333333-0001-0001-0001-000000000002'),
  -- 27773
  ('11111111-0002-0001-0001-000000000004', '33333333-0001-0001-0001-000000000003'),
  -- KL83083 - 2 images
  ('11111111-0002-0001-0001-000000000005', '33333333-0001-0001-0001-000000000004'),
  ('11111111-0002-0001-0001-000000000006', '33333333-0001-0001-0001-000000000004'),
  -- KL83019 - 2 images
  ('11111111-0002-0001-0001-000000000007', '33333333-0001-0001-0001-000000000005'),
  ('11111111-0002-0001-0001-000000000008', '33333333-0001-0001-0001-000000000005'),
  -- KL6610 - 2 images
  ('11111111-0002-0001-0001-000000000009', '33333333-0001-0001-0001-000000000006'),
  ('11111111-0002-0001-0001-000000000010', '33333333-0001-0001-0001-000000000006'),
  -- Essilor Crizal
  ('11111111-0002-0001-0001-000000000011', '33333333-0001-0001-0001-000000000007'),
  -- Rocky Luxury
  ('11111111-0002-0001-0001-000000000012', '33333333-0001-0001-0001-000000000008'),
  -- Chemi U2
  ('11111111-0002-0001-0001-000000000013', '33333333-0001-0001-0001-000000000009'),
  -- Titan Classic
  ('11111111-0002-0001-0001-000000000014', '33333333-0001-0001-0001-000000000010'),
  -- Sport Pro
  ('11111111-0002-0001-0001-000000000015', '33333333-0001-0001-0001-000000000011'),
  -- Vintage Oval
  ('11111111-0002-0001-0001-000000000016', '33333333-0001-0001-0001-000000000012')
ON CONFLICT DO NOTHING;

-- ============================================================
-- Product <-> Category associations
-- ============================================================
INSERT INTO "_ProductToProductCategory" ("A", "B") VALUES
  -- Gọng Kính products
  ('33333333-0001-0001-0001-000000000001', '22222222-0001-0001-0001-000000000001'),
  ('33333333-0001-0001-0001-000000000002', '22222222-0001-0001-0001-000000000001'),
  ('33333333-0001-0001-0001-000000000003', '22222222-0001-0001-0001-000000000001'),
  ('33333333-0001-0001-0001-000000000010', '22222222-0001-0001-0001-000000000001'),
  ('33333333-0001-0001-0001-000000000012', '22222222-0001-0001-0001-000000000001'),
  -- Kính Mát products
  ('33333333-0001-0001-0001-000000000004', '22222222-0001-0001-0001-000000000002'),
  ('33333333-0001-0001-0001-000000000005', '22222222-0001-0001-0001-000000000002'),
  ('33333333-0001-0001-0001-000000000006', '22222222-0001-0001-0001-000000000002'),
  ('33333333-0001-0001-0001-000000000011', '22222222-0001-0001-0001-000000000002'),
  -- Tròng Kính products
  ('33333333-0001-0001-0001-000000000007', '22222222-0001-0001-0001-000000000003'),
  ('33333333-0001-0001-0001-000000000008', '22222222-0001-0001-0001-000000000003'),
  ('33333333-0001-0001-0001-000000000009', '22222222-0001-0001-0001-000000000003')
ON CONFLICT DO NOTHING;

-- ============================================================
-- Blog posts
-- ============================================================
INSERT INTO "Blog" (id, title, body, "createdDate", "updatedDate") VALUES
  ('44444444-0001-0001-0001-000000000001', 'Hướng dẫn chọn gọng kính phù hợp khuôn mặt', '<h2>Cách chọn gọng kính theo khuôn mặt</h2><p>Việc chọn gọng kính phù hợp với khuôn mặt không chỉ giúp bạn nhìn rõ hơn mà còn tôn lên vẻ đẹp khuôn mặt. Dưới đây là một số gợi ý:</p><h3>Khuôn mặt tròn</h3><p>Nên chọn gọng vuông hoặc chữ nhật để tạo sự cân đối. Tránh gọng tròn vì sẽ làm khuôn mặt trông tròn hơn.</p><h3>Khuôn mặt vuông</h3><p>Gọng oval hoặc tròn sẽ giúp làm mềm các đường nét góc cạnh của khuôn mặt.</p><h3>Khuôn mặt trái xoan</h3><p>Đây là khuôn mặt lý tưởng, phù hợp với hầu hết các kiểu gọng kính.</p>', NOW(), NOW()),
  ('44444444-0001-0001-0001-000000000002', 'Top 5 xu hướng kính mắt 2026', '<h2>Xu hướng kính mắt nổi bật năm 2026</h2><p>Năm 2026 chứng kiến sự trở lại mạnh mẽ của nhiều phong cách kính mắt cổ điển kết hợp với công nghệ hiện đại.</p><ol><li><strong>Gọng titanium siêu nhẹ</strong> - Xu hướng tối giản với gọng kính chỉ nặng 10-15g</li><li><strong>Kính mát oversized</strong> - Phong cách Y2K tiếp tục thống trị</li><li><strong>Tròng kính đổi màu</strong> - Tiện lợi cho cả trong nhà và ngoài trời</li><li><strong>Gọng trong suốt</strong> - Phong cách nhẹ nhàng, hiện đại</li><li><strong>Kính mắt thể thao</strong> - Thiết kế năng động cho người yêu vận động</li></ol>', NOW(), NOW()),
  ('44444444-0001-0001-0001-000000000003', 'Cách bảo quản kính mắt đúng cách', '<h2>Bảo quản kính mắt</h2><p>Kính mắt là vật dụng cá nhân quan trọng cần được bảo quản đúng cách để kéo dài tuổi thọ sử dụng.</p><h3>1. Luôn đặt kính trong hộp</h3><p>Khi không sử dụng, hãy đặt kính vào hộp đựng có lót vải mềm để tránh trầy xước.</p><h3>2. Vệ sinh đúng cách</h3><p>Dùng nước rửa kính chuyên dụng và khăn microfiber. Tránh dùng giấy ăn hoặc vải thô.</p><h3>3. Không đặt kính úp mặt xuống</h3><p>Luôn đặt kính ngửa lên hoặc gập gọng lại để tránh trầy tròng kính.</p>', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
