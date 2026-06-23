/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config;
  },
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
