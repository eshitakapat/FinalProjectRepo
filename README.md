# 🩺 IDDS — Intelligent Dermatology Diagnosis System

### AI-Assisted Healthcare Platform for Dermatology Support

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 🌐 Live Demo

👉 **Add your Vercel deployment URL here**

---

# 🩺 About IDDS

**IDDS (Intelligent Dermatology Diagnosis System)** is a full-stack healthcare platform designed to improve access to dermatology-related information and streamline communication between **patients, doctors, and administrators**.

The platform combines:

- 🧑‍⚕️ Doctor management
- 👤 Patient management
- 🛡️ Administrative controls
- 📅 Appointment scheduling
- 📋 Patient records
- 🔐 Secure authentication
- 🤖 AI-assisted healthcare functionality
- 📊 Structured medical information

The system is designed around a simple objective:

> **Make dermatology support more accessible, organized, and technology-driven.**

---

# 🎯 The Problem

Dermatological conditions can be difficult for patients to identify and understand without timely professional guidance.

Common challenges include:

- 🩺 Difficulty accessing dermatology specialists
- ⏳ Delays in getting appointments
- 📋 Fragmented patient information
- 🔐 Poorly structured healthcare access systems
- 📱 Limited digital interaction between patients and doctors
- 🧠 Difficulty understanding potential skin conditions
- 📊 Lack of centralized patient management

Traditional healthcare workflows can also involve disconnected systems for:

- Patient registration
- Doctor management
- Appointment scheduling
- Medical records
- Administrative operations

IDDS aims to bring these workflows together into a **single web-based healthcare ecosystem**.

---

# 💡 The Solution

IDDS provides a centralized platform connecting **patients, doctors, and administrators** through role-based workflows.

The system allows:

### 👤 Patients

- Create and manage their profiles
- Access healthcare-related information
- Schedule appointments
- Manage their interaction with the healthcare system
- Maintain relevant patient information

### 🧑‍⚕️ Doctors

- Manage their professional profile
- View patient-related information
- Manage appointments
- Access patient records
- Interact with the patient management workflow

### 🛡️ Administrators

- Manage users
- Manage doctors
- Manage patients
- Control platform-level operations
- Maintain system integrity

The platform is designed to provide a foundation for integrating **AI-assisted dermatological analysis** into the healthcare workflow.

---

# ✨ Features

| Feature | Description |
|---|---|
| 👤 **Patient Portal** | Dedicated patient workflow for healthcare-related interactions |
| 🧑‍⚕️ **Doctor Portal** | Doctor-focused dashboard and patient management |
| 🛡️ **Admin Dashboard** | Administrative control over platform entities |
| 🔐 **JWT Authentication** | Token-based authentication for secure access |
| 👥 **Role-Based Access Control** | Different permissions for patients, doctors, and administrators |
| 📅 **Appointment Scheduling** | Manage patient-doctor appointments |
| 📋 **Patient Records** | Structured storage and management of patient information |
| 🩺 **Dermatology Workflow** | Healthcare workflow focused on dermatological use cases |
| 🤖 **AI Integration** | Gemini-powered intelligent assistance layer |
| 🌐 **REST APIs** | Decoupled backend endpoints for application functionality |
| 🗄️ **MongoDB Database** | Persistent storage for application data |
| 📱 **Responsive UI** | Designed for desktop and smaller screens |
| 🎨 **Modern Interface** | Clean healthcare-oriented user experience |
| 🔒 **Protected Routes** | Authentication-aware access to application resources |

---

# 🤖 AI-Powered Healthcare Assistance

IDDS integrates the **Google Gemini API** as its generative AI layer.

The AI component is intended to support the healthcare workflow by providing intelligent, natural-language assistance around dermatology-related information.

### AI capabilities

The Gemini integration can serve as a foundation for:

- 🧠 Healthcare information assistance
- 🩺 Dermatology-related explanations
- 💬 Natural-language interaction
- 📋 Context-aware responses
- 🖼️ Future image-assisted dermatology analysis
- 🔎 Future intelligent diagnostic support

The AI layer is designed to complement — **not replace** — professional medical evaluation.

---

# 🧠 AI Architecture

