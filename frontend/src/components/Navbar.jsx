import { FaSearch, FaUser, FaShoppingBag } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="box flex items-center justify-between border-b bg-white px-6 py-4">
      {/* Logo */}
      <div className="text-3xl font-bold text-gray-900">
        elvee<span className="text-pink-400">.</span>
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
          <NavLink to="/collection" className="hover:text-black">
            Collection
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
        <li>
          {/* <NavLink to="/admin">
            <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100">
              Admin Panel
            </button>
          </NavLink> */}
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-5 text-xl text-gray-700">
        <FaSearch />
        <FaUser />
        <div className="relative">
          <FaShoppingBag />
          <span className="absolute -top-2 -right-2 rounded-full bg-black px-1.5 text-[10px] leading-tight text-white">
            0
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
