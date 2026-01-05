/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-76fd30e12c99460d82238325fcb2cfc0.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
