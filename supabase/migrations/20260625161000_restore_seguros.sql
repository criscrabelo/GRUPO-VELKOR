DO $DO$
BEGIN
  -- 1. Update site settings to reflect GRUPO VELKOR
  UPDATE public.site_settings
  SET 
    site_name = 'GRUPO VELKOR',
    hero_title = 'Bem-vindo ao GRUPO VELKOR',
    hero_subtitle = 'Selecione a unidade de negócio para acessar nossos serviços e soluções.'
  WHERE id IS NOT NULL;

  -- 2. Restore "VELKOR Consórcios & Seguros"
  INSERT INTO public.business_units (
    name, 
    description, 
    link_url, 
    image_url, 
    is_coming_soon, 
    order_index
  )
  VALUES (
    'VELKOR Consórcios & Seguros',
    'Proteção para o seu patrimônio e planejamento inteligente para o seu futuro com as melhores opções do mercado.',
    null,
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop',
    true,
    2
  )
  ON CONFLICT (name) DO UPDATE
  SET
    description = EXCLUDED.description,
    is_coming_soon = EXCLUDED.is_coming_soon,
    image_url = EXCLUDED.image_url,
    order_index = EXCLUDED.order_index;
    
END $DO$;
