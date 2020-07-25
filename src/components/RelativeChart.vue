<template>
  <div id="relative-chart">
    <v-chart :options="option" :autoresize="true"/>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  data () {
    return {
      option: {}
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
  created () {
    if (this.rates) {
      const filteredRates = {}
      filteredRates.current = this.rates.current.filter(rate => (
        rate.amount <= 10 && rate.code !== 'EUR'
      ))
      const rateCodes = filteredRates.current.map(rate => (rate.code))
      const rateNames = filteredRates.current.map(rate => (rate.currency_name))
      filteredRates.previous = this.rates.previous.filter(rate => (
        rateCodes.includes(rate.code) && rate.code !== 'EUR'
      ))

      const option = {
        color: ['#330046', '#ff0069'],
        legend: {
          data: ['current', 'previous']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          show: false,
          data: rateNames
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            name: 'current',
            data: filteredRates.current.map(rate => rate.amount),
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#330046',
              width: 5
            }
          },
          {
            name: 'previous',
            data: filteredRates.previous.map(rate => rate.amount),
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#ff0069',
              width: 5
            }
          }
        ]
      }
      this.option = option
    }
  }
}
</script>

<style lang="scss" scoped>

#relative-chart {
  width: calc(50% - 2rem);
  height: 20rem;
  border: 0.1rem solid #157787;
  border-radius: 1rem;
  margin: 1rem;
}

.echarts {
  width: 100%;
  height: 100%;
}

</style>
