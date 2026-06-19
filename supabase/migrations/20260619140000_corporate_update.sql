-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Reset policies for the specified tables to allow public reading and form submitting
DROP POLICY IF EXISTS "site_settings_select" ON site_settings;
CREATE POLICY "site_settings_select" ON site_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "featured_projects_select" ON featured_projects;
CREATE POLICY "featured_projects_select" ON featured_projects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "contact_leads_insert" ON contact_leads;
CREATE POLICY "contact_leads_insert" ON contact_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Update site settings for corporate identity
UPDATE site_settings
SET 
  site_name = 'GRUPO VELKOR',
  hero_title = 'Bem-vindo ao Grupo Velkor',
  hero_subtitle = 'Excelência em gestão e operações corporativas, impulsionando o seu negócio para o futuro.',
  updated_at = NOW()
WHERE id IS NOT NULL; -- Updates all rows (should only be 1 typically)

-- If table is empty, insert default row
INSERT INTO site_settings (site_name, hero_title, hero_subtitle, contact_email)
SELECT 'GRUPO VELKOR', 'Bem-vindo ao Grupo Velkor', 'Excelência em gestão e operações corporativas, impulsionando o seu negócio para o futuro.', 'contato@velkor.com.br'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Delete old non-corporate projects
DELETE FROM featured_projects WHERE category IN ('Residencial', 'Comercial');

-- Insert new corporate projects
INSERT INTO featured_projects (name, description, image_url, category, link_url)
SELECT 'Expansão Industrial Velkor', 'Otimização e automação de processos industriais com tecnologia de ponta.', 'https://img.usecurling.com/p/800/600?q=industrial%20plant', 'Industrial', '/solucoes'
WHERE NOT EXISTS (SELECT 1 FROM featured_projects WHERE name = 'Expansão Industrial Velkor');

INSERT INTO featured_projects (name, description, image_url, category, link_url)
SELECT 'Soluções Corporativas Integradas', 'Gestão estratégica e consultoria de alto nível para grandes corporações.', 'https://img.usecurling.com/p/800/600?q=corporate%20meeting', 'Corporate', '/solucoes'
WHERE NOT EXISTS (SELECT 1 FROM featured_projects WHERE name = 'Soluções Corporativas Integradas');

INSERT INTO featured_projects (name, description, image_url, category, link_url)
SELECT 'Plataforma de Serviços B2B', 'Desenvolvimento e implementação de ecossistemas digitais para prestação de serviços.', 'https://img.usecurling.com/p/800/600?q=technology%20services', 'Services', '/solucoes'
WHERE NOT EXISTS (SELECT 1 FROM featured_projects WHERE name = 'Plataforma de Serviços B2B');

-- Seed Auth User (Idempotent)
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
