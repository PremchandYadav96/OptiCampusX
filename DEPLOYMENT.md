# OptiCampus-X Deployment Guide

Complete guide to set up and deploy OptiCampus-X for VIT-AP University.

## Prerequisites

- Supabase project (connected via v0)
- Vercel account (for deployment)
- Google Gemini API key (for AI analysis)

## Database Setup

The project uses Supabase as the database. All SQL scripts are in the `/scripts` folder and must be run in order.

### Step 1: Run Database Migrations

Run these SQL scripts in your Supabase SQL Editor in this exact order:

1. **001-create-tables.sql** - Creates all database tables (profiles, buildings, caterers, reports, etc.)
2. **002-rls-policies.sql** - Sets up Row Level Security policies for data protection
3. **002-update-trigger-with-metadata.sql** - Updates the user creation trigger to sync metadata
4. **003-helper-functions.sql** - Creates helper functions for credits and profile sync
5. **003-seed-data.sql** - Seeds initial data (buildings and caterers for VIT-AP)

### Step 2: Verify Database Setup

After running all scripts, verify:

- 8 tables created (profiles, buildings, caterers, water_leak_reports, food_wastage_reports, resource_usage_logs, optimization_schedules, ai_analysis_logs)
- RLS policies enabled on all tables
- Trigger `on_auth_user_created` exists
- 22 buildings seeded (Academic blocks, hostels, facilities)
- 4 caterers seeded (CRCL, Fusion, Zenith, Food Exo)

## Environment Variables

The following environment variables are automatically configured via Supabase integration:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Add these additional environment variables:

\`\`\`env
# Required for AI Analysis
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Required for email confirmation redirect during development
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
\`\`\`

## User Roles & Permissions

OptiCampus-X implements role-based access control (RBAC) with 5 user roles:

1. **Super Admin** - Full system control (YOU)
2. **Admin** - Campus management & decision making
3. **Facility Manager** - Operations & maintenance
4. **Faculty** - Academic coordination
5. **Viewer** - Students & read-only users (default)

### Setting Up Your Super Admin Account

After creating your account through signup:

1. Go to Supabase SQL Editor
2. Run this query with YOUR email:

\`\`\`sql
UPDATE profiles 
SET role = 'super_admin' 
WHERE email = 'your.email@vitap.ac.in';
\`\`\`

## Features Overview

### Core Features (All Users)
- View campus sustainability dashboard
- Report water leaks
- Report food wastage
- Earn sustainability credits
- View leaderboard
- Track personal contributions

### Admin Features
- View all reports
- Verify/reject reports
- Manage users
- Access analytics
- View caterer performance
- AI-powered analysis

### Wastage Reporting System
- **Water Leak Reports**: Anonymous reporting, severity classification, credit rewards
- **Food Wastage Reports**: Caterer accountability, meal type tracking, wastage quantification
- **Sustainability Credits**: Gamification system rewarding valid reports

### AI Integration
- Google Gemini 2.5 Flash for analysis
- Predictive analytics
- Optimization recommendations
- Natural language queries

## Authentication Flow

1. User signs up with VIT-AP email
2. Supabase sends verification email
3. User confirms email
4. Profile auto-created with metadata from signup
5. User redirected to dashboard
6. Onboarding modal appears if profile incomplete
7. User can update profile anytime from profile page

## Local Development

\`\`\`bash
# Install dependencies (not needed in v0, but for local dev)
npm install

# Run development server
npm run dev

# Access at http://localhost:3000
\`\`\`

## Deployment to Vercel

1. Click "Publish" button in v0
2. Select your Vercel project
3. Add environment variables in Vercel dashboard
4. Deploy

## Testing the Application

### Test User Journey

1. **Sign Up**: Create account at `/auth/signup`
2. **Verify Email**: Check email and click verification link
3. **Login**: Sign in at `/auth/login`
4. **Complete Profile**: Fill onboarding modal if needed
5. **Report Issue**: Go to `/report` and submit a water leak or food wastage report
6. **Check Credits**: View your credits on dashboard
7. **View Leaderboard**: See your ranking at `/leaderboard`

### Test Admin Functions

1. Upgrade your account to super_admin (SQL query above)
2. Go to `/admin` to access admin panel
3. Verify/reject user reports
4. View system analytics

## Troubleshooting

### "Database error saving new user"
- **Solution**: Run all SQL scripts in order, especially `002-update-trigger-with-metadata.sql`

### "No caterers/buildings showing"
- **Solution**: Run `003-seed-data.sql` to populate initial data

### "Credits not updating"
- **Solution**: Ensure `003-helper-functions.sql` was run successfully

### "Profile incomplete after signup"
- **Solution**: The onboarding modal will appear on first dashboard visit

### "Unauthorized errors"
- **Solution**: Check RLS policies are enabled (`002-rls-policies.sql`)

## Production Considerations

1. **Email Configuration**: Update Supabase email templates for VIT-AP branding
2. **Domain Setup**: Configure custom domain in Vercel
3. **Rate Limiting**: Add rate limiting to API routes for production
4. **Monitoring**: Set up error tracking (Sentry integration available)
5. **Backups**: Enable Supabase automatic backups

## Support & Contact

For issues or questions, contact the development team:
- V C Premchand Yadav
- P R Kiran Kumar Reddy
- Edupulapati Sai Praneeth
- Sanjana Pasam

---

Built with Next.js 16, Supabase, Google Gemini AI, and shadcn/ui
