import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function CheckAuth({ children }) {
  const location = useLocation();
  const [auth, setAuth] = useState(false);
  let inactivityTimeout;

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setAuth(!!token);
    };

    const refreshToken = () => {
      console.log("Refreshing token...");
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.setItem("token", token); // Refresh the token
      }
    };

    const handleUserActivity = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        console.log("User inactive. Logging out...");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }, 300000); // 5 minutes
    };

    checkToken();
    const interval = setInterval(refreshToken, 300000); // Refresh token every 5 mins
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      clearInterval(interval);
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [location.pathname]);

  if (!auth && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/auth/login" />;
  }

  if (auth && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/shop/home" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
