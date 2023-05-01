/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER: process.env.SERVER,
    API_KEY: process.env.API_KEY,
  }
}

module.exports = nextConfig
