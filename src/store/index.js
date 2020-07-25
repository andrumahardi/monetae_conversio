import Vue from 'vue'
import Vuex from 'vuex'
import { httpRequest } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    base: {},
    rates: {}
  },
  mutations: {
    SET_CURRENCY_DATA (state, { base, rates }) {
      state.base = base
      state.rates = rates
    }
  },
  actions: {
    async fetchCurrenciesAsync ({ commit, state }, { currentDate, previousDate }) {
      let sessionData = JSON.parse(sessionStorage.getItem('data'))
      if (!sessionData) {
        try {
          const { data } = await httpRequest.get(
            `/currency/historical/${currentDate}`
          )
          const previousValue = await httpRequest.get(
            `/currency/historical/${previousDate}`
          )
          sessionData = {
            current: data,
            previous: previousValue.data
          }
          sessionStorage.setItem('data', JSON.stringify(sessionData))
        } catch (err) {
          console.log(err.message)
        }
      }
      const { current } = sessionData
      const base = {
        code: current.base_currency_code,
        name: current.base_currency_name
      }
      const rates = {}
      for (const keys in sessionData) {
        rates[keys] = Object.keys(sessionData[keys].rates).map(code => {
          const newRates = {
            code,
            currency_name: sessionData[keys].rates[code].currency_name,
            amount: Number(sessionData[keys].rates[code].rate_for_amount)
          }
          return newRates
        })
      }
      commit('SET_CURRENCY_DATA', { base, rates })
    }
  }
})
