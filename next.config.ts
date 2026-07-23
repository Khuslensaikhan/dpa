import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.tunnelmole.net", "*.tunnelmole.com"],
  images: {
    qualities: [50, 60, 75],
  },
};

export default nextConfig;
