import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
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
