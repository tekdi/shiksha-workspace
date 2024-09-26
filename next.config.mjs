/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/cats',
        destination: 'https://meowfacts.herokuapp.com',
      },
      {
        source: '/ducks',
        destination: 'https://random-d.uk/api/random',
      },
      {
        source: '/action/:path*',
        destination: 'http://localhost:4000/action/:path*', // Proxy to Backend
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*', // Proxy to Backend
      },
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
