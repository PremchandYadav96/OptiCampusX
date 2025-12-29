-- OptiCampus-X Database Schema for VIT-AP University
-- Version 1.0 - Initial Setup

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('super_admin', 'admin', 'facility_manager', 'faculty', 'viewer')),
  department TEXT,
  registration_number TEXT,
  phone TEXT,
  avatar_url TEXT,
  sustainability_credits INTEGER DEFAULT 0,
  total_reports INTEGER DEFAULT 0,
  valid_reports INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CATERERS TABLE
-- ============================================
CREATE TABLE caterers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  mess_location TEXT NOT NULL,
  contract_start DATE,
  contract_end DATE,
  contact_person TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  rating NUMERIC(2,1) DEFAULT 3.0,
  total_wastage_reports INTEGER DEFAULT 0,
  avg_wastage_percentage NUMERIC(5,2) DEFAULT 0,
  penalty_points INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BUILDINGS TABLE
-- ============================================
CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('academic', 'hostel', 'admin', 'facility', 'other')),
  floors INTEGER DEFAULT 1,
  total_rooms INTEGER,
  occupancy_capacity INTEGER,
  current_occupancy INTEGER DEFAULT 0,
  electricity_meter_id TEXT,
  water_meter_id TEXT,
  solar_capacity_kw NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WATER LEAK REPORTS TABLE
-- ============================================
CREATE TABLE water_leak_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  location_description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  estimated_water_loss_liters NUMERIC(10,2),
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'in_progress', 'resolved', 'rejected')),
  verified_by UUID REFERENCES profiles(id),
  resolved_by UUID REFERENCES profiles(id),
  resolution_notes TEXT,
  credits_awarded INTEGER DEFAULT 0,
  reported_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

-- ============================================
-- FOOD WASTAGE REPORTS TABLE
-- ============================================
CREATE TABLE food_wastage_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  caterer_id UUID REFERENCES caterers(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'snacks', 'dinner')),
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  estimated_wastage_kg NUMERIC(10,2) NOT NULL,
  wastage_percentage NUMERIC(5,2),
  photo_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  verified_by UUID REFERENCES profiles(id),
  credits_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ
);

-- ============================================
-- RESOURCE USAGE LOGS TABLE
-- ============================================
CREATE TABLE resource_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('electricity', 'water', 'solar')),
  value NUMERIC(15,2) NOT NULL,
  unit TEXT NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  is_anomaly BOOLEAN DEFAULT false,
  anomaly_reason TEXT
);

-- ============================================
-- OPTIMIZATION SCHEDULES TABLE
-- ============================================
CREATE TABLE optimization_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('hvac', 'lighting', 'equipment')),
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  power_level INTEGER DEFAULT 100 CHECK (power_level >= 0 AND power_level <= 100),
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AI ANALYSIS LOGS TABLE
-- ============================================
CREATE TABLE ai_analysis_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  analysis_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEADERBOARD VIEW (Materialized for performance)
-- ============================================
CREATE MATERIALIZED VIEW leaderboard AS
SELECT 
  p.id,
  p.full_name,
  p.email,
  p.department,
  p.registration_number,
  p.sustainability_credits,
  p.valid_reports,
  p.total_reports,
  CASE 
    WHEN p.total_reports > 0 THEN ROUND((p.valid_reports::NUMERIC / p.total_reports) * 100, 1)
    ELSE 0 
  END as accuracy_rate,
  RANK() OVER (ORDER BY p.sustainability_credits DESC) as rank
FROM profiles p
WHERE p.role = 'viewer' OR p.role = 'faculty'
ORDER BY p.sustainability_credits DESC;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_leaderboard_id ON leaderboard(id);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_water_leak_status ON water_leak_reports(status);
CREATE INDEX idx_water_leak_building ON water_leak_reports(building_id);
CREATE INDEX idx_water_leak_reporter ON water_leak_reports(reporter_id);
CREATE INDEX idx_food_wastage_caterer ON food_wastage_reports(caterer_id);
CREATE INDEX idx_food_wastage_date ON food_wastage_reports(report_date);
CREATE INDEX idx_resource_usage_building ON resource_usage_logs(building_id);
CREATE INDEX idx_resource_usage_type ON resource_usage_logs(resource_type);
CREATE INDEX idx_resource_usage_time ON resource_usage_logs(recorded_at);
CREATE INDEX idx_profiles_role ON profiles(role);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to refresh leaderboard
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh leaderboard when credits change
CREATE TRIGGER trigger_refresh_leaderboard
AFTER UPDATE OF sustainability_credits ON profiles
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_leaderboard();

-- Function to award credits for verified water leak reports
CREATE OR REPLACE FUNCTION award_water_leak_credits()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verified' AND OLD.status = 'pending' THEN
    -- Award credits based on severity
    NEW.credits_awarded := CASE NEW.severity
      WHEN 'critical' THEN 50
      WHEN 'high' THEN 30
      WHEN 'medium' THEN 20
      WHEN 'low' THEN 10
      ELSE 5
    END;
    
    -- Update reporter's credits
    UPDATE profiles 
    SET 
      sustainability_credits = sustainability_credits + NEW.credits_awarded,
      valid_reports = valid_reports + 1,
      updated_at = NOW()
    WHERE id = NEW.reporter_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_water_credits
BEFORE UPDATE ON water_leak_reports
FOR EACH ROW
EXECUTE FUNCTION award_water_leak_credits();

-- Function to award credits for verified food wastage reports
CREATE OR REPLACE FUNCTION award_food_wastage_credits()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verified' AND OLD.status = 'pending' THEN
    -- Award credits based on wastage amount reported
    NEW.credits_awarded := CASE 
      WHEN NEW.estimated_wastage_kg >= 50 THEN 40
      WHEN NEW.estimated_wastage_kg >= 30 THEN 30
      WHEN NEW.estimated_wastage_kg >= 15 THEN 20
      ELSE 10
    END;
    
    -- Update reporter's credits
    UPDATE profiles 
    SET 
      sustainability_credits = sustainability_credits + NEW.credits_awarded,
      valid_reports = valid_reports + 1,
      updated_at = NOW()
    WHERE id = NEW.reporter_id;
    
    -- Update caterer penalty points
    UPDATE caterers
    SET 
      total_wastage_reports = total_wastage_reports + 1,
      penalty_points = penalty_points + CASE 
        WHEN NEW.wastage_percentage >= 30 THEN 10
        WHEN NEW.wastage_percentage >= 20 THEN 5
        ELSE 2
      END,
      updated_at = NOW()
    WHERE id = NEW.caterer_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_food_credits
BEFORE UPDATE ON food_wastage_reports
FOR EACH ROW
EXECUTE FUNCTION award_food_wastage_credits();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();
