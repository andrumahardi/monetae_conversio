<template>
  <div id="main-body">
    <div class="base container">
      <div class="row">
        <div class="base-column col-12">
          <p class="table-title">CURRENT BASE RATE</p>
          <div class="row">
            <p class="base-code col-5">{{base.code}}</p>
            <div class="col-7">
              <div class="input-amount row">
                <input id="amount" type="number" class="col-9" v-model="amount">
                <label for="amount" class="base-name col-3">{{base.name}}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rates row">
        <p class="table-title">LIST OF FOREIGN EXCHANGE</p>
        <ForeignRateList v-bind:amount="amount" />
      </div>
    </div>
  </div>
</template>

<script>
import ForeignRateList from './ForeignRateList'

export default {
  data () {
    return {
      amount: 1
    }
  },
  watch: {
    amount () {
      if (this.amount < 1 || this.amount > 1e9) this.amount = 1
    }
  },
  computed: {
    base () {
      return this.$store.state.base
    }
  },
  components: {
    ForeignRateList
  },
  methods: {
    fetchCurrencies (date) {
      this.$store.dispatch('fetchCurrenciesAsync', date)
    },
    getCurrentDate () {
      const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      this.fetchCurrencies(date)
    }
  },
  created () {
    this.getCurrentDate()
  }
}
</script>

<style scoped>

#main-body {
  height: calc(100vh - 3rem);
}

.base{
  height: 8rem;
  width: 25rem;
  margin: 2rem auto;
  box-shadow: 0.3rem 0.3rem 0.5rem 0 #00000042,
    -0.15rem -0.15rem 0.2rem 0 #4e4e4e4d;
}

.rates{
  height: 25rem;
  width: 25rem;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0.3rem 0.3rem 0.5rem 0 #00000042,
    -0.15rem -0.15rem 0.2rem 0 #4e4e4e4d;
  overflow-y: scroll;
}

.base-code {
  font-size: 40pt;
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ce8b38;
  text-shadow: 0.15rem 0.15rem 0.01rem #000000;
}

.base-code:empty {
  background-image: linear-gradient(to right, #0d181f 10%, #1f3b4c 40%, #0d181f 50%);
  background-size: 20rem 1rem;
  margin-top: 0.5rem;
  animation: small-skeleton 1.5s infinite;
}

.base-name {
  text-align: center;
  font-size: 15pt;
  color: #000000;
  margin: 0;
  padding: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  background-color: #5db8ec;
}

.base-name:empty {
  background-image: linear-gradient(to right, #5db8ec 10%, #ffffff 40%, #5db8ec 50%);
  background-size: 20rem 1rem;
  height: 2rem;
  animation: small-skeleton 1.5s infinite;
}

.base-column{
  height: 8rem;
  padding: 1rem;
}

.table-title {
  font-size: 15pt;
  width: 23rem;
  height: 2rem;
  text-align: center;
  font-weight: bold;
  border-radius: 0.5rem;
  box-shadow: inset 0.15rem 0.15rem 0.2rem black,
    inset -0.1rem -0.1rem 0.1rem #4e4e4e;
  border: 0.1rem solid darkgrey;
}

.input-amount {
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  border: 0.1rem solid #5db8ec;
  border-radius: 0.5rem;
}

#amount {
  outline: none;
  height: 1.5rem;
  background-color: transparent;
  border: 0;
  padding: 0 1rem;
  font-size: 15pt;
  text-align: end;
}

.rates::-webkit-scrollbar {
  width: 0.5rem;
}

.rates::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}

@media screen and (max-width: 750px) {
  #main-body {
    width: 100vw;
    height: 20rem;
  }
}

@media screen and (max-width: 400px) {
  #main-body {
    width: 100vw;
    height: 20rem;
  }
  .base, .rates{
    width: 100vw;
  }
  .table-title{
    width: inherit;
  }
}

@keyframes small-skeleton{
  0%{
    background-position: -10rem 0
  }
  100%{
    background-position: 10rem 0
  }
}

</style>
