import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

function Header() {
  const { isLogged, logout, user } = useAuth();
  const [darkThen, setDarkThem] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      setDarkThem(true);
    }
  }, []);

  const toggleTheme = () => {
    const dark = localStorage.getItem("dark");
    document.documentElement.classList.toggle("dark");
    setDarkThem((old) => !old);
    if (dark) {
      const dark = localStorage.removeItem("dark");
    } else {
      const dark = localStorage.setItem("dark", "dark");
    }
    // const newTheme = theme === "dark" ? "light" : "dark";
    // setTheme(newTheme);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
      window.location.href = "/";
    }
  };

  const openMenu = () => {
    setMenuVisibility((old) => !old);
  };

  return (
    <header className='sticky top-0 z-50 border-b border-gray-700 dark:border-gray-700 bg-[#f8f9fa] dark:bg-[#1b3559] transition-colors duration-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link
              to='/'
              className='text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent hover:from-cyan-600 hover:to-blue-600 transition-all'
            >
              Blogy
            </Link>
          </div>

          {/* Right Section */}
          <div className='flex items-center space-x-4'>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className='p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 transition-colors'
              aria-label='Toggle theme'
            >
              {darkThen ? <SunIcon /> : <MoonIcon />}
            </button>

            {isLogged ? (
              <>
                {/* Write Button */}
                <Link
                  to='/post/create'
                  className='px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all'
                >
                  Write
                </Link>

                {/* User Menu */}
                <div className='relative flex items-center space-x-3'>
                  <button
                    onClick={openMenu}
                    className='flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 transition-colors cursor-pointer'
                  >
                    <div className=' w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm'>
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    {menuVisibility ? (
                      <>
                        {" "}
                        <div className='absolute top-[60px] left-0 bg-light-blue py-4 px-4 w-full md:w-48'>
                          <ul className='flex flex-col items-start gap-2'>
                            <li className='cursor-pointer hover:underline'>
                              <Link to={"/profile"}>{user?.username}</Link>
                            </li>
                            <li className='cursor-pointer hover:underline'>
                              <Link to={"/profile"}>Profile</Link>
                            </li>
                            <li className='cursor-pointer hover:underline'>
                              <Link to={"/dashboard"}>Dashboard</Link>
                            </li>
                            <li className='cursor-pointer hover:underline'>
                              <Link to={"/post/create"}>Write</Link>
                            </li>
                            <li
                              onClick={handleLogout}
                              className='cursor-pointer hover:underline'
                            >
                              Logout
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>

                  <button
                    onClick={handleLogout}
                    className='px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 transition-colors'
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 transition-colors'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all'
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
