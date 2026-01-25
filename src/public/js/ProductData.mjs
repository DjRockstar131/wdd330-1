// src/public/js/ProductData.mjs
const rawBaseURL = import.meta.env.VITE_SERVER_URL;
const apiToken = import.meta.env.VITE_API_TOKEN; // you will add this

if (!rawBaseURL) {
  throw new Error("Missing VITE_SERVER_URL");
}
if (!apiToken) {
  throw new Error("Missing VITE_API_TOKEN");
}

const baseURL = rawBaseURL.endsWith("/")
  ? rawBaseURL.slice(0, -1)
  : rawBaseURL;

async function convertToJson(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      `Fetch failed: ${response.status} ${response.statusText} | ${JSON.stringify(data)}`
    );
  }
  return data;
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`, // most likely what the backend wants
  };
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(`${baseURL}/products/search/${category}`, {
      headers: getHeaders(),
    });
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}/product/${id}`, {
      headers: getHeaders(),
    });
    const data = await convertToJson(response);
    return data.Result;
  }
}
