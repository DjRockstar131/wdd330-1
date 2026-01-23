// src/js/ShoppingCart.mjs
import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="cart-remove" data-id="${item.Id}">Remove</button>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElement, totalElement) {
    this.listElement = listElement;
    this.totalElement = totalElement;
    this.key = "so-cart";
  }

  getItems() {
    return getLocalStorage(this.key) || [];
  }

  setItems(items) {
    setLocalStorage(this.key, items);
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.FinalPrice, 0);
  }

  render() {
    const items = this.getItems();

    if (!items.length) {
      this.listElement.innerHTML = "<li>Your cart is empty.</li>";
      this.totalElement.textContent = "$0.00";
      return;
    }

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      items,
      (item) => item
    );

    const total = this.calculateTotal(items);
    this.totalElement.textContent = `$${total.toFixed(2)}`;
  }
}
