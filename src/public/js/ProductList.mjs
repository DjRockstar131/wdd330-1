// src/public/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/product.html?product=${product.Id}">
        <img
          src="${product.Images?.PrimaryLarge || product.Image}"
          alt="${product.Name}"
        />
        <h2 class="card__brand">${product.Brand?.Name || product.Brand || ""}</h2>
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
    // matches your utils signature:
    // (templateFn, parentElement, list, position="afterbegin", clear=false)
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
