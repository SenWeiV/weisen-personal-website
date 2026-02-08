import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages 部署到 username.github.io/repo-name 需要设置 basePath
  // Vercel 部署在根路径，不需要 basePath
  basePath: isGitHubPages ? '/personal-portal' : '',
  assetPrefix: isGitHubPages ? '/personal-portal/' : '',
};

export default nextConfig;
