// vite.config.js
import { resolve } from "path";

export default {
  root: resolve(__dirname, "src/public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/public/index.html"),
        product_listing: resolve(__dirname, "src/public/product_listing/index.html"),
        cart: resolve(__dirname, "src/public/cart/index.html"),
        checkout: resolve(__dirname, "src/public/checkout/index.html"),
        product_pages: resolve(__dirname, "src/public/product_pages/product.html"),
      },
    },
  },
};
