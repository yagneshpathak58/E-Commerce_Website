import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
