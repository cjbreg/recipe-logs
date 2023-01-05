/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
  reactStrictMode: true
};

const pwaConfig = {
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching
  }
};

module.exports = withPWA({
  output: 'standalone',
  nextConfig,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching
  }
});