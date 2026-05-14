# Trek Robotics

AI-powered hospitality automation for hotels, restaurants, and service businesses.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **Styling**: Tailwind CSS + custom CSS variables
- **Backend**: Next.js API routes (serverless)
- **Database**: Supabase (PostgreSQL + Realtime)
- **AI**: OpenAI GPT-4o-mini (with fallback logic)
- **Hosting**: Vercel (recommended)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` — from your Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings
- `OPENAI_API_KEY` — from platform.openai.com (optional)

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste the contents of `supabase-schema.sql`
3. Run it — this creates all tables and seeds the robot fleet

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
trek-robotics/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard shell (sidebar + header)
│   │   ├── page.tsx              # Overview with metrics
│   │   └── concierge/page.tsx    # AI Concierge chat
│   └── api/
│       └── concierge/route.ts    # AI API endpoint
├── components/
│   └── dashboard/
│       └── Sidebar.tsx           # Navigation sidebar
├── lib/
│   ├── supabase.ts               # Supabase client + types
│   └── ai.ts                     # OpenAI logic + fallback
├── supabase-schema.sql           # Database schema
└── .env.example                  # Environment template
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set the same environment variables in your Vercel project settings.

## Roadmap (from blueprint)

- [x] Landing page
- [x] Dashboard UI
- [x] AI Concierge chat
- [x] Robot fleet panel
- [x] Analytics view
- [ ] Supabase real-time request updates
- [ ] Staff dispatch workflow
- [ ] Maintenance ticket system
- [ ] Multi-property support
- [ ] Robot partner API integrations (Pudu, Keenon, Temi)
- [ ] Mobile app (React Native)
