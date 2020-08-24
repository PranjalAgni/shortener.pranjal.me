<template>
  <div class="content">
    <div v-if="errors" class="error">
      <p>{{ errors }}</p>
    </div>

    <form class="form" autocomplete="off">
      <input
        autocomplete="off"
        name="hidden"
        type="text"
        style="display: none;"
      />
      <input
        type="text"
        v-model="url"
        class="input"
        name="url"
        placeholder="enter a url"
      />
      <input
        type="text"
        v-model="code"
        class="input"
        name="code"
        placeholder="enter a code"
      />
      <button type="submit" class="create" v-on:click="handleSubmit">
        Create
      </button>
    </form>
    <div class="vld-parent">
      <Loading
        color="#00B0FE"
        :active.sync="loading"
        is-full-page="true"
        height="95"
        width="195"
      ></Loading>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Form',
  components: {
    Loading,
  },
  data: () => ({
    url: '',
    code: '',
  }),
  computed: {
    ...mapGetters(['errors', 'loading']),
  },

  methods: {
    ...mapActions(['shortenURL']),
    handleSubmit(event) {
      event.preventDefault();
      const payload = {
        url: this.url,
        code: this.code,
      };
      this.shortenURL(payload);
    },
  },
};
</script>

<style scoped>
.content {
  max-width: 60%;
  margin: 0 auto;
}
.form {
  display: flex;
  flex-direction: column;
}

.input,
.create {
  margin: 1rem 0;
}

.input {
  font-family: inherit;
  padding-bottom: 1rem;
  background: none;
  border: none;
  color: #ffffff;
  border-bottom: 2px solid #ffffff;
  text-align: center;
  font-size: 1.25rem;
  transition: border-bottom-color 0.3 ease-in-out;
  caret-color: #00b0ff;
  -webkit-transition: border-bottom-color 0.3 ease-in-out;
  -moz-transition: border-bottom-color 0.3 ease-in-out;
  -ms-transition: border-bottom-color 0.3 ease-in-out;
  -o-transition: border-bottom-color 0.3 ease-in-out;
}

.input:focus {
  border-bottom-color: #00b0ff;
  outline: none;
}

.input::placeholder {
  color: #ffffff;
  opacity: 0.7;
  font-weight: 540;
}

.create {
  cursor: pointer;
  border: none;
  font: inherit;
  font-size: 1.15rem;
  color: #262626;
  background-color: #00b0ff;
  padding: 0.75rem 1.25rem;
  box-shadow: 3px 3px 0 0 #ffffff;
  transition: box-shadow 0.3s ease-in-out;
  -webkit-transition: box-shadow 0.3s ease-in-out;
  -moz-transition: box-shadow 0.3s ease-in-out;
  -ms-transition: box-shadow 0.3s ease-in-out;
  -o-transition: box-shadow 0.3s ease-in-out;
}

.error {
  background: #a63446;
  padding: 0.5rem 1rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
}

.create:hover {
  box-shadow: 0 0 0 0 #ffffff;
}
</style>
