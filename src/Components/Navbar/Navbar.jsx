import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import DarkModeToggle from "../DarkMode/DarkModeToggle";

export default function Navbar() {
  const { CartDetails } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function LogOut() {
    localStorage.clear();
    setToken(null);
    navigate("LogIn");
  }

  const links = [
    { to: "", label: "Home" },
    { to: "Cart", label: "Cart" },
    { to: "WishList", label: "WishList" },
    { to: "Products", label: "Products" },
    { to: "Catrgories", label: "Categories" },
    { to: "Brands", label: "Brands" },
  ];

  return (
    <motion.nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-500
        ${scrolled
          ? "top-4 w-[95%] md:w-4/5 lg:w-3/5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-2xl py-3 px-5"
          : "top-0 w-full bg-zinc-100/90 dark:bg-gray-900/90 py-4 px-6"
        }`}
      initial={{ y: -60 }}
      animate={{ y: 0 }}
    >
      {/* Logo */}

      <NavLink to="" className="flex items-center gap-2 shrink-0">
        <img src={logo} alt="Logo" className="w-28 md:w-36" />
      </NavLink>

      {/* Links */}

      {token && (
        <ul className="hidden lg:flex flex-1 justify-center gap-6 text-sm font-semibold">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === ""}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Socials */}
        {!scrolled && (
          <div className="hidden md:flex items-center gap-3 text-gray-600 dark:text-gray-300 transition-all duration-500">
            <a href="#" className="hover:text-blue-600"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="hover:text-sky-500"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-pink-600"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-500"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="hover:text-red-600"><i className="fa-brands fa-youtube"></i></a>
          </div>
        )}

        {/* Cart + DarkMode */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {token && (
<Link to="Cart" className="relative">
            <i className="fa-solid fa-cart-shopping text-xl hover:text-green-600 dark:text-white"></i>
            {CartDetails?.numOfCartItems > 0 && (
              <span className="w-4 h-4 bg-green-700 rounded-full absolute -top-2 -right-2 text-white text-xs flex items-center justify-center">
                {CartDetails.numOfCartItems}
              </span>
            )}
          </Link>
          )}
          
        </div>

        {/* Sign Out / Login */}
        <div className="hidden sm:flex items-center gap-4">
          {token ? (
            <span
              onClick={LogOut}
              className="cursor-pointer text-gray-700 hover:text-green-700 dark:text-white dark:hover:text-green-500 whitespace-nowrap"
            >
              Sign Out
            </span>
          ) : (
            <>
              <NavLink
                to="LogIn"
                className="hover:text-green-700 dark:text-white dark:hover:text-green-500"
              >
                Log In
              </NavLink>
              <NavLink
                to="Register"
                className="hover:text-green-700 dark:text-white dark:hover:text-green-500"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <button
          className="flex lg:hidden text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
        className={`absolute top-full left-0 w-full bg-zinc-100/90 dark:bg-gray-900/90 backdrop-blur-md flex flex-col items-center gap-4 py-5 shadow-lg transition-all duration-300 rounded-2xl
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {token && (
          <ul className="flex flex-col items-center gap-3 text-gray-800 dark:text-gray-200">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-600 dark:hover:text-green-400"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-5 mt-3">
          
          
          {token ? (
            <span
              onClick={() => {
                setMenuOpen(false);
                LogOut();
              }}
              className="cursor-pointer hover:text-green-600"
            >
              Sign Out
            </span>
          ) : (
            <>
              <NavLink to="LogIn" onClick={() => setMenuOpen(false)}>
                Log In
              </NavLink>
              <NavLink to="Register" onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
