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

-- Create the gateway_services table for portal cards
CREATE TABLE IF NOT EXISTS gateway_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  action_text TEXT NOT NULL,
  target_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_coming_soon BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for gateway_services
ALTER TABLE gateway_services ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read gateway services
CREATE POLICY "Allow public read on gateway services" ON gateway_services
  FOR SELECT TO anon
  USING (true);

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated full access on gateway services" ON gateway_services
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
