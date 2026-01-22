-- ============================================
-- BLACKWOLFSEC SECURITY DIVISION
-- Pentest Authorization Database Schema
-- ============================================
-- 
-- INSTRUCCIONES:
-- 1. Copia todo este código
-- 2. Ve a tu proyecto Supabase → SQL Editor
-- 3. Pega y ejecuta este script
-- 4. Verifica que la tabla se creó correctamente
--
-- ============================================

-- Crear la tabla de autorizaciones de pentest
CREATE TABLE IF NOT EXISTS pentest_authorizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Información de Contacto
  organization TEXT NOT NULL,
  technical_responsible TEXT NOT NULL,
  corporate_email TEXT NOT NULL,
  
  -- Alcance (Scope)
  assets TEXT NOT NULL,
  scope_types TEXT[], -- ['Web Externa', 'Red Interna', 'API', 'Mobile App']
  
  -- Detalles del Engagement
  intrusion_level TEXT NOT NULL, -- 'Red Team (Full)', 'PoC (Standard)', 'Vuln Scan (Pasivo)'
  emergency_contact TEXT NOT NULL,
  selected_service TEXT, -- 'bounty' o 'redteam'
  
  -- Legal
  terms_accepted BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE pentest_authorizations ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede insertar (usuarios anónimos pueden enviar el formulario)
CREATE POLICY "Anyone can submit authorization"
  ON pentest_authorizations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden leer (para el panel de administración)
CREATE POLICY "Authenticated users can read authorizations"
  ON pentest_authorizations
  FOR SELECT
  TO authenticated
  USING (true);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_pentest_authorizations_created_at ON pentest_authorizations(created_at DESC);
CREATE INDEX idx_pentest_authorizations_email ON pentest_authorizations(corporate_email);
CREATE INDEX idx_pentest_authorizations_service ON pentest_authorizations(selected_service);

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Después de ejecutar este script, verifica:
-- 1. Ve a Table Editor → pentest_authorizations
-- 2. Deberías ver la tabla con todas las columnas
-- 3. Verifica que RLS está habilitado (icono de escudo)
--
-- ============================================
