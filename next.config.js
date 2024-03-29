/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'i.scdn.co',
      port: '',
      pathname: '/image/**',
    },],
  }
}

module.export = nextConfig
