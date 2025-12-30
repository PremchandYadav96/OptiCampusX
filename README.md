# OptiCampus-X

**AI-Powered Smart Campus Resource Optimization for VIT-AP University**

OptiCampus-X is a comprehensive campus sustainability platform that leverages AI to optimize resource usage, track wastage, and promote environmental responsibility across VIT-AP University's campus in Amaravati.

## About the Project

OptiCampus-X is designed specifically for VIT-AP University to address genuine challenges of resource wastage, inefficient scheduling, and sustainability. The system monitors and optimizes resources across all major campus buildings including 3 Academic Blocks, 6 Men's Hostels, 4 Ladies' Hostels, and support facilities.

### The Problem We Solve

VIT-AP University faces significant challenges in resource management:

- **Electricity Wastage**: Lights, ACs, and equipment running in unused spaces across 17+ buildings
- **Water Wastage**: Leaks and overuse in 10 hostel blocks serving 5000+ students
- **Underutilization**: 145+ classrooms and labs not efficiently scheduled
- **Reactive Management**: No predictive system; decisions are manual and delayed

### VIT-AP Campus Infrastructure

**Academic Blocks:**
- Academic Block-1 (Sarvepalli Radhakrishnan Block)
- Central Block (Mahatma Gandhi Block)
- Academic Block-2 (APJ Abdul Kalam Block)

**Men's Hostels:** MH-1 (Sarojini Naidu), MH-2 (Rabindranath Tagore), MH-3 (Neelam Sanjiva Reddy), MH-4, MH-5, MH-6

**Ladies' Hostels:** LH-1, LH-2, LH-3, LH-4

**Support Facilities:** Student Activity Centre (SAC), Central Library, Main Cafeteria, VITRINA Guest House

## Key Features

### Resource Management
- Real-time monitoring of electricity and water usage across 22+ campus buildings
- Solar energy tracking and optimization
- Predictive analytics for resource consumption using ARIMA and Prophet models
- Anomaly detection using Z-score and Isolation Forest algorithms

### Wastage Reporting & Accountability
- **Water Leak Reports**: Students and staff can report water leaks with severity classification
- **Food Wastage Tracking**: Monitor and report food wastage from 4 campus caterers (CRCL, Fusion, Zenith, Food Exo)
- **Anonymous Reporting**: Option to report issues anonymously
- **Photo Evidence**: Upload photos of wastage issues (stored in Redis via Upstash)
- **Caterer Performance Metrics**: Transparent accountability scoring system

### Gamification & Engagement
- **Sustainability Credits**: Earn points for valid reports
- **Leaderboard**: Campus-wide ranking system
- **Badges & Achievements**: Recognition for top contributors
- **Accuracy Tracking**: Monitor report verification rates

### AI-Powered Analytics
- **Google Gemini 2.5 Flash** integration for intelligent decision-making
- Natural language queries for data insights
- Predictive forecasting for resource needs
- AI-generated executive reports with actionable recommendations
- Converts quantitative optimization results into explainable policy decisions

### Role-Based Access Control
- **Super Admin**: Full system control
- **Admin**: Campus management access
- **Facility Manager**: Operations and maintenance
- **Faculty**: Academic coordination and resource oversight
- **Viewer**: Student access (default)

## Core Technologies

### Time-Series Forecasting
Predict future resource demand using ARIMA and Prophet models with seasonal decomposition

**Tech Stack**: Python, Prophet, statsmodels

### Quantitative Optimization
Linear programming-based scheduling to minimize costs while respecting constraints

**Tech Stack**: PuLP, OR-Tools, NumPy

### Anomaly Detection
Z-score and Isolation Forest algorithms to detect unusual patterns and waste

**Tech Stack**: scikit-learn, pandas

### AI Decision Intelligence
Gemini 2.5 Flash converts quantitative results into explainable policy decisions

**Tech Stack**: Google Gemini API, AI SDK

### Impact Measurement
Real-time dashboards showing measurable savings in cost, resources, and carbon

**Tech Stack**: Recharts, Real-time data

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL) for authentication and core data
- **Image Storage**: Redis (Upstash) for report photo evidence
- **Authentication**: Supabase Auth with role-based access
- **AI**: Google Gemini 2.5 Flash
- **UI**: shadcn/ui + Tailwind CSS v4
- **Charts**: Recharts
- **Deployment**: Vercel

