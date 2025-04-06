
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../theme/ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth/login");
  };

  return (
    <header className="bg-black text-white w-full mb-10">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          MyApp
        </Link>

        {/* 🌓 Dark/Light Toggle */}
        <div className="flex items-center gap-4">
        <ThemeToggle />

         {/* ✅ Reusable Search Form
         <div className="flex-1 mx-4 flex justify-center max-w-md">
          <CommonForm
            fromControls={searchFormControls}
            buttonText="Search"
            formData={formData}
            setformData={setFormData}
            onSubmit={handleSearchSubmit}
            customButtonClass="rounded-r-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            customInputClass="text-black rounded-l-md px-4 py-2 w-full"
            isInline
          />
        </div> */}
        {/* Search Bar
        <form
          onSubmit={handleSearch}
          className="flex-1 mx-4 flex justify-center"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-l-md text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
          >
            Search
          </button>
        </form> */}

        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav
          className={`lg:flex lg:space-x-6 ${
            menuOpen ? "block" : "hidden"
          } absolute lg:static bg-black lg:bg-transparent top-14 left-0 w-full lg:w-auto p-4 lg:p-0 z-10`}
        >
          <Link to="/" className="block px-3 py-2 lg:inline hover:bg-black rounded text-white">
            Home
          </Link>
          {/* 🔽 Category Dropdown */}
          <div className="relative group inline-block">
            <button className="block px-3 py-2 hover:bg-gray-800 rounded">
              Categories ▼
            </button>
            <div className="absolute hidden group-hover:block bg-black text-white shadow-md mt-1 rounded w-40 z-20">
              <Link to="/shop/listing?category=clothing" className="block px-4 py-2 hover:bg-gray-200 text-white">
                Clothing
              </Link>
              <Link to="/shop/listing?category=electronics" className="block px-4 py-2 hover:bg-gray-200 text-white">
                Electronics
              </Link>
              <Link to="/shop/listing?category=accessories" className="block px-4 py-2 hover:bg-gray-200 text-white">
                Accessories
              </Link>
            </div>
          </div>

          <Link to="/about" className="block px-3 py-2 lg:inline hover:bg-black rounded text-white">
            About
          </Link>
          <Link to="/contact" className="block px-3 py-2 lg:inline hover:bg-black rounded text-white">
            Contact
          </Link>

          {isAuthenticated ? (
            <div className="relative group inline-block">
              <button className="block px-3 py-2 lg:inline hover:bg-black rounded text-white">
                Account ▼
              </button>
              <div className="absolute hidden group-hover:block bg-black text-white shadow-md mt-1 rounded w-36">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 bg-black text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded text-white">
                Sign In
              </Link>
              <Link to="/auth/register" className="block px-3 py-2 lg:inline hover:bg-blue-700 rounded text-white">
                Sign Up
              </Link>
            </>
          )}
        </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;



// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <header className="bg-black text-white w-full fixed top-0 left-0 z-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">
//           MyApp
//         </Link>
//         <nav className="space-x-6">
//           <Link to="/home" className="hover:text-gray-300">
//             Home
//           </Link>
//           <Link to="/about" className="hover:text-gray-300">
//             About
//           </Link>
//           <Link to="/contact" className="hover:text-gray-300">
//             Contact
//           </Link>
//           <Link to="/auth/login" className="hover:text-gray-300">
//             Sign In
//           </Link>
//           <Link to="/auth/register" className="hover:text-gray-300">
//             Sign Up
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;