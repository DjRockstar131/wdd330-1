// utils.mjs

export function renderWithTemplate(template, parentElement, data, callback) {
  // data isn't always needed for header/footer, but we keep the signature for reuse.
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
