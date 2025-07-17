<h1 align="center" style="font-weight: bold;">🚀 Dimasc AI</h1>

<p align="center">
  <a href="#technologies">Technologies</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#collaborators">Collaborators</a>
</p>

<p align="center">
  An AI Chatbot application built with Next.js, serving as an extended feature of our main business, Dimasc.
  This project highlights my coding skills, architectural approach, and experience as a frontend developer.
</p>

<p align="center">
  <a href="https://dimasc-ai.netlify.app/">📱 Visit this Project</a>
</p>

---

## 🧠 Project Overview

This AI chatbot was built with three main goals in mind:

1. **Showcase my skills** in building scalable frontend applications.
2. **Boost productivity** by creating a tool that saves time.
3. **Extend our business (Dimasc)** with a smart chatbot feature under a subdomain.

Although this is the **MVC version**, the application has much bigger potential. We're planning to integrate a custom **V0 API**, **Supabase**, and **GitHub templates** to create components, boilerplates, and configurations that allow us to start new projects with a solid base—skipping boring boilerplate code and jumping straight into the core functionality.

---

## 🏗️ Development Insights

### 👨‍💻 Frontend (by Alexandru Geroc)
- Built using **Next.js**, **TypeScript**, and **Tailwind CSS 4.0**.
- Focused heavily on **code quality**, **performance**, and **scalability**.
- I adopted an architecture that's suitable for **large-scale SaaS apps**, even if this chatbot is just one small part of Dimasc.

### 💡 Technical Decisions
- **React Query** for data fetching — reduces boilerplate, improves speed, and keeps the code clean.
- **Zustand** for state management — lightweight, scalable, and easy to set up.
- **React Hook Form** for form validation — highly structured and easy to read.
- **Next.js Route Groups** (like `(foldername)`) used to isolate layouts and keep `layout.tsx` files clean and purpose-specific.

### 📁 Folder Structure
The project uses the `src` directory to keep everything organized:

src/
├── app/
├── components/
├── context/
├── data/
├── hooks/
├── lib/
├── stores/
├── types/

Each part of the codebase has a clear responsibility—for example, separate files for **mutations**, **queries**, **contexts**, and **stores**. This structure helps developers understand and navigate the project quickly.

---

## 🎨 Layout

<p align="center">
  <img src="https://github.com/user-attachments/assets/d70997ec-4403-46cc-9a3a-748406021c34" alt="Website Preview" width="1000px">
</p>

---

## ✨ Features

- **Authentication**
  - Sign-In
    - MFA (Multi-Factor Authentication)
  - Sign-Up
    - 3-Step Process
  - Forgot Password
    - Multi-Step Recovery

- **Chat Interface**
  - Dynamic Chat Rendering
  - Search Functionality
  - Favorite Chats Sorting
  - Edit Chat Title
  - Delete Chat
  - Create New Chat
  - Auto-generated Chat Titles

- **User Settings**
  - Change Email (with MFA)
  - Change Password
  - Theme Selector
  - Billing & Subscription

- **Other**
  - Log Out
  - Secured Routes via Middleware
  - PWA Support
  - OAuth Integration

---

## 💻 Technologies

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS 4.0**
- **Vercel**
- **React Query**

---

## 🚀 Getting Started

To get a local copy up and running:

### ✅ Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 📥 Clone the Repository

```bash
git clone https://github.com/Swetu12/Dimasc-AI

▶️ Start the Project

npm install
npm run dev

```

🤝 Collaborators
<p>Give a ⭐ if you like this project!</p> <table> <tr> <td align="center"> <a href="https://github.com/Swetu12"> <img src="https://avatars.githubusercontent.com/u/102142947?v=4" width="100px;" alt="Alexandru Geroc"/><br> <sub><b>Alexandru Geroc</b></sub> </a> </td> <td align="center"> <a href="https://github.com/sebastianflaviusdev"> <img src="https://avatars.githubusercontent.com/u/137168853?v=4" width="100px;" alt="Sebastian Flavius Dev"/><br> <sub><b>Sebastian Flavius Dev</b></sub> </a> </td> </tr> </table> 
