import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";

// Mdx

import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
        input: "./workers/app.ts",
      }
      : undefined,
  },
  ssr: {
    target: "webworker",
    noExternal: true,
    resolve: {
      conditions: ["workerd", "browser"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/server",
        "react-router",
      ],
    },
  },
  plugins: [
    {
      enforce: "pre",
      ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }),
    },
    cloudflareDevProxy({
      getLoadContext,
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    allowedHosts: ['.snehaa.store']
  }
}));
