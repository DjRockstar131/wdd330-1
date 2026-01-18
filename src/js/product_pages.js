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

async function loadProduct() {
  const productId = new URLSearchParams(window.location.search).get("product");
  if (!productId) {
    document.querySelector("main").insertAdjacentHTML("afterbegin", "<p>Missing product id.</p>");
    return;
  }

  const dataSource = new ProductData();
  const products = await dataSource.getData("tents");

  const product = products.find(p => p.Id === productId);
  if (!product) {
    document.querySelector("main").insertAdjacentHTML("afterbegin", "<p>Product not found.</p>");
    return;
  }

  const main = document.querySelector("main");
  main.insertAdjacentHTML("afterbegin", productTemplate(product));
}

loadProduct();
