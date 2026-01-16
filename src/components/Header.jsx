


import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-emerald-600 font-semibold"
        : "text-gray-700 hover:text-emerald-600"
    }`;

  return (
    <>
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm pointer-events-auto">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 font-bold text-xl">
            <span className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 
                             flex items-center justify-center text-white shadow">
              🍄
            </span>
            <span className="tracking-wide">Mushroom Shop</span>
          </Link>
          <h1 style={{ fontSize: "30px", color: "red" }}>HELLO — THIS IS LIVE</h1>


          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 font-medium pointer-events-auto">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            {user && <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow"
                      : "text-gray-700 hover:bg-emerald-600 hover:text-white"
                  }`
                }
              >
                Admin Panel
              </NavLink>}
            

            {/* {user ? (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow"
                      : "text-gray-700 hover:bg-emerald-600 hover:text-white"
                  }`
                }
              >
                Admin Panel
              </NavLink>
            ) : (
              <NavLink to="/admin/login" className={navClass}>
                Admin Login
              </NavLink>
            )} */}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-3xl text-gray-700"
          >
            <HiMenu />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {/* {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
        />
      )} */}

    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden
      transition-opacity duration-300
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => setOpen(false)}
    />



      {/* MOBILE SLIDE MENU */}
     <div
  className={`fixed top-0 right-0 h-full w-64 bg-white z-40 shadow-xl md:hidden
  transform transition-transform duration-300
  ${open ? "translate-x-0" : "translate-x-full"}`}
>

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-3xl text-gray-700"
          >
            <HiX />
          </button>
        </div>

        {/* MOBILE MENU ITEMS */}
        <div className="p-4 space-y-4 font-medium">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={navClass}
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-center transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`
              }
            >
              Admin Panel
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
