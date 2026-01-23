import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    const target = document.querySelector(".product-detail");

    // Guard: missing URL param
    if (!this.productId) {
      target.innerHTML = "<p>Missing product id in the URL. Example: ?product=880RR</p>";
      return;
    }

    // Get product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Guard: product not found
    if (!this.product) {
      target.innerHTML =
        "<p>Product not found. Check that the id in the URL matches tents.json.</p>";
      return;
    }

    // Render
    this.renderProductDetails(this.product);

    // Add listener
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") ?? [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails(product) {
    const target = document.querySelector(".product-detail");
    target.innerHTML = this.productTemplate(product);
  }

  productTemplate(product) {
    const img = product.Image?.startsWith("/") ? product.Image : `/${product.Image}`;
    const colors = Array.isArray(product.Colors) ? product.Colors.join("/") : "";

    return `
      <h3>${product.Brand ?? ""}</h3>

      <h2 class="divider">${product.Name ?? ""}</h2>

      <img class="divider" src="${img}" alt="${product.Name ?? "Product image"}" />

      <p class="product-card__price">$${product.Price ?? ""}</p>

      <p class="product__color">${colors}</p>

      <p class="product__description">${product.Description ?? ""}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id ?? ""}">Add to Cart</button>
      </div>
    `;
  }
}
