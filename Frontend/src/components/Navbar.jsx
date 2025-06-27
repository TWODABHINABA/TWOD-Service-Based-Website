import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import api from '../components/user-management/api';
import Toggle from './Toggle';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  // Dark mode toggle state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const isLoggedIn = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      className="
        fixed top-0 sm:top-2 md:top-4 left-1/2 transform -translate-x-1/2
        w-full sm:w-[90%] md:w-5/6
        bg-gradient-to-r from-[#D8B4FE] via-[#7C3AED] to-[#3B0A45]
        shadow-xl dark:bg-[#1d1b26]
        backdrop-blur-lg bg-white/30 dark:bg-[#1d1b26]/80
        px-4 py-2 sm:rounded-xl
        flex items-center justify-between
        font-dmSans text-white dark:text-gray-200
        transition-colors duration-300
        z-40
      "
    >
      {/* Logo */}
      <div className="relative flex items-center">
        {/* Glow behind logo for visibility */}
        <div className="absolute inset-0 rounded-xl blur-2xl opacity-60 bg-white/20 dark:bg-white/10 z-0"></div>

        <img
          src="https://i0.wp.com/thewallofdreams.com/wp-content/uploads/2025/03/logo_twod-removebg-preview.png?w=846&ssl=1"
          alt="TWOD Logo"
          className="w-32 sm:w-40 cursor-pointer rounded-lg p-2 relative z-10"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavLink to="/" className="hover:text-gray-400">
          HOME
        </NavLink>
        <NavLink to="/aboutus" className="hover:text-gray-400">
          ABOUT US
        </NavLink>
        <NavLink to="/services" className="hover:text-gray-400">
          SERVICES
        </NavLink>
        <NavLink to="/contact" className="hover:text-gray-400">
          CONTACT US
        </NavLink>
      </ul>

      {/* Dark Mode Toggle (Desktop) */}
      <div className="hidden md:block">
        <Toggle />
      </div>

      {/* User Actions (Desktop) */}
      <div className="relative hidden md:block">
        {isLoggedIn ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
              alt="Profile"
              className="w-14 h-14 rounded-full"
            />
            <span>▼</span>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md p-3 z-10 min-w-[140px]">
                {user && user.role === 'admin' && (
                  <p
                    onClick={() => {
                      navigate('/admin');
                      setShowDropdown(false);
                    }}
                    className="cursor-pointer hover:text-gray-600 mb-2 font-semibold text-black"
                  >
                    Admin Dashboard
                  </p>
                )}

                <p
                  onClick={() => {
                    navigate('/myprofile');
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-gray-600 mb-2"
                >
                  My Profile
                </p>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-gray-600"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="btnlogin">
            Log In
          </button>
        )}
      </div>

      {/* Mobile View: Dark Mode Toggle + Menu */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-xl px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☀' : '🌙'}
        </button>

        <button onClick={() => setShowMobileMenu(true)}>
          <img
            src="https://img.icons8.com/ios-filled/24/menu--v1.png"
            alt="Menu"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-30 bg-white dark:bg-black text-black dark:text-white px-6 py-4 md:hidden transition-colors">
          <div className="flex justify-between items-center mb-6">
            <img
              src="https://i0.wp.com/thewallofdreams.com/wp-content/uploads/2025/03/logo_twod-removebg-preview.png?w=846&ssl=1"
              alt="TWOD Logo"
              className="w-32"
            />
            <button onClick={() => setShowMobileMenu(false)}>
              <img
                src="https://img.icons8.com/ios-filled/24/delete-sign.png"
                alt="Close"
                className="w-6 h-6"
              />
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-base font-medium">
            <NavLink onClick={() => setShowMobileMenu(false)} to="/">
              HOME
            </NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to="/aboutus">
              ABOUT US
            </NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to="/services">
              SERVICES
            </NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to="/contact">
              CONTACT US
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/admin" className={`text-black`}  >Admin Dashboard</NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/myprofile">
                  My Profile
                </NavLink>
                <p
                  className="cursor-pointer hover:text-primary"
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                >
                  Logout
                </p>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMobileMenu(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-full font-semibold"
              >
                CREATE ACCOUNT
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
