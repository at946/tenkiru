/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname),
    };
    return config;
  },
};
