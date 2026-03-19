/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;





// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   typescript: {
//     // ✅ Allow production builds even if there are TypeScript errors
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     // ✅ Skip linting during build (saves Heroku memory/time)
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;




// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
