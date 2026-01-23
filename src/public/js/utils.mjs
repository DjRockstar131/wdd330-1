// src/public/js/utils.mjs

// ---------- LocalStorage helpers ----------
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------- List templating (what ProductList needs) ----------
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement) return;

  if (clear) parentElement.innerHTML = "";

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// ---------- Single template rendering (header/footer) ----------
export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return;
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path} (${res.status})`);
  return await res.text();
}

export async function loadHeaderFooter(callback) {
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  if (!headerEl || !footerEl) return;

  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html"),
  ]);

  renderWithTemplate(headerTemplate, headerEl, null, callback);
  renderWithTemplate(footerTemplate, footerEl, null);
}
