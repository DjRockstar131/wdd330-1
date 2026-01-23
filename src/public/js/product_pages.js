import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

async function init() {
  const listElement = document.querySelector(".product-list");
  if (!listElement) return;

  const dataSource = new ProductData();
  const productList = new ProductList("tents", dataSource, listElement);
  await productList.init();
}

init();
