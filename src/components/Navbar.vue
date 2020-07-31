<template>
  <nav>
    <label
      v-on:click="showMenu"
      id="sm-screen-navmenu"
    >
      <i class='fas fa-list'></i>
    </label>
    <h1 id="navbar-logo">Monetæ Conversio</h1>
    <transition name="side-slide">
      <ul
        v-if="isClicked || window.width > 600"
        id="navbar-menu"
      >
        <li
          role="button"
          @click="changePage('/')"
        >
          <a>
            <p>Conversion</p>
          </a>
        </li>
        <li
          role="button"
          @click="changePage('/collection')"
        >
          <a>
            <p>Collection</p>
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
    },
    changePage (path) {
      if (this.$route.path !== path) {
        this.$router.push({ path })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/styles/mixins';
@import '../assets/styles/variables';

nav{
  @include flexbox (row, space-between, center);
  padding: 0 1rem;
  height: 3rem;
  position: relative;
  background: linear-gradient(45deg, $dark-blue, #32c8c5);
  color: white;
  box-shadow: 0 0 0.2rem 0.1rem $dark-blue;
}

#sm-screen-navmenu{
  display: none;
}

#navbar-logo {
  margin: 0;
}

#navbar-menu{
  @include flexbox (row, flex-end, center);
  margin: 0;
  height: 100%;

  li{
    @include flexbox (column, center, center);
    list-style: none;
    height: 100%;
    padding: 0.2rem 0.5rem;
    font-size: 10pt;
    cursor: pointer;

    a{
      color: white;
    }
  }
}

.side-slide-enter-active{
  animation: slide 1s;
}

.side-slide-leave-active{
  animation: slide 1s reverse;
}

@keyframes slide {
  0%{
    right: 10rem;
    opacity: 0;
  }
  100%{
    right: 0;
    opacity: 1;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  #navbar-logo{
    display: none;
  }

  #sm-screen-navmenu{
    display: block;
    cursor: pointer;
  }

  #navbar-menu{
    position: absolute;
    right: 0;

    li{
      &:hover{
        background: $dark-blue;
        color: white;
      }
    }
  }
}

</style>
