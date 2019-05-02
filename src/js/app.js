new Vue({
  el: '#app',
  data: {
    currencies: {}
  },

  mounted() {
    axios.get('https://free.currconv.com/api/v7/currencies?apiKey=de7c25351319ee026c9b')
      .then(response => {
        console.log(response);
        this.currencies = response.data.results
      })
  }
});
