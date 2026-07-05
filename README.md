<div align="center">

# Diagram X

**Node-Based Diagram & Flow Editor**

Create interactive diagrams, flowcharts, database schemas, UML class diagrams, sequence diagrams, and more — powered by AI.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## What It Does

Diagram X is a web-based diagram editor that lets you design and visualize systems, workflows, and architectures using an interactive node-based canvas. An AI agent helps you generate diagrams from natural language descriptions.

### Supported Diagram Types

| Type | Description |
|------|-------------|
| **Database Schema** | Design table structures with typed fields |
| **DataFlow Diagram** | Map processes, logic steps, and data movement |
| **Sequence Diagram** | Model participant interactions and message flows |
| **UML Class Diagram** | Define classes with attributes, methods, and relationships |
| **ER Diagram** | Create entities with primary/foreign keys |
| **State Diagram** | Visualize state machines (initial, regular, final) |
| **Mind Map** | Brainstorm ideas with a central root and color-coded branches |
| **Activity Diagram** | Build start/action/decision/end flow charts |

### Core Features

- **Node-Based Canvas** — Drag, connect, and edit nodes powered by React Flow
- **AI Diagram Generation** — Describe what you want and the AI builds the nodes and edges
- **AI Chatbot** — Public assistant answers questions about Diagram X
- **Auto-Save** — Workspaces save automatically with debounced persistence
- **Google OAuth & Email Auth** — Sign up/login with Google or email/password
- **Workspace Management** — Create, search, paginate, and delete workspaces
- **Profile Settings** — Update bio, town, phone from the dashboard

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 |
| **State** | Zustand (client), TanStack Query (server) |
| **Canvas** | React Flow (@xyflow/react) |
| **UI Components** | Radix UI, shadcn/ui, Lucide Icons, Framer Motion |
| **Auth** | Google OAuth (@react-oauth/google), JWT |
| **AI Backend** | Groq SDK (`openai/gpt-oss-120b`) |
| **Build** | Vite 8 |
| **Routing** | React Router DOM 7 |
| **Styling** | Tailwind CSS 4, class-variance-authority, tailwind-merge |
| **API** | Axios with `withCredentials` for session cookies |

---

## Architecture

```
User → React (Vite :5173)
  ├── Axios → diagram-x-server.vercel.app  (MongoDB + Auth + Workspace + AI Agent)
  └── Axios → diagram-xchatbot.vercel.app  (Public AI Chatbot)
```

### Repositories

| Service | Description |
|---------|-------------|
| [`diagramx`](https://github.com/NarihitoM/Diagram-X) | Frontend (this repo) |
| [`diagramxdb`](https://github.com/NarihitoM/DiagramXServerChatbot) | Backend — Express + MongoDB + Groq API |
| [`diagramx-aiserver`](https://github.com/NarihitoM/diagramXchatbot) | AI Chatbot server — Express + Groq |

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [Git](https://git-scm.com/)
- Running instances of [diagramxdb](https://github.com/NarihitoM/DiagramXServerChatbot) and [diagramx-aiserver](https://github.com/NarihitoM/diagramXchatbot) (or use the deployed versions)

### Setup

```bash
git clone https://github.com/NarihitoM/Diagram-X.git
cd Diagram-X
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── api/          # Axios API functions (auth, workspace, chatbot, profile)
├── auth/         # Login & Signup pages
├── components/   # Shared UI components (shadcn/ui)
├── config/       # Axios instances, TanStack Query client, URLs
├── error/        # 404 error page
├── features/     # Landing page feature data
├── hooks/        # Custom hooks (use-mobile)
├── lib/          # Utility functions (cn)
├── pages/        # Page components
│   ├── dashboard/  # Dashboard, Workspace (editor), Profile, Sidebar
│   └── mainpage/   # Landing, Blog, Contact, Chatbot overlay
├── routes/       # ProtectedRoute, PublicRoute
├── store/        # Zustand stores (auth, workspace, chatbot, profile)
├── Templates/    # React Flow custom node components
└── types/        # TypeScript interfaces
```

---

## Usage

1. **Sign up** at `/signup` with email or Google
2. **Create a workspace** from the Dashboard
3. **Open a workspace** — the node editor canvas loads
4. **Add nodes** manually via the "Add Node" panel (8 diagram types) or **ask the AI Agent** (floating chat button) to generate a diagram
5. **Connect nodes** by dragging between handles
6. **Edit** node titles, items, attributes, methods, colors, or shapes in the right panel
7. **Changes save automatically** with a 1-second debounce

---

