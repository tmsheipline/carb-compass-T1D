import { useState, useEffect, useCallback } from 'react'
import { searchFoods, getRestaurants } from '../api'
import { getLogoUrl } from '../api/restaurantLogos'
import RestaurantFilter from '../components/RestaurantFilter'
import FoodCard from '../components/FoodCard'
import MealBuilder from '../components/MealBuilder'
import { useNavigate } from 'react-router-dom'

function RestaurantGrid({ restaurants, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
      {restaurants.map(r => {
        const logo = getLogoUrl(r)
        return (
          <button
            key={r}
            onClick={() => onSelect(r)}
            className="flex flex-col items-center gap-2 bg-navy-800 border border-navy-700 rounded-2xl p-4 hover:border-brand-500 hover:shadow-lg transition-all group"
          >
            {logo
              ? <img src={logo} alt={r} className="h-10 w-10 rounded-xl object-contain" />
              : <div className="h-10 w-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-400 font-bold text-lg">{r[0]}</div>
            }
            <span className="text-xs font-semibold text-navy-300 group-hover:text-brand-400 text-center leading-tight">{r}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [query, setQuery]           = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [results, setResults]       = useState([])
  const [meal, setMeal]             = useState([])
  const [loading, setLoading]       = useState(false)
  const [searched, setSearched]     = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getRestaurants().then(setRestaurants).catch(() => {})
  }, [])

  const search = useCallback(async () => {
    if (!query.trim() && !restaurant) return
    setLoading(true)
    setSearched(true)
    try {
      const data = await searchFoods(query, restaurant)
      setResults(data)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query, restaurant])

  useEffect(() => {
    if (!query && !restaurant) { setResults([]); setSearched(false); return }
    const t = setTimeout(search, 400)
    return () => clearTimeout(t)
  }, [query, restaurant, search])

  function addToMeal(item) {
    setMeal(prev => {
      const existing = prev.find(m => m.item.id === item.id)
      if (existing) return prev.map(m => m.item.id === item.id ? { ...m, qty: m.qty + 1 } : m)
      return [...prev, { item, qty: 1 }]
    })
  }

  function removeFromMeal(id) {
    setMeal(prev => prev.filter(m => m.item.id !== id))
  }

  function handleRestaurantSelect(r) {
    setRestaurant(r)
  }

  const mealIds   = new Set(meal.map(m => m.item.id))
  const showLanding = !searched && !loading

  return (
    <div>
      {/* Hero */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-navy-100 leading-tight">
          Know your carbs<br />
          <span className="text-brand-500">before you order.</span>
        </h1>
        <p className="text-navy-400 mt-2 text-sm leading-relaxed">
          Fast food carb counts for T1D — search any item or browse by restaurant.
        </p>
      </div>

      {/* Search */}
      <input
        className="input mb-3"
        placeholder="Search menu items (e.g. Big Mac, Burrito…)"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && search()}
      />

      {/* Filter pills — only show when searching */}
      {searched && restaurants.length > 0 && (
        <RestaurantFilter
          restaurants={restaurants}
          selected={restaurant}
          onChange={setRestaurant}
        />
      )}

      <MealBuilder
        meal={meal}
        onRemove={removeFromMeal}
        onSaved={() => { setMeal([]); navigate('/favorites') }}
      />

      {/* Landing: restaurant grid */}
      {showLanding && restaurants.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-navy-500 uppercase tracking-widest mb-3">Browse by restaurant</p>
          <RestaurantGrid restaurants={restaurants} onSelect={handleRestaurantSelect} />
          <p className="mt-4 text-xs text-amber-400 bg-amber-950/40 border border-amber-800 rounded-xl px-3 py-2">
            Nutritional info is approximate — always verify with the restaurant for critical dosing decisions.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="mt-4">
        {loading && <p className="text-center text-navy-400 py-8">Searching…</p>}
        {!loading && searched && results.length === 0 && (
          <p className="text-center text-navy-400 py-8">No results found.</p>
        )}
        {!loading && searched && results.length > 0 && (
          <>
            {restaurant && (
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-navy-500 uppercase tracking-widest">{results.length} items</p>
                <button onClick={() => { setRestaurant(''); setSearched(false) }} className="text-xs text-brand-500 hover:underline">Clear</button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map(item => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onAdd={addToMeal}
                  inMeal={mealIds.has(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
