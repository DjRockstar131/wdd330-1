// src/public/js/ProductData.mjs

const rawBaseURL = import.meta.env.VITE_SERVER_URL || "";
const baseURL = rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`;

async function convertToJson(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Fetch failed: ${response.status} ${response.statusText} ${text ? `| ${text}` : ""}`
    );
  }
  return await response.json();
}

export default class ProductData {
  // Get list of products for a category (tents, backpacks, sleeping-bags, hammocks)
  async getData(category) {
    if (!category) throw new Error("getData(category) requires a category.");
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: [...] }
  }

  // Get one product by id
  async findProductById(id) {
    if (!id) throw new Error("findProductById(id) requires an id.");
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result; // API returns { Result: {...} }
  }
}
