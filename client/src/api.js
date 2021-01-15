import { BASE_API_URL } from './utils/constants';

const makeAPICall = async (API_URL, payload, method = 'POST') => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  const response = await fetch(API_URL, {
    method,
    body: JSON.stringify(payload),
    headers,
  });

  return response;
};

export const makeURLShortened = async (payload) => {
  try {
    const API_URL = `${BASE_API_URL}api/url/create`;

    const requestPayload = {
      targetUrl: payload.url,
      shortId: payload.code || undefined,
    };

    const response = await makeAPICall(API_URL, requestPayload);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const checkCodeValid = async (payload) => {
  try {
    const API_URL = `${BASE_API_URL}api/url/search`;

    const requestPayload = {
      shortId: payload,
    };
    const response = await makeAPICall(API_URL, requestPayload);
    const data = await response.json();
    return data?.result?.present;
  } catch (error) {
    console.error(error);
    return null;
  }
};
