-- OptiCampus-X Seed Data for VIT-AP University
-- Version 1.0

-- ============================================
-- SEED CATERERS (VIT-AP Mess)
-- ============================================
INSERT INTO caterers (name, description, mess_location, contact_person, contact_email, rating, is_active) VALUES
('CRCL', 'Campus Restaurant and Catering Limited - Main mess provider', 'Main Mess Hall - MH-1 to MH-3', 'Mr. Rajesh Kumar', 'crcl.vitap@example.com', 3.8, true),
('Fusion', 'Fusion Foods - Quality vegetarian and non-vegetarian meals', 'Mess Block B - MH-4 to MH-6', 'Mrs. Priya Sharma', 'fusion.vitap@example.com', 4.0, true),
('Zenith', 'Zenith Catering - Premium dining experience', 'Ladies Hostel Mess - LH-1 to LH-4', 'Mr. Suresh Reddy', 'zenith.vitap@example.com', 3.5, true),
('Food Exo', 'Food Exo - International cuisine specialists', 'Special Dining Hall - Academic Block Area', 'Ms. Anjali Patel', 'foodexo.vitap@example.com', 4.2, true);

-- ============================================
-- SEED BUILDINGS (VIT-AP Campus)
-- ============================================
INSERT INTO buildings (name, code, type, floors, total_rooms, occupancy_capacity, solar_capacity_kw) VALUES
-- Academic Blocks
('Academic Block 1 (AB-1)', 'AB1', 'academic', 5, 60, 3000, 150.00),
('Academic Block 2 (AB-2)', 'AB2', 'academic', 5, 55, 2750, 140.00),
('Academic Block 3 (AB-3)', 'AB3', 'academic', 4, 45, 2250, 100.00),
('Technology Tower', 'TT', 'academic', 8, 80, 4000, 200.00),

-- Men's Hostels
('Men''s Hostel 1 (MH-1)', 'MH1', 'hostel', 6, 300, 600, 50.00),
('Men''s Hostel 2 (MH-2)', 'MH2', 'hostel', 6, 300, 600, 50.00),
('Men''s Hostel 3 (MH-3)', 'MH3', 'hostel', 6, 300, 600, 50.00),
('Men''s Hostel 4 (MH-4)', 'MH4', 'hostel', 6, 300, 600, 50.00),
('Men''s Hostel 5 (MH-5)', 'MH5', 'hostel', 6, 300, 600, 50.00),
('Men''s Hostel 6 (MH-6)', 'MH6', 'hostel', 6, 300, 600, 50.00),

-- Ladies Hostels
('Ladies Hostel 1 (LH-1)', 'LH1', 'hostel', 6, 250, 500, 45.00),
('Ladies Hostel 2 (LH-2)', 'LH2', 'hostel', 6, 250, 500, 45.00),
('Ladies Hostel 3 (LH-3)', 'LH3', 'hostel', 6, 250, 500, 45.00),
('Ladies Hostel 4 (LH-4)', 'LH4', 'hostel', 6, 250, 500, 45.00),

-- Administrative Buildings
('Admin Block', 'ADMIN', 'admin', 4, 50, 200, 75.00),
('Library', 'LIB', 'facility', 4, 20, 1000, 100.00),
('Student Activity Center (SAC)', 'SAC', 'facility', 3, 30, 500, 60.00),

-- Other Facilities
('Sports Complex', 'SPORTS', 'facility', 2, 10, 2000, 80.00),
('Auditorium', 'AUDI', 'facility', 2, 5, 2500, 40.00),
('Cafeteria Block', 'CAFE', 'facility', 2, 15, 800, 30.00),
('Research Center', 'RC', 'academic', 3, 25, 300, 60.00),
('Health Center', 'HC', 'facility', 2, 20, 100, 20.00);
