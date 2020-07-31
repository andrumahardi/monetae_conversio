<template>
  <div id="poster">
    <h2>Monetae Conversio</h2>
    <p>
      Simple yet reliable source to convert your currency
    </p>
  </div>
</template>

<style lang="scss">

@import '../assets/styles/variables';

#poster{
  display: none;
}

@media screen and (max-width: $mobile-breakpoint) {
  #poster{
    background: url('../assets/background.png');
    background-position: center;
    background-size: cover;
    height: 15rem;
    display: block;
    position: relative;

    h2, p{
      position: absolute;
      right: 0;
      color: $dark-blue;
      word-wrap: break-word;
      width: 12rem;
    }

    h2{
      top: 3rem;
      text-align: center;
    }

    p{
      top: 7.5rem;
      font-size: 8pt;
      right: 1.5rem;
      text-align: center;
      width: 9rem;
    }
  }
}

</style>
