# TikTalk

A social network application for developers. Built with Angular 18.

[Русская версия](README.ru.md)

## Tech Stack

- **Angular 18** — frontend framework
- **TypeScript** — language
- **SCSS** — styles (BEM methodology)
- **RxJS** — reactive programming
- **Angular Signals** — state management
- **ngx-cookie-service** — token storage

## Features

- Authentication with JWT tokens (access + refresh)
- User profile page with subscribers list
- Profile settings (name, bio, skills, avatar upload)
- Search and filter users
- Sidebar navigation with active route highlight
- Drag & drop avatar upload
- Auto-resizing textarea
- Password visibility toggle

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development server

```bash
ng serve
```

Open `http://localhost:4200` in your browser.

## Registration

To register, you need to use the Telegram bot **@icherniakov_info_bot**:

1. Open Telegram and find `@icherniakov_info_bot`
2. Send `/start`
3. Tap the blue button in the bot's response
4. The bot will reply with a **login** and **password** to use on the site

## Project Structure

```
src/
├── app/
│   ├── auth/               — authentication (service, interceptor, guard)
│   ├── common-ui/          — shared components (sidebar, layout, profile-header, etc.)
│   ├── data/               — services and interfaces
│   ├── helpers/            — pipes and directives
│   └── pages/              — page components
│       ├── login-page/
│       ├── profile-page/
│       ├── search-page/
│       └── settings-page/
└── public/
    └── assets/             — fonts, images, SVG icons
```

## API Documentation

Full API reference: https://icherniakov.ru/yt-course/docs

## Planned Features

- [ ] Posts feed (create, view, delete)
- [ ] Chats page
- [ ] Subscribers page
- [ ] Account creation page
- [ ] Error handling and loading states
- [ ] Fix `@ts-ignore` in settings save logic
