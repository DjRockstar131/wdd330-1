import { getLocalStorage, setLocalStorage } from "./utils.js";

const CART_KEY = "so-cart";

export function addProductToCart(product) {
  // get current cart (must be an array)
  const cart = getLocalStorage(CART_KEY) ?? [];

  // add the product (or product.Id, depending on your design)
  cart.push(product);

  // SAVE IT BACK (this is usually the broken line)
  setLocalStorage(CART_KEY, cart);
}
