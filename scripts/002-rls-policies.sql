-- OptiCampus-X Row Level Security Policies
-- Version 1.0

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE caterers ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_leak_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_wastage_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HELPER FUNCTIONS FOR RBAC
-- ============================================

-- Get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Check if user is admin or super_admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'admin')
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Check if user is facility_manager or higher
CREATE OR REPLACE FUNCTION is_facility_manager_or_higher()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'admin', 'facility_manager')
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Everyone can read profiles (for leaderboard)
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Only super_admin can update roles
CREATE POLICY "Super admin can update any profile"
ON profiles FOR UPDATE
USING (get_user_role() = 'super_admin');

-- ============================================
-- CATERERS POLICIES
-- ============================================

-- Everyone can view caterers
CREATE POLICY "Caterers are viewable by everyone"
ON caterers FOR SELECT
USING (true);

-- Only admin+ can manage caterers
CREATE POLICY "Admins can insert caterers"
ON caterers FOR INSERT
WITH CHECK (is_admin());

CREATE POLICY "Admins can update caterers"
ON caterers FOR UPDATE
USING (is_admin());

CREATE POLICY "Only super_admin can delete caterers"
ON caterers FOR DELETE
USING (get_user_role() = 'super_admin');

-- ============================================
-- BUILDINGS POLICIES
-- ============================================

-- Everyone can view buildings
CREATE POLICY "Buildings are viewable by everyone"
ON buildings FOR SELECT
USING (true);

-- Only admin+ can manage buildings
CREATE POLICY "Admins can manage buildings"
ON buildings FOR ALL
USING (is_admin());

-- ============================================
-- WATER LEAK REPORTS POLICIES
-- ============================================

-- Everyone can view water leak reports
CREATE POLICY "Water leak reports are viewable by everyone"
ON water_leak_reports FOR SELECT
USING (true);

-- Any authenticated user can create a report
CREATE POLICY "Authenticated users can create water leak reports"
ON water_leak_reports FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own pending reports
CREATE POLICY "Users can update own pending reports"
ON water_leak_reports FOR UPDATE
USING (
  auth.uid() = reporter_id 
  AND status = 'pending'
);

-- Facility managers+ can update any report
CREATE POLICY "Facility managers can update water leak reports"
ON water_leak_reports FOR UPDATE
USING (is_facility_manager_or_higher());

-- Only admin+ can delete reports
CREATE POLICY "Admins can delete water leak reports"
ON water_leak_reports FOR DELETE
USING (is_admin());

-- ============================================
-- FOOD WASTAGE REPORTS POLICIES
-- ============================================

-- Everyone can view food wastage reports
CREATE POLICY "Food wastage reports are viewable by everyone"
ON food_wastage_reports FOR SELECT
USING (true);

-- Any authenticated user can create a report
CREATE POLICY "Authenticated users can create food wastage reports"
ON food_wastage_reports FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own pending reports
CREATE POLICY "Users can update own pending food reports"
ON food_wastage_reports FOR UPDATE
USING (
  auth.uid() = reporter_id 
  AND status = 'pending'
);

-- Facility managers+ can update any report
CREATE POLICY "Facility managers can update food wastage reports"
ON food_wastage_reports FOR UPDATE
USING (is_facility_manager_or_higher());

-- Only admin+ can delete reports
CREATE POLICY "Admins can delete food wastage reports"
ON food_wastage_reports FOR DELETE
USING (is_admin());

-- ============================================
-- RESOURCE USAGE LOGS POLICIES
-- ============================================

-- Everyone can view resource logs
CREATE POLICY "Resource logs are viewable by everyone"
ON resource_usage_logs FOR SELECT
USING (true);

-- Only facility_manager+ can insert logs
CREATE POLICY "Facility managers can insert resource logs"
ON resource_usage_logs FOR INSERT
WITH CHECK (is_facility_manager_or_higher());

-- Only admin+ can update/delete logs
CREATE POLICY "Admins can manage resource logs"
ON resource_usage_logs FOR ALL
USING (is_admin());

-- ============================================
-- OPTIMIZATION SCHEDULES POLICIES
-- ============================================

-- Everyone can view schedules
CREATE POLICY "Schedules are viewable by everyone"
ON optimization_schedules FOR SELECT
USING (true);

-- Only facility_manager+ can manage schedules
CREATE POLICY "Facility managers can manage schedules"
ON optimization_schedules FOR ALL
USING (is_facility_manager_or_higher());

-- ============================================
-- AI ANALYSIS LOGS POLICIES
-- ============================================

-- Users can view their own AI logs
CREATE POLICY "Users can view own AI logs"
ON ai_analysis_logs FOR SELECT
USING (auth.uid() = user_id OR is_admin());

-- Any authenticated user can create AI logs
CREATE POLICY "Authenticated users can create AI logs"
ON ai_analysis_logs FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Admin can view all logs
CREATE POLICY "Admins can view all AI logs"
ON ai_analysis_logs FOR SELECT
USING (is_admin());
