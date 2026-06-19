CREATE TABLE IF NOT EXISTS public.business_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  link_url TEXT,
  image_url TEXT NOT NULL,
  is_coming_soon BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.business_units ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "business_units_select" ON public.business_units;
CREATE POLICY "business_units_select" ON public.business_units
  FOR SELECT TO anon, authenticated USING (true);

DO $DO_BLOCK$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.business_units WHERE name = 'VELKOR Soluções') THEN
    INSERT INTO public.business_units (name, description, link_url, image_url, is_coming_soon, order_index)
    VALUES (
      'VELKOR Soluções',
      'Regularização patrimonial, due diligence, leilões e compra segura.',
      '/solucoes',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop',
      false,
      1
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.business_units WHERE name = 'VELKOR Seguros') THEN
    INSERT INTO public.business_units (name, description, link_url, image_url, is_coming_soon, order_index)
    VALUES (
      'VELKOR Seguros',
      'Proteção completa para patrimônio, vida e negócios. Soluções personalizadas.',
      '#',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop',
      true,
      2
    );
  END IF;
END $DO_BLOCK$;
