# WeCASOR Clinical Trial Research & Portal Hub

WeCASOR is a secure, state-of-the-art Clinical Trial Management and Research Portal built using **Laravel 12.0**, **Inertia.js**, and **React**. It streamlines clinical study operations, electronic Case Report Form (eCRF) submissions, multi-tenant site coordination, secure document distribution, and generative AI assistance for clinical coordinators.

---

## 🚀 Key Features

### 🛡️ Multi-Role Security & Data Isolation
- **Granular RBAC**: Implements Spatie Laravel Permission with dedicated scopes for *Super Admin, Country Lead, Site Coordinator, PI / Reviewer, and Auditor*.
- **Row-Level Access Control**: Restricts document and subject view scopes based on user role and geographical location (e.g., Site Coordinators can only see their site; Country Leads see all sites in their country).

### 🔒 Enterprise Protection & Compliance
- **Two-Factor Authentication (2FA)**: OTP-based 2FA with custom middleware safeguarding administrative endpoints.
- **Audit Logging**: An automatic compliance logger recording all system activity, login states, document downloads, and metadata additions, tracking IP addresses and browser footprints.
- **Secure Document Vault**: Private file disk architecture where resources are streamed on-the-fly through authorization filters rather than exposed in public folders.

### 📊 eCRF & Study Workspaces
- **Electronic Case Report Forms**: Custom data validation and submissions tracking Baseline, Discharge, and Follow-Up states for research subjects.
- **Workspace Analytics**: Real-time enrollment visualizers, protocol checkers, and audit exports in CSV/Excel.

### 🤖 AI Coordinator Assistant
- **LLM Agent Integration**: Built-in Groq Cloud API connector (`llama-3.3-70b-versatile`) serving as an on-demand AI workspace assistant, dynamically matching user role profiles and site data.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 12.x (PHP 8.2+)
- **Frontend**: React 18, Inertia.js, Tailwind CSS, Vite
- **Database**: MySQL / PostgreSQL
- **Key Packages**:
  - `spatie/laravel-permission` (Role/Permission Engine)
  - `inertiajs/inertia-laravel` (SPA Bridge)
  - `laravel/sanctum` (API Authentication)

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShahAhmar/wecasor-portal.git
   cd wecasor-portal
   ```

2. **Install Composer & NPM Dependencies:**
   ```bash
   composer install
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Note: Open `.env` and configure your database, mail server, and `GROQ_API_KEY` details.*

4. **Run Migrations & Seeders:**
   ```bash
   php artisan migrate --seed
   php artisan storage:link
   ```

5. **Start Dev Server:**
   ```bash
   # Terminal 1: Vite dev
   npm run dev

   # Terminal 2: PHP Artisan
   php artisan serve
   ```
