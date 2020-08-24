const LRU = require("lru-cache");

/**
 *  Class representing caching strategy
 *  Wraps all the most important methods
 *  Current strategy is least recently used cache
 */
class CachingStrategy {
  /**
   * Creates the caching instance
   * @param {Number} [maxAge] TTL in the cache
   * @param {Number} [maxSize] maximum size of cache
   */
  constructor(maxAge = 60, maxSize = 100) {
    this.options = {
      max: maxSize,
      maxAge: maxAge * 60 * 1000,
    };

    this.cacheStorage = new LRU(this.options);
  }

  /**
   * sets the value in the cache
   * @param {Object} key - Key to set in the cache
   * @param {Object} value - value to set in the cache
   */
  set(key, value) {
    this.cacheStorage.set(key, value);
  }

  /**
   * @param {Object} key - Key whoose value we want
   * @return {Object | undefined} - value from the cache
   */
  get(key) {
    return this.cacheStorage.get(key);
  }

  /**
   * @param {Object} key - Key to check if it is present in cache
   * @return {Boolean} - if its present in cache or not
   */
  has(key) {
    return this.cacheStorage.has(key);
  }
}

module.exports = CachingStrategy;
