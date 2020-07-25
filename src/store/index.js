import Vue from 'vue'
import Vuex from 'vuex'
import { httpRequest } from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    base: {},
    rates: []
  },
  mutations: {
    SET_CURRENCY_DATA (state, { base, rates }) {
      state.base = base
      state.rates = rates
    }
  },
  actions: {
    async fetchCurrenciesAsync ({ commit }, date) {
      let sessionData = JSON.parse(sessionStorage.getItem('data'))
      if (!sessionData) {
        try {
          const { data } = await httpRequest.get(
            `/currency/historical/${date}`
          )
          sessionData = data
          sessionStorage.setItem('data', JSON.stringify(data))
        } catch (err) {
          console.log(err.message)
        }
      }
      const base = {
        code: sessionData.base_currency_code,
        name: sessionData.base_currency_name
      }
      const rates = Object.keys(sessionData.rates).map(code => {
        const newRates = {
          code,
          currency_name: sessionData.rates[code].currency_name,
          amount: Number(sessionData.rates[code].rate_for_amount)
        }
        return newRates
      })
      commit('SET_CURRENCY_DATA', { base, rates })
    }
  }
})