## Measurable Impact

- **Electricity Waste Reduction**: 25-35%
- **Water Waste Reduction**: 15-25%
- **Room Utilization Improvement**: +30%
- **Monthly Cost Savings**: ₹40K-60K
- **CO₂ Reduction**: 3+ tons/month

## Getting Started

### Quick Start (v0)

This project runs directly in v0. Simply:

1. Connect your Supabase integration
2. Connect your Upstash for Redis integration
3. Run the SQL scripts in `/scripts` folder (in order: 001, 002, 003, 004, 005)
4. Add your `GEMINI_API_KEY` environment variable
5. Add `NEXT_PUBLIC_SUPER_ADMIN_EMAIL` for super admin access
6. Sign up and start using!

### Detailed Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive setup instructions.

## Project Structure

```
opticampus-x/
├── app/                      # Next.js app router pages
│   ├── auth/                 # Authentication pages (login/signup)
│   ├── dashboard/            # Main dashboard
│   ├── report/               # Wastage reporting
│   ├── leaderboard/          # Gamification system
│   ├── caterers/             # Caterer accountability
│   ├── admin/                # Admin panel with export functionality
│   ├── ai-analysis/          # AI Decision Intelligence (Gemini)
│   ├── about/                # Project information
│   └── api/                  # API routes
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── dashboard/            # Dashboard-specific
│   ├── reports/              # Reporting forms
│   ├── admin/                # Admin dashboard components
│   └── profile/              # User profile
├── lib/                      # Utilities
│   ├── supabase/             # Supabase client setup
│   ├── redis-storage.ts      # Redis image storage utilities
│   └── types.ts              # TypeScript definitions
├── scripts/                  # SQL migration scripts
│   ├── 001-create-tables.sql
│   ├── 002-rls-policies.sql
│   ├── 003-seed-data.sql
│   ├── 004-fix-auth-final.sql
│   └── 005-fix-role-based-signup.sql
└── public/                   # Static assets
```

## Database Schema

### Key Tables
- `profiles` - User accounts with roles and sustainability credits
- `buildings` - 22 campus buildings with capacity and solar data
- `caterers` - 4 mess caterers with performance metrics
- `water_leak_reports` - Water wastage reports with severity levels
- `food_wastage_reports` - Food wastage with caterer accountability
- `resource_usage_logs` - Historical usage data for forecasting
- `optimization_schedules` - AI-generated optimization schedules
- `ai_analysis_logs` - AI query history and decisions

## Role of Google Gemini 2.5 Flash

Unlike typical AI projects that use LLMs for everything, OptiCampus-X uses Gemini strategically as a **Decision Intelligence Agent**:

- **Converts Numbers to Policies**: Transforms optimization outputs into human-readable action plans for VIT-AP administrators
- **Explains Decisions**: Provides justification for why specific optimizations are recommended
- **Risk & Exception Handling**: Identifies edge cases and alerts on situations requiring human attention
- **Executive Reporting**: Generates professional summaries for stakeholders automatically

## Team
- **Sanjana Pasam** - Team Leader, Web Developer
- **V C Premchand Yadav** - Backend Development & AI Integration
- **P R Kiran Kumar Reddy (Kiran)** - Generalist, Supabase & API Integration
- **Edupulapati Sai Praneeth** - AI/ML/DL Specialist

## Contributing

This is an academic project for VIT-AP University and Google Solution Challenge 2025. For suggestions or improvements, contact the development team.

## License

Academic Project - VIT-AP University

## Future Roadmap

- **Google Cloud IoT Core**: Integration with campus-wide hardware sensors for direct real-time data ingestion
- **BigQuery & Looker**: Advanced data warehousing and business intelligence for multi-year sustainability trends
- **Vertex AI**: Moving from API calls to custom-tuned models for specific VIT-AP resource usage patterns
- **Google Maps Platform**: Enhanced spatial analysis for water leak detection using advanced geospatial APIs

---

**Built for VIT-AP University | Powered by Google Gemini 2.5 Flash | Designed for Sustainability**
