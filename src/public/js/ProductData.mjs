export default class ProductData {
  constructor(basePath = "/json/") {
    this.basePath = basePath;
  }

  async getData(category) {
    const response = await fetch(`${this.basePath}${category}.json`);
    if (!response.ok) {
      throw new Error(`Could not load ${this.basePath}${category}.json (${response.status})`);
    }
    return await response.json();
  }
  async findProductById(id, category = "tents") {
  const list = await this.getData(category);
  return list.find((p) => p.Id === id);
  }

}


