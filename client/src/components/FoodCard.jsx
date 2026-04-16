import { getLogoUrl } from '../api/restaurantLogos'

function carbBadge(carbs) {
  if (carbs <= 30) return 'bg-green-50 text-carb-low border-green-200'
  if (carbs <= 60) return 'bg-amber-50 text-carb-medium border-amber-200'
  return 'bg-red-50 text-carb-high border-red-200'
}

export default function FoodCard({ item, onAdd, inMeal }) {
  const logoUrl = getLogoUrl(item.brandOwner)

  return (
    <div className="card flex items-start justify-between gap-3 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={item.brandOwner}
              className="h-8 w-8 rounded object-contain bg-gray-100 p-0.5"
            />
          )}
          <p className="text-xs text-brand-600 font-semibold uppercase tracking-wide">{item.brandOwner}</p>
        </div>
        <p className="font-semibold text-navy-100 truncate">{item.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold border ${carbBadge(item.carbohydrates)}`}>
            {item.carbohydrates}g carbs
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm text-navy-400 bg-navy-50 border border-navy-100">
            {item.calories} cal
          </span>
          {item.servingSize > 0 && (
            <span className="inline-flex items-center text-xs text-navy-300">
              per {item.servingSize}{item.servingSizeUnit}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onAdd(item)}
        className={`shrink-0 text-sm font-semibold px-3 py-1.5 rounded-xl transition-all ${
          inMeal
            ? 'bg-brand-100 text-brand-700 border border-brand-200'
            : 'btn-primary'
        }`}
      >
        {inMeal ? 'Added' : 'Add'}
      </button>
    </div>
  )
}
