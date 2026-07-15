import React, { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import NavLink from './Navlink';
import { useUser } from '../UserProvider';
import { defaultUser } from '../defaultUser';
import { useNavigate, useLocation } from 'react-router-dom';
import Notification from './Notification';
import Axios from 'axios'
import { useAlert } from '../AlertProvider'
import { checkToken } from '../checkToken';
import { useLoading } from '../LoadingProvider'

Axios.defaults.withCredentials = true

const Navbar = ({ isDark, setIsDark }) => {

  const { userData, setUserData } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const { alert, setAlert } = useAlert()
  const { setIsLoading } = useLoading()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)


  useEffect(() => {
    async function check() {
      if (await checkToken()) {
        setIsLoggedIn(true)
      }
      else {
        setIsLoggedIn(false)
      }
    }
    check()
  }, [userData])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])


  const handleLogout = async () => {
    setIsLoading(true)
    await Axios.post(`${import.meta.env.VITE_BACKEND_URL}user/logout`)
    setUserData({ ...defaultUser })
    setAlert({
      message: "User logged out.",
      type: 'success'
    })
    setIsLoading(false)
    navigate('/user/login')
  }


  return (
    <nav className="select-none sticky top-0 z-30 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">

        { !(location.pathname === '/home' || location.pathname === '/') &&
          <h1 className="page-heading text-3xl md:text-4xl">
            Skill<span className="text-gradient">Swap</span><span className="text-brand-500">.</span>
          </h1>
        }

        <button
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-200/70 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-controls="navbar-solid-bg"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">{menuOpen ? 'Close main menu' : 'Open main menu'}</span>
          {menuOpen ? (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          )}
        </button>

        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-solid-bg">
          <ul className="flex flex-col items-center gap-2 md:gap-0 font-medium mt-3 rounded-2xl p-3 bg-white/95 shadow-card md:shadow-none border border-slate-200/70 md:border-0 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:p-0 md:bg-transparent dark:bg-slate-900/95 md:dark:bg-transparent dark:border-slate-700/60 md:dark:border-0">
            <li>
              <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            </li>

            {isLoggedIn &&
              <li>
                <Notification />
              </li>
            }

            {!isLoggedIn &&
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
            }

            {isLoggedIn &&
              <li>
                <NavLink to="/swipe">Swipe</NavLink>
              </li>
            }

            {isLoggedIn &&
              <li>
                <NavLink to="/user/matches">Matches</NavLink>
              </li>
            }

            {isLoggedIn &&
              <li>
                <NavLink to="/user/profile">User</NavLink>
              </li>
            }

            <li>
              {!isLoggedIn ? (
                <NavLink to="/user/login">
                  Login
                </NavLink>
              ) : (
                <button onClick={handleLogout} className="block py-2 px-3 md:px-4 rounded-full text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-300 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors duration-200">
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
