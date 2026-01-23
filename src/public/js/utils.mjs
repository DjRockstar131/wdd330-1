// src/public/js/utils.mjs

// -----------------------------
// Local Storage Helpers
// -----------------------------
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// -----------------------------
// Template Rendering Helpers
// -----------------------------

// Your existing list renderer (keep for ProductList, cart list, etc.)
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement) return; // ✅ prevent "innerHTML of null" crashes

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// New: render ONE template into ONE parent (header/footer use-case)
export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return;

  // "template" is already a string of HTML
  parentElement.innerHTML = template;

  // Optional callback for any dynamic add-ons (cart count, etc.)
  if (typeof callback === "function") {
    callback(data);
  }
}

// -----------------------------
// Template Loading Helpers (AJAX)
// -----------------------------

// Fetch an HTML partial and return it as a string
export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load template: ${path} (${response.status})`);
  }
  return await response.text();
}

// Load header/footer partials into placeholders on any page
export async function loadHeaderFooter(callback) {
  // these IDs must exist in your HTML pages
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  // If a page doesn't have them, don't crash
  if (!headerEl && !footerEl) return;

  // root-relative paths (works from /cart, /product_pages, etc.)
  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html"),
  ]);

  if (headerEl) renderWithTemplate(headerTemplate, headerEl, null, callback);
  if (footerEl) renderWithTemplate(footerTemplate, footerEl, null);
}
