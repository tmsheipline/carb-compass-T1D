import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

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
