DO $DO$
BEGIN
  -- 1. Update the primary unit description exactly as requested
  UPDATE public.business_units
  SET description = 'solucoes imobiliárias'
  WHERE id = (
    SELECT id 
    FROM public.business_units
    ORDER BY order_index ASC, created_at ASC
    LIMIT 1
  );

  -- 2. Ensure RLS allows everyone to SELECT the data
  DROP POLICY IF EXISTS "business_units_select" ON public.business_units;
  CREATE POLICY "business_units_select" ON public.business_units
    FOR SELECT USING (true);
    
END $DO$;
