import { BASE_API_URL } from './constants';
export const makeURLShortened = async (payload) => {
  try {
    const API_URL = `${BASE_API_URL}api/url/create`;

    const requestPayload = {
      targetUrl: payload.url,
      shortId: payload.code || undefined,
    };

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
