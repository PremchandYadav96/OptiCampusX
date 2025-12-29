-- OptiCampus-X: Fix Role-Based Signup
-- This script updates the handle_new_user trigger to properly read the role from user metadata

-- ============================================
-- Update the handle_new_user function to read role from metadata
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Extract role from user metadata, default to 'viewer' if not provided
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'viewer');
  
  -- Validate role is one of the allowed values
  IF user_role NOT IN ('super_admin', 'admin', 'facility_manager', 'faculty', 'viewer') THEN
    user_role := 'viewer';
  END IF;
  
  -- Insert new profile for the user with the correct role
  INSERT INTO profiles (
    id, 
    email, 
    full_name,
    registration_number,
    department,
    role
  )
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'registration_number', ''),
    COALESCE(NEW.raw_user_meta_data->>'department', ''),
    user_role -- Use the extracted role instead of hardcoded 'viewer'
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the signup
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Ensure trigger is properly set up
-- ============================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- ============================================
-- Update ensure_profile_exists function to support role parameter
-- ============================================

CREATE OR REPLACE FUNCTION ensure_profile_exists(
  user_id UUID, 
  user_email TEXT,
  user_role TEXT DEFAULT 'viewer'
)
RETURNS void
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (user_id, user_email, user_role)
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;
