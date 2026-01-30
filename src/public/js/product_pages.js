// src/public/js/product_pages.js

import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

async function init() {
  // get product id from URL: ?product=XXXX
  const productId = getParam("product");

  if (!productId) {
    console.error("Missing product id in URL");
    return;
  }

  const dataSource = new ExternalServices();
  const product = new ProductDetails(productId, dataSource);

  await product.init();
}

init();
