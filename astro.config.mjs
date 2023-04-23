// https://astro.build/config
import { defineConfig } from "astro/config";
import viteCompression from "vite-plugin-compression";
// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [viteCompression()],
  },
  integrations: [tailwind(), react(), compress()],
});
