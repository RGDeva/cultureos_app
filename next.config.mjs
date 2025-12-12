/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['source.unsplash.com', 'i.pravatar.cc'],
  },
  // Enable React Strict Mode for better error catching
  reactStrictMode: true,
  
  // Allow cross-origin requests from browser preview
  allowedDevOrigins: ['127.0.0.1'],
  
  // Performance optimizations
  experimental: {
    // Enable modern optimizations for faster imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Faster compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Improve chunk loading
  webpack: (config, { isServer }) => {
    // Add file loader for leaflet images
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',
    });

    // Optimize chunk splitting to prevent load errors
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      };
    }

    // Important: return the modified config
    return config;
  },
  
  // Add custom error handling
  async rewrites() {
    return [
      {
        source: '/_error',
        destination: '/500',
      },
    ];
  },
}

// Ensure the app is built as a standalone for better deployment
if (process.env.NODE_ENV === 'production') {
  nextConfig.output = 'standalone';
}

export default nextConfig
