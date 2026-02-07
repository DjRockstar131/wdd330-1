// src/public/js/ExternalServices.mjs

const rawBaseURL = import.meta.env.VITE_SERVER_URL || "";
// normalize: remove trailing slashes, then add exactly one
const baseURL = rawBaseURL.replace(/\/+$/, "") + "/";

async function convertToJson(res) {
  // Read body FIRST (assignment requirement), but don't assume JSON always succeeds
  let jsonResponse = {};
  try {
    jsonResponse = await res.json();
  } catch {
    // if it wasn't JSON, try text so we still have something useful
    const text = await res.text().catch(() => "");
    jsonResponse = text ? { message: text } : {};
  }

  if (res.ok) return jsonResponse;

  // Assignment-style custom error object:
  throw { name: "servicesError", message: jsonResponse };
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
    const response = await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await convertToJson(response);
  }
}
