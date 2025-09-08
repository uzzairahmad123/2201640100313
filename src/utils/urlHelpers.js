export function generateCode(len = 6) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function isValidHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function minutesFromNow(min) {
  const now = Date.now();
  return now + Math.max(1, parseInt(min ?? 30, 10)) * 60 * 1000;
}

export function isAlphanumeric(s) {
  return /^[a-z0-9]+$/i.test(s);
}
