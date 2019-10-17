import axios from 'axios'

export const host = process.env.REACT_APP_HOST

const commonConfigs = {
  validateStatus: () => true,
}

export const api = axios.create({
  ...commonConfigs,
  baseURL: host,
})

export const imagga = axios.create({
  ...commonConfigs,
  baseURL: 'https://api.imagga.com/v2/',
  auth: {
    username: 'acc_49ca02957a3cdc5',
    password: 'b7ab9efa1575c13b0448972fc4e12a8d',
  },
})
