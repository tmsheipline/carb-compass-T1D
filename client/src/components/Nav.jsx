import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import logo from '../carbcompasslogo.png'

export default function Nav() {
  const { user } = useAuth()

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
      <div className="flex items-center gap-1 ml-auto">
        <NavLink to="/" end className={linkClass}>Search</NavLink>
        <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
        {user ? (
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-navy-700">
            {user.photoURL && (
              <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-7 h-7 rounded-full" />
            )}
            <button
              onClick={() => signOut(auth)}
              className="text-xs text-navy-400 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={linkClass}>Sign in</NavLink>
        )}
      </div>
    </nav>
  )
}
