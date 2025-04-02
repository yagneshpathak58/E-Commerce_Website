import { Outlet } from "react-router-dom";
// import Header from "../common/Header.jsx";
// import Footer from "../common/Footer.jsx";
import Header from "../common/Header";
import Footer from "../common/Footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
    