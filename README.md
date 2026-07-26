# Department Web Portal

A modern, responsive web application for managing academic department information, news, faculty directories, student & faculty achievements, lab facilities, placements, and quick links, featuring a comprehensive Admin Portal for content management.

---

## 🚀 Tech Stack

### **Frontend (`/client`)**
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Styling**: Modern CSS with HSL variables & responsive design

### **Backend (`/server`)**
- **Runtime**: Node.js
- **Framework**: Express 5
- **ORM & Database**: Prisma ORM with PostgreSQL / Supabase
- **Authentication**: JWT & bcryptjs
- **File Storage**: Local uploads & Supabase Storage integration
- **PDF Generation**: PDFKit

---

## ✨ Features

- **Public Department Portal**:
  - Dynamic HOD Welcome & Department Announcements
  - News & Event Feeds with attachment support
  - Faculty Directory with research areas and contact details
  - Student & Faculty Achievements Showcase
  - Placement Records & Statistics
  - Lab Infrastructure & Equipment Details
  - Quick Links & Downloads (Curriculum, Schedules)

- **Admin Management Portal**:
  - Secure JWT-based Admin Authentication
  - Dashboard for managing News, Faculty, Achievements, Placements, and Labs
  - Department Settings customization (Banner images, HOD details, ratios, contact info)

---

## 📁 Project Structure

```
dept_web/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── admin/          # Admin pages, components, & auth context
│   │   ├── components/     # Reusable UI components (Navbar, Footer)
│   │   ├── pages/          # Public portal views (Home, Faculty, Achievements, etc.)
│   │   └── services/       # API endpoints & Axios configuration
│   └── package.json
├── server/                 # Express API Server
│   ├── config/             # Supabase & DB configurations
│   ├── controllers/        # Request handlers
│   ├── prisma/             # Prisma schema & migrations
│   ├── routes/             # Express API routes
│   ├── uploads/            # Media upload directory
│   ├── server.js           # Entry point
│   └── package.json
├── README.md
└── .gitignore
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database (or Supabase Postgres instance)

### 1. Backend Setup

```bash
cd server
npm install

# Configure environment variables
cp .env.example .env # (or create a .env file based on details below)

# Run Prisma migrations & generate client
npx prisma generate
npx prisma db push

# (Optional) Seed sample data
npm run data:import

# Start development server
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install

# Start development server
npm run dev

## 📄 License

This project is open-source and available under the [ISC License](server/package.json).
