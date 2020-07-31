<template>
  <div id="currency-list">
    <div id="currency-list-header">
      <h3>
        Today's rates value
      </h3>
      <span>
        <input
          v-model="searchFilter"
          type="text"
          placeholder="search any..."
        >
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
        <span class="name">{{currency_name}}</span>
        <span class="amount">{{amount.toLocaleString()}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchFilter: null
    }
  },
  computed: {
    rates () {
      return this.$store.state.rates.current
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
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

#currency-list{
  @include flexbox(row, center, flex-start);
  height: 37rem;
  width: calc(50% - 2rem);
  margin: 1rem;
  position: relative;
  border-radius: 1rem;
  box-shadow: 0.5rem 0.5rem 1rem #a1a1a1, -0.3rem -0.3rem 0.5rem white;
}

#currency-list-header{
  @include flexbox (column, center, center);
  height: 6rem;

  h3{
    font-size: 18pt;
  }

  span{
    @include flexbox (row, center, center);
    width: 15rem;
    height: 2.5rem;
    border: 0.01rem solid #d3efee;
    border-radius: 1rem;
    box-shadow: inset 0.2rem 0.2rem 0.3rem 0.1rem #cec8db,
      inset -0.2rem -0.2rem 0.2rem white;

    input {
      border: none;
      font-size: 10pt;
      width: 90%;
      background: transparent;

      &::placeholder{
        font-size: 10pt;
      }
    }
  }
}

#collection-container {
  height: calc(100% - 8rem);
  width: 90%;
  overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb{
    background: $orange;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track{
    box-shadow: inset 0.2rem 0.2rem 0.2rem #c7c1c1,
      inset -0.2rem -0.2rem 0.2rem white;
    border-radius: 1rem;
  }
}

.collections{
  @include flexbox(row, space-between, center);
  background: linear-gradient(45deg, $dark-blue, #32c8c5);
  height: 3rem;
  padding: 0 0.5rem;
  margin: 0.5rem 1rem 0.5rem 0.5rem;
  position: relative;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.2rem #b1b1b1,
    -0.2rem -0.2rem 0.2rem white;

  &:hover{
    .code{
      animation: slide-right .5s;
      display: flex;
      left: 0;
    }

    .name{
      animation: append-margin .5s;
      margin-left: 4rem;
    }
  }
}

.code{
  @include flexbox(row, center, center);
  position: absolute;
  background: linear-gradient(45deg, $orange, #fabc37);
  border-radius: 0.5rem 0 0 0.5rem;
  color: white;
  height: inherit;
  width: 4rem;
  display: none;
}

.name {
  color: #30c1c0;
}
.amount{
  color:white
}

@keyframes slide-right{
  0%{ left: -10rem; }
  100%{ left: 0; }
}

@keyframes append-margin{
  0%{ margin-left: 0; }
  100%{ margin-left: 4rem; }
}

@media screen and (max-width: $mobile-breakpoint) {
  #currency-list {
    width: 100%;
  }

  #currency-list-header{
    flex-direction: row;

    h3{
      font-size: 12pt;
      margin: 0;
      padding: 1rem;
    }
  }

  .collections{
    &:hover{
      .name{
        width: 8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .name{
    font-size: 10pt;
  }

  .amount{
    font-size: 10pt;
  }
}

</style>
