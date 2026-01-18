import { getLocalStorage } from "./utils.mjs";


function getCartItems() {
  return getLocalStorage("so-cart") || [];
}




import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

  // One listener for all remove buttons
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-item");
    if (!btn) return;

    const index = Number(btn.dataset.index);
    removeFromCart(index);
  });
}

function removeFromCart(index) {
  const cart = getCartItems();
  cart.splice(index, 1); // remove one item at that index
  setLocalStorage("so-cart", cart);
  renderCartContents(); // re-render
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

renderCartContents();


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


renderCartContents();
