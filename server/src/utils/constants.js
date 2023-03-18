const SHORT_CODE = {
  MAX_RETRY: 2,
  LENGTH: 5,
};

const RATE_LIMITER = {
  INTERVAL_IN_MINUTES: 15,
  MAX_REQUEST: 20,
  MESSAGE: "Too many URL created from this IP.",
};

const SPEED_LIMITER = {
  INTERVAL_IN_MINUTES: 15,
  DELAY_AFTER_REQUESTS: 4,
  DELAY_MS: 200,
};

const PORT = 3000;

module.exports = {
  SHORT_CODE,
  RATE_LIMITER,
  SPEED_LIMITER,
  PORT,
};
