<p align="center">
  <img src="https://i.ibb.co/PvZQ9RmM/OptiCampus-X.png" alt="OptiCampus-X Logo" width="220"/>
</p>

<h1 align="center">OptiCampus-X</h1>

<h3 align="center">.
AI-Powered Smart Campus Resource Optimization Platform<br/>
for <strong>VIT-AP University, Amaravati</strong>
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Google%20Gemini%202.5%20Flash-blueviolet"/>
  <img src="https://img.shields.io/badge/Optimization-Linear%20Programming-success"/>
  <img src="https://img.shields.io/badge/Forecasting-ARIMA%20%7C%20Prophet-informational"/>
  <img src="https://img.shields.io/badge/Framework-Next.js%2016-black"/>
  <img src="https://img.shields.io/badge/Database-Supabase-green"/>
  <img src="https://img.shields.io/badge/Deployment-Vercel-black"/>
</p>

---

## 🌍 Vision

**OptiCampus-X** is an **AI-driven sustainability and optimization system** designed to **quantitatively minimize resource wastage** and **maximize utilization efficiency** across VIT-AP University’s campus infrastructure.

Unlike traditional dashboards, OptiCampus-X **models the campus as a constrained optimization problem**, using **forecasting, anomaly detection, and mathematical programming**, with **Google Gemini acting as a Decision Intelligence layer**.

---

## 🚨 Problem Statement (Quantified)

VIT-AP University operates at large scale:

| Metric | Scale |
|------|------|
| Academic Buildings | 3 |
| Hostels | 10 (6 Men + 4 Ladies) |
| Total Buildings Monitored | **22+** |
| Classrooms & Labs | **145+** |
| Students Served | **5000+** |

### Core Inefficiencies
❌ Electricity running in unused rooms  
❌ Undetected water leakages across hostels  
❌ Food overproduction by caterers  
❌ Manual scheduling without utilization awareness  
❌ No predictive or optimization-based decision system  

---

## 🏛️ Campus Infrastructure Modeled

### 📚 Academic Blocks
- Sarvepalli Radhakrishnan Block (AB-1)
- Mahatma Gandhi Central Block
- APJ Abdul Kalam Block (AB-2)

### 🏠 Hostels
**Men:** MH-1 to MH-6  
**Ladies:** LH-1 to LH-4  

### 🏢 Facilities
- Student Activity Centre (SAC)
- Central Library
- Main Cafeteria
- VITRINA Guest House

Each building is **numerically modeled** with:
- Capacity constraints
- Energy baseline
- Water demand
- Solar contribution
- Temporal usage patterns

---

## ⚙️ System Architecture

```text
IoT / Logs / Reports
↓
Time-Series Forecasting
↓
Anomaly Detection
↓
Optimization Engine (LP)
↓
AI Decision Intelligence (Gemini)
↓
Dashboards & Policy Actions
```

---

## 🧠 Core AI & Optimization Techniques

### 📈 Time-Series Forecasting
**Objective:** Predict short-term and seasonal demand

**Models Used**
- ARIMA (Auto-Regressive Integrated Moving Average)
- Facebook Prophet (trend + seasonality + holidays)

**Applications**
- Electricity demand prediction
- Water consumption forecasting
- Peak load anticipation

---

### 🚨 Anomaly Detection
**Objective:** Detect abnormal resource behavior

**Algorithms**
- Z-Score Statistical Deviation
- Isolation Forest (unsupervised)

**Use Cases**
- Sudden water leaks
- Power spikes in idle rooms
- Abnormal caterer wastage

📊 Reduces false positives while maintaining high recall.

---

### 📐 Quantitative Optimization Engine
**Objective:** Minimize resource cost while satisfying constraints

**Method**
- Linear Programming (LP)
- Mixed-Integer Programming (MIP)

**Solvers**
- PuLP
- Google OR-Tools

**Optimization Variables**
- Room allocations
- Time slots
- Energy loads
- Solar offsets

**Constraints**
- Capacity
- Academic schedules
- Operational hours
- Maintenance windows

---

### 🤖 AI Decision Intelligence (Gemini 2.5 Flash)

Gemini is **not used as a chatbot**, but as a **Decision Translator**.

✅ Converts optimization outputs into:
- Administrative policies
- Facility manager instructions
- Risk alerts & exceptions
- Executive-ready reports

📌 Example:
> “Shifting 3 classes from AB-1 to Central Block between 2–4 PM reduces electricity load by 18% without affecting capacity.”

---

## 🎯 Key Features

### 🔌 Resource Optimization
- Real-time electricity & water monitoring
- Solar utilization tracking
- Predictive consumption modeling
- Cost-aware scheduling

### 🚿 Wastage Reporting System
- Water leak severity classification
- Food wastage tracking (4 caterers)
- Anonymous reports
- Photo evidence (Upstash Redis)

### 🏆 Gamification & Engagement
- Sustainability credits
- Campus leaderboard
- Accuracy-based reputation
- Badges & achievements

### 🔐 Role-Based Access Control
- Super Admin
- Admin
- Facility Manager
- Faculty
- Student (Viewer)

---

## 📊 Measurable Impact (Pilot Estimates)

| Metric | Improvement |
|------|------------|
| Electricity Waste | **↓ 25–35%** |
| Water Waste | **↓ 15–25%** |
| Room Utilization | **↑ 30%** |
| Monthly Cost Savings | **₹40K–60K** |
| CO₂ Reduction | **3+ tons/month** |

---

## 🛠️ Tech Stack

| Layer | Technology |
|----|----|
| Frontend | Next.js 16 (App Router) |
| UI | Tailwind CSS v4 + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Google Gemini 2.5 Flash |
| Optimization | PuLP, OR-Tools |
| ML | Prophet, statsmodels, scikit-learn |
| Storage | Upstash Redis |
| Charts | Recharts |
| Deployment | Vercel |

---

## 📁 Project Structure

```text
opticampus-x/
├── app/              # Next.js App Router (Pages & Layouts)
├── components/       # Reusable UI Components
├── lib/              # Core Logic (Supabase, AI, Utils)
├── scripts/          # Python Optimization & ML Scripts
└── public/           # Static Assets
```

(Optimized for scalability and RBAC security)

---

## 🚀 Getting Started (v0)

1. Connect Supabase
2. Connect Upstash Redis
3. Run SQL scripts (001 → 005)
4. Add `GEMINI_API_KEY`
5. Set `NEXT_PUBLIC_SUPER_ADMIN_EMAIL`
6. Deploy on Vercel

📘 See `DEPLOYMENT.md` for full setup.

---

## 👥 Team

- **V C Premchand Yadav** – Team Lead, Backend & AI
- **P R Kiran Kumar Reddy** – Generalist & APIs
- **Edupulapati Sai Praneeth** – AI & ML Specialist and API Integration
- **Sanjana Pasam** –Full Stack Web Developer

---

## 🔮 Future Roadmap

- Google Cloud IoT Core (sensor integration)
- BigQuery + Looker dashboards
- Vertex AI custom models
- Google Maps geospatial leak analysis

---

<p align="center">
<strong>Built for VIT-AP University 🌱-As part of GDG TECHSPRINT</strong><br/>
<strong>Powered by Google Gemini 2.5 Flash 🤖</strong><br/>
<strong>Designed for Sustainable Impact ♻️</strong>
</p>
