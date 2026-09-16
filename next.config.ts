import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "raondonghang.vercel.app" }],
        destination: "https://raondonghaeng.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
