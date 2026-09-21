import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "raondonghang.vercel.app" }],
        destination: "https://raondonghaeng.org/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "raondonghaeng.kr" }],
        destination: "https://raondonghaeng.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
