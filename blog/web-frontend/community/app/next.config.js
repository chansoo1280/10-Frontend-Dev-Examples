/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/community/questions',
        permanent: true,
      },
    ]
  },
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')();
module.exports = {
  ...removeImports({}),
  ...nextConfig
};
