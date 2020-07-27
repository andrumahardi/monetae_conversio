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
    },
    APPEND_CURRENCY_DATA (state, { previous }) {
      state.rates = { ...state.rates, previous }
    }
  },
  actions: {
    async fetchCurrenciesAsync ({ commit }, { currentDate }) {
      let sessionData = JSON.parse(sessionStorage.getItem('currentRates'))
      if (!sessionData) {
        try {
          const { data } = await httpRequest.get(
            `/currency/historical/${currentDate}`
          )
          sessionData = data
          sessionStorage.setItem('currentRates', JSON.stringify(sessionData))
        } catch (err) {
          console.log(err.message)
        }
      }
      const base = {
        code: sessionData.base_currency_code,
        name: sessionData.base_currency_name
      }
      const rates = {}
      rates.current = Object.keys(sessionData.rates).map(code => {
        return {
          code,
          currency_name: sessionData.rates[code].currency_name,
          amount: Number(sessionData.rates[code].rate_for_amount)
        }
      })
      commit('SET_CURRENCY_DATA', { base, rates })
    },
    async fetchPreviousCurrencies ({ commit }, { previousDate }) {
      let sessionData = JSON.parse(sessionStorage.getItem('previousRates'))
      if (!sessionData) {
        try {
          const { data } = await httpRequest.get(
            `/currency/historical/${previousDate}`
          )
          sessionData = data
          sessionStorage.setItem('previousRates', JSON.stringify(sessionData))
        } catch (err) {
          console.log(err)
        }
      }
      const previous = Object.keys(sessionData.rates).map(code => {
        return {
          code,
          currency_name: sessionData.rates[code].currency_name,
          amount: Number(sessionData.rates[code].rate_for_amount)
        }
      })
      commit('APPEND_CURRENCY_DATA', { previous })
    }
  }
})
