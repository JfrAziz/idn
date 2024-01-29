import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  /**
   * github pages config
   */
  site: "https://jfrAziz.github.io",
  base: "/idn",
  
  /**
   * build settings
   */
  publicDir: "./public",
  srcDir: ".",
  build: { format: "file" },
});
