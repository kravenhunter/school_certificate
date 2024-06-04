import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@assets": `${path.resolve(__dirname, "./src/assets/")}`,
      "@styles": `${path.resolve(__dirname, "./src/assets/styles/")}`,
      "@public": `${path.resolve(__dirname, "./public/")}`,
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@components": `${path.resolve(__dirname, "./src/components")}`,
    },
  },
});
