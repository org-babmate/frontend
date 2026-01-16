import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        //https://experiences/uuid/photo2.jpg
        protocol: 'https',
        hostname: '/pub-xxx.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mockmind-api.uifaces.co',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
