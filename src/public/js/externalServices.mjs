const baseURL = "/json/";

export async function getData(file) {
  const response = await fetch(baseURL + file);

  if (!response.ok) {
    throw new Error(`Bad Response for ${baseURL + file}: ${response.status}`);
  }

  return response.json();
}
