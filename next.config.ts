/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'imfcp.334b07c6dcfac53d8aadd983cccb1751.r2.cloudflarestorage.com',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
