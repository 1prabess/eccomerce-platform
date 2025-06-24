import { useLogout } from "@/hooks/auth/useLogout";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { mutate: logout } = useLogout();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Orders", path: "/orders" },
  ];

  if (isAuthenticated && user?.role?.toLowerCase() === "admin") {
    navItems.push({ label: "Admin", path: "/admin" });
  }

  return (
    <nav className="box flex h-16 items-center justify-between border-b bg-white px-6 py-4">
      {/* Logo */}
      <div
        className="cursor-pointer text-2xl font-bold text-gray-900"
        onClick={() => navigate("/")}
      >
        Wearvio
      </div>

      {/* Navigation Links */}
      <ul className="hidden items-center gap-8 text-sm font-medium text-gray-800 md:flex">
        {navItems.map(({ label, path }) => (
          <li key={path} className="relative">
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "relative text-black after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-4 after:-translate-x-1/2 after:bg-black"
                  : "hover:text-black"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="relative flex items-center gap-5 text-xl text-gray-700">
        {isAuthenticated ? (
          <>
            {/* Cart */}
            <NavLink to="/cart" className="hover:text-black">
              <FaShoppingCart />
            </NavLink>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <FaUser
                onClick={toggleDropdown}
                className="cursor-pointer hover:text-black"
              />

              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-40 border bg-white shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <NavLink
            to="/signin"
            className="border border-gray-800 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
