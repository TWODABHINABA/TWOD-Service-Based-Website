import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <div className="bg-primary text-secondary flex items-center justify-between py-4 px-6 border-b border-gray-300 relative">
      
      {/* Logo */}
      <h1 className="font-bold text-lg cursor-pointer" onClick={() => navigate('/')}>
        TWOD
      </h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavLink to="/" className="hover:text-white">HOME</NavLink>
        <NavLink to="/project" className="hover:text-white">PROJECT</NavLink>
        <NavLink to="/team" className="hover:text-white">TEAM</NavLink>
        <NavLink to="/contact" className="hover:text-white">CONTACT US</NavLink>
      </ul>

      {/* Desktop Profile or Login */}
      <div className="relative hidden md:block">
        {isLoggedIn ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>▼</span>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md p-3 z-10">
                <p
                  onClick={() => {
                    navigate('/myprofile');
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-primary mb-2"
                >
                  My Profile
                </p>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-primary"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-primary px-6 py-2 rounded-full font-semibold text-sm hover:bg-opacity-80"
          >
            CREATE ACCOUNT
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center gap-4">
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
        <div className="fixed inset-0 z-30 bg-white text-black px-6 py-4 md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-primary">TWOD</h1>
            <button onClick={() => setShowMobileMenu(false)}>
              <img
                src="https://img.icons8.com/ios-filled/24/delete-sign.png"
                alt="Close"
                className="w-6 h-6"
              />
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-base font-medium">
            <NavLink onClick={() => setShowMobileMenu(false)} to="/">HOME</NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to="/project">PROJECT</NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to="/team">TEAM</NavLink>
            <NavLink onClick={() => setShowMobileMenu(false)} to="/contact">CONTACT US</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/myprofile">My Profile</NavLink>
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
