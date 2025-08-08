EventHive Frontend Flow  Web
Overview
This document covers the React Native mobile and React-based web dashboard flows with best practices, code structure, and references to design system implementations.

For detailed design and UI implementation, refer to [designing.md].

1. Tech Stack & Libraries
React Native for iOS/Android

React (Web dashboard/admin, using Vite/Next.js/CRA)

Tailwind CSS (Web)

Framer Motion (Web animations)

Expo (Recommended for React Native)

react-query/TanStack (API state)

react-navigation (mobile)

zustand or Redux Toolkit (state management, optional)

react-hook-form (forms)

axios (API calls)

Firebase/Supabase JS SDKs

React Testing Library/Jest (testing)

ESLint + Prettier (linting)

2. Folder Structure
bash
/frontend
  /src
    /components
    /screens
    /services
    /hooks
    /utils
    /store
    /navigation
    /assets
    /theme
    /tests
  App.js (mobile)
  index.tsx (web)
  tailwind.config.js (web)
  README.md
3. Components & Hooks
Reusable Components
Button, Input, Card, Loader, Modal, etc.

EventCard, TicketCard, OrganizerPanel

BannerGenerator (calls open-source API)

Custom Hooks
useAuth (auth state)

useEvents (get, create, edit, delete)

usePayment (Stripe etc.)

useBanner (text-to-image API)

4. Mobile Flow (React Native)
Splash screen → Login/Register (User/Organizer switch)

Event Explorer (tabs: movies/events/sports/standup)

Book event (event details, purchase seats, payment)

My Tickets (list & QR)

Organizer Panel: create/edit/publish events

Banner Creation (inputs prompt, displays result)

5. Web Dashboard Flow
Responsive for mobile/tablet/desktop

Organizer login: dashboard for managing events, analytics, bookings

Users: explore/book events, see ticket history

Dedicated page for banner creation

6. Example Code
Reusable Button:
tsx
export default function Button({children, ...props}) {
  return <button className="rounded bg-primary text-white px-4 py-2" {...props}>{children}</button>
}
EventCard:
tsx
export function EventCard({event}) {
  return (
    <div className="shadow p-4">
      <img src={event.banner} alt={event.title} />
      <h3>{event.title}</h3>
      {/* ... */}
    </div>
  );
}
useAuth Hook:
ts
export function useAuth() {
  // Integrate Firebase/Supabase
  // provide user, login, logout, etc.
}
7. CLI Commands & Setup
bash
# Mobile (with Expo)
expo init EventHiveApp
cd EventHiveApp
npm start

# Web (with Vite)
npm create vite@latest eventhive-web --template react
cd eventhive-web
npm i
npm run dev
8. Clean Code Rules
One component per file, with comments

Use hooks for state/data-fetching

Centralize API calls in /services

Keep styles minimal, use Tailwind utility classes

Prefer functional components

Test major components/screens

9. Testing
npm run test (web)

expo test or npm run test (mobile)

10. Open Source Resources
React Native

Expo

Tailwind CSS

Framer Motion

TanStack Query

Firebase

Supabase

Stripe Test