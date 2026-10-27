/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
  },
  // The AI filmmaking page became the Chigüiro Media page (Oct 2026).
  async redirects() {
    return [
      { source: '/work/ai-filmmaking', destination: '/work/chiguiro-media', permanent: true },
      { source: '/:lang(es|en|it)/work/ai-filmmaking', destination: '/:lang/work/chiguiro-media', permanent: true },
    ];
  },
  // Disable optimizeCss to avoid critters module error
  experimental: {
    optimizeCss: false,
  },
  // Ensure environment variables are available at build time
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
};

export default nextConfig;
