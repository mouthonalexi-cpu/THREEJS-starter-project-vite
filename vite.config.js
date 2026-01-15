import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { resolve } from "path";


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        produit: resolve(__dirname, "produit.html"),
        boutique: resolve(__dirname, "boutique.html"),
        publication: resolve(__dirname, "publication.html"),
      },
    },
  },
});
