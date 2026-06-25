DO $DO$
BEGIN
  -- 1. Remove duplicate business units for 'VELKOR Soluções Imobiliárias' (and any others to be safe)
  DELETE FROM public.business_units
  WHERE id IN (
    SELECT id FROM (
      SELECT id, ROW_NUMBER() OVER (PARTITION BY name ORDER BY order_index ASC, created_at ASC) as rnum
      FROM public.business_units
    ) t
    WHERE t.rnum > 1
  );
END $DO$;

-- 2. Add unique constraint so future seeds can safely use INSERT ... ON CONFLICT (name)
ALTER TABLE public.business_units DROP CONSTRAINT IF EXISTS business_units_name_key;
ALTER TABLE public.business_units ADD CONSTRAINT business_units_name_key UNIQUE (name);

DO $DO$
BEGIN
  -- 3. Ensure 'VELKOR Seguros & Consórcios' exists as a coming soon card, using the new constraint
  INSERT INTO public.business_units (id, name, description, is_coming_soon, order_index, image_url, link_url)
  VALUES (
    gen_random_uuid(),
    'VELKOR Seguros & Consórcios',
    'Proteção completa e planejamento inteligente para você e seu patrimônio.',
    true,
    2,
    '',
    NULL
  )
  ON CONFLICT (name) DO UPDATE 
  SET is_coming_soon = true;

  -- 4. Update site settings if they wrongly contain the specific unit name instead of the group name
  -- This ensures the page title and the card title do not repeat the exact same name redundantly
  UPDATE public.site_settings
  SET 
    site_name = 'Grupo VELKOR',
    hero_title = 'Bem-vindo ao ecossistema VELKOR'
  WHERE site_name = 'VELKOR Soluções Imobiliárias' 
     OR hero_title LIKE '%VELKOR Soluções Imobiliárias%';

END $DO$;
