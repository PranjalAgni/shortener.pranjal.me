<template>
  <div class="main">
    <Header />
    <GithubCorner />
    <div class="result-holder" v-if="status">
      <p class="created">
        Shortened url:
        <a :href="shortenedUrl">{{ shortenedUrl }}</a>
      </p>
    </div>
    <Form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Form from './components/Form.vue';
import GithubCorner from './components/GithubCorner';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Form,
    GithubCorner,
    Header,
  },
  computed: {
    ...mapGetters(['shortenedUrl', 'status']),
  },
};
</script>

<style>
.result-holder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  display: block;
}

.created {
  color: #ffffff;
}

.created a {
  color: inherit;
}
</style>
