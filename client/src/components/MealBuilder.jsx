import { useState } from 'react'
import { createFavorite } from '../api'
import { getLogoUrl } from '../api/restaurantLogos'

function carbColor(carbs) {
  if (carbs <= 60)  return 'text-carb-low'
  if (carbs <= 120) return 'text-carb-medium'
  return 'text-carb-high'
}

export default function MealBuilder({ meal, onRemove, onSaved }) {
  const [name, setName]     = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  const totalCarbs = meal.reduce((sum, { item, qty }) => sum + item.carbohydrates * qty, 0)
  const totalCals  = meal.reduce((sum, { item, qty }) => sum + item.calories * qty, 0)

  async function handleSave() {
    if (!name.trim()) { setError('Enter a meal name'); return }
    setSaving(true)
    setError('')
    try {
      await createFavorite(name.trim(), meal.map(({ item, qty }) => ({
        foodItemId: item.id,
        quantity: qty
      })))
      setName('')
      onSaved()
    } catch {
      setError('Failed to save — is the server running?')
    } finally {
      setSaving(false)
    }
  }

  if (meal.length === 0) return null

  return (
    <div className="mt-4 rounded-2xl overflow-hidden shadow-lg border border-navy-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg">Current Meal</h2>
          <p className="text-navy-300 text-xs mt-0.5">{meal.length} item{meal.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-black ${carbColor(totalCarbs)}`}>
            {totalCarbs.toFixed(0)}g
          </p>
          <p className="text-navy-300 text-xs">total carbs</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-navy-800 px-5 py-3 divide-y divide-navy-700">
        {meal.map(({ item, qty }) => {
          const logo = getLogoUrl(item.brandOwner)
          return (
            <div key={item.id} className="flex items-center gap-3 py-2.5">
              {logo && (
                <img src={logo} alt={item.brandOwner} className="h-7 w-7 rounded object-contain shrink-0" />
              )}
              <span className="flex-1 text-sm font-medium text-navy-200 truncate">{item.description}</span>
              <span className="text-sm font-bold text-navy-500 shrink-0">
                {(item.carbohydrates * qty).toFixed(0)}g
              </span>
              <button
                onClick={() => onRemove(item.id)}
                className="text-navy-300 hover:text-red-500 transition-colors text-lg font-bold leading-none shrink-0"
              >
                ×
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="bg-navy-900 border-t border-navy-700 px-5 py-4">
        <div className="flex items-center gap-3 mb-1 text-xs text-navy-400 font-medium">
          <span>{totalCals.toFixed(0)} cal total</span>
        </div>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="Name this meal…"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          <button className="btn-primary shrink-0" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  )
}
