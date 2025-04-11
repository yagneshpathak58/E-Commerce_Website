import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function CheckAuth({ children }) {
  const location = useLocation();
  const [auth, setAuth] = useState(null); // null = not checked yet
  let inactivityTimeout;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token); // true if token exists

    const refreshToken = () => {
      if (token) {
        console.log("Refreshing token...");
        localStorage.setItem("token", token);
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

    const interval = setInterval(refreshToken, 300000);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      clearInterval(interval);
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [location.pathname]);

  // While loading/checking auth status
  if (auth === null) {
    return null; // or a loading spinner
  }

  const guestOnlyRoutes = ["/auth/login", "/auth/register"];
  const isGuestRoute = guestOnlyRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  if (!auth && !isGuestRoute) {
    return <Navigate to="/auth/login" />;
  }

  if (auth && isGuestRoute) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
