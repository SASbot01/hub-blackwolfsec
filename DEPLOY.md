# Blackwolfsec Security Landing - Quick Deploy Guide

## 🚀 Quick Start (5 Minutes)

### 1. Set Up Supabase (2 min)
```bash
# Go to https://supabase.com
# Create new project → Copy URL & Anon Key
```

Run this SQL in Supabase SQL Editor:
```sql
CREATE TABLE pentest_authorizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  organization TEXT NOT NULL,
  technical_responsible TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  assets TEXT NOT NULL,
  scope_types TEXT[],
  intrusion_level TEXT NOT NULL,
  emergency_contact TEXT NOT NULL,
  terms_accepted BOOLEAN DEFAULT TRUE,
  ip_address TEXT,
  user_agent TEXT
);

ALTER TABLE pentest_authorizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit authorization"
  ON pentest_authorizations FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated users can read authorizations"
  ON pentest_authorizations FOR SELECT TO authenticated USING (true);
```

### 2. Update Environment Variables (1 min)
```bash
# Edit .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Deploy to Vercel (2 min)
```bash
# Option A: CLI
npm i -g vercel
vercel

# Option B: GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
# Then connect repo in Vercel dashboard
```

Add environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Test
Visit your Vercel URL → Fill form → Check Supabase table

---

## 📁 Project Location
```
/Users/s4sf/Documents/web central/security-landing/
```

## 🔗 Important Files
- `app/page.tsx` - Main landing page
- `app/api/submit-authorization/route.ts` - Form API
- `lib/supabase.ts` - Supabase config
- `supabase-schema.sql` - Database schema
- `.env.local` - Environment variables (UPDATE THIS!)

## 🎨 Current Status
✅ Local development working (http://localhost:3000)  
⏳ Needs Supabase credentials  
⏳ Ready for Vercel deployment  

## 📊 View Submissions
After deployment, view form submissions in:
- Supabase Dashboard → Table Editor → `pentest_authorizations`

## 🌐 Custom Domain
In Vercel → Settings → Domains → Add `security.blackwolfsec.io`
