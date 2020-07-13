const app = new Vue({
  el: '#app',
  data: {
    url: '',
    code: '',
    error: '',
    isCreated: false,
    formVisible: true,
  },
  methods: {
    submitFN() {
      console.log('This is some data: ', [this.url, this.code]);
      this.formVisible = false;
      this.isCreated = true;
    },
  },
});
