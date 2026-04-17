import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { Capacitor } from '@capacitor/core'

const baseURL = Capacitor.isNativePlatform()
  ? 'https://YOUR_PRODUCTION_API_URL/api'  // Replace with your hosted backend URL
  : '/api'

const api = axios.create({ baseURL })

api.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const searchFoods = (q, restaurant) =>
  api.get('/foods/search', { params: { q, restaurant } }).then(r => r.data)

export const getRestaurants = () =>
  api.get('/foods/restaurants').then(r => r.data)

export const getFavorites = () =>
  api.get('/favorites').then(r => r.data)

export const createFavorite = (name, items) =>
  api.post('/favorites', { name, items }).then(r => r.data)

export const deleteFavorite = (id) =>
  api.delete(`/favorites/${id}`)
