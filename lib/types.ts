export type UserRole = "super_admin" | "admin" | "facility_manager" | "faculty" | "viewer"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  department: string | null
  registration_number: string | null
  phone: string | null
  avatar_url: string | null
  sustainability_credits: number
  total_reports: number
  valid_reports: number
  created_at: string
  updated_at: string
}

export interface Caterer {
  id: string
  name: string
  description: string | null
  mess_location: string
  contact_person: string | null
  contact_email: string | null
  rating: number
  total_wastage_reports: number
  avg_wastage_percentage: number
  penalty_points: number
  is_active: boolean
  created_at: string
}

export interface Building {
  id: string
  name: string
  code: string
  type: "academic" | "hostel" | "admin" | "facility" | "other"
  floors: number
  total_rooms: number | null
  occupancy_capacity: number | null
  current_occupancy: number
  solar_capacity_kw: number
  created_at: string
}

export interface WaterLeakReport {
  id: string
  reporter_id: string | null
  building_id: string
  location_description: string
  severity: "low" | "medium" | "high" | "critical"
  estimated_water_loss_liters: number | null
  photo_url: string | null
  status: "pending" | "verified" | "in_progress" | "resolved" | "rejected"
  verified_by: string | null
  resolved_by: string | null
  resolution_notes: string | null
  credits_awarded: number
  reported_at: string
  verified_at: string | null
  resolved_at: string | null
  // Joined data
  building?: Building
  reporter?: Profile
}

export interface FoodWastageReport {
  id: string
  reporter_id: string | null
  caterer_id: string
  meal_type: "breakfast" | "lunch" | "snacks" | "dinner"
  report_date: string
  estimated_wastage_kg: number
  wastage_percentage: number | null
  photo_url: string | null
  notes: string | null
  status: "pending" | "verified" | "rejected"
  verified_by: string | null
  credits_awarded: number
  created_at: string
  verified_at: string | null
  // Joined data
  caterer?: Caterer
  reporter?: Profile
}

export interface LeaderboardEntry {
  id: string
  full_name: string | null
  email: string
  department: string | null
  registration_number: string | null
  sustainability_credits: number
  valid_reports: number
  total_reports: number
  accuracy_rate: number
  rank: number
}

export const ROLE_PERMISSIONS = {
  super_admin: {
    label: "Super Admin",
    description: "Full system access, can manage all users and settings",
    canManageUsers: true,
    canManageRoles: true,
    canVerifyReports: true,
    canManageCaterers: true,
    canViewAnalytics: true,
    canExportData: true,
  },
  admin: {
    label: "Admin",
    description: "Administrative access, can manage most settings",
    canManageUsers: true,
    canManageRoles: false,
    canVerifyReports: true,
    canManageCaterers: true,
    canViewAnalytics: true,
    canExportData: true,
  },
  facility_manager: {
    label: "Facility Manager",
    description: "Can verify reports and manage facility operations",
    canManageUsers: false,
    canManageRoles: false,
    canVerifyReports: true,
    canManageCaterers: false,
    canViewAnalytics: true,
    canExportData: true,
  },
  faculty: {
    label: "Faculty",
    description: "Can submit reports and view analytics",
    canManageUsers: false,
    canManageRoles: false,
    canVerifyReports: false,
    canManageCaterers: false,
    canViewAnalytics: true,
    canExportData: false,
  },
  viewer: {
    label: "Student / Viewer",
    description: "Can submit reports and participate in leaderboard",
    canManageUsers: false,
    canManageRoles: false,
    canVerifyReports: false,
    canManageCaterers: false,
    canViewAnalytics: false,
    canExportData: false,
  },
} as const
