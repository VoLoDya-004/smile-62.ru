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
    const isDocker = process.env.DOCKER_ENV === 'true'
    
    if (isDocker) {
      return [
        {
          source: '/api/:path*',
          destination: 'http://php:80/PHP/:path*'
        },
        {
          source: '/uploads/:path*',
          destination: 'http://php:80/uploads/:path*'
        }
      ]
    }
    
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/backend/PHP/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3000/uploads/:path*'
      }
    ]
  }
}

export default nextConfig