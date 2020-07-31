<template>
  <div id="chart-container">
    <div id="growth-values">
      <div
        v-for="rate in chosenRates"
        :key="rate.code"
        class="growth-cards"
      >
        <h3 class="growth-titles">
          {{rate.currency_name}} ({{rate.code}})
        </h3>
        <div class="growth-body">
          <div>
            <p class="subtitle">Last week's value</p>
            <p class="previous-amount">{{(rate.previousAmount).toLocaleString()}}</p>
          </div>
          <div class="percentage-content">
            <p class="subtitle">Value growth</p>
            <p
              class="percentage"
              :style="growth(rate.growth)"
            >
              {{rate.growth}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="relative-chart">
      <h3>Value growth within last week</h3>
      <v-chart :options="option" :autoresize="true"/>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  data () {
    return {
      option: {},
      chosenRates: []
    }
  },
  computed: {
    rates () {
      return this.$store.state.rates
    }
  },
  components: {
    'v-chart': ECharts
  },
  methods: {
    growth (value) {
      let colorStyle = 'color: #0c850c;'
      if (value.split('')[0] === '-') colorStyle = 'color: #c70d0d;'
      return colorStyle
    },
    fourChosenRates ({ current, previous }) {
      const chosen = ['IDR', 'JPY', 'USD', 'GBP']
      const filteredValue = current
        .filter(({ code }) => (
          chosen.includes(code)
        ))
        .map(filtered => {
          const { amount } = previous.find(previous => (
            filtered.code === previous.code
          ))
          const growth = filtered.amount > amount
            ? `+${(filtered.amount / amount).toFixed(3)}`
            : `-${(filtered.amount / amount).toFixed(3)}`
          return { ...filtered, previousAmount: amount, growth }
        })
      this.chosenRates = filteredValue
    }
  },
  mounted () {
    this.fourChosenRates(this.rates)

    const filteredRates = {}
    filteredRates.current = this.rates.current.filter(rate => (
      rate.amount < 2 && rate.code !== 'EUR'
    ))
    const rateCodes = filteredRates.current.map(rate => (rate.code))
    filteredRates.previous = this.rates.previous.filter(rate => (
      rateCodes.includes(rate.code) && rate.code !== 'EUR'
    ))

    const option = {
      legend: {
        data: ['Today', 'Last Week']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: rateCodes,
        axisLine: {
          lineStyle: {
            color: '#28acaf'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#28acaf'
          }
        }
      },
      series: [
        {
          name: 'Today',
          data: filteredRates.current.map(rate => rate.amount),
          type: 'bar',
          itemStyle: {
            color: '#157686',
            barBorderRadius: [20, 20, 0, 0]
          }
        },
        {
          name: 'Last Week',
          data: filteredRates.previous.map(rate => rate.amount),
          type: 'bar',
          itemStyle: {
            color: '#ee8d13',
            barBorderRadius: [20, 20, 0, 0]
          }
        }
      ]
    }
    this.option = option
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/mixins';

#chart-container{
  width: calc(50% - 2rem);
}

#growth-values {
  @include flexbox(row, flex-start, center);
  height: 16rem;
  margin: 0.5rem;
}

.growth-titles {
  text-align: center;
}

.growth-cards {
  width: calc(50% - 2rem);
  box-shadow: 0.5rem 0.5rem 0.5rem #a1a1a1, -0.2rem -0.2rem 0.5rem white;
  margin: 0 0.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
}

.percentage-content{
  @include flexbox(column, center, flex-end);
}

.subtitle{
  font-size: 8pt;
  font-style: italic;
}

.percentage{
  color: #0c850c;
  font-weight: bold;
  font-size: 20pt;
  font-style: normal;
}

.previous-amount{
  font-weight: bold;
  font-size: 10pt;
  font-style: normal;
}

#relative-chart {
  height: 20rem;
  box-shadow: 0.5rem 0.5rem 0.5rem #a1a1a1, -0.2rem -0.2rem 0.5rem white;
  border-radius: 1rem;
  margin: 1rem;

  h3{
    font-size: 18pt;
    padding: 1rem 0;
    text-align: center;
  }
}

.echarts {
  width: 100%;
  height: 15.75rem;
}

@media screen and (max-width: $mobile-breakpoint) {
  #chart-container{
    width: 100%;
  }

  #relative-chart {
    h3{
      font-size: 12pt;
    }
  }

  .growth-titles {
    font-size: 8pt;
    margin-bottom: 0.5rem;
  }

  .subtitle{
    font-size: 6pt;
  }
}

</style>
