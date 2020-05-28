<template>
  <div id="currency-action">
    <form class="form container">
      <div class="amount-input">
        <input
          type="number"
          v-model="amount"
          id="amount-tobe-converted"
          placeholder="insert amount to convert"
          max="1000000000"
        />
        <label
          for="amount-tobe-converted"
          id="input-label"
        >
          insert amount
        </label>
      </div>
      <select v-model="base" class="select-currency">
        <option disabled>
          choose base currency...
        </option>
        <option
          v-for="(rate, i) in rates"
          v-bind:key="i"
          v-bind:value="rate.code"
        >
          {{rate.currency_name}}
        </option>
      </select>
      <select v-model="target" class="select-currency">
        <option disabled>
          choose target currency...
        </option>
        <option
          v-for="(rate, i) in rates"
          v-bind:key="i"
          v-bind:value="rate.code"
        >
          {{rate.currency_name}}
        </option>
      </select>
      <div id="result-section" class="row">
        <input
          type="text"
          class="input-result col-9"
          disabled
          placeholder="result displayed here"
          v-model="result">
        <button
          id="convert-btn"
          v-on:click="reset"
          class="col-3"
        >
          <i class="fas fa-undo-alt"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      base: 'choose base currency...',
      target: 'choose target currency...',
      amount: null,
      result: null
    }
  },
  watch: {
    amount () {
      if (this.base.length === 3 && this.target.length === 3) {
        this.calculateResult()
      }
      if (!this.amount) this.result = null
      if (this.amount > 1e9) this.amount = 1
    }
  },
  computed: {
    rates () {
      return this.$store.state.rates
    }
  },
  methods: {
    reset (e) {
      e.preventDefault()
      this.base = 'choose base currency...'
      this.target = 'choose target currency...'
      this.amount = null
      this.result = null
    },
    calculateResult () {
      const baseRate = this.rates.filter(base => {
        if (base.code === this.base) return base
      })
      const targetRate = this.rates.filter(target => {
        if (target.code === this.target) return target
      })
      const result = (Number(this.amount) * targetRate[0].amount) / baseRate[0].amount
      this.result = result.toLocaleString()
    }
  }
}
</script>

<style scoped>

*{
  color: black;
}

.amount-input {
  position: relative;
  display: flex;
  width: 75%;
  margin: 2rem auto;
  flex-direction: column;
}

#amount-tobe-converted {
  background-color: transparent;
  outline: none;
  border: 0;
  border-bottom: 0.05rem solid #0d181f;
}

#amount-tobe-converted::placeholder {
  font-size: 15pt;
  font-style: italic;
}

#amount-tobe-converted:focus {
  border-bottom: 0.05rem solid #960000;
}

#amount-tobe-converted:placeholder-shown + #input-label{
  visibility: hidden;
}

#amount-tobe-converted:not(:placeholder-shown) + #input-label {
  visibility: visible;
  animation: slide .5s;
}

.input-result {
  background-color: transparent;
  border: none;
  font-style: italic;
  text-align: end;
  font-weight: bold;
}

#input-label {
  color: #ffffff;
  background-color: #960000;
  padding: 0 1rem;
  font-style: italic;
  width: 9rem;
  position: absolute;
  top: 1.5rem;
}

#currency-action {
  background-color: #45a29e;
  width: 20rem;
  height: calc(100vh - 3rem);
  display: flex;
  align-items: center;
}

.form {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.select-currency {
  width: 75%;
  font-size: 15pt;
  cursor: pointer;
  background-color: #0d181f;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  color: #adadad;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0.2rem 0.5rem;
  margin: 0.2rem auto;
  box-shadow: 0.1rem 0.1rem 0.1rem #4e4e4ea6,
    -0.05rem -0.05rem 0.1rem #39807ceb;
}

select:hover {
  color: #0d181f;
  background-color: #45a29e;
}

#result-section {
  margin: 0.2rem auto;
  width: 75%;
  border: 0.1rem solid #960000;
  border-radius: 0.5rem;
  height: 2rem;
  box-shadow: 0.1rem 0.1rem 0.1rem #4e4e4ea6,
    -0.05rem -0.05rem 0.1rem #960000cb;
}

#convert-btn {
  border-radius: 0 0.35rem 0.35rem 0;
  background-color: #960000;
  border: none;
  outline: none;
  top: -0.01rem;
  cursor: pointer;
  background-position: center;
  transition: background 0.8s;
}

#convert-btn:hover {
  background: #45a29e radial-gradient(circle, transparent 1%, #45a29e 1%) center/15000%;
  color: #960000;
}

#convert-btn:active {
  background-color: #63e2dd;
  color: #960000;
  background-size: 100%;
  transition: background 0s;
}

@media screen and (max-width: 750px) {
  #currency-action {
    width: 100vw;
    margin-top: 20rem;
    height: 20rem;
  }

  .select-currency {
    font-size: 12pt;
  }
}

@keyframes slide{
  0%{
    opacity: 0;
    top: 1rem;
  }
  100%{
    opacity: 1;
    top: 1.5rem;
  }
}

</style>
