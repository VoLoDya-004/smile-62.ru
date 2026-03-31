import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src')
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/backend/PHP/api/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3000/uploads/:path*'
      }
    ]
  }
}

export default nextConfig