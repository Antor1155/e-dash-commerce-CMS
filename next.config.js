/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'uploadthing.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
