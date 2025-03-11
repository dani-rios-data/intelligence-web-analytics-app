/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['oanczbbxpyszkhrniqbt.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  sassOptions: {
    includePaths: ['./src/styles', './src/sass'],
  },
  async rewrites() {
    return [
      {
        source: '/api/sentiment/:path*',
        destination: 'http://34.41.106.124/:path*'
      }
    ]
  },
  // Optimizaciones de rendimiento
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig 