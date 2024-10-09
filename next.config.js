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
        source: '/action/asset/v1/upload/:identifier*',         // Match asset upload routes
        destination: '/api/fileUpload',                         // Forward asset uploads to fileUpload.js
      },
      {
        source: '/action/asset/:path*',                         // Match other /action/asset routes
        destination: '/api/proxy?path=/action/asset/:path*',    // Forward other /action/asset requests to proxy.js
      },
      {
        source: '/action/:path*',                               // Match any other routes starting with /action/
        destination: '/api/proxy?path=/action/:path*',          // Forward them to proxy.js
      },
      {
        source: '/api/:path*',                                  // Match /api/ routes
        destination: '/api/proxy?path=/api/:path*',             // Forward them to proxy.js
      },
      {
        source: '/assets/public/:path*',                        // Match any URL starting with /assets/public/
        destination: `${process.env.CLOUD_STORAGE_URL}/:path*`, // Forward to S3, stripping "/assets/public"
      },
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
        shared: {
          '@mui/material': {
            singleton: true,
            requiredVersion: false,
          },
          '@mui/icons-material': {
            singleton: true,
            requiredVersion: false,
          },
        },
        exposes: {
          "./Index": "./src/pages/index.tsx",
          "./Create": "/src/pages/workspace/content/create/index.tsx",
          "./Content": "/src/pages/workspace/content/allContents/index.tsx",
          "./Draft": "/src/pages/workspace/content/draft/index.tsx",
          "./Publish": "/src/pages/workspace/content/publish/index.tsx",
          "./Submitted": "/src/pages/workspace/content/submitted/index.tsx",
          "./Editor": "/src/pages/Editor.tsx",
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
