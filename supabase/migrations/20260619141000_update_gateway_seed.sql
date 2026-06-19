-- Update site_settings to match Gateway design requirements
DO $DO_BLOCK$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM site_settings) THEN
    INSERT INTO site_settings (id, site_name, hero_title, hero_subtitle, contact_email)
    VALUES (
      gen_random_uuid(),
      'Grupo VELKOR',
      'Bem-vindo ao Grupo VELKOR',
      'Selecione a unidade de negócio para acessar nossos serviços.',
      'contato@velkor.com.br'
    ) ON CONFLICT (id) DO NOTHING;
  ELSE
    UPDATE site_settings
    SET 
      site_name = 'Grupo VELKOR',
      hero_title = 'Bem-vindo ao Grupo VELKOR',
      hero_subtitle = 'Selecione a unidade de negócio para acessar nossos serviços.'
    WHERE id = (SELECT id FROM site_settings LIMIT 1);
  END IF;
END $DO_BLOCK$;

-- Ensure RLS allows select for anon and authenticated
DROP POLICY IF EXISTS "site_settings_select" ON site_settings;
CREATE POLICY "site_settings_select" ON site_settings FOR SELECT TO anon, authenticated USING (true);
