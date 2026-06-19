-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'GRUPO VELKOR',
  hero_title TEXT NOT NULL DEFAULT 'Seja bem-vindo ao GRUPO VELKOR',
  hero_subtitle TEXT NOT NULL DEFAULT 'Selecione a unidade de negócio para acessar nossos serviços.',
  contact_email TEXT NOT NULL DEFAULT 'contato@velkor.com.br',
  background_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_settings_select" ON site_settings;
CREATE POLICY "site_settings_select" ON site_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "site_settings_insert" ON site_settings;
CREATE POLICY "site_settings_insert" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "site_settings_update" ON site_settings;
CREATE POLICY "site_settings_update" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "site_settings_delete" ON site_settings;
CREATE POLICY "site_settings_delete" ON site_settings FOR DELETE TO authenticated USING (true);

-- Create featured_projects table
CREATE TABLE IF NOT EXISTS featured_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  link_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE featured_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "featured_projects_select" ON featured_projects;
CREATE POLICY "featured_projects_select" ON featured_projects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "featured_projects_insert" ON featured_projects;
CREATE POLICY "featured_projects_insert" ON featured_projects FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "featured_projects_update" ON featured_projects;
CREATE POLICY "featured_projects_update" ON featured_projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "featured_projects_delete" ON featured_projects;
CREATE POLICY "featured_projects_delete" ON featured_projects FOR DELETE TO authenticated USING (true);

-- Create contact_leads table
CREATE TABLE IF NOT EXISTS contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_leads_insert" ON contact_leads;
CREATE POLICY "contact_leads_insert" ON contact_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "contact_leads_select" ON contact_leads;
CREATE POLICY "contact_leads_select" ON contact_leads FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "contact_leads_delete" ON contact_leads;
CREATE POLICY "contact_leads_delete" ON contact_leads FOR DELETE TO authenticated USING (true);

-- Seed Auth User
DO $DO_BLOCK$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'suporte.ti@coevoconstrutora.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'suporte.ti@coevoconstrutora.com.br',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );
  END IF;
END $DO_BLOCK$;

-- Seed site_settings
INSERT INTO site_settings (site_name, hero_title, hero_subtitle, contact_email)
SELECT 'GRUPO VELKOR', 'Seja bem-vindo ao GRUPO VELKOR', 'Explore nossos projetos e serviços em destaque.', 'contato@velkor.com.br'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Seed featured_projects
INSERT INTO featured_projects (name, description, image_url, category, link_url)
SELECT 'Residencial Aurora', 'Empreendimento de alto padrão no centro com design moderno e sofisticado.', 'https://img.usecurling.com/p/800/600?q=modern%20building', 'Residencial', '/solucoes'
WHERE NOT EXISTS (SELECT 1 FROM featured_projects WHERE name = 'Residencial Aurora');

INSERT INTO featured_projects (name, description, image_url, category, link_url)
SELECT 'Centro Comercial Velkor', 'Salas comerciais com infraestrutura completa para o seu negócio.', 'https://img.usecurling.com/p/800/600?q=office%20building', 'Comercial', '/solucoes'
WHERE NOT EXISTS (SELECT 1 FROM featured_projects WHERE name = 'Centro Comercial Velkor');
