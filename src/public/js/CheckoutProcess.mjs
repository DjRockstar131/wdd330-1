import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

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

    if (!id) return;

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
    return items.reduce(
      (sum, item) => sum + Number(item.FinalPrice ?? item.Price ?? 0),
      0
    );
  }

  calculateShipping(itemsCount) {
    if (itemsCount <= 0) return 0;
    return 10 + Math.max(0, itemsCount - 1) * 2;
  }

  displayMoney(el, value) {
    if (!el) return;
    el.textContent = `$${Number(value).toFixed(2)}`;
  }

  setMessage(msg) {
    if (this.messageEl) this.messageEl.textContent = msg;
    // optional nicer UI (if you added alertMessage)
    if (typeof alertMessage === "function") alertMessage(msg, true);
  }

  // called on page load
  init() {
    const items = this.getCartItems();
    this.subtotal = this.calculateSubtotal(items);
    this.displayMoney(this.subtotalEl, this.subtotal);

    if (!this.form) return;

    // totals calculated after zip entered (per instructions)
    const zipInput = this.form.querySelector('input[name="zip"]');
    zipInput?.addEventListener("input", () => {
      if (zipInput.value.trim().length >= 5) this.calculateAndDisplayTotals();
    });

    // IMPORTANT: submit event triggers built-in HTML validation automatically,
    // but since we preventDefault, we should still checkValidity/reportValidity:
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const valid = this.form.checkValidity();
      this.form.reportValidity();
      if (!valid) return;

      this.checkout(this.form);
    });
  }

  calculateAndDisplayTotals() {
    const items = this.getCartItems();
    const count = items.length;

    // Recompute subtotal each time in case cart changed
    this.subtotal = this.calculateSubtotal(items);
    this.tax = this.subtotal * 0.06;
    this.shipping = this.calculateShipping(count);
    this.orderTotal = this.subtotal + this.tax + this.shipping;

    this.displayMoney(this.subtotalEl, this.subtotal);
    this.displayMoney(this.taxEl, this.tax);
    this.displayMoney(this.shippingEl, this.shipping);
    this.displayMoney(this.totalEl, this.orderTotal);
  }

  async checkout(form) {
    const items = this.getCartItems();
    if (!items.length) {
      this.setMessage("Your cart is empty.");
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

      // ✅ happy path
      setLocalStorage(this.cartKey, []);
      window.location.href = "/checkout/success.html";
      return response;
    } catch (err) {
      // ✅ handle custom servicesError { name, message: {message,status,...} }
      if (err?.name === "servicesError") {
        const serverMsg = err?.message?.message || "Checkout failed. Please check your info.";
        this.setMessage(serverMsg);
      } else {
        this.setMessage(err?.message || "Checkout failed. Please try again.");
      }
    }
  }
}
