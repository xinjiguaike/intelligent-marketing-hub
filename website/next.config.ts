import type { NextConfig } from "next";

const repository = "intelligent-marketing-hub";
const subPath = "website";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGithubActions ? `/${repository}/${subPath}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
};

export default nextConfig;
