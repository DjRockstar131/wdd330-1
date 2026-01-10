import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const CART_KEY = "so-cart";
const DATA_SOURCE = "/json/tents.json"; // must exist in /dist/json after build

export function getCartItems() {
  return getLocalStorage(CART_KEY) ?? [];
}

export function addProductToCart(product) {
  const cart = getCartItems();
  cart.push(product);
  setLocalStorage(CART_KEY, cart);
}

export async function findProductById(id) {
  const response = await fetch(DATA_SOURCE);
  if (!response.ok) {
    throw new Error(`Could not load ${DATA_SOURCE}: ${response.status}`);
  }

  const products = await response.json();

  // your JSON appears to use "Id" (capital I)
  return products.find((p) => p.Id === id);
}
