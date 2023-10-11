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
    domains: ["https://dev.dcarbon.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.dcarbon.org",
        // port: "",
        // pathname: "/static/**,",
      },
      {
        protocol: "http",
        hostname: "dev.dcarbon.org",
        // port: "",
        // pathname: "/cms/**,",
      },
    ],
  },

  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "vi"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: "localhost:3000",
    //     defaultLocale: "en",
    //   },
    //   {
    //     domain: "localhost:3000/vi",
    //     defaultLocale: "vi",
    //     http: true,
    //   },
    // ],
  },
};

module.exports = nextConfig;
