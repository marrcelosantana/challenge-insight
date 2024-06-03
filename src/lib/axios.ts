import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://challenge-insight-api-3ed6399e7cfd.herokuapp.com',
})
