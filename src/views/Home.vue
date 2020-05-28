<template>
  <div>
    <Navbar />
    <div id="home-screen">
      <MainBody />
      <ActionBody />
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
import ActionBody from '../components/ActionBody'
import MainBody from '../components/MainBody'

export default {
  components: { Navbar, ActionBody, MainBody }
}
</script>

<style scoped>

#home-screen{
  display: flex;
  width: 100vw;
  background-color: #0d181f;
}

@media screen and (max-width: 750px) {
  #home-screen {
    flex-direction: column;
  }
}

</style>
