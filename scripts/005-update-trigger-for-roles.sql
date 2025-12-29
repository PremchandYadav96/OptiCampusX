-- Updated handle_new_user to use role from metadata
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert new profile for the user using role from metadata if provided
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
    -- Use role from metadata, fallback to 'viewer'
    COALESCE(NEW.raw_user_meta_data->>'role', 'viewer')
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    registration_number = EXCLUDED.registration_number,
    department = EXCLUDED.department;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
