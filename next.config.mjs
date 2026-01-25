/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  distDir: '.next',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // compress: true,
  poweredByHeader: false,
  generateEtags: true,
  webpack: (config, { isServer }) => {
    return config;
  },

  async rewrites() {
    return {
      beforeFiles: [
        // No manual rewrites needed with basePath
      ]
    };
  },

  async headers() {
    return [
      {
        source: '/emlak/_next/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600'
          }
        ]
      }
    ];
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/supabaseImageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',

      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',

      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',

      },
      {
        protocol: 'https',
        hostname: 'www.retroia.com',


      },
      {
        protocol: 'https',
        hostname: 'inegzzkuttzsznxfbsmp.supabase.co',


      },

    ],

  },

};



export default nextConfig;
