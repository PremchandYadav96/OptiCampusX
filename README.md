# OptiCampus-X 🌱

**AI-Powered Smart Campus Resource Optimization for VIT-AP University**

OptiCampus-X is a comprehensive campus sustainability platform that leverages AI to optimize resource usage, track wastage, and promote environmental responsibility across VIT-AP University's campus.

## Key Features

### Resource Management
- Real-time monitoring of electricity and water usage across 22+ campus buildings
- Solar energy tracking and optimization
- Predictive analytics for resource consumption
- Anomaly detection for unusual usage patterns

### Wastage Reporting & Accountability
- **Water Leak Reports**: Students and staff can report water leaks with severity classification
- **Food Wastage Tracking**: Monitor and report food wastage from 4 campus caterers (CRCL, Fusion, Zenith, Food Exo)
- **Anonymous Reporting**: Option to report issues anonymously
- **Photo Evidence**: Upload photos of wastage issues
- **Caterer Performance Metrics**: Transparent accountability scoring system

### Gamification & Engagement
- **Sustainability Credits**: Earn points for valid reports
- **Leaderboard**: Campus-wide ranking system
- **Badges & Achievements**: Recognition for top contributors
- **Accuracy Tracking**: Monitor report verification rates

### AI-Powered Analytics
- Google Gemini 2.5 Flash integration for intelligent analysis
- Natural language queries for data insights
- Predictive forecasting for resource needs
- Optimization recommendations

### Role-Based Access Control
- **Super Admin**: Full system control
- **Admin**: Campus management access
- **Facility Manager**: Operations and maintenance
- **Faculty**: Academic coordination
- **Viewer**: Student access (default)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini 2.5 Flash
- **UI**: shadcn/ui + Tailwind CSS v4
- **Deployment**: Vercel
- **Charts**: Recharts

## Getting Started

### Quick Start (v0)

This project runs directly in v0. Simply:

1. Connect your Supabase integration
2. Run the SQL scripts in `/scripts` folder (in order)
3. Add your `GEMINI_API_KEY` environment variable
4. Sign up and start using!

### Detailed Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive setup instructions.

## Project Structure

\`\`\`
opticampus-x/
├── app/                      # Next.js app router pages
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # Main dashboard
│   ├── report/               # Wastage reporting
│   ├── leaderboard/          # Gamification
│   ├── caterers/             # Caterer accountability
│   ├── admin/                # Admin panel
│   └── api/                  # API routes
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── dashboard/            # Dashboard-specific
│   ├── reports/              # Reporting forms
│   └── profile/              # User profile
├── lib/                      # Utilities
│   ├── supabase/             # Supabase client setup
│   └── types.ts              # TypeScript definitions
├── scripts/                  # SQL migration scripts
│   ├── 001-create-tables.sql
│   ├── 002-rls-policies.sql
│   ├── 002-update-trigger-with-metadata.sql
│   ├── 003-helper-functions.sql
│   └── 003-seed-data.sql
└── public/                   # Static assets
\`\`\`

## Database Schema

### Key Tables
- `profiles` - User accounts with roles and credits
- `buildings` - 22 campus buildings with capacity and solar data
- `caterers` - 4 mess caterers with performance metrics
- `water_leak_reports` - Water wastage reports with severity
- `food_wastage_reports` - Food wastage with caterer accountability
- `resource_usage_logs` - Historical usage data
- `optimization_schedules` - AI-generated schedules
- `ai_analysis_logs` - AI query history

## Contributing

This is an academic project for VIT-AP University. For suggestions or improvements, contact the development team.

## Team

- **V C Premchand Yadav** - Backend & AI Integration
- **P R Kiran Kumar Reddy** - Frontend Development
- **Edupulapati Sai Praneeth** - Database Design
- **Sanjana Pasam** - UI/UX Design

## License

Academic Project - VIT-AP University

---

**Built for VIT-AP University | Powered by AI | Designed for Sustainability**
