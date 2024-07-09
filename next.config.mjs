/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['aceternity.com','example.com','images.unsplash.com','www.themealdb.com'],
       // Add the hostname here
    },
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
  };


  
  export default nextConfig;
 