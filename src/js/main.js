
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductLists.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list"); 

const productList = new ProductList("tents", dataSource, listElement);
productList.init();
