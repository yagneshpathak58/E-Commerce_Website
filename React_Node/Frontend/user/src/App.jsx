import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found/index";
import ShoppingHome from "./pages/shop/home";
import ShoppingCheckout from "./pages/shop/checkout";
import ShoppingListing from "./pages/shop/listing";
import ShoppingAccount from "./pages/shop/account";
import CheckAuth from "./components/common/checkauth";
import { useEffect } from "react";
import { startTokenRefresh } from "./utils/TokenManager";

function App() {
  useEffect(() => {
    startTokenRefresh();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<CheckAuth><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/shop" element={<CheckAuth><ShoppingLayout /></CheckAuth>} >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;


// import { Routes, Route } from "react-router-dom";  // ✅ Import Routes
// import AuthLayout from "./components/auth/layout.jsx";  // ✅ Import layout
// import AuthLogin from "./pages/auth/login.jsx";         // ✅ Import Login Page
// import AuthRegister from "./pages/auth/register.jsx";   // ✅ Import Register Page
// import ShoppingLayout from "./components/shopping-view/layout.jsx";
// import NotFound from "./pages/not-found/index.jsx";
// import ShoppingHome from "./pages/shop/home.jsx";
// import ShoppingCheckout from "./pages/shop/checkout.jsx";
// import ShoppingListing from "./pages/shop/listing.jsx";
// import ShoppingAccount from "./pages/shop/account.jsx";
// import CheckAuth from "./components/common/checkauth.jsx";

// function App() {

//   // const [isAuthenticated, setIsAuthenticated] = useState(false);
//   // const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");
//   //   if(token){
//   //     setIsAuthenticated(true);
//   //     setUser({token});
//   //   }
//   // }, []);

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       {/* <h1>Header Component</h1> */}

//       <Routes>
//         <Route path="/auth" element={<CheckAuth><AuthLayout /></CheckAuth>}>
//           <Route path="login" element={<AuthLogin />} />
//           <Route path="register" element={<AuthRegister />} />
//         </Route>

//         <Route path="/shop" element={<CheckAuth><ShoppingLayout /></CheckAuth>} >
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="account" element={<ShoppingAccount />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
