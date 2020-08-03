<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    if (this.$route.path !== '/') {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">

#app{
  height: 100%;
  width: 100%;
}

*, p, label{
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h1, h2, h3, h4, h5{
  font-family: 'Rosario', sans-serif;
}

a, a:hover{
  text-decoration: none;
  color: black;
}

button, a{
  cursor: pointer;
}

button, input{
  &:focus{
    outline: none;
  }
}

</style>
