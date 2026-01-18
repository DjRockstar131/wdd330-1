// src/js/product_pages.js
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = new URLSearchParams(window.location.search).get("product");

const dataSource = new ProductData();

// Add this method to ProductData OR do the find here (see below)
const details = new ProductDetails(productId, dataSource);
details.init();

