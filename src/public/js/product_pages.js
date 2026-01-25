import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

async function init() {
  const productId = getParam("product");

  const dataSource = new ProductData();
  const details = new ProductDetails(productId, dataSource);

  await details.init();
}

init();
