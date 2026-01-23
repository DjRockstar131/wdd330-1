import { resolve } from "path";

export default {
  root: resolve(__dirname, "src/public"),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/public/index.html"),
        products: resolve(__dirname, "src/public/product_pages/index.html"),
        product: resolve(__dirname, "src/public/product_pages/product.html"), // ✅ ADD THIS
        cart: resolve(__dirname, "src/public/cart/index.html"),
        checkout: resolve(__dirname, "src/public/checkout/index.html"),
      },
    },
  },
};
