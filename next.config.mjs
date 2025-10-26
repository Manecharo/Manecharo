/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
  },
  // Disable optimizeCss to avoid critters module error
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
