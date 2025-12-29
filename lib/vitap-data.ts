// VIT-AP University specific data configuration

export const vitapBuildings = {
  academic: [
    {
      id: "ab1",
      name: "Academic Block-1",
      alias: "Sarvepalli Radhakrishnan Block",
      type: "academic",
      floors: 5,
      rooms: 45,
      labs: 12,
      capacity: 2000,
    },
    {
      id: "central",
      name: "Central Block",
      alias: "Mahatma Gandhi Block",
      type: "academic",
      floors: 6,
      rooms: 60,
      labs: 8,
      capacity: 3000,
      hasLibrary: true,
    },
    {
      id: "ab2",
      name: "Academic Block-2",
      alias: "APJ Abdul Kalam Block",
      type: "academic",
      floors: 5,
      rooms: 40,
      labs: 15,
      capacity: 1800,
    },
  ],
  support: [
    {
      id: "sac",
      name: "Student Activity Centre",
      alias: "SAC",
      type: "support",
      facilities: ["Indoor Sports", "Gym", "Food Court", "Arena"],
    },
    {
      id: "library",
      name: "Central Library",
      alias: "Library",
      type: "support",
      floors: 3,
      capacity: 500,
    },
    {
      id: "cafeteria",
      name: "Main Cafeteria",
      alias: "Food Court",
      type: "support",
    },
    {
      id: "guesthouse",
      name: "VITRINA Guest House",
      alias: "Guest House",
      type: "support",
    },
  ],
  mensHostels: [
    { id: "mh1", name: "MH-1", alias: "Sarojini Naidu Block", capacity: 500, floors: 4 },
    { id: "mh2", name: "MH-2", alias: "Rabindranath Tagore Block", capacity: 500, floors: 4 },
    { id: "mh3", name: "MH-3", alias: "Neelam Sanjiva Reddy Block", capacity: 500, floors: 4 },
    { id: "mh4", name: "MH-4", alias: "Men's Hostel 4", capacity: 450, floors: 4 },
    { id: "mh5", name: "MH-5", alias: "Men's Hostel 5", capacity: 450, floors: 4 },
    { id: "mh6", name: "MH-6", alias: "Men's Hostel 6", capacity: 450, floors: 4 },
  ],
  ladiesHostels: [
    { id: "lh1", name: "LH-1", alias: "Ladies Hostel 1", capacity: 400, floors: 4 },
    { id: "lh2", name: "LH-2", alias: "Ladies Hostel 2", capacity: 400, floors: 4 },
    { id: "lh3", name: "LH-3", alias: "Ladies Hostel 3", capacity: 400, floors: 4 },
    { id: "lh4", name: "LH-4", alias: "Ladies Hostel 4", capacity: 400, floors: 4 },
  ],
}

// Get all buildings as flat array
export const getAllBuildings = () => [
  ...vitapBuildings.academic,
  ...vitapBuildings.support,
  ...vitapBuildings.mensHostels,
  ...vitapBuildings.ladiesHostels,
]

// Building-wise resource data
export const buildingResourceData = [
  { building: "Academic Block-1", electricity: 4500, water: 12000, occupancy: 85, savings: 12 },
  { building: "Central Block", electricity: 6200, water: 15000, occupancy: 78, savings: 18 },
  { building: "Academic Block-2", electricity: 3800, water: 9500, occupancy: 72, savings: 15 },
  { building: "SAC", electricity: 2800, water: 8000, occupancy: 65, savings: 22 },
  { building: "Library", electricity: 1200, water: 3500, occupancy: 82, savings: 8 },
  { building: "MH-1", electricity: 2200, water: 18000, occupancy: 95, savings: 10 },
  { building: "MH-2", electricity: 2100, water: 17500, occupancy: 92, savings: 11 },
  { building: "MH-3", electricity: 2300, water: 18500, occupancy: 94, savings: 9 },
  { building: "MH-4", electricity: 2000, water: 16000, occupancy: 88, savings: 14 },
  { building: "MH-5", electricity: 1900, water: 15500, occupancy: 85, savings: 16 },
  { building: "MH-6", electricity: 1850, water: 15000, occupancy: 82, savings: 18 },
  { building: "LH-1", electricity: 1600, water: 14000, occupancy: 96, savings: 7 },
  { building: "LH-2", electricity: 1550, water: 13500, occupancy: 94, savings: 8 },
  { building: "LH-3", electricity: 1500, water: 13000, occupancy: 92, savings: 10 },
  { building: "LH-4", electricity: 1450, water: 12500, occupancy: 90, savings: 12 },
]

// Hourly data for specific building
export const getHourlyDataForBuilding = (buildingId: string) => {
  const baseMultiplier = buildingId.startsWith("mh") || buildingId.startsWith("lh") ? 0.6 : 1
  return [
    { time: "6 AM", electricity: Math.round(80 * baseMultiplier), water: Math.round(600 * baseMultiplier) },
    { time: "8 AM", electricity: Math.round(180 * baseMultiplier), water: Math.round(1200 * baseMultiplier) },
    { time: "10 AM", electricity: Math.round(320 * baseMultiplier), water: Math.round(800 * baseMultiplier) },
    { time: "12 PM", electricity: Math.round(380 * baseMultiplier), water: Math.round(1400 * baseMultiplier) },
    { time: "2 PM", electricity: Math.round(350 * baseMultiplier), water: Math.round(900 * baseMultiplier) },
    { time: "4 PM", electricity: Math.round(300 * baseMultiplier), water: Math.round(850 * baseMultiplier) },
    { time: "6 PM", electricity: Math.round(250 * baseMultiplier), water: Math.round(1100 * baseMultiplier) },
    { time: "8 PM", electricity: Math.round(200 * baseMultiplier), water: Math.round(1300 * baseMultiplier) },
    { time: "10 PM", electricity: Math.round(150 * baseMultiplier), water: Math.round(800 * baseMultiplier) },
  ]
}
