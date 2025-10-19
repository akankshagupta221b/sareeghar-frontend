import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "upload.wikimedia.org",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
