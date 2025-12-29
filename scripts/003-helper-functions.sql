-- Helper functions for OptiCampus-X
-- These functions help with profile updates and credit management

-- Function to sync user metadata to profile on first login
CREATE OR REPLACE FUNCTION sync_profile_from_metadata(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles p
  SET 
    full_name = COALESCE(p.full_name, (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = user_id)),
    registration_number = COALESCE(p.registration_number, (SELECT raw_user_meta_data->>'registration_number' FROM auth.users WHERE id = user_id)),
    department = COALESCE(p.department, (SELECT raw_user_meta_data->>'department' FROM auth.users WHERE id = user_id)),
    updated_at = NOW()
  WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment user credits and report count
CREATE OR REPLACE FUNCTION increment_user_credits(user_id UUID, credits INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET 
    sustainability_credits = sustainability_credits + credits,
    total_reports = total_reports + 1,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update caterer statistics
CREATE OR REPLACE FUNCTION update_caterer_stats(caterer_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE caterers c
  SET 
    total_wastage_reports = (
      SELECT COUNT(*) 
      FROM food_wastage_reports 
      WHERE food_wastage_reports.caterer_id = c.id
    ),
    avg_wastage_percentage = (
      SELECT COALESCE(AVG(wastage_percentage), 0) 
      FROM food_wastage_reports 
      WHERE food_wastage_reports.caterer_id = c.id 
      AND status = 'verified'
    ),
    updated_at = NOW()
  WHERE id = caterer_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policy to allow users to call these functions
GRANT EXECUTE ON FUNCTION sync_profile_from_metadata(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_user_credits(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION update_caterer_stats(UUID) TO authenticated;
