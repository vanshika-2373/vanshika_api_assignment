// Very simple in-memory cache with TTL
const cacheStore = new Map();

/**
 * Save value in cache
 * @param {string} key
 * @param {any} value
 * @param {number} ttlMs - time to live in milliseconds
 */
function setCache(key, value, ttlMs = 60 * 1000) {
  const expiresAt = Date.now() + ttlMs;
  cacheStore.set(key, { value, expiresAt });
}

/**
 * Get value from cache
 * @param {string} key
 * @returns {any|null}
 */
function getCache(key) {
  const cached = cacheStore.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {
    // expired
    cacheStore.delete(key);
    return null;
  }
  return cached.value;
}

module.exports = {
  setCache,
  getCache,
};
