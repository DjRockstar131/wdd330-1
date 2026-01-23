import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = new URLSearchParams(window.location.search).get("product");
const dataSource = new ProductData();

const details = new ProductDetails(productId, dataSource);
details.init();
