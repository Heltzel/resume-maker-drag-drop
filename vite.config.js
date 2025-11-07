import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true, // Open de browser zodra de server start
  },
  build: {
    outDir: "dist", // De output van de build komt in de dist map
  },
});
