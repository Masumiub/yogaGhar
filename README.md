# Yoga Ghar 🧘‍♀️

A modern yoga session booking platform built with Next.js 15, Tailwind CSS, and MongoDB. It allows users to browse, schedule, and manage yoga sessions seamlessly with authentication and dynamic features.

# Live Link:
https://yoga-ghar.vercel.app/

# 📌 Project Description

Yoga Ghar is a full-stack yoga session management platform where users can:
- ✅ Browse published yoga sessions
- ✅ Book sessions
- ✅ Manage their bookings
- ✅ Create sessions (as admin/instructor)
- ✅ Save sessions as drafts and publish later

The project uses Next.js App Router, API Routes, and MongoDB for data storage. Authentication is powered by NextAuth.js, and React Hook Form + Zod ensures smooth form handling and validation.


# ✨ Features

- ✅ Browse Yoga Sessions – View published yoga classes with details.

- ✅ Draft & Publish Sessions – Admins can save as draft and publish later.

- ✅ Edit & Delete Sessions – Manage sessions via dashboard.

- ✅ Authentication – Secure login using NextAuth.js (Google & Email).

- ✅ Responsive Design – Fully optimized for desktop & mobile.

- ✅ SEO Optimized – Metadata and structured content.

# 🛠 Tech Stack

## Frontend:

- Next.js 15 (App Router)

- React 18

- Tailwind CSS

## Backend:

- Next.js API Routes

- MongoDB

## Authentication:

- NextAuth.js

- Validation & Forms:

- React Hook Form

- Zod

# 📦 Installed Packages
- npm install next react react-dom
- npm install tailwindcss postcss autoprefixer
- npm install @tanstack/react-query axios
- npm install next-auth
- npm install react-hook-form zod
- npm install framer-motion lucide-react


# 🚀 How to Run Locally
- git clone https://github.com/Masumiub/yogaGhar
- cd yoga-ghar

2. Install Dependencies
npm install

3. Configure Environment Variables
- NEXTAUTH_SECRET=your_nextauth_secret
- NEXTAUTH_URL=http://localhost:3000
- NEXT_PUBLIC_BASE_URL=http://localhost:3000
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret
- MONGODB_URI=your_mongodb_connection_string

4. Run the Development Server
- npm run dev
- http://localhost:3000

