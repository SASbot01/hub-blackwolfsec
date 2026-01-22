-- ============================================
-- BLACKWOLFSEC DEVELOPMENT DIVISION
-- Software Development Requests Database Schema
-- ============================================
-- 
-- INSTRUCCIONES:
-- 1. Copia todo este código
-- 2. Ve a tu proyecto Supabase → SQL Editor
-- 3. Pega y ejecuta este script
-- 4. Verifica que la tabla se creó correctamente
--
-- ============================================

-- Tabla para peticiones de Desarrollo de Software
CREATE TABLE IF NOT EXISTS software_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Identidad del Cliente
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Detalles del Proyecto
  niche TEXT NOT NULL, -- 'Fintech', 'Healthtech', 'AI', 'SaaS', etc.
  budget_range TEXT NOT NULL, -- '<5k', '5k-15k', '15k-50k', '>50k'
  description TEXT NOT NULL,
  
  -- Legal (CRUCIAL)
  nda_accepted BOOLEAN DEFAULT FALSE NOT NULL, -- Prueba de aceptación del NDA
  
  -- Gestión Interna
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewing', 'contacted', 'rejected', 'in_progress', 'completed'
  
  -- Metadata
  ip_address TEXT,
  user_agent TEXT
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE software_requests ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede enviar solicitud (usuarios anónimos)
CREATE POLICY "Anyone can request software"
  ON software_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden leer (panel de administración)
CREATE POLICY "Admins can view requests"
  ON software_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Política: Solo usuarios autenticados pueden actualizar el estado
CREATE POLICY "Admins can update request status"
  ON software_requests
  FOR UPDATE
  TO authenticated
  USING (true);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_software_requests_created_at ON software_requests(created_at DESC);
CREATE INDEX idx_software_requests_status ON software_requests(status);
CREATE INDEX idx_software_requests_email ON software_requests(email);
CREATE INDEX idx_software_requests_niche ON software_requests(niche);

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Después de ejecutar este script, verifica:
-- 1. Ve a Table Editor → software_requests
-- 2. Deberías ver la tabla con todas las columnas
-- 3. Verifica que RLS está habilitado (icono de escudo)
-- 4. El campo nda_accepted es OBLIGATORIO (NOT NULL)
--
-- ============================================

-- COMENTARIOS SOBRE EL SCHEMA:
-- 
-- ✅ El campo 'nda_accepted' es NOT NULL y DEFAULT FALSE
--    Esto garantiza que siempre se registre si el cliente aceptó el NDA
--
-- ✅ El campo 'status' permite gestión del pipeline de proyectos:
--    - pending: Recién recibido
--    - reviewing: En revisión por el equipo
--    - contacted: Cliente contactado
--    - rejected: No es viable o fuera de alcance
--    - in_progress: Proyecto en desarrollo
--    - completed: Proyecto finalizado
--
-- ✅ Los índices mejoran las consultas por fecha, estado, email y nicho
--
-- ============================================
