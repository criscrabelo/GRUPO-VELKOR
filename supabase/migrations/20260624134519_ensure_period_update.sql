DO $$
BEGIN
  -- Ensure the text accuracy requirements from the PR synchronization
  UPDATE public.business_units
  SET description = 'Regularização patrimonial, due diligence, leilões e transações seguras.'
  WHERE name IN ('VELKOR Soluções', 'VELKOR Soluções Imobiliárias');
END $$;
