
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductLists.mjs";

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
console.log("listElement:", listElement);
const productList = new ProductList("tents", dataSource, listElement);
productList.init();


