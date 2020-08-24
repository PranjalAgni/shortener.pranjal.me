const Cache = require("./lru");

let cachingInstance;

const getInstance = (maxAge = 60, maxSize = 100) => {
  // if caching instance does not exists then initalize one
  if (!cachingInstance) {
    cachingInstance = new Cache(maxAge, maxSize);
  }

  return cachingInstance;
};

module.exports = {
  getInstance,
};
