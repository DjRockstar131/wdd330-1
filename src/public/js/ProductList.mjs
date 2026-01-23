// src/public/js/ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const id = product.Id ?? product.id;
  const name = product.Name ?? product.name;
  const price = product.Price ?? product.price;
  const brand = product.Brand?.Name ?? product.Brand ?? product.brand ?? "";
  const img = product.Images?.PrimaryLarge ?? product.Image ?? product.image ?? "";

  return `
    <li class="product-card">
      <a href="/product_pages/product.html?product=${id}">
        <img src="${img}" alt="${name}" />
        <h2 class="card__brand">${brand}</h2>
        <h3 class="card__name">${name}</h3>
        <p class="product-card__price">$${price}</p>
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
