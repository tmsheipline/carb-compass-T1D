import { NavLink } from 'react-router-dom'
import logo from '../carbcompasslogo.png'

export default function Nav() {
  const linkClass = ({ isActive }) =>
    `px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
      isActive
        ? 'bg-brand-500 text-white shadow-sm'
        : 'text-navy-200 hover:text-white hover:bg-white/10'
    }`

  return (
    <nav className="bg-navy-900 border-b border-navy-700 px-6 flex items-center justify-between shadow-lg h-16 relative overflow-visible z-10">
      <img
        src={logo}
        alt="Carb Compass"
        className="h-28 w-auto object-contain absolute left-6 -bottom-16 drop-shadow-xl"
      />
      <div className="flex gap-1 ml-auto">
        <NavLink to="/" end className={linkClass}>Search</NavLink>
        <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
      </div>
    </nav>
  )
}
