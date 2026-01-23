// src/js/cart.js
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartList = document.querySelector(".product-list"); // or ".cart-list" (match your HTML)
const cartTotal = document.querySelector(".cart-total");  // match your HTML (optional)

const cart = new ShoppingCart(cartList, cartTotal);
cart.init();
