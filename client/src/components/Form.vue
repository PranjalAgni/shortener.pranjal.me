<template>
  <div class="content">
    <div v-if="errors" class="error">
      <p>{{ errors }}</p>
    </div>

    <v-form class="form" autocomplete="off">
      <input
        autocomplete="off"
        name="hidden"
        type="text"
        style="display: none"
      />
      <v-text-field
        v-model="url"
        label="Url"
        :error-messages="urlErrors"
        required
        @change="$v.url.$touch()"
        @blur="$v.url.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="code"
        label="Short Code (optional)"
        :error-messages="codeErrors"
        @change="$v.code.$touch()"
        @blur="$v.code.$touch()"
      ></v-text-field>

      <v-btn color="primary" class="create" @click="handleSubmit">Create</v-btn>
    </v-form>
    <div class="vld-parent">
      <Loading
        color="#00B0FE"
        :active.sync="loading"
        :is-full-page="true"
        :height="95"
        :width="195"
      ></Loading>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, url, minLength } from 'vuelidate/lib/validators';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { checkCodeValid } from '../api';
import { getValue, setValue } from '../utils/cache';

export default {
  name: 'Form',
  components: {
    Loading,
  },
  mixins: [validationMixin],
  validations: {
    url: { required, url },
    code: { minLength: minLength(3) },
  },
  data: () => ({
    url: '',
    code: '',
    codeExists: false,
  }),
  computed: {
    ...mapGetters(['errors', 'loading']),
    urlErrors() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.required && errors.push('url cannot be empty');
      !this.$v.url.url && errors.push('pass a valid url');
      return errors;
    },
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty || !this.code.length) return errors;
      this.codeExists && errors.push('code is already in use');
      !this.$v.code.minLength &&
        errors.push('code should be atleast 3 letters');
      return errors;
    },
  },
  watch: {
    code: async function(currentCode) {
      this.$v.code.$touch();
      let isCodePresent = getValue(currentCode);
      if (!isCodePresent) {
        isCodePresent = await checkCodeValid(currentCode);
        setValue(currentCode, isCodePresent);
      }
      
      console.log("Code in cache: ", getValue(currentCode));
      this.codeExists = isCodePresent;
    },
  },
  methods: {
    ...mapActions(['shortenURL']),
    handleSubmit(event) {
      event.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid || this.codeExists) return;
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

.white {
  border-bottom: none;
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
