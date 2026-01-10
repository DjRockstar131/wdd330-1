import { addProductToCart } from "./cart.js";

const dataSource = "/json/tents.json";

async function getProducts() {
  const response = await fetch(dataSource);
  if (!response.ok) {
    throw new Error("Bad Response");
  }
  return response.json();
}

async function findProductById(productId) {
  const products = await getProducts();
  return products.find((product) => product.Id === productId);
}

const addToCartButton = document.querySelector("#addToCart");

if (addToCartButton) {
  addToCartButton.addEventListener("click", async () => {
    const productId = addToCartButton.dataset.id;
    const product = await findProductById(productId);
    addProductToCart(product);
  });
}
