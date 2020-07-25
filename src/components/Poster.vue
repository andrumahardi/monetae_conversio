<template>
  <div id="poster">
    <h1>Monetae Conversio</h1>
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

    h1, p{
      position: absolute;
      right: 0;
      color: $dark-blue;
      word-wrap: break-word;
      width: 12rem;
    }

    h1{
      top: 3rem;
      text-align: center;
    }

    p{
      top: 8.5rem;
      font-size: 8pt;
      text-align: justify;
      padding: 0.75rem;
    }
  }
}

</style>
