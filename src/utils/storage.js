export const URLS_KEY = 'urls_index';

export function loadUrls() {
  try {
    return JSON.parse(localStorage.getItem(URLS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveUrls(items) {
  localStorage.setItem(URLS_KEY, JSON.stringify(items));
}

export function findByCode(code) {
  return loadUrls().find(u => u.code === code);
}

export function isCodeTaken(code) {
  return Boolean(findByCode(code));
}
