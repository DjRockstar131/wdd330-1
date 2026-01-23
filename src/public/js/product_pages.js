import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

async function init() {
  const listElement = document.querySelector(".product-list");
  if (!listElement) return;

  const dataSource = new ProductData();

  // Optional debug (safe now):
  // const list = await dataSource.getData("tents");
  // console.log("Products loaded:", list.length, list[0]);

  const productList = new ProductList("tents", dataSource, listElement);
  await productList.init();
}

init();
