new Vue({
  el: '#app',
  data: {
    currencies: {}
  },

  mounted() {
    this.getCurrencies();
  },

  computed: {
    formattedCurrencies() {
      return Object.values(this.currencies);
    }
  },

  methods: {
    getCurrencies() {

      // gets currencies from storage of browser
      const currencies = localStorage.getItem('currencies');

      // if it exists, assigns VUE variable currencies and exits the function
      if (currencies) {

        this.currencies = JSON.parse(currencies);
        return;
      }

      // else makes request to api and saving it
      axios.get('https://free.currconv.com/api/v7/currencies?apiKey=de7c25351319ee026c9b')
        .then(response => {

          this.currencies = response.data.results
          localStorage.setItem('currencies', JSON.stringify(response.data.results))
      })
    }
  }
});
