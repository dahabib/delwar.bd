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
- **Backend**: Node.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: Auth.js (SvelteKit)
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

### Demo Credentials
- **Email**: admin@example.com
- **Password**: admin123

## 📂 Project Structure

```
src/
├── lib/
│   ├── auth.ts              # Auth.js configuration
│   ├── prisma.ts            # Prisma Client
│   └── components/
├── routes/
│   ├── +page.svelte         # Home/Portfolio
│   ├── auth/signin/         # Sign in page
│   ├── api/                 # API endpoints
│   └── dashboard/           # Protected dashboard
```

## 🔐 Authentication

Uses Auth.js with credentials provider. Protected routes redirect to sign-in.

## 📝 API Endpoints

- `GET/POST /api/portfolio` - Portfolio data
- `GET/POST/PUT/DELETE /api/skills` - Skills management
- `GET/POST/PUT/DELETE /api/experience` - Experience management
- `GET/POST/PUT/DELETE /api/projects` - Projects management
- `GET/POST/PUT/DELETE /api/testimonials` - Testimonials management

## 🎨 Customization

Update your information through the Dashboard Portfolio Settings or `.env` file.

## 📱 Responsive Design

Fully responsive: mobile, tablet, and desktop.

## 🔒 Security

- Passwords hashed with bcryptjs
- Session management via Auth.js
- Protected API routes
- CSRF protection

## 📦 Deployment

Vercel, Docker, or self-hosted Node.js compatible servers.

## 📄 License

MIT License

---

**Portfolio**: https://delwar.bd  
**Developer**: Delwar Ahmed  
**Location**: Dhaka, Bangladesh
