import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert to boolean
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth/login"); // Redirect to login
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MyApp
        </Link>

        {/* Menu Button (Mobile) */}
        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav
          className={`lg:flex space-x-6 ${
            menuOpen ? "block" : "hidden"
          } absolute lg:static bg-blue-600 lg:bg-transparent top-14 left-0 w-full lg:w-auto p-4 lg:p-0 z-10`}
        >
          <Link to="/" className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded">
            Home
          </Link>
          <Link to="/about" className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded">
            About
          </Link>
          <Link to="/contact" className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded">
            Contact
          </Link>

          {/* Show Login/Register for Guests, Profile for Authenticated Users */}
          {isAuthenticated ? (
            <div className="relative group inline-block">
              <button className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded">
                Account ▼
              </button>
              <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1 rounded w-36">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded"
              >
                Sign In
              </Link>
              {/* <Link
                to="/auth/register"
                className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded"
              >
                Sign Up
              </Link> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
