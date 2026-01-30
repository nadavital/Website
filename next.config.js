/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'nadav.blog' }],
        destination: 'https://nadavavital.com/blog/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'nadav.blog' }],
        destination: 'https://nadavavital.com/blog/:path*',
        permanent: true,
      },
      {
        source: '/challah',
        destination: 'https://cauldron-f900a.web.app/u/nadav/8E378D59-C254-4586-A8FD-08A4304A1B0B',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
