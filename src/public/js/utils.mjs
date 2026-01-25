// src/public/js/utils.mjs

// ---------- DOM helpers ----------
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// ---------- LocalStorage helpers ----------
export function getLocalStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`getLocalStorage: could not parse JSON for key "${key}"`, err);
    return null;
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------- URL Param helper ----------
export function getParam(key) {
  return new URL(window.location.href).searchParams.get(key);
}

// ---------- List templating ----------
// parent can be an Element OR a selector string like ".product-list"
export function renderListWithTemplate(
  templateFn,
  parent,
  list,
  position = "afterbegin",
  clear = false
) {
  const parentElement = typeof parent === "string" ? document.querySelector(parent) : parent;

  if (!parentElement) {
    console.warn(
      "renderListWithTemplate: parentElement was null.",
      { parent, path: window.location.pathname }
    );
    return;
  }

  if (clear) parentElement.innerHTML = "";

  const htmlStrings = (list || []).map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// ---------- Template rendering (header/footer) ----------
export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load template: ${path} (${res.status})`);
  return await res.text();
}

export function renderWithTemplate(template, parent) {
  const parentElement = typeof parent === "string" ? document.querySelector(parent) : parent;

  if (!parentElement) {
    console.warn(
      "renderWithTemplate: parentElement was null.",
      { parent, path: window.location.pathname }
    );
    return;
  }

  parentElement.innerHTML = template;
}

export async function loadHeaderFooter() {
  // If a page doesn't have one of these, don't crash—just skip.
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  const tasks = [];

  if (headerEl) {
    tasks.push(
      loadTemplate("/partials/header.html").then((tpl) => renderWithTemplate(tpl, headerEl))
    );
  }

  if (footerEl) {
    tasks.push(
      loadTemplate("/partials/footer.html").then((tpl) => renderWithTemplate(tpl, footerEl))
    );
  }

  await Promise.all(tasks);
}
