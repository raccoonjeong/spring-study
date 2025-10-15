import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      // .md 도 같이 쓰고 싶으면 정규식 확장
      include: /\.mdx?$/,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      providerImportSource: "@mdx-js/react",
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") }, // @/ 별칭
  },
});
