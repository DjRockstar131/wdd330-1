// vite.config.js
import { resolve } from "path";

export default {
  // This is where your source HTML lives
  root: resolve(__dirname, "src/public"),

  build: {
    // 🔑 THIS IS THE FIX
    // Tell Vite to put dist at the project root
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/public/index.html"),
        product_listing: resolve(__dirname, "src/public/product_listing/index.html"),
        cart: resolve(__dirname, "src/public/cart/index.html"),
        checkout: resolve(__dirname, "src/public/checkout/index.html"),
        product_pages: resolve(__dirname, "src/public/product_pages/index.html"),
      },
    },
  },
};
