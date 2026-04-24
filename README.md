# CCAP App

Welcome to the **CCAP App**! This is a modern, responsive web application built with [Next.js](https://nextjs.org/) (App Router), designed to manage courses, certificates, product catalogs, and user authentication seamlessly.

## 🚀 Features

- **Course Management:** Browse available courses, view detailed lessons, and enroll.
- **Certificates System:** Query and verify digital certificates securely via DNI or unique codes.
- **Interactive Catalog:** Explore products and services with real-time cart functionality.
- **Authentication & Security:** Secure user login (including Google OAuth), robust session handling, and single-session enforcement.
- **Dashboard Interface:** Dedicated management and exploration views for authenticated users.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + UI Components
- **State Management & Data Fetching:** Zustand & React Query
- **Routing:** Next.js Server & Client Components
- **HTTP Client:** Axios (with custom interceptors for session management)

## 📂 Project Structure

This project follows a feature-driven architecture within the `src` directory to maintain scalability, readability, and clean code separation.

```text
ccap-app/
├── public/                 # Public static assets
└── src/
    ├── app/                # Next.js App Router (Pages, Layouts)
    │   ├── (main)/         # Public layouts (e.g., Home, Certificates)
    │   ├── dashboard/      # Authenticated dashboard views (Catalog, Profile, etc.)
    │   └── ...
    ├── assets/             # Internal static assets (images, SVGs, etc.)
    ├── components/         # Shared, reusable UI components (Providers, Layout elements)
    ├── features/           # Feature-based modules (Auth, Courses, Lessons, Cart)
    │   └── [feature]/
    │       ├── components/ # Components specific to this feature (e.g., LoginForm)
    │       ├── hooks/      # Custom React hooks
    │       └── services/   # API integrations for the feature
    ├── lib/                # Core utilities, API configurations (Axios instances)
    ├── store/              # Global state management (Zustand stores)
    ├── types/              # Global TypeScript interfaces and definitions
    └── middleware.ts       # Next.js edge middleware for route protection
```

## ⚙️ Environment Variables

To run this project locally, you will need to define your environment variables. Create a `.env.local` file in the root directory based on the following structure:

```env
# API Configuration
# Base URL for backend API requests
NEXT_PUBLIC_API_URL=http://your-api-url.com/api/v1

# Authentication (Google OAuth)
# Client ID for Google Sign-In integration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Contact & Support Links
# WhatsApp configuration for dynamic contact links
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/1234567890
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello! I have a question about your services. Can you help me?
```

## 📦 Getting Started

### 1. Install dependencies

Choose your preferred package manager and install the necessary dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run the development server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action. You can start editing the page by modifying the files inside the `src/app` directory. The page auto-updates as you edit.

## 🤝 Contributing

Contributions are welcome! Please ensure that your code adheres to the existing project structure and linting rules before submitting a pull request.
