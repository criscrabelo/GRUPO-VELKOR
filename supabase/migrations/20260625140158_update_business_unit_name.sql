DO $$
BEGIN
  UPDATE public.business_units
  SET name = 'VELKOR Soluções Imobiliárias'
  WHERE name = 'VELKOR Soluções';
END $$;
