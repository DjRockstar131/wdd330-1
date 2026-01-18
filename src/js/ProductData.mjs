function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error(`Bad Response: ${res.status}`);
}

export default class ProductData {
  async getData(category) {
    const url = `/json/${category}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Bad Response: ${response.status}`);
    return await response.json();
  }
}
