import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess(
  "#checkout-form",
  {
    subtotal: "#summary-subtotal",
    tax: "#summary-tax",
    shipping: "#summary-shipping",
    total: "#summary-total",
    message: "#checkout-message",
  },
  "so-cart"
);

checkout.init();
