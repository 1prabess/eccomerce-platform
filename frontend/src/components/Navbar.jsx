import { useLogout } from "@/hooks/auth/useLogout";
import { FaShoppingBag, FaClipboardList } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { mutate: logout } = useLogout();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="box flex items-center justify-between border-b bg-white px-6 py-4">
      {/* Logo */}
      <div className="text-3xl font-bold text-gray-900">
        Elvee<span className="text-pink-400">.</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden items-center gap-8 font-medium text-gray-800 md:flex">
        <li className="relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-gray-800"
                : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="hover:text-black">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="hover:text-black">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="hover:text-black">
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right side: Authenticated vs Not authenticated */}
      <div className="flex items-center gap-5 text-xl text-gray-700">
        {isAuthenticated ? (
          <>
            {/* Cart Icon */}
            <NavLink to="/cart">
              <FaShoppingBag />
            </NavLink>

            {/* Orders Icon */}
            <NavLink to="/orders" className="hover:text-black">
              <FaClipboardList />
            </NavLink>

            {/* Logout Icon */}
            <IoLogOut
              size={26}
              onClick={handleLogout}
              className="cursor-pointer"
            />
          </>
        ) : (
          // Show Sign In link if NOT authenticated
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
