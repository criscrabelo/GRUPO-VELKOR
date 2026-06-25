DO $DO$
BEGIN
  -- 1. Update the primary unit description exactly as requested
  UPDATE public.business_units
  SET description = 'Soluções Imobiliárias'
  WHERE name ILIKE '%soluções%' 
     OR name ILIKE '%solucoes%' 
     OR id = (
       SELECT id 
       FROM public.business_units
       ORDER BY order_index ASC, created_at ASC
       LIMIT 1
     );

  -- 2. Update Seguros/Consórcios descriptions
  UPDATE public.business_units
  SET description = 'Consórcios & Seguros'
  WHERE name ILIKE '%seguros%' 
     OR name ILIKE '%consórcios%' 
     OR name ILIKE '%consorcios%';

  -- 3. Update any missing descriptions to ensure symmetric layout spacing
  UPDATE public.business_units
  SET description = 'Serviços Especializados'
  WHERE description IS NULL OR TRIM(description) = '';

  -- 4. Ensure RLS allows everyone to SELECT the data
  DROP POLICY IF EXISTS "business_units_select" ON public.business_units;
  CREATE POLICY "business_units_select" ON public.business_units
    FOR SELECT USING (true);
    
END $DO$;
