import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/theoplayer/*.(css|js|html|wasm)",
          dest: "assets/vendor/theoplayer/",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        server: "./src/entry-server.tsx",
      },
    },
  },
  ssr: {
    noExternal: ["@theoplayer/react-ui", "theoplayer"],
  },
});
