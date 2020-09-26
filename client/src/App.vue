<template>
  <v-app class="app">
    <div class="main">
      <Header />
      <GithubCorner />
      <!-- <div class="result-holder" v-if="status">
        <p class="created">
          Shortened url:
          <a :href="shortenedUrl">{{ shortenedUrl }}</a>
        </p>
      </div> -->
      <Form />
    </div>
  </v-app>
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
  watch: {
    status(newStatus) {
      if (newStatus) {
        this.$swal({
          titleText: `${this.shortenedUrl}`,
          icon: 'success',
          customClass: {
            title: 'title-class',
          },
          confirmButtonText: '<v-icon>📋</v-icon>Copy',
          confirmButtonColor: '#3A9FF3',
          preConfirm: () => {
            navigator.clipboard.writeText(this.shortenedUrl);
          },
          allowOutsideClick: () => {
            navigator.clipboard.writeText(this.shortenedUrl);
            return true;
          },
        });
      }
    },
  },
};
</script>

<style>
@import '~@sweetalert2/theme-dark/dark.min.css';

.result-holder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app {
  height: 100%;
  width: 100%;
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

.title-class {
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 768px) {
  .title-class {
    font-size: 18px !important;
  }
}
</style>
