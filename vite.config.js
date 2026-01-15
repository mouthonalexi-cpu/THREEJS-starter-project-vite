import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [glsl()],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        boutique: resolve(__dirname, "boutique.html"),
        publication: resolve(__dirname, "publication.html"),

        produitSelect: resolve(__dirname, "Produit-selec.html"),
        produitPBC01: resolve(__dirname, "produit-PBC01.html"),
        produitPBC02: resolve(__dirname, "produit-PBC02.html"),
        produitPTC01: resolve(__dirname, "produit-PTC01.html"),
        produitPTC02: resolve(__dirname, "produit-PTC02.html"),
      },
    },
  },
});
