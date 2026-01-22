-- Blackwolfsec Security Division - Pentest Authorization Database Schema

-- Create the pentest_authorizations table
CREATE TABLE pentest_authorizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  organization TEXT NOT NULL,
  technical_responsible TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  
  -- Scope
  assets TEXT NOT NULL,
  scope_types TEXT[], -- ['Web Externa', 'Red Interna', 'API', 'Mobile App']
  
  -- Engagement Details
  intrusion_level TEXT NOT NULL, -- 'Red Team (Full)', 'PoC (Standard)', 'Vuln Scan (Pasivo)'
  emergency_contact TEXT NOT NULL,
  selected_service TEXT, -- 'bounty' or 'redteam'
  
  -- Legal
  terms_accepted BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE pentest_authorizations ENABLE ROW LEVEL SECURITY;

-- Policy for inserting (public can submit)
CREATE POLICY "Anyone can submit authorization"
  ON pentest_authorizations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for reading (only authenticated users can read)
CREATE POLICY "Authenticated users can read authorizations"
  ON pentest_authorizations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_pentest_authorizations_created_at ON pentest_authorizations(created_at DESC);
CREATE INDEX idx_pentest_authorizations_email ON pentest_authorizations(corporate_email);
