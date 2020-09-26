export const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : window.location.href;

export const SHORTEN_URL_STARTED = 'shortenUrlStarted';

export const SHORTEN_URL_COMPLETED = 'shortenUrlCompleted';

export const SHORTEN_URL_FAILED = 'shortenUrlFailed';

export const INVALID_REQUEST_BODY = 'INVALID_REQUEST_BODY';

export const DUPLICATE_KEY = 'DUPLICATE_KEY';
