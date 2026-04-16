import { deleteFavorite } from '../api'
import { getLogoUrl } from '../api/restaurantLogos'

function carbColor(carbs) {
  if (carbs <= 60)  return 'text-carb-low'
  if (carbs <= 120) return 'text-carb-medium'
  return 'text-carb-high'
}

export default function FavoriteCard({ meal, onDeleted }) {
  const totalCarbs = meal.items.reduce((s, i) => s + i.foodItem.carbohydrates * i.quantity, 0)
  const totalCals  = meal.items.reduce((s, i) => s + i.foodItem.calories * i.quantity, 0)

  const restaurants = [...new Set(meal.items.map(i => i.foodItem.brandOwner))]

  async function handleDelete() {
    if (!confirm(`Delete "${meal.name}"?`)) return
    await deleteFavorite(meal.id)
    onDeleted(meal.id)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-navy-700 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 px-5 py-4 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-white text-lg">{meal.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            {restaurants.map(r => {
              const logo = getLogoUrl(r)
              return logo
                ? <img key={r} src={logo} alt={r} className="h-5 w-5 rounded object-contain" />
                : null
            })}
            <p className="text-navy-400 text-xs">{new Date(meal.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-right">
            <p className={`text-2xl font-black ${carbColor(totalCarbs)}`}>{totalCarbs.toFixed(0)}g</p>
            <p className="text-navy-400 text-xs">carbs</p>
          </div>
          <button onClick={handleDelete} className="text-navy-500 hover:text-red-400 transition-colors text-2xl font-bold leading-none mt-1">
            ×
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="bg-navy-800 px-5 py-3 divide-y divide-navy-700">
        {meal.items.map(i => {
          const logo = getLogoUrl(i.foodItem.brandOwner)
          return (
            <div key={i.id} className="flex items-center gap-3 py-2">
              {logo && <img src={logo} alt={i.foodItem.brandOwner} className="h-6 w-6 rounded object-contain shrink-0" />}
              <span className="flex-1 text-sm text-navy-200 truncate">{i.foodItem.description}</span>
              <span className="text-sm font-bold text-navy-400 shrink-0">{(i.foodItem.carbohydrates * i.quantity).toFixed(0)}g</span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="bg-navy-900 px-5 py-2.5 flex items-center justify-between">
        <span className="text-xs text-navy-500">{meal.items.length} item{meal.items.length !== 1 ? 's' : ''}</span>
        <span className="text-xs text-navy-500">{totalCals.toFixed(0)} cal total</span>
      </div>
    </div>
  )
}
