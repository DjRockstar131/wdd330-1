// src/public/js/product_pages.js
import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductLists.mjs"; // (or whatever your list class is named)

loadHeaderFooter();

const dataSource = new ProductData("tents"); // adjust if your ProductData expects a category
const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);
productList.init();
