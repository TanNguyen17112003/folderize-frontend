/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV == 'staging' ? 'export' : undefined,
  images: {
    unoptimized: process.env.NODE_ENV == 'staging' ? true : false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

export default nextConfig;
