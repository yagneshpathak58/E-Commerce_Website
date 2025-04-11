import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { loginFromControls } from "@/config";
import MainLayout from "@/layout/MainLayout";

const initialState = {
  U_Username: "",
  U_PWD: "",
};

function AuthLogin() {
  const [formData, setformData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed!");

      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    

    <MainLayout>
  <div className="w-full mx-auto px-4 py-6 md:px-6 lg:px-8">
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 px-4 flex flex-col justify-center h-full sm:min-h-[50vh] ">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col justify-center h-full sm:min-h-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Sign In To Your Account
      </h1>
      <p className="text-center text-gray-500">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {loading && <p className="text-gray-600 text-center">Logging in...</p>}

      <CommonForm
        fromControls={loginFromControls}
        buttonText={"Sign In"}
        formData={formData}
        setformData={setformData}
        onSubmit={onSubmit}
      />
      <div className="text-center mt-4">
        <Link to="/auth/forgotpassword" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
    </div>
    
  </div>
</MainLayout>
  );
}

export default AuthLogin;


// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import CommonForm from "@/components/common/form";
// import { loginFromControls } from "@/config";
// import MainLayout from "@/layout/MainLayout";

// const initialState = {
//   U_Username: "",
//   U_PWD: "",
// };

// function AuthLogin() {
//   const [formData, setformData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Login failed!");

//       localStorage.setItem("token", data.token);
//       window.location.href = "/shop/home";
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           Sign In To Your Account
//         </h1>
//         <p className="text-center text-gray-500">
//           Don't have an account?{" "}
//           <Link to="/auth/register" className="text-blue-600 hover:underline">
//             Sign Up
//           </Link>
//         </p>

//         {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//         {loading && <p className="text-gray-600 text-center">Logging in...</p>}

//         <CommonForm
//           fromControls={loginFromControls}
//           buttonText={"Sign In"}
//           formData={formData}
//           setformData={setformData}
//           onSubmit={onSubmit}
//         />
//       </div>
//     </MainLayout>
//   );
// }

// export default AuthLogin;



// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import CommonForm from "@/components/common/form";
// import { loginFromControls } from "@/config";
// import MainLayout from "@/layout/MainLayout";

// const initialState = {
//   U_Username: "",
//   U_PWD: "",
// };

// function AuthLogin() {
//   const [formData, setformData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Login failed!");

//       localStorage.setItem("token", data.token);
//       window.location.href = "/shop/home";
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-6">
//         <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//             Sign In To Your Account
//           </h1>
//           <p className="text-center text-gray-500">
//             Don't have an account?{" "}
//             <Link to="/auth/register" className="text-blue-600 hover:underline">
//               Sign Up
//             </Link>
//           </p>

//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           {loading && <p className="text-gray-600 text-center">Logging in...</p>}

//           <CommonForm
//             fromControls={loginFromControls}
//             buttonText={"Sign In"}
//             formData={formData}
//             setformData={setformData}
//             onSubmit={onSubmit}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// export default AuthLogin;






