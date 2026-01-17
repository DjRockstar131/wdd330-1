import { getLocalStorage } from "./utils.mjs";


function getCartItems() {
  return getLocalStorage("so-cart") || [];
}




function renderCartContents() {
  const cartItems = getCartItems();
  const list = document.querySelector(".product-list");

  if (!cartItems.length) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  list.innerHTML = cartItems.map(cartItemTemplate).join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName ?? ""}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();
