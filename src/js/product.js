import { setClick } from "./utils.mjs";
import { addProductToCart, findProductById } from "./products.js";

async function addToCartHandler() {
  const button = document.querySelector("#addToCart");
  if (!button) return;

  const id = button.dataset.id;

  try {
    const product = await findProductById(id);
    if (!product) {
      console.error("No product found for id:", id);
      return;
    }

    addProductToCart(product);
    alert("Added to cart!");
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
}

setClick("#addToCart", addToCartHandler);
