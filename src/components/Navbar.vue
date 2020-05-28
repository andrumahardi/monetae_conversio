<template>
  <nav>
      <label v-on:click="showMenu" id="show-navbar-menu">
        <i class='fas fa-list'></i>
      </label>
    <label id="navbar-logo">Monetæ Conversio</label>
    <transition name="side-slide">
      <ul  v-if="isClicked || window.width > 750" id="navbar-menu">
        <li>
          <a href="/">
            <p>HOME</p>
          </a>
        </li>
        <li>
          <a href="/">
            <p>CONTACT</p>
          </a>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isClicked: false,
      window: {
        width: 0
      }
    }
  },
  watch: {
    window: () => {
      this.showMenu()
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    showMenu () {
      this.isClicked = !this.isClicked
    },
    handleResize () {
      this.window.width = window.innerWidth
    }
  }
}
</script>

<style scoped>

nav{
  background: #0b0c10;
  height: 3rem;
  width: 100vw;
  position: relative;
}

#navbar-logo{
  font-size: 20pt;
  font-weight: bold;
  padding: 0.25rem;
  margin: 0 1rem;
  text-transform: uppercase;
}

#navbar-menu{
  float: right;
  margin: 0;
}

#navbar-menu li{
  display: inline-block;
  padding: 0.5rem;
  height: 3rem;
  font-size: 12pt;
}

#check{
  display: none;
}

#show-navbar-menu{
  padding: 0.5rem 0.75rem;
  margin-right: 1rem;
  font-size: 17pt;
  cursor: pointer;
  float: right;
  display: none;
}

#navbar-menu li a p{
  width: 6rem;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#navbar-menu li a p:hover{
  color:#0b0c10;
  background-color: #719a9b;
}

.side-slide-enter-active{
  animation: slide .5s;
}

.side-slide-leave-active{
  animation: slide .5s reverse;
}

@media screen and (max-width: 750px){
  #show-navbar-menu{
    display: flex;
    align-items: center;
    margin: 0;
    height: 100%;
  }

  #navbar-menu{
    position: absolute;
    top: 3rem;
    right: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: #0b0c10c7;
  }

  #navbar-menu li{
    margin-right: 0;
    display: block;
  }

  #navbar-menu li a p{
    display: flex;
    justify-content: center;
    font-size: 15pt;
    align-items: center;
    width: 100%;
  }

  #navbar-menu li a p{
    width: 90%;
    margin: 0 auto;
  }

}

@media screen and (max-width: 400px) {
  #navbar-logo{
    font-size: 12pt;
    display: flex;
    height: 100%;
    align-items: center;
  }

  #navbar-menu li a p{
    font-size: 12pt;
  }
}

@keyframes slide {
  0%{
    opacity: 0;
    right: -3rem
  }
  100%{
    opacity: 1;
    right: 0
  }
}

</style>
