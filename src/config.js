import axios from 'axios'

export const httpRequest = axios.create({
  baseURL: process.env.VUE_APP_RAPID_API_BASE_URL,
  headers: {
    'X-RapidApi-Key': process.env.VUE_APP_RAPID_API
  }
})
