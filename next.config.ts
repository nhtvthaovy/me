// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
