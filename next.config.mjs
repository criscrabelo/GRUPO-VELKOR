// Content-Security-Policy sem nonce: quase todo o site é pré-renderizado
// estaticamente no build (rotas "○ Static" no output do `next build`), e um
// nonce só tem sentido por requisição — em página estática ele fica gravado
// uma vez no HTML gerado no build e nunca muda, o que quebra os próprios
// scripts do Next (chunks e o payload inline de hidratação) em vez de
// protegê-los. Confirmado testando com 'strict-dynamic' + nonce em
// middleware: os <script src="/_next/static/...">` e o script inline de
// hidratação do Next foram bloqueados pelo próprio CSP.
// Por isso script-src usa 'self' 'unsafe-inline': 'self' já barra qualquer
// <script src> de outro domínio (o principal vetor de um XSS injetar
// código externo); 'unsafe-inline' é necessário para o payload de
// hidratação que o próprio Next.js gera inline em toda página estática.
// O único dangerouslySetInnerHTML do projeto é o JSON-LD estático de
// /imobiliaria (dado fixo, não vindo de usuário), então o risco real de
// injeção de script inline por essa via é baixo.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  // HSTS só produz efeito quando o site é servido via HTTPS — inofensivo até lá.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
