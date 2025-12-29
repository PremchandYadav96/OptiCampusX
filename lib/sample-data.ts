// Sample data for VIT-AP University campus - simulating real campus data

export const electricityData = [
  { time: "6 AM", actual: 120, predicted: 115 },
  { time: "8 AM", actual: 280, predicted: 290 },
  { time: "10 AM", actual: 450, predicted: 440 },
  { time: "12 PM", actual: 520, predicted: 510 },
  { time: "2 PM", actual: 480, predicted: 495 },
  { time: "4 PM", actual: 420, predicted: 410 },
  { time: "6 PM", actual: 350, predicted: 360 },
  { time: "8 PM", actual: 220, predicted: 230 },
  { time: "10 PM", actual: 150, predicted: 145 },
]

export const waterData = [
  { time: "6 AM", actual: 850, predicted: 820 },
  { time: "8 AM", actual: 1200, predicted: 1180 },
  { time: "10 AM", actual: 980, predicted: 1000 },
  { time: "12 PM", actual: 1450, predicted: 1400 },
  { time: "2 PM", actual: 1100, predicted: 1120 },
  { time: "4 PM", actual: 1050, predicted: 1080 },
  { time: "6 PM", actual: 1300, predicted: 1250 },
  { time: "8 PM", actual: 950, predicted: 980 },
  { time: "10 PM", actual: 600, predicted: 620 },
]

export const occupancyData = [
  { time: "6 AM", actual: 15 },
  { time: "8 AM", actual: 45 },
  { time: "10 AM", actual: 82 },
  { time: "12 PM", actual: 68 },
  { time: "2 PM", actual: 78 },
  { time: "4 PM", actual: 65 },
  { time: "6 PM", actual: 42 },
  { time: "8 PM", actual: 25 },
  { time: "10 PM", actual: 10 },
]

export const weeklyForecast = [
  { day: "Mon", electricity: 3200, water: 8500, predicted_elec: 3150, predicted_water: 8400 },
  { day: "Tue", electricity: 3400, water: 8800, predicted_elec: 3380, predicted_water: 8750 },
  { day: "Wed", electricity: 3100, water: 8200, predicted_elec: 3150, predicted_water: 8300 },
  { day: "Thu", electricity: 3500, water: 9000, predicted_elec: 3450, predicted_water: 8950 },
  { day: "Fri", electricity: 3300, water: 8600, predicted_elec: 3280, predicted_water: 8550 },
  { day: "Sat", electricity: 1800, water: 5200, predicted_elec: 1850, predicted_water: 5300 },
  { day: "Sun", electricity: 1200, water: 4000, predicted_elec: 1250, predicted_water: 4100 },
]

export const sampleAnomalies = [
  {
    id: "1",
    type: "electricity" as const,
    severity: "high" as const,
    location: "Academic Block-2 (APJ Abdul Kalam) - Lab 3",
    description: "Unusual power consumption detected during non-operational hours",
    timestamp: "2025-01-27T02:30:00",
    value: 450,
    threshold: 150,
  },
  {
    id: "2",
    type: "water" as const,
    severity: "medium" as const,
    location: "MH-2 (Rabindranath Tagore Block) - Floor 2",
    description: "Water usage 40% above normal pattern",
    timestamp: "2025-01-27T08:15:00",
    value: 280,
    threshold: 200,
  },
  {
    id: "3",
    type: "occupancy" as const,
    severity: "low" as const,
    location: "Central Block (Mahatma Gandhi) - Library Reading Room",
    description: "AC running at full capacity with low occupancy",
    timestamp: "2025-01-27T14:00:00",
    value: 12,
    threshold: 50,
  },
  {
    id: "4",
    type: "electricity" as const,
    severity: "medium" as const,
    location: "LH-1 - Common Room",
    description: "Lights and fans running in unoccupied areas",
    timestamp: "2025-01-27T11:00:00",
    value: 120,
    threshold: 80,
  },
  {
    id: "5",
    type: "water" as const,
    severity: "high" as const,
    location: "Student Activity Centre - Gym Washroom",
    description: "Potential water leak detected - continuous flow pattern",
    timestamp: "2025-01-27T03:45:00",
    value: 350,
    threshold: 100,
  },
]

export const optimizationSchedule = [
  {
    id: "1",
    resource: "AC Units",
    location: "Academic Block-1 (Sarvepalli Radhakrishnan)",
    currentStatus: "On",
    recommendedAction: "Reduce to 50% capacity",
    savings: "₹2,400/day",
    reason: "Low occupancy detected (35%) in Wing-A classrooms",
  },
  {
    id: "2",
    resource: "Lighting",
    location: "Central Block (Mahatma Gandhi) - East Wing",
    currentStatus: "100%",
    recommendedAction: "Switch to natural light mode",
    savings: "₹800/day",
    reason: "Sufficient daylight available (10 AM - 4 PM)",
  },
  {
    id: "3",
    resource: "Lab Equipment",
    location: "Academic Block-2 (APJ Abdul Kalam) - Computer Lab 2",
    currentStatus: "Standby",
    recommendedAction: "Power off until 2 PM",
    savings: "₹1,200/day",
    reason: "No scheduled classes until afternoon session",
  },
  {
    id: "4",
    resource: "Water Pumps",
    location: "MH-1 to MH-6 Complex",
    currentStatus: "Continuous",
    recommendedAction: "Schedule-based operation",
    savings: "₹600/day",
    reason: "Off-peak hours identified (10 AM - 5 PM)",
  },
  {
    id: "5",
    resource: "Corridor Lights",
    location: "LH-1 to LH-4 Complex",
    currentStatus: "24/7 On",
    recommendedAction: "Motion sensor activation",
    savings: "₹450/day",
    reason: "Low foot traffic between 11 PM - 6 AM",
  },
  {
    id: "6",
    resource: "AC Units",
    location: "Central Library",
    currentStatus: "Full capacity",
    recommendedAction: "Zone-based cooling",
    savings: "₹1,100/day",
    reason: "Only 45% of seating occupied on average",
  },
]

export const kpiData = {
  electricitySaved: { value: 28, unit: "%", change: 5, trend: "up" as const },
  waterSaved: { value: 22, unit: "%", change: 3, trend: "up" as const },
  costSavings: { value: "₹45,200", change: 12, trend: "up" as const },
  carbonReduced: { value: 3.2, unit: "tons", change: 8, trend: "up" as const },
  roomUtilization: { value: 78, unit: "%", change: 15, trend: "up" as const },
  anomaliesDetected: { value: 5, change: -40, trend: "down" as const },
}

export const realtimeAlerts = [
  {
    id: "alert1",
    type: "critical",
    title: "Water Leak Detected",
    location: "SAC - Gym Washroom",
    time: "2 mins ago",
    action: "Maintenance team notified",
  },
  {
    id: "alert2",
    type: "warning",
    title: "High Power Consumption",
    location: "Academic Block-2 - Lab 3",
    time: "15 mins ago",
    action: "Auto-shutdown scheduled",
  },
  {
    id: "alert3",
    type: "info",
    title: "Optimization Applied",
    location: "Central Block - East Wing",
    time: "1 hour ago",
    action: "Natural light mode activated",
  },
]

export const sampleUsageData = {
  electricity: electricityData,
  water: waterData,
  occupancy: occupancyData,
  weekly: weeklyForecast,
}
