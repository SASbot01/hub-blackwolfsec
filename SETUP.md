# Blackwolfsec Security Landing - Setup Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account
- Vercel account (for deployment)

## Local Development Setup

### 1. Install Dependencies
```bash
cd /Users/s4sf/Documents/web\ central/security-landing
npm install
```

### 2. Configure Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

#### Run Database Schema
1. In Supabase Dashboard, go to SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Run the SQL script to create the table and policies

#### Update Environment Variables
Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

## Deployment to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Testing Form Submission

1. Fill out the authorization form
2. Submit
3. Check Supabase Dashboard > Table Editor > pentest_authorizations
4. Verify the data was inserted

## Custom Domain Setup

In Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., `security.blackwolfsec.io`)
3. Update DNS records as instructed by Vercel

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Check Supabase RLS policies are enabled

### Styling issues
- Ensure Tailwind CSS is properly configured
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

### Build errors
- Run `npm run build` to test production build locally
- Check for TypeScript errors
