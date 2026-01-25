// src/public/js/utils.mjs

// ---------- LocalStorage helpers ----------
export function getLocalStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------- URL Param helper ----------
export function getParam(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

// ---------- List templating ----------
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

// ---------- Template rendering (header/footer) ----------
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path} (${res.status})`);
  return await res.text();
}

export function renderWithTemplate(template, parentElement) {
  if (!parentElement) return;
  parentElement.innerHTML = template;
}

export async function loadHeaderFooter() {
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  if (!headerEl || !footerEl) return;

  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html"),
  ]);

  renderWithTemplate(headerTemplate, headerEl);
  renderWithTemplate(footerTemplate, footerEl);
}
