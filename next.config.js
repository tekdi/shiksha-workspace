const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    // Add remotes here if needed
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
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
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'editor',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        exposes: {
          "./Index": "./src/pages/index.tsx",
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
