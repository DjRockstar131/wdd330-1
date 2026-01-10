import { getLocalStorage } from "./utils.mjs";

const CART_KEY = "so-cart";

function renderCartContents() {
  // Always get an array (if nothing in storage yet, use [])
  const cartItems = getLocalStorage(CART_KEY) ?? [];

  // Optional: handle empty cart nicely
  const listEl = document.querySelector(".product-list");
  if (!listEl) return;

  if (cartItems.length === 0) {
    listEl.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  listEl.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Support multiple possible property names (in case your JSON uses different keys)
  const name = item.Name ?? item.NameWithoutBrand ?? item.Title ?? "Item";
  const img = item.Image ?? item.Images?.Primary ?? item.ImageSrc ?? "";
  const color =
    item.Colors?.[0]?.ColorName ?? item.Color ?? item.product__color ?? "";
  const price = item.FinalPrice ?? item.Price ?? item.ListPrice ?? 0;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${img}" alt="${name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${price}</p>
  </li>`;
}

renderCartContents();
