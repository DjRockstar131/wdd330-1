import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function getProductImage(product) {
  if (product?.Images?.PrimaryLarge) return product.Images.PrimaryLarge;
  if (product?.Images?.PrimaryMedium) return product.Images.PrimaryMedium;
  if (product?.Image) return product.Image;
  return "/images/noun_Tent_2517.svg";
}

function getBrand(product) {
  if (product?.Brand?.Name) return product.Brand.Name;
  if (typeof product?.Brand === "string") return product.Brand;
  return "";
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
  }

  async init() {
    const target = document.querySelector(".product-detail");
    if (!target) return;

    if (!this.productId) {
      target.innerHTML = "<p>Missing product id in the URL. Example: ?product=880RR</p>";
      return;
    }

    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      target.innerHTML = "<p>Product not found. Check the id in the URL.</p>";
      return;
    }

    target.innerHTML = this.productTemplate(this.product);

    document
      .getElementById("addToCart")
      ?.addEventListener("click", () => this.addProductToCart());
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart") ?? [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  productTemplate(product) {
    const img = getProductImage(product);
    const price = product?.FinalPrice ?? product?.Price ?? 0;

    return `
      <h3>${getBrand(product)}</h3>
      <h2 class="divider">${product?.Name ?? ""}</h2>

      <img class="divider" src="${img}" alt="${product?.Name ?? "Product image"}" />

      <p class="product-card__price">$${Number(price).toFixed(2)}</p>

      <p class="product__description">${product?.Description ?? ""}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product?.Id ?? ""}">Add to Cart</button>
      </div>
    `;
  }
}
