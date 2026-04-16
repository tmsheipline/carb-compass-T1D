import { getLogoUrl } from '../api/restaurantLogos'

export default function RestaurantFilter({ restaurants, selected, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => onChange('')}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
          selected === ''
            ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
            : 'bg-navy-800 text-navy-300 border-navy-600 hover:border-brand-500'
        }`}
      >
        All
      </button>
      {restaurants.map(r => {
        const logo = getLogoUrl(r)
        const active = selected === r
        return (
          <button
            key={r}
            onClick={() => onChange(r)}
            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border transition-all ${
              active
                ? 'bg-navy-700 text-white border-brand-500 shadow-sm'
                : 'bg-navy-800 text-navy-300 border-navy-600 hover:border-brand-500 hover:shadow-sm'
            }`}
          >
            {logo && (
              <img
                src={logo}
                alt=""
                className="h-5 w-5 rounded-full object-contain"
              />
            )}
            <span>{r}</span>
          </button>
        )
      })}
    </div>
  )
}
