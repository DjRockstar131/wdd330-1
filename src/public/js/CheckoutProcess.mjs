import { getLocalStorage } from "./utils.mjs";

function formDataToJSON(form) {
  const fd = new FormData(form);
  return Object.fromEntries(fd.entries());
}

// takes items from localStorage and converts to required list with quantity
function packageItems(items) {
  const map = new Map();

  items.forEach((item) => {
    const id = item.Id ?? item.id;
    const name = item.Name ?? item.name;
    const price = Number(item.FinalPrice ?? item.Price ?? item.price ?? 0);

    if (!map.has(id)) {
      map.set(id, { id, name, price, quantity: 1 });
    } else {
      map.get(id).quantity += 1;
    }
  });

  return Array.from(map.values());
}

export default class CheckoutProcess {
  constructor(services, cartKey = "so-cart") {
    this.services = services;
    this.cartKey = cartKey;

    this.subtotalEl = document.querySelector("#subtotal");
    this.taxEl = document.querySelector("#tax");
    this.shippingEl = document.querySelector("#shipping");
    this.totalEl = document.querySelector("#orderTotal");
    this.messageEl = document.querySelector("#checkout-message");

    this.form = document.querySelector("#checkout-form");

    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  getCartItems() {
    return getLocalStorage(this.cartKey) || [];
  }

  calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + Number(item.FinalPrice ?? item.Price ?? 0), 0);
  }

  calculateShipping(itemsCount) {
    if (itemsCount <= 0) return 0;
    return 10 + Math.max(0, itemsCount - 1) * 2;
  }

  displayMoney(el, value) {
    if (!el) return;
    el.textContent = `$${Number(value).toFixed(2)}`;
  }

  // called on page load
  init() {
    const items = this.getCartItems();
    this.subtotal = this.calculateSubtotal(items);
    this.displayMoney(this.subtotalEl, this.subtotal);

    // totals are calculated after zip is filled (per instructions)
    if (this.form) {
      const zipInput = this.form.querySelector('input[name="zip"]');
      zipInput?.addEventListener("input", () => {
        if (zipInput.value.trim().length >= 5) this.calculateAndDisplayTotals();
      });

      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.checkout(this.form);
      });
    }
  }

  calculateAndDisplayTotals() {
    const items = this.getCartItems();
    const count = items.length;

    this.tax = this.subtotal * 0.06;
    this.shipping = this.calculateShipping(count);
    this.orderTotal = this.subtotal + this.tax + this.shipping;

    this.displayMoney(this.taxEl, this.tax);
    this.displayMoney(this.shippingEl, this.shipping);
    this.displayMoney(this.totalEl, this.orderTotal);
  }

  async checkout(form) {
    const items = this.getCartItems();
    if (!items.length) {
      this.messageEl.textContent = "Your cart is empty.";
      return;
    }

    // ensure totals are set (in case they never typed zip)
    if (!this.orderTotal) this.calculateAndDisplayTotals();

    const order = formDataToJSON(form);

    // populate required keys
    order.orderDate = new Date().toISOString();
    order.items = packageItems(items);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    try {
      const response = await this.services.checkout(order);
      this.messageEl.textContent = `Order submitted! Response: ${JSON.stringify(response)}`;
    } catch (err) {
      this.messageEl.textContent = `Checkout failed: ${err.message}`;
    }
  }
}
