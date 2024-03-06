import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://1.14.198.102:8001",
        // target: "https://show.cool-admin.com",
        changeOrigin: true,
        rewrite: path => path.replace("/api", ""),
      },
    },
  },
});
