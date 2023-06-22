/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  // reactStrictMode: false,
  experimental: {
    appDir: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["https://dev.dcarbon.org/static/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.dcarbon.org",
        port: "",
        pathname: "/static/**,",
      },
      {
        protocol: "https",
        hostname: "dev.dcarbon.org",
        port: "",
        pathname: "/cms/**,",
      },
    ],
  },
};

module.exports = nextConfig;
