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
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Disable all static optimization to prevent build errors
  output: 'standalone',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

export default nextConfig
