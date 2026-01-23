import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const img = product.Image?.startsWith("/") ? product.Image : `/${product.Image}`;
  return `
    <li class="product-card">
      <a href="/product_pages/product.html?product=${product.Id}">
        <img src="${img}" alt="${product.Name}" />
        <h2 class="card__brand">${product.Brand || ""}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.Price}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    if (!this.listElement) return;
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
