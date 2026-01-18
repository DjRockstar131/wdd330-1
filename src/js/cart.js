import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function getCartItems() {
  return getLocalStorage("so-cart") || [];
}

function removeFromCart(index) {
  const cart = getCartItems();
  cart.splice(index, 1);
  setLocalStorage("so-cart", cart);
  renderCartContents();
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="/${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0] ?? ""}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.Price}</p>
    <button class="remove-item" data-index="${index}">Remove</button>
  </li>`;
}

function renderCartContents() {
  const cartItems = getCartItems();
  const list = document.querySelector(".product-list");

  if (!cartItems.length) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  list.innerHTML = cartItems.map(cartItemTemplate).join("");

  // Event delegation: one listener handles all remove buttons
  list.onclick = (e) => {
    const btn = e.target.closest(".remove-item");
    if (!btn) return;
    removeFromCart(Number(btn.dataset.index));
  };
}

renderCartContents();
