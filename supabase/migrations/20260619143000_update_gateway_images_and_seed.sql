DO $DO_BLOCK$
DECLARE
  new_user_id uuid;
BEGIN
  -- Update existing business units with better images
  UPDATE public.business_units
  SET image_url = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400&auto=format&fit=crop'
  WHERE name = 'VELKOR Soluções';

  UPDATE public.business_units
  SET image_url = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop'
  WHERE name = 'VELKOR Seguros';

  -- Seed admin user
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
      '{"name": "Suporte TI"}',
      false, 'authenticated', 'authenticated',
      '', '', '',
      '', '',
      NULL, '', '', ''
    );
  END IF;
END $DO_BLOCK$;
