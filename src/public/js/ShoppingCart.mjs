// src/public/js/ShoppingCart.mjs
import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const price = item.FinalPrice ?? item.Price ?? 0;
  const img = item.Image?.startsWith("/") ? item.Image : `/${item.Image}`;

  return `
    <li class="cart-card divider">
      <a href="/product_pages/product.html?product=${item.Id}" class="cart-card__image">
        <img src="${img}" alt="${item.Name}" />
      </a>

      <a href="/product_pages/product.html?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__price">$${Number(price).toFixed(2)}</p>

      <button class="cart-remove" data-id="${item.Id}">Remove</button>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listSelector, totalSelector, key = "so-cart") {
    this.listSelector = listSelector;
    this.totalSelector = totalSelector;
    this.key = key;

    this.listElement = null;
    this.totalElement = null;
  }

  init() {
    this.listElement = document.querySelector(this.listSelector);
    this.totalElement = document.querySelector(this.totalSelector);

    console.log("ShoppingCart.init", {
      listFound: !!this.listElement,
      totalFound: !!this.totalElement,
      key: this.key,
      path: location.pathname,
    });

    if (!this.listElement || !this.totalElement) return;

    this.render();

    // event delegation for remove buttons
    this.listElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".cart-remove");
      if (!btn) return;
      this.removeItem(btn.dataset.id);
    });
  }

  getItems() {
    return getLocalStorage(this.key) || [];
  }

  setItems(items) {
    setLocalStorage(this.key, items);
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.FinalPrice ?? item.Price ?? 0), 0);
  }

  removeItem(id) {
    const items = this.getItems().filter((item) => item.Id !== id);
    this.setItems(items);
    this.render();
  }

  render() {
    const items = this.getItems();
    console.log("ShoppingCart.render items:", items.length, items[0]);

    if (!items.length) {
      this.listElement.innerHTML = "<li>Your cart is empty.</li>";
      this.totalElement.textContent = "$0.00";
      return;
    }

    renderListWithTemplate(cartItemTemplate, this.listElement, items, "afterbegin", true);

    const total = this.calculateTotal(items);
    this.totalElement.textContent = `$${Number(total).toFixed(2)}`;
  }
}
