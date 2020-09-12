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

    const current = new Date()
    const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`

    this.$store.dispatch('fetchCurrenciesAsync', { currentDate })

    const previous = new Date()
    previous.setDate(previous.getDate() - 7)
    const previousDate = `${previous.getFullYear()}-${previous.getMonth() + 1}-${previous.getDate()}`

    setTimeout(() => {
      this.$store.dispatch('fetchPreviousCurrencies', { previousDate })
    }, 2000)
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
