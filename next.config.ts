import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'your-bucket.s3.amazonaws.com',
      'source.unsplash.com',
    ],
  },

};

export default nextConfig;
