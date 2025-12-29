"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Profile, Caterer, UserRole } from "@/lib/types"
import { ROLE_PERMISSIONS } from "@/lib/types"
import { Users, AlertTriangle, Utensils, Droplets, Shield, Search, Download } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface AdminDashboardProps {
  currentUser: Profile
  users: Profile[]
  pendingWaterCount: number
  pendingFoodCount: number
  caterers: Caterer[]
}

export function AdminDashboard({
  currentUser,
  users,
  pendingWaterCount,
  pendingFoodCount,
  caterers,
}: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [newRole, setNewRole] = useState<UserRole | "">("")
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.registration_number?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return

    setIsUpdating(true)
    const supabase = createClient()

    const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", selectedUser.id)

    if (error) {
      alert("Failed to update role: " + error.message)
    } else {
      router.refresh()
      setSelectedUser(null)
      setNewRole("")
    }

    setIsUpdating(false)
  }

  const handleExport = (type: "water" | "food") => {
    window.location.href = `/api/reports/export?type=${type}&format=csv`
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "admin":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "facility_manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "faculty":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    }
  }

  const canManageRoles = currentUser.role === "super_admin"

  return (
    <div className="container py-8 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, verify reports, and monitor caterers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/admin/reports/water")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Water Reports</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingWaterCount}</div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push("/admin/reports/food")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Food Reports</CardTitle>
            <Utensils className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingFoodCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Caterers</CardTitle>
            <Utensils className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caterers.filter((c) => c.is_active).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="caterers" className="gap-2">
            <Utensils className="h-4 w-4" />
            Caterers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                {canManageRoles ? "View and manage user roles" : "View users (only Super Admin can change roles)"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, name, or registration number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Reports</TableHead>
                      {canManageRoles && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.full_name || "—"}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {user.registration_number && (
                              <p className="text-xs text-muted-foreground">{user.registration_number}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{user.department || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {ROLE_PERMISSIONS[user.role]?.label || user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.sustainability_credits}</TableCell>
                        <TableCell>
                          {user.valid_reports}/{user.total_reports}
                        </TableCell>
                        {canManageRoles && (
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setNewRole(user.role)
                              }}
                              disabled={user.id === currentUser.id}
                            >
                              <Shield className="h-4 w-4 mr-1" />
                              Change Role
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Water Leak Reports
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleExport("water")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </CardTitle>
                <CardDescription>Review and verify water leak reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/reports/water">View All Water Reports ({pendingWaterCount} pending)</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-green-500" />
                    Food Wastage Reports
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleExport("food")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </CardTitle>
                <CardDescription>Review and verify food wastage reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/reports/food">View All Food Reports ({pendingFoodCount} pending)</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="caterers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Caterer Management</CardTitle>
              <CardDescription>Monitor caterer performance and accountability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Caterer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Wastage Reports</TableHead>
                      <TableHead>Penalty Points</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caterers.map((caterer) => (
                      <TableRow key={caterer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{caterer.name}</p>
                            <p className="text-sm text-muted-foreground">{caterer.contact_person}</p>
                          </div>
                        </TableCell>
                        <TableCell>{caterer.mess_location}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{caterer.rating}/5.0</Badge>
                        </TableCell>
                        <TableCell>{caterer.total_wastage_reports}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              caterer.penalty_points > 50
                                ? "bg-red-500/10 text-red-500"
                                : caterer.penalty_points > 20
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-green-500/10 text-green-500"
                            }
                          >
                            {caterer.penalty_points}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={caterer.is_active ? "default" : "secondary"}>
                            {caterer.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Role Change Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>Update the role for {selectedUser?.full_name || selectedUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Student / Viewer</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="facility_manager">Facility Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            {newRole && (
              <p className="mt-2 text-sm text-muted-foreground">{ROLE_PERMISSIONS[newRole as UserRole]?.description}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} disabled={isUpdating || !newRole}>
              {isUpdating ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
