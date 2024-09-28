/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/action/:path*', // Match any route starting with /action/
        destination: '/api/proxy?path=/action/:path*', // Forward to the proxy API
      },
      {
        source: '/api/:path*', // Match any route starting with /api/
        destination: '/api/proxy?path=/api/:path*', // Forward to the proxy API
      }
    ];
  },
  // Custom Webpack config
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      jquery: "jquery/src/jquery",
    };
    return config;
  },
};

export default nextConfig;
