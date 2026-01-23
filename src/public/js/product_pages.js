import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list");
if (!listElement) {
  console.error('Missing element: <ul class="product-list"> on this page.');
} else {
  const dataSource = new ProductData();
  const productList = new ProductList("tents", dataSource, listElement);
  productList.init();
}
