// src/public/js/product_pages.js
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

async function init() {
  const productId = getParam("product");
  const target = document.querySelector(".product-detail");

  if (!target) {
    console.error('Missing element: .product-detail on', location.pathname);
    return;
  }

  if (!productId) {
    target.innerHTML = "<p>Missing product id in the URL. Example: ?product=880RR</p>";
    return;
  }

  const dataSource = new ExternalServices();
  const product = new ProductDetails(productId, dataSource);

  await product.init();
}

init();