```text
                 User
                   │
                   ▼
          Healthcare Interface
                   │
                   ▼
             User Request
                   │
                   ▼
            Backend API
                   │
                   ▼
          Context Processing
                   │
                   ▼
           Google Gemini API
                   │
                   ▼
          AI-Generated Response
                   │
                   ▼
             User Interface

Future Diagnostic Intelligence

One of the long-term objectives of IDDS is to incorporate an ML-based dermatological diagnostic module.

The envisioned workflow is:

        Skin Image
             │
             ▼
      Image Preprocessing
             │
             ▼
       ML Diagnostic Model
             │
             ▼
     Potential Condition
             │
             ▼
    AI-Assisted Explanation
             │
             ▼
       Doctor Evaluation

The diagnostic ML module is intended as an AI-assisted decision-support capability, rather than a replacement for a qualified dermatologist.

⚠️ The ML diagnostic component should be considered a planned/extendable part of the system unless explicitly implemented in the current deployment.

🏗️ System Architecture
                         ┌─────────────────┐
                         │      Users      │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
                Patient         Doctor        Admin
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                                  ▼
                       ┌────────────────────┐
                       │      Next.js       │
                       │ React + TypeScript │
                       └──────────┬─────────┘
                                  │
                                  ▼
                       ┌────────────────────┐
                       │    REST API Layer  │
                       └──────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              Authentication  Healthcare      AI
                 / RBAC        Services     Gemini
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                                  ▼
                       ┌────────────────────┐
                       │      MongoDB       │
                       │       Atlas        │
                       └────────────────────┘
🔐 Authentication & Authorization

Security is a core part of the IDDS architecture.

The system uses JWT-based authentication to manage authenticated sessions and protected resources.

Role-based access
                     Authentication
                           │
                           ▼
                    JWT Validation
                           │
                           ▼
                  User Role Detection
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
       Patient           Doctor           Admin
          │                │                │
          ▼                ▼                ▼
   Patient Routes    Doctor Routes    Admin Routes

This allows the application to provide different workflows and permissions based on the authenticated user's role.

👥 User Roles
👤 Patient

Patients interact with the healthcare system through a dedicated patient workflow.

Key capabilities include:

Profile management
Appointment scheduling
Healthcare interaction
Access to relevant patient information
Dermatology-related assistance
🧑‍⚕️ Doctor

Doctors have access to workflows designed around patient care and appointment management.

Capabilities include:

Doctor profile management
Appointment management
Patient information access
Patient record interaction
Healthcare workflow management
🛡️ Administrator

Administrators provide platform-level management.

Capabilities include:

User management
Doctor management
Patient management
System administration
Platform oversight
📅 Appointment Management

IDDS provides a structured workflow for connecting patients and doctors.

Patient
   │
   ▼
Select Doctor
   │
   ▼
Choose Appointment
   │
   ▼
Appointment Request
   │
   ▼
Doctor Management
   │
   ▼
Appointment Status

This creates a centralized digital workflow instead of relying on disconnected appointment processes.

📋 Patient Records

Patient-related information is stored in the backend and associated with the appropriate healthcare workflow.

The record-management layer provides the foundation for:

Patient profiles
Healthcare information
Appointment history
Doctor interactions
Future diagnostic information

MongoDB provides the persistent data layer for these entities.

🌐 REST API Architecture

IDDS uses a decoupled REST API architecture with 15+ REST endpoints supporting the application's major workflows.

The API layer separates frontend presentation from backend business logic.

Frontend
   │
   ▼
REST API
   │
   ├── Authentication
   ├── Users
   ├── Patients
   ├── Doctors
   ├── Appointments
   ├── Records
   └── AI Services
   │
   ▼
MongoDB

This separation makes the application easier to maintain, extend, and integrate with future clients.

🗄️ Data Architecture

The application is centered around several major entities:

                    IDDS
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
    Patients       Doctors       Admins
       │             │
       │             │
       └──────┬──────┘
              │
              ▼
        Appointments
              │
              ▼
       Patient Records
              │
              ▼
        AI Assistance

MongoDB provides flexible document-based persistence for these application entities.

🛠️ Technology Stack
Layer	Technology
Frontend	Next.js
UI	React
Language	TypeScript
Styling	Tailwind CSS
Backend	Node.js
API Architecture	REST
Authentication	JWT
Database	MongoDB
AI	Google Gemini API
Deployment	Vercel
Version Control	Git + GitHub

Next.js supports full-stack React application development, while MongoDB provides the persistence layer; this combination is also documented by MongoDB for Next.js applications and Vercel deployment.

🎨 UI / UX

IDDS is designed around a modern healthcare interface that prioritizes clarity and ease of navigation.

Design principles
🩺 Healthcare-focused visual language
🎨 Clean interface
📱 Responsive layouts
🧩 Reusable components
🔐 Clear authentication states
👥 Role-specific dashboards
📊 Structured information presentation
⚡ Interactive user workflows

Tailwind CSS is used for utility-based styling and responsive interface development.

📂 Project Structure
IDDS/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   └── styles/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── utils/
│
├── public/
│
├── .env
├── package.json
├── tsconfig.json
└── README.md

The exact directory structure may differ depending on the current repository organization.

🚀 Quick Start
Prerequisites

Make sure you have installed:

Node.js 18+
npm
Git
MongoDB / MongoDB Atlas
Google Gemini API key
1. Clone Repository
git clone YOUR_GITHUB_REPOSITORY_URL

cd IDDS
2. Install Dependencies

If the project uses separate frontend and backend applications:

cd frontend
npm install

Then:

cd ../backend
npm install

If the repository uses a unified Next.js setup:

npm install
🔐 Environment Variables

Create the required environment configuration file.

MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret
Environment variables
Variable	Purpose
MONGODB_URI	MongoDB database connection
GEMINI_API_KEY	Google Gemini API integration
JWT_SECRET	JWT authentication secret

⚠️ Never commit API keys, database credentials, JWT secrets, or .env files containing real secrets to GitHub.

▶️ Running Locally

Start the development application using the project's configured npm scripts.

For a standard Next.js development server:

npm run dev

Open:

http://localhost:3000

If the backend is maintained as a separate Node.js service, start it using the backend's configured development script.

☁️ Deployment

IDDS is designed for deployment using Vercel.

                     GitHub
                        │
                        ▼
                     Vercel
                        │
                        ▼
                  Next.js App
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      MongoDB       Gemini API    REST APIs
       Atlas


🧠 Future AI Diagnostic Pipeline

The planned intelligent diagnostic workflow can evolve toward:

                 Patient
                    │
                    ▼
             Upload Skin Image
                    │
                    ▼
            Image Preprocessing
                    │
                    ▼
             Feature Extraction
                    │
                    ▼
             ML Classification
                    │
                    ▼
          Potential Condition(s)
                    │
                    ▼
              Gemini AI
                    │
                    ▼
        Human-Readable Explanation
                    │
                    ▼
            Doctor Evaluation
                    │
                    ▼
              Final Decision

The human clinician remains the final decision-maker in this workflow.

🔒 Security Considerations

Because IDDS operates in a healthcare context, security and privacy are important design considerations.

Key areas include:

🔐 JWT-based authentication
👥 Role-based authorization
🛡️ Protected API routes
🔑 Secure secret management
🚫 No credentials committed to source control
🧹 Input validation
🔒 Database access controls
📡 Controlled API access

Before production use with real patient data, the system would require appropriate security, privacy, compliance, and clinical validation measures.

⚠️ Medical Disclaimer

IDDS is an educational and experimental software project.

The system is not a substitute for a qualified dermatologist, physician, clinical examination, or professional medical diagnosis.

AI-generated information and any future diagnostic predictions should be treated as informational decision-support outputs and must not be used as the sole basis for medical decisions.

For medical concerns, users should consult a qualified healthcare professional.

📈 Future Vision

The long-term vision of IDDS is to create an intelligent digital dermatology ecosystem connecting:

              👤 Patient
                  │
                  ▼
          ┌───────────────┐
          │     IDDS      │
          └───────┬───────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   🤖 AI       🧑‍⚕️ Doctor   📊 Data
       │          │          │
       └──────────┼──────────┘
                  ▼
          Better Information
                  │
                  ▼
          Better Healthcare
                  │
                  ▼
          Earlier Assistance

The platform aims to combine full-stack engineering, artificial intelligence, and healthcare workflows into a scalable digital system.

📚 Technical Scope

IDDS demonstrates practical implementation of:

Full-stack web development
REST API design
JWT authentication
Role-based authorization
MongoDB database architecture
Next.js application development
TypeScript
Node.js backend development
Tailwind CSS
Generative AI integration
Healthcare workflow design
Cloud deployment
⭐ Why IDDS?

IDDS brings together several areas of modern software engineering:

              Full-Stack Development
                       │
                       ▼
              ┌────────────────┐
              │      IDDS      │
              └────────────────┘
                │      │      │
                ▼      ▼      ▼
              AI     Cloud   Security
                │      │      │
                └──────┼──────┘
                       ▼
                 Healthcare

Rather than being only an AI model or only a CRUD application, IDDS is designed as a complete healthcare software platform with authentication, multiple user roles, REST APIs, persistent data, AI integration, and an extensible diagnostic architecture.

👩‍💻 Team members
Laveeza Zafar
Eshita Kapat
Haya Tarique

B.Tech Computer Science & Engineering

Interested in:

🤖 Artificial Intelligence & Machine Learning
🩺 AI for Healthcare
💻 Full-Stack Development
📊 Data & Analytics
☁️ Cloud Technologies
🚀 AI-Powered Products
⭐ Support

If you found IDDS interesting or useful, consider giving the repository a ⭐ on GitHub!

🩺 Build smarter healthcare.
🤖 Assist with intelligent technology.
👩‍⚕️ Connect patients and doctors.
🔐 Protect sensitive workflows.
🚀 Engineer for impact.

Made by our team especially for healthcare
Made 
