<template>
  <div id="rates-container">
    <button
      class="rates"
      v-for="rate in rates"
      :key="rate.code"
      @click="$emit('setCode', rate.code)"
    >
      <span class="rate-code">{{rate.code}}</span>
      <span class="rate-name">({{rate.currency_name}})</span>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    rates () {
      return this.$store.state.rates
    }
  }
}
</script>

<style lang="scss">

@import '../assets/styles/mixins';
@import '../assets/styles/variables';

#rates-container {
  @include flexbox(row, center, center);
  height: 7.5rem;
  overflow-y: scroll;
  width: 18rem;
  margin: 0.2rem 0;
  background: white;
  border: 0.05rem solid $pink;

  &::-webkit-scrollbar{
    width: 0.3rem;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb{
    background: $pink;
  }
}

.rates{
  @include flexbox(row, flex-start, center);
  border: none;
  width: 100%;
  padding: 0.5rem;
  background: #ddf3f8;
  color: $dark-blue;

  &:hover{
    background: $pink;
    color: white;
  }

  .rate-code {
    width: 2.5rem;
  }

  .rate-name{
    margin: 0 0.5rem;
    font-size: 7pt;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  #rates-container{
    position: fixed;
    top: 3rem;
    left: 0;
    width: 100vw;
    border-radius: 0;
    border: none;
    height: calc(100% - 3rem);
  }
}

</style>
