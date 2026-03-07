# Delwar Ahmed - Portfolio Web Application

A professional, full-stack portfolio web application built with SvelteKit, Tailwind CSS, Prisma ORM, and SQLite. Features an admin dashboard for managing portfolio content including skills, experiences, projects, testimonials, and contact information.

## 🚀 Features

### Public Portfolio

- **Hero Section**: Professional introduction with call-to-action buttons
- **Skills Showcase**: Categorized technical skills display
- **Experience Timeline**: Work history and professional experience
- **Projects Gallery**: Showcase of featured projects with tech stack
- **Client Testimonials**: Reviews and feedback from clients
- **Contact Section**: Easy way for visitors to get in touch
- **Responsive Design**: Mobile-friendly interface
- **Professional UI**: Eye-friendly color scheme and typography

### Admin Dashboard

- **Authentication**: Secure sign-in with Auth.js
- **Portfolio Settings**: Manage personal information, profile image, favicon, logo
- **Skills Management**: Add, edit, delete technical skills with proficiency levels
- **Experience Management**: Track job history and professional experiences
- **Projects Management**: Showcase your best work with descriptions and links
- **Testimonials Management**: Manage client reviews and ratings
- **Contact Management**: Configure contact information and settings
- **Responsive Dashboard**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 5, Svelte 5
- **UI Components**: shadcn-svelte
- **Styling**: Tailwind CSS 4
- **Backend**: SvelteKit
- **Database**: SQLite with Prisma ORM
- **Authentication**: Auth.js (Github provider)
- **Package Manager**: Yarn
- **Deployment Ready**: Server-side rendering with SSR

## 🚀 Getting Started

### Installation

```bash
yarn install
yarn prisma migrate dev --name init
```

### Running

```bash
# Development
yarn dev

# Production
yarn build && yarn preview
```

## 📂 Project Structure

```
src/
├── lib/
│   ├── assets/                  # Static assets (favicons, icons)
│   ├── auth/                    # Auth.js configuration
│   ├── components/
│   │   └── ui/                  # shadcn-svelte UI components
│   ├── hooks/                   # SvelteKit hooks
│   ├── server/
│   │   ├── content.ts           # Content management utilities
│   │   └── prisma.ts            # Prisma Client
│   └── stores/                  # Svelte stores
├── routes/
│   ├── api/
│   │   ├── auth/[...auth0]/     # Auth.js API route
│   │   ├── homepage/            # Homepage API endpoints
│   │   ├── portfolio/           # Portfolio API endpoints
│   │   └── settings/            # Settings API endpoints
│   ├── contact/                 # Contact page
│   ├── dashboard/
│   │   ├── add/                 # Add new portfolio item
│   │   ├── edit/[id]/           # Edit portfolio item
│   │   ├── homepage/            # Homepage settings
│   │   ├── portfolio/           # Portfolio management
│   │   ├── settings/            # Dashboard settings
│   │   ├── +layout.svelte       # Dashboard layout
│   │   └── +page.svelte         # Dashboard home
│   ├── login/                   # Login page
│   ├── portfolio/
│   │   └── [id]/               # Portfolio detail page
│   ├── +layout.svelte           # App layout
│   ├── +page.svelte             # Home/Portfolio
│   └── +page.server.ts          # Home page server load
├── app.d.ts                     # TypeScript declarations
└── hooks.server.ts              # Server hooks
```

## 🔐 Authentication

Protected routes redirect to sign-in.

## 📝 API Endpoints

- `GET/POST /api/portfolio` - Portfolio data
- `GET/POST/PUT/DELETE /api/skills` - Skills management
- `GET/POST/PUT/DELETE /api/experience` - Experience management
- `GET/POST/PUT/DELETE /api/projects` - Projects management
- `GET/POST/PUT/DELETE /api/testimonials` - Testimonials management

## 🎨 Customization

Update your information through the Dashboard Portfolio Settings.

## 📱 Responsive Design

Fully responsive: mobile, tablet, and desktop.

## 🔒 Security

- Session management via Auth.js
- Protected API routes
- CSRF protection

## 📦 Deployment

Self-hosted Node.js compatible servers.

## 📄 License

MIT License

---

**Portfolio**: <https://delwar.bd>  
**Developer**: Delwar Ahmed  
**Location**: Dhaka, Bangladesh
