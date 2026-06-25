DO $DO$
BEGIN
  -- 1. Remove the "VELKOR Seguros & Consórcios" business unit
  DELETE FROM public.business_units WHERE name ILIKE '%Seguros%';

  -- 2. Update site settings to reflect VELKOR Soluções Imobiliárias exclusively
  UPDATE public.site_settings
  SET 
    site_name = 'VELKOR Soluções Imobiliárias',
    hero_title = 'Bem-vindo à VELKOR Soluções Imobiliárias',
    hero_subtitle = 'Acesse nossas soluções para proteger, organizar e resolver seu patrimônio.'
  WHERE id IS NOT NULL;
END $DO$;
