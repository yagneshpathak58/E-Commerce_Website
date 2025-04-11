import { Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import ShoppingHome from "./pages/shop/home";
import ShoppingCheckout from "./pages/shop/checkout";
import ShoppingListing from "./pages/shop/listing";
import ShoppingAccount from "./pages/shop/account";
import NotFound from "./pages/not-found/index";
import CheckAuth from "./components/common/checkauth";
import { useEffect } from "react";
import { startTokenRefresh } from "./utils/TokenManager";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home";
import Profile from "@/pages/profile";
import ChangePassword from "@/pages/changepassword";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      startTokenRefresh();
    }
    // startTokenRefresh();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Routes>
        {/* Protected Auth Pages (Only for Guests) */}
        <Route path="/auth/login" element={<CheckAuth><AuthLogin /></CheckAuth>} />
        <Route path="/auth/register" element={<CheckAuth><AuthRegister /></CheckAuth>} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/resetpassword/:token" element={<ResetPassword />} />

        {/* Protected Shopping Pages (Only for Authenticated Users) */}
        <Route path="/shop/home" element={<CheckAuth><ShoppingHome /></CheckAuth>} />
        <Route path="/shop/checkout" element={<CheckAuth><ShoppingCheckout /></CheckAuth>} />
        <Route path="/shop/listing" element={<CheckAuth><ShoppingListing /></CheckAuth>} />
        <Route path="/shop/account" element={<CheckAuth><ShoppingAccount /></CheckAuth>} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />


        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<CheckAuth><ChangePassword/></CheckAuth>}/>
      </Routes>
    </div>
  );
}

export default App;



// import { Routes, Route } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found/index";
// import ShoppingHome from "./pages/shop/home";
// import ShoppingCheckout from "./pages/shop/checkout";
// import ShoppingListing from "./pages/shop/listing";
// import ShoppingAccount from "./pages/shop/account";
// import CheckAuth from "./components/common/checkauth";
// import { useEffect } from "react";
// import { startTokenRefresh } from "./utils/TokenManager";
// import MainLayout from "./layout/MainLayout";

// function App() {
//   useEffect(() => {
//     startTokenRefresh();
//   }, []);

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
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


