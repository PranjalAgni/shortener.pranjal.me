const BASE_API_URL = window.location.href;

const app = new Vue({
  el: "#app",
  data: {
    url: "",
    code: "",
    error: "",
    shortenedUrl: "",
    isCreated: false,
    formVisible: true,
  },
  methods: {
    async submitFN() {
      this.error = "";
      this.shortenedUrl = "";
      const API_URL = `${BASE_API_URL}api/url/create`;
      let requestPayload = {
        targetUrl: this.url,
        shortId: this.code || undefined,
      };

      const headers = {
        "Content-Type": "application/json;charset=utf-8",
        "x-api-key": this.getWeekDay(),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(requestPayload),
        headers,
      });

      const data = await response.json();
      console.log(data);
      this.setAPIResponse(response, data);
    },
    getWeekDay() {
      const date = new Date();
      return date.toLocaleString("default", { weekday: "long" });
    },
    setAPIResponse(response, data) {
      if (response.ok) {
        this.shortenedUrl = `${BASE_API_URL}${data.res.code}`;
        this.isCreated = true;
        this.formVisible = false;
        this.error = "";
      } else if (response.status === 422) {
        this.error = data.message;
        this.isCreated = false;
      }
    },
  },
});
