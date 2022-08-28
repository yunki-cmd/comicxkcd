/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ixbt.online", "images2.corriereobjects.it", "i.insider.com", "cdn.cnn.com", "https://newsapi.org", "g.foolcdn.com"]
  },
  typescript: {
     ignoreBuildErrors: true
  }
}

module.exports = nextConfig
