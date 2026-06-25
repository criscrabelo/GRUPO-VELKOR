DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- 1. Seed user for admin
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
      '{"name": "Admin IT"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;
  
  -- 2. Update site_settings
  UPDATE public.site_settings 
  SET 
    hero_title = 'Bem-vindo ao ecossistema VELKOR',
    hero_subtitle = 'Escolha a unidade de negócio e acesse soluções para proteger, organizar e resolver.'
  WHERE site_name = 'GRUPO VELKOR';
  
  -- If not exists, insert a default site_settings
  IF NOT EXISTS (SELECT 1 FROM public.site_settings) THEN
    INSERT INTO public.site_settings (site_name, hero_title, hero_subtitle, contact_email)
    VALUES ('GRUPO VELKOR', 'Bem-vindo ao ecossistema VELKOR', 'Escolha a unidade de negócio e acesse soluções para proteger, organizar e resolver.', 'contato@velkor.com.br');
  END IF;

  -- 3. Update business_units
  
  -- Update 'VELKOR Soluções Imobiliárias'
  IF EXISTS (SELECT 1 FROM public.business_units WHERE name ILIKE '%VELKOR Soluções Imobiliárias%') THEN
    UPDATE public.business_units
    SET description = 'Despachante Documental Imobiliário. Gestão de certidões, ITBI, escritura e registro.',
        is_coming_soon = false,
        link_url = '/solucoes',
        order_index = 1,
        image_url = COALESCE(image_url, 'https://img.usecurling.com/i?q=building&color=cyan&shape=outline')
    WHERE name ILIKE '%VELKOR Soluções Imobiliárias%';
  ELSE
    INSERT INTO public.business_units (name, description, link_url, is_coming_soon, order_index, image_url)
    VALUES ('VELKOR Soluções Imobiliárias', 'Despachante Documental Imobiliário. Gestão de certidões, ITBI, escritura e registro.', '/solucoes', false, 1, 'https://img.usecurling.com/i?q=building&color=cyan&shape=outline');
  END IF;

  -- Update or insert 'VELKOR Seguros & Consórcios'
  IF EXISTS (SELECT 1 FROM public.business_units WHERE name ILIKE '%VELKOR Seguros%') THEN
    UPDATE public.business_units
    SET description = 'Proteção patrimonial e planejamento financeiro para suas aquisições.',
        is_coming_soon = true,
        order_index = 2,
        image_url = COALESCE(image_url, 'https://img.usecurling.com/i?q=shield&color=blue&shape=outline')
    WHERE name ILIKE '%VELKOR Seguros%';
  ELSE
    INSERT INTO public.business_units (name, description, link_url, is_coming_soon, order_index, image_url)
    VALUES ('VELKOR Seguros & Consórcios', 'Proteção patrimonial e planejamento financeiro para suas aquisições.', '#', true, 2, 'https://img.usecurling.com/i?q=shield&color=blue&shape=outline');
  END IF;
  
END $$;
