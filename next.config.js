/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'source.unsplash.com', 'storage.googleapis.com'],
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
