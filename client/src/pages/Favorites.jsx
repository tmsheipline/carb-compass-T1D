import { useState, useEffect } from 'react'
import { getFavorites } from '../api'
import FavoriteCard from '../components/FavoriteCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch(() => setError('Could not load favorites — is the server running?'))
      .finally(() => setLoading(false))
  }, [])

  function handleDeleted(id) {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }

  if (loading) return <p className="text-center text-navy-500 py-16">Loading…</p>
  if (error)   return <p className="text-center text-red-400 py-16">{error}</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-navy-100">Saved Meals</h1>
        <p className="text-navy-500 text-sm mt-1">Your go-to orders, carbs ready at a glance.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🍔</p>
          <p className="text-navy-400 font-medium">No saved meals yet.</p>
          <p className="text-navy-600 text-sm mt-1">Search for food, build a meal, and save it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map(meal => (
            <FavoriteCard key={meal.id} meal={meal} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  )
}
