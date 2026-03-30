/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Explicitly disable turbopack — DO build was failing with turbo flag
  experimental: {},
};
export default config;
