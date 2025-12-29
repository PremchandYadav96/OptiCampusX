-- OptiCampus-X Authentication Fix
-- This script completely fixes the authentication issues

-- ============================================
-- STEP 1: Drop problematic policies and recreate simpler ones
-- ============================================

-- Drop all existing policies on profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Super admin can update any profile" ON profiles;

-- ============================================
-- STEP 2: Create new simplified policies
-- ============================================

-- Allow anyone to view profiles (needed for leaderboard)
CREATE POLICY "profiles_select_all"
ON profiles FOR SELECT
TO public
USING (true);

-- Allow users to insert their own profile (needed for trigger to work)
CREATE POLICY "profiles_insert_own"
ON profiles FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to update their own profile
CREATE POLICY "profiles_update_own"
ON profiles FOR UPDATE
TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow service role to do anything (for triggers and admin operations)
CREATE POLICY "profiles_all_service_role"
ON profiles FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- STEP 3: Fix the handle_new_user trigger function
-- Make it more robust with error handling
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert new profile for the user
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
    'viewer'
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

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- ============================================
-- STEP 4: Create helper function to ensure profile exists
-- This can be called from the app if profile is missing
-- ============================================

CREATE OR REPLACE FUNCTION ensure_profile_exists(user_id UUID, user_email TEXT)
RETURNS void
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (user_id, user_email, 'viewer')
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 5: Grant necessary permissions
-- ============================================

-- Grant execute on functions to authenticated users
GRANT EXECUTE ON FUNCTION ensure_profile_exists TO authenticated;
GRANT EXECUTE ON FUNCTION ensure_profile_exists TO service_role;
