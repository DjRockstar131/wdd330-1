// src/js/product_pages.js
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = new URLSearchParams(window.location.search).get("product");

const dataSource = new ProductData();

// Add this method to ProductData OR do the find here (see below)
const details = new ProductDetails(productId, dataSource);
details.init();


function productTemplate(p) {
  return `
    <section class="product-detail">
      <h1>${p.Name}</h1>
      <p class="brand">${p.Brand}</p>
      <img src="/${p.Image}" alt="${p.Name}">
      <p class="price">$${p.Price}</p>
      <p>${p.Description}</p>
      <p>${(p.Colors || []).join(", ")}</p>
    </section>
  `;
}

loadProduct();
