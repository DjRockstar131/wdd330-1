import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

async function init() {
  const listElement = document.querySelector(".product-list");
  if (!listElement) return;

  const dataSource = new ProductData();
  const productList = new ProductList("tents", dataSource, listElement);
  await productList.init();
}

init();
