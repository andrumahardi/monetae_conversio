<template>
  <div id="collection">
    <Navbar />
    <section id="collection-section">
      <RelativeChart />
      <CurrencyList />
    </section>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import RelativeChart from '../components/RelativeChart'
import CurrencyList from '../components/CurrencyList'

export default {
  components: { Navbar, RelativeChart, CurrencyList }
}
</script>

<style lang="scss" scoped>

@import '../assets/styles/mixins';
@import '../assets/styles/variables';

#collection-section{
  @include flexbox (row, flex-start, center);
  height: calc(100vh - 3rem);
  background: #d8dde4;
}

@media screen and (max-width: $mobile-breakpoint) {
  #collection-section{
    height: 100%;
  }
}

</style>
