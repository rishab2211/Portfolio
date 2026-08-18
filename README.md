# Rishab Raj • Portfolio

A dual-perspective portfolio featuring **Founder (Builder)** and **Stalker (Hacker/Developer)** experiences, deployed on Cloudflare OpenNext edge runtime with real-time Spotify telemetry, dynamic Cloudinary photo gallery, and Supabase real-time guestbook.

## ✨ Key Features

- **Dual Mode Persona:**
  - **Founder Mode (`/founder`):** Clean, high-leverage systems engineering view focused on architecture, competencies, and ROI.
  - **Stalker Mode (`/stalker`):** Cyberpunk terminal aesthetics with real-time Spotify telemetry, interactive skill decryptor, and draggable memories gallery.
- **Dynamic Cloudinary Memories:** Fetches photos dynamically from Cloudinary folders (`portfolio/memories/ieee`, `hackathons`, `trips`) with responsive drag interactions and instant fallbacks.
- **Real-Time Spotify Telemetry:** Shows current playing tracks with edge caching and conditional KV write protection.
- **Interactive Supabase Guestbook:** Real-time digital wall with desktop double-click & mobile tap support, coordinate clamping, and input validation.
- **Secret Terminal Easter Egg:** Interactive root shell accessible via the location pin.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Geist Font (Sans & Mono)
- **Animation:** Framer Motion
- **Edge Deployment:** Cloudflare Workers via `@opennextjs/cloudflare`
- **Database & Storage:** Supabase (PostgreSQL Realtime), Cloudflare KV, Cloudinary

## 🛠️ Getting Started

1. Clone repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` and `.dev.vars` (see `.env.example`).

3. Run locally:
   ```bash
   npm run dev
   ```

4. Build & deploy to Cloudflare:
   ```bash
   npm run deploy
   ```
