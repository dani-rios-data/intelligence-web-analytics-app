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
  // Configuración avanzada para manejar módulos obsoletos y optimizaciones
  webpack: (config, { isServer, dev }) => {
    // Evitar advertencias de punycode y otros módulos obsoletos
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      { message: /Critical dependency/},
      { message: /Package exports/ },
    ];
    
    // Optimizar manejo de módulos para reducir advertencias
    if (!isServer && !dev) {
      // Configurar optimizaciones para producción
      config.optimization.minimize = true;
      config.optimization.concatenateModules = true;
    }
    
    // Omitir las advertencias de módulos obsoletos
    config.module = {
      ...config.module,
      exprContextCritical: false,
      unknownContextCritical: false,
    };
    
    return config;
  },
  // Configuraciones de outputs para reducir advertencias
  logging: {
    fetches: {
      fullUrl: false,
    }
  },
  // Optimizaciones generales
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig 