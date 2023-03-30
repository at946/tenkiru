/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
};
