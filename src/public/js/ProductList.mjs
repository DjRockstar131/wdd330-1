import { renderListWithTemplate } from "./utils.mjs";

function getProductImage(product) {
  // API products often have Images.PrimaryMedium
  if (product?.Images?.PrimaryMedium) return product.Images.PrimaryMedium;
  if (product?.Image) return product.Image;
  return "/images/noun_Tent_2517.svg"; // fallback
}

function getBrand(product) {
  if (product?.Brand?.Name) return product.Brand.Name;
  if (typeof product?.Brand === "string") return product.Brand;
  return "";
}

function productCardTemplate(product) {
  const img = getProductImage(product);
  const price = product?.FinalPrice ?? product?.Price ?? 0;

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${encodeURIComponent(product.Id)}">
        <img src="${img}" alt="${product.Name ?? "Product"}" />
        <h2 class="card__brand">${getBrand(product)}</h2>
        <h3 class="card__name">${product.Name ?? ""}</h3>
        <p class="product-card__price">$${Number(price).toFixed(2)}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElementOrSelector) {
    this.category = category;
    this.dataSource = dataSource;

    // allow passing ".product-list" OR an element
    this.listElement =
      typeof listElementOrSelector === "string"
        ? document.querySelector(listElementOrSelector)
        : listElementOrSelector;
  }

  async init() {
    if (!this.listElement) {
      console.warn("ProductList: list element not found on", location.pathname);
      return;
    }

    const list = await this.dataSource.getData(this.category);

    // Debug + safety: API must return an array
    if (!Array.isArray(list)) {
      console.warn("ProductList: getData did not return an array", {
        category: this.category,
        returnedType: typeof list,
        returnedValue: list,
      });
      this.listElement.innerHTML =
        "<li>Could not load products (data was not an array).</li>";
      return;
    }

    console.log(`ProductList: loaded ${list.length} products for "${this.category}"`);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
