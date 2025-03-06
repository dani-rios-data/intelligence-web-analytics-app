/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oanczbbxpyszkhrniqbt.supabase.co'],
  },
  async rewrites() {
    return [
      {
        source: '/api/sentiment/:path*',
        destination: 'http://34.41.106.124/:path*'
      }
    ]
  }
}

module.exports = nextConfig 