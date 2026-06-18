-- Create the contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) to enforce data access rules
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new contacts
CREATE POLICY "Allow anonymous inserts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to read contacts
CREATE POLICY "Allow authenticated read" ON contacts
  FOR SELECT TO authenticated
  USING (true);

-- Create the gateway_links table for portal cards
CREATE TABLE IF NOT EXISTS gateway_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for gateway_links
ALTER TABLE gateway_links ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read gateway links
CREATE POLICY "Allow public read on gateway links" ON gateway_links
  FOR SELECT TO anon
  USING (is_active = true);

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated full access on gateway links" ON gateway_links
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Create the site_content table for dynamic gateway page content
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_title TEXT NOT NULL,
  hero_description TEXT,
  logo_url TEXT,
  primary_cta_text TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for site_content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read site content
CREATE POLICY "Allow public read on site content" ON site_content
  FOR SELECT TO anon
  USING (true);

-- Allow authenticated users full access on site content
CREATE POLICY "Allow authenticated full access on site content" ON site_content
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
