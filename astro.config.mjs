import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  srcDir: ".",
  publicDir: "./public",
  build: {
    format: "file",
  },
});
