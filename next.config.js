/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  experimental: {
    appDir: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.dcarbon.org",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
