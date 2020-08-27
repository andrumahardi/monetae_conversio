<template>
  <div id="main">
    <Navbar />
    <Poster />
    <div id="home-screen">
      <Conversion />
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
import Conversion from '../components/Conversion'
import Poster from '../components/Poster'

export default {
  components: { Navbar, Conversion, Poster }
}
</script>

<style lang="scss">

@import '../assets/styles/mixins';
@import '../assets/styles/variables';

#main{
  background: url('../assets/background.png');
  background-position: center;
  background-size: cover;
}

#home-screen{
  @include flexbox (row, flex-end, center);
}

@media screen and (max-width: $mobile-breakpoint) {
  #main{
    background: none;
  }

  #home-screen {
    flex-direction: column;
  }
}

</style>
