new Vue({
  el: '#app',

  data: {
    apiKey: 'de7c25351319ee026c9b',
    currencies: {},
    amount: 0,
    from: '',
    to: '',
    result: 0,
    loading: false,
  },

  mounted() {
    this.getCurrencies();
  },

  computed: {
    formattedCurrencies() {
      return Object.values(this.currencies);
    },
    calculateResult() {
      return (Number(this.amount) * this.result).toFixed(2);
    },
    disabled() {
      return this.amount === 0 || !this.amount || this.loading;
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
      axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${this.apiKey}`)
        .then(response => {

          this.currencies = response.data.results
          localStorage.setItem('currencies', JSON.stringify(response.data.results))
      })
    },
    convertCurrency() {

      const key = `${this.from}_${this.to}`;

      this.loading = true;
      axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&apiKey=${this.apiKey}`)
        .then(response => {

          this.result = response.data.results[key].val
          this.loading = false;
        })
    }
  },
  watch: {
    from() {
      this.result = 0;
    },
    to() {
      this.result = 0;
    }
  }
});
