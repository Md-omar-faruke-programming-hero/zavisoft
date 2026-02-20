const API_BASE_URL = "https://api.escuelajs.co/api/v1";

async function fetchJson(path, { searchParams } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function getCategories() {
  return fetchJson("/categories");
}

export function getProducts({ offset = 0, limit = 24, categoryId } = {}) {
  return fetchJson("/products", { searchParams: { offset, limit, categoryId } });
}

export function getProductById(id) {
  return fetchJson(`/products/${id}`);
}

