-- Dữ liệu test cho bảng drinks
-- Đảm bảo đã có cột is_hidden
ALTER TABLE drinks ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT FALSE;

-- Xóa dữ liệu cũ (nếu có)
DELETE FROM drinks;

-- Thêm dữ liệu test
INSERT INTO drinks (name, slug, description, price, salePrice, size, stock, views, sold, image_url, category_id, is_hidden, created_at, updated_at) VALUES
('Cà phê đen truyền thống', 'ca-phe-den-truyen-thong', 'Cà phê đen nguyên chất, đậm đà hương vị truyền thống', 25000, 20000, 'M', 50, 120, 15, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300', 1, false, NOW(), NOW()),

('Cappuccino', 'cappuccino', 'Cà phê espresso với sữa đánh bông mịn màng', 45000, 40000, 'L', 30, 85, 8, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', 1, false, NOW(), NOW()),

('Trà sữa trân châu', 'tra-sua-tran-chau', 'Trà sữa thơm ngon với trân châu dai giòn', 35000, 30000, 'L', 40, 200, 25, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', 2, false, NOW(), NOW()),

('Matcha Latte', 'matcha-latte', 'Trà xanh matcha Nhật Bản với sữa tươi', 55000, 50000, 'M', 25, 95, 12, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300', 2, false, NOW(), NOW()),

('Nước ép cam tươi', 'nuoc-ep-cam-tuoi', 'Nước ép cam nguyên chất, giàu vitamin C', 30000, 25000, 'M', 60, 150, 20, 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300', 3, false, NOW(), NOW()),

('Sinh tố bơ', 'sinh-to-bo', 'Sinh tố bơ thơm ngon, bổ dưỡng', 40000, 35000, 'L', 35, 80, 10, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300', 4, false, NOW(), NOW()),

('Americano', 'americano', 'Cà phê đen pha loãng, hương vị nhẹ nhàng', 30000, 0, 'M', 45, 70, 5, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', 1, false, NOW(), NOW()),

('Trà sữa matcha', 'tra-sua-matcha', 'Trà sữa với bột matcha thơm ngon', 42000, 38000, 'L', 28, 110, 18, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', 2, false, NOW(), NOW()),

('Nước ép táo', 'nuoc-ep-tao', 'Nước ép táo tươi, ngọt thanh', 28000, 0, 'M', 55, 65, 7, 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300', 3, false, NOW(), NOW()),

('Sinh tố dâu tây', 'sinh-to-dau-tay', 'Sinh tố dâu tây ngọt ngào', 45000, 40000, 'L', 20, 90, 14, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300', 4, false, NOW(), NOW());

-- Kiểm tra dữ liệu đã thêm
SELECT * FROM drinks ORDER BY created_at DESC;
