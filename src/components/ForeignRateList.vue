<template>
  <div class="foreign-exchange container">
    <div class="foreign-card row" v-for="(rate, i) in rates" v-bind:key="i">
      <div class="foreign-code col-3">
        {{rate.code}}
      </div>
      <div class="col-9">
        <div class="foreign-name">
          {{rate.currency_name}}
        </div>
        <div class="foreign-rate">
          {{parsingAmount(rate.amount, amount)}} {{rate.code}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['amount'],
  computed: {
    rates () {
      return this.$store.state.rates
    }
  },
  methods: {
    parsingAmount (amount, multiplier) {
      const newAmount = (amount * multiplier).toLocaleString()
      return newAmount
    }
  }
}
</script>

<style scoped>

.foreign-card {
  padding: 1rem 0;
  border-bottom: 0.1rem solid #1e262b;
  margin-top: 0.5rem;
}

.foreign-code {
  font-size: 30pt;
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f51ca8;
  text-shadow: 0.15rem 0.15rem 0.01rem #000000;
}

.foreign-name {
  font-size: 12pt;
  color: #5db8ec;
  box-shadow: inset 0.25rem 0.25rem 0.1rem #131313,
    inset -0.1rem -0.1rem 0.1rem grey;
  width: 100%;
  border: 0.1rem solid;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
}

.foreign-rate {
  text-align: end;
  font-size: 15pt;
  color: #adadad;
}

/* BASIC SKELETON LOADER CONFIGURATION FORGET -WEBKIT! */
.foreign-exchange:empty{
  -webkit-animation-duration: 1.8s;
  animation-duration: 1.8s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: skeleton-loader-data-v-a904f8dc;
  animation-name: skeleton-loader-data-v-a904f8dc;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  background: linear-gradient(to right, #0d181f 10%, #172c3a 40%, #0d181f 50%);
  background-size: 40rem 1rem;
  height: 85%;
}

@keyframes skeleton-loader{
  0%{
    background-position: -20rem 0
  }
  100%{
    background-position: 20rem 0
  }
}

</style>
