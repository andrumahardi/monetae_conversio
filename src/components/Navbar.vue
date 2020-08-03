<template>
  <nav class="no-padding-y">
    <label
      v-on:click="showMenu"
      id="sm-screen-navmenu"
    >
      <i class='fas fa-list'></i>
    </label>
    <h1 id="navbar-logo">
      Monetæ Conversio
    </h1>
    <transition name="side-slide">
      <ul
        v-if="isClicked || window.width > 600"
        id="navbar-menu"
      >
        <li
          role="button"
          class="no-padding-y"
          @click="changePage('/')"
        >
          <a>
            <p>Conversion</p>
          </a>
        </li>
        <li
          role="button"
          class="no-padding-y"
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

$padding: ('no-padding': 0, 'no-padding-y': 0 1rem);

@each $key, $value in $padding {
  .#{$key}{
    padding: $value;
  }
}

nav{
  @include flexbox (row, space-between, center);
  height: $navbar-height;
  position: relative;
  background: linear-gradient(45deg, $dark-blue, #32c8c5);
  color: white;
  box-shadow: 0 0 0.2rem 0.1rem $dark-blue;
}

#sm-screen-navmenu{
  display: none;
}

#navbar-menu{
  @include flexbox (row, flex-end, center);
  height: 100%;

  li{
    @extend #navbar-menu;
    list-style: none;
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
  }
}

</style>
