
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductLists_tmp.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list"); 

const productList = new ProductList("tents", dataSource, listElement);
productList.init();
