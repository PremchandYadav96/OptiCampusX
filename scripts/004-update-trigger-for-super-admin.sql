-- Update the handle_new_user function to support role-based logic
-- If the email matches the super admin email, assign the 'super_admin' role automatically
-- Otherwise, use the role from metadata or default to 'viewer'

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role TEXT;
BEGIN
  -- Determine the role based on email or metadata
  IF NEW.email = 'premchandyadavplnr@gmail.com' THEN
    assigned_role := 'super_admin';
  ELSE
    assigned_role := COALESCE(NEW.raw_user_meta_data->>'role', 'viewer');
  END IF;

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
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL),
    COALESCE(NEW.raw_user_meta_data->>'registration_number', NULL),
    COALESCE(NEW.raw_user_meta_data->>'department', NULL),
    assigned_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();
