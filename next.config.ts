import type { NextConfig } from "next";
import path from "path";

// Absolute path to THIS project's directory — used to anchor module resolution
// so neither Turbopack nor webpack accidentally follow C:\Users\User\package.json
// as the workspace root.
const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  // Genera un servidor Node.js autónomo para despliegue con Docker
  output: "standalone",
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      // Explicitly map `tailwindcss` to its CSS entry in this project's
      // node_modules, bypassing the wrong workspace-root detection.
      tailwindcss: path.join(projectRoot, "node_modules", "tailwindcss", "index.css"),
    },
  },
  webpack(config) {
    // Ensure webpack's enhanced-resolve also starts module lookup from THIS
    // project's node_modules before walking up to C:\Users\User\node_modules.
    config.resolve.modules = [
      path.join(projectRoot, "node_modules"),
      "node_modules",
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      // Google profile photos (used by Sign-in with Google)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
