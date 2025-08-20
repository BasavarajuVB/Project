/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/charts/:path*',
        destination: 'http://192.168.0.235:8080/api/charts/:path*',
      },
      {
        source: '/api/dp/:path*',
        destination: 'http://103.114.154.128:30808/dp/:path*',
      },
    ];
  },
};

module.exports = nextConfig