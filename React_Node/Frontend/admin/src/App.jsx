import { Routes , Route} from "react-router-dom";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminSettings from "./pages/admin/settings";
import AdminLogin from "./pages/admin/login";
import AdminFeatures from "./pages/admin/features";


function App() {
  

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header Component</h1>

      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
