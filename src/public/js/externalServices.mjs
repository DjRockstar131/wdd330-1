// src/public/js/ExternalServices.mjs
const rawBaseURL = import.meta.env.VITE_SERVER_URL || "";
const baseURL = rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`;

async function convertToJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
  }
  return data;
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const url = `${baseURL}checkout`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    return await convertToJson(response);
  }
}
