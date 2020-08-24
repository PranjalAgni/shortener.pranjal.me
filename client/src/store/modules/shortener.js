import { makeURLShortened } from '../../api';
import {
  BASE_API_URL,
  SHORTEN_URL_STARTED,
  SHORTEN_URL_COMPLETED,
  SHORTEN_URL_FAILED,
  INVALID_REQUEST_BODY,
  DUPLICATE_KEY,
} from '../../constants';

const state = {
  shortenedUrl: null,
  loading: false,
  error: null,
  status: false,
};

const getters = {
  shortenedUrl: (state) => state.shortenedUrl,
  status: (state) => state.status,
  errors: (state) => state.error,
  loading: (state) => state.loading,
};

const actions = {
  async shortenURL({ commit }, payload) {
    try {
      commit(SHORTEN_URL_STARTED);
      const { status, result } = await makeURLShortened(payload);
      if (status === 200) {
        commit(SHORTEN_URL_COMPLETED, result?.code);
      } else if (status === 422) {
        commit(SHORTEN_URL_FAILED, INVALID_REQUEST_BODY);
      } else if (status === 409) {
        commit(SHORTEN_URL_FAILED, DUPLICATE_KEY);
      }
    } catch (error) {
      commit(SHORTEN_URL_FAILED, error.message);
    }
  },
};

const mutations = {
  [SHORTEN_URL_STARTED]: (state) => {
    state.loading = true;
    state.error = null;
    state.status = false;
    state.shortenedUrl = null;
  },
  [SHORTEN_URL_COMPLETED]: (state, code) => {
    state.loading = false;
    state.status = true;
    state.shortenedUrl = `${BASE_API_URL}${code}`;
  },
  [SHORTEN_URL_FAILED]: (state, payload) => {
    state.loading = false;
    state.status = false;
    state.error = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
