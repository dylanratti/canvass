# Canvass — Know Before You Post

Landing page + waitlist for Canvass.

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Supabase** (waitlist email capture)
- **Vercel** (hosting)

---

## Setup: Step by Step

### 1. Install Node.js (if you don't have it)
Go to https://nodejs.org and download the LTS version. Install it.

Verify it worked:
```bash
node -v   # should show v18 or higher
npm -v
```

---

### 2. Install project dependencies
Open a terminal, navigate to this folder, and run:
```bash
npm install
```

---

### 3. Set up Supabase

1. Go to https://supabase.com and create a free account
2. Create a new project (name it "canvass" or anything you like)
3. Once the project is created, go to **SQL Editor** and run this:

```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  company text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table waitlist enable row level security;

-- Allow inserts from anyone (for the public form)
create policy "Allow public inserts" on waitlist
  for insert to anon
  with check (true);
```

4. Go to **Project Settings → API**
5. Copy your **Project URL** and **anon/public key**

---

### 4. Add your environment variables

Copy the example file:
```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Supabase values:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
```

---

### 5. Run locally
```bash
npm run dev
```

Open http://localhost:3000 — you should see the site.

Test the waitlist form. Then check your Supabase **Table Editor → waitlist** to confirm emails are coming through.

---

## Deploy to Vercel

### 1. Push to GitHub
Create a repo on GitHub and push this folder to it.

### 2. Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Import your GitHub repo
4. Under **Environment Variables**, add the same two variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Your site will be live at `your-project.vercel.app` in ~2 minutes.

### 3. Custom domain (optional)
In Vercel → your project → **Domains**, add your custom domain.

---

## Viewing waitlist signups

In Supabase → **Table Editor → waitlist** — every email is stored here with a timestamp.

You can also export to CSV from the Supabase dashboard.

---

## Customization

- **Company name / copy:** Edit `src/app/page.tsx`
- **Agent profiles:** Edit the `AGENTS` array in `src/app/page.tsx`
- **Colors:** Edit CSS variables in `src/app/globals.css`
- **Metadata / SEO:** Edit `src/app/layout.tsx`
