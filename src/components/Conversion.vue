<template>
  <div id="currency-action">
    <div id="conversion-form">
      <div id="conversion-title">
        <h1>Convert-O-Matic</h1>
        <p>automatic conversion from your desired amount</p>
      </div>
      <div class="input-section">
        <input
          type="number"
          v-model="amount"
          id="amount-tobe-converted"
        />
        <button
          class="toggle-selection"
          @click="toggleClickedBase()"
          ref="clickedBase"
        >
          <p>{{base}}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            heigth="10"
            width="10"
            viewBox="0 0 400 400"
          >
            <path
              class="cls-1"
              d="M200,354.97L378.959,44.03H21.041L200,354.97"
            />
          </svg>
        </button>
        <Rates
          v-if="baseClicked"
          @setCode="setCode($event)"
        />
      </div>
      <div
        id="change-icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="40"
          height="40"
          viewBox="0 0 400 400"
          @click="alterBase"
        >
          <image
              id="Rectangle_1_copy"
              data-name="Rectangle 1 copy"
              x="10"
              y="109"
              width="380"
              height="182"
              xlink:href="data:img/png;base64,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"
          />
        </svg>
      </div>
      <div class="input-section">
        <input
          type="text"
          class="input-result"
          v-model="result"
          disabled
        >
        <button
          class="toggle-selection"
          @click="toggleClickedTarget()"
          ref="clickedTarget"
        >
          <p>{{target}}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            heigth="10"
            width="10"
            viewBox="0 0 400 400"
          >
            <path
              class="cls-1"
              d="M200,354.97L378.959,44.03H21.041L200,354.97"
            />
          </svg>
        </button>
        <Rates
          v-if="targetClicked"
          @setCode="setCode($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Rates from './Rates'

export default {
  data () {
    return {
      base: 'EUR',
      target: 'USD',
      amount: null,
      result: null,
      baseClicked: false,
      targetClicked: false
    }
  },
  components: {
    Rates
  },
  watch: {
    amount () {
      this.watcherAction()
    },
    base () {
      this.watcherAction()
    },
    target () {
      this.watcherAction()
    }
  },
  computed: {
    rates () {
      return this.$store.state.rates
    }
  },
  methods: {
    alterBase () {
      const newBase = this.target
      this.target = this.base
      this.base = newBase
    },
    toggleClickedBase () {
      const className = this.$refs.clickedBase.className
      this.$refs.clickedTarget.className = 'toggle-selection'
      if (className === 'toggle-selection') {
        this.$refs.clickedBase.className += ' active'
      } else {
        this.$refs.clickedBase.className = 'toggle-selection'
      }
      this.targetClicked = false
      this.baseClicked = !this.baseClicked
    },
    toggleClickedTarget () {
      const className = this.$refs.clickedTarget.className
      this.$refs.clickedBase.className = 'toggle-selection'
      if (className === 'toggle-selection') {
        this.$refs.clickedTarget.className += ' active'
      } else {
        this.$refs.clickedTarget.className = 'toggle-selection'
      }
      this.baseClicked = false
      this.targetClicked = !this.targetClicked
    },
    setCode (code) {
      if (this.targetClicked) this.target = code
      if (this.baseClicked) this.base = code
      this.$refs.clickedTarget.className = 'toggle-selection'
      this.$refs.clickedBase.className = 'toggle-selection'
      this.targetClicked = false
      this.baseClicked = false
    },
    convert () {
      const baseRate = this.rates.find(({ code }) => code === this.base)
      const targetRate = this.rates.find(({ code }) => code === this.target)
      const result = (+this.amount * targetRate.amount) / baseRate.amount
      this.result = result.toLocaleString()
    },
    watcherAction () {
      this.convert()
      if (!this.amount) this.result = null
      else {
        if (this.result.length > 24) this.amount = 1
      }
    }
  }
}
</script>

<style lang="scss">

@import '../assets/styles/mixins';
@import '../assets/styles/variables';

@mixin toggle-selection-btn{
  background: $pink;

  p, svg{
    color: white;
    fill: white;
  }
}

#currency-action{
  @include flexbox (column, center, center);
  width: 20rem;
  height: calc(100vh - 3rem);
  margin: 0 10rem;
}

#conversion-form {
  width: 100%;
}

#change-icon {
  width: 100%;
  text-align: center;
  height: 40px;

  svg{
    cursor: pointer;
  }
}

#conversion-title{
  @include flexbox (column, center, center);
  margin: 2rem 0;
  color: $dark-blue;

  p{
    text-align: justify;
    font-size: 8.5pt;
  }
}

.input-section{
  @include flexbox (row, space-between, center);
  margin: 0.2rem 1rem;
  height: 3rem;
  border-radius: 0.3rem;
  border: 0.05rem solid $pink;

  input{
    border: none;
    background: transparent;
    margin: 0 0.5rem;
    text-align: right;
  }
}

.toggle-selection{
  @include flexbox (row, space-between, center);
  width: 3.5rem;
  border: none;
  background: transparent;
  height: 100%;
  padding: 0 0.5rem;

  &:hover{
    @include toggle-selection-btn;
  }

  p{
    font-size: 8pt;
    color: $dark-blue;
  }

  svg{
    fill: $dark-blue;
    height: 0.5rem;
    width: 0.5rem;
  }
}

.toggle-selection.active{
  @include toggle-selection-btn;

  svg{
    transform: rotate(180deg);
  }
}

@media screen and (max-width: 750px) {
  #currency-action{
    position: fixed;
    width: 100vw;
    bottom: 0;
    height: calc(100% - 18rem);
    margin: 0;
  }

  .input-section{
    input{
      width: 75%;
    }
  }
}

</style>
