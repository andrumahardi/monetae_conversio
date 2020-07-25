<template>
  <div id="collection">
    <Navbar />
    <Poster />
    <section id="collection-section">
      <div id="base">
        <div>
          <span class="code">EUR</span>
          <span class="name">
            Rates value base on <br/>European Euro
          </span>
        </div>
        <span id="filter-search">
          <input
            v-model="searchFilter"
            type="text"
          >
          <img
            src="../assets/search.png"
            alt="Search"
          />
        </span>
      </div>
      <div
        id="collection-container"
      >
        <div
          v-for="{code, currency_name, amount} in rates"
          :key="code"
          class="collections"
          :ref="code"
        >
          <span class="code">{{code}}</span>
          <span class="amount">{{amount.toLocaleString()}}</span>
          <span class="name">{{currency_name}}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
import Poster from '../components/Poster'

export default {
  data () {
    return {
      searchFilter: null
    }
  },
  components: { Navbar, Poster },
  computed: {
    rates () {
      return this.$store.state.rates
    }
  },
  watch: {
    searchFilter () {
      const value = this.searchFilter.toUpperCase()
      this.rates.forEach(rate => {
        const name = rate.currency_name.toUpperCase()
        if (rate.code.indexOf(value) > -1 || name.indexOf(value) > -1) {
          this.$refs[rate.code][0].style.display = ''
        } else {
          this.$refs[rate.code][0].style.display = 'none'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/styles/mixins';
@import '../assets/styles/variables';

@mixin collection{
  @include flexbox (row, space-between, center);
  padding: 0.2rem;
  position: relative;
  width: 100%;
  cursor: default;
}

@mixin code-style{
  color: white;
  border-color: white;
  text-shadow: 0.1rem 0.1rem 0.1rem #062f35;
}

@mixin name-style{
  display: flex;
  align-items: center;
  color: white;
}

#collection{
  background: url('../assets/background.png');
  background-position: center;
  background-size: cover;
}

#collection-section
{
  @include flexbox (column, flex-start, flex-end);
  height: calc(100vh - 6rem);
  margin: 0 5rem;
  margin-top: 3rem;
}

#collection-container{
  max-height: 26.5rem;
  overflow-y: scroll;
  border: 0.1rem solid $purple;
  width: $collection-width;

  &::-webkit-scrollbar{
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb{
    border-radius: 0.5rem;
    background: $purple;
  }
}

.collections{
  @include collection;
  padding: 0.2rem 1.5rem;

  &:hover{
    background: #2f5498;
  }

  &:hover .code{
    @include code-style;
  }

  &:hover .name{
    @include name-style;
    background: #2f5498;
  }
}

#base {
  @include collection;
  background: $purple;
  padding: 1rem 0.5rem;
  width: $collection-width;

  div{
    @include flexbox(row, space-between, center);

    .code{
      @include code-style;
      margin-left: 1rem;
    }

    .name{
      @include name-style;
      background: transparent;
      position: static;
      margin-left: 1.5rem;
    }
  }
}

#filter-search{
  @include flexbox(row, space-between, center);
  width: 40%;
  padding: 0.2rem;
  border-radius: 0.3rem;
  border: 0.05rem solid white;

  input{
    width: 80%;
    background: none;
    border: none;
    color: white;
    font-size: 10pt;
  }

  img{
    width: 1rem;
    height: 1rem;
  }
}

.code{
  display: block;
  width: 2rem;
  color: $pink;
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 15pt;
  text-shadow: 0.1rem 0.1rem 0.1rem black;
  font-weight: bold;
  padding: 0 0.2rem;
  border: 0.1rem solid $pink;
}

.amount{
  margin-left: 1.75rem;
  color: $purple;
}

.name{
  display: none;
  position: absolute;
  height: 100%;
  background: white;
  font-size: 8pt;
  left: 6rem;
}

@media screen and (max-width: $mobile-breakpoint) {
  #collection{
    background: none;
  }

  #collection-section{
    @include flexbox(row, center, center);
    width: 100%;
    height: unset;
    margin: 0;
    margin-top: 1.5rem;
  }

  #base,
  #collection-container
  {
    width: 90%;
  }

  .collections{
    .name{
      position: absolute;
      text-align: right;
      left: 1.5rem;
      width: unset;
      min-width: 5rem;
    }
  }

  #collection-container{
    max-height: 17rem;
  }
}

</style>
