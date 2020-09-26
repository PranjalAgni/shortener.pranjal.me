const shortIdCache = new Map();

export const setValue = (key, value) => {
  if (!key.length) return null;
  shortIdCache.set(key, value);
};

export const getValue = (key) => {
  if (shortIdCache.has(key)) return shortIdCache.get(key);
  return null;
};
