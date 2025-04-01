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
      window.location.href = "/shop/home";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
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
        </div>
      </div>
    </MainLayout>
  );
}

export default AuthLogin;





// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import CommonForm from "@/components/common/form";
// import { loginFromControls, registerFromControls } from "@/config";

// const initialState = {
  
//   U_Username: "",
//   U_PWD: "",
// };

// function AuthLogin() {
//   const [formData, setformData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();


//   const onSubmit = async(e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try
//     {
//       const response = await fetch("http://localhost:5000/api/auth/login",{method:"POST",headers:{'Content-Type': 'application/json'},body:JSON.stringify(formData)});

//       const data = await response.json();

//       console.log("API Response:", data);

//       if(!response.ok)
//       {
//         throw new Error(data.message || "Login failed!");
//       }

//       console.log("Login successfull !! ,Login Data:",data);

//       localStorage.setItem("token",data.token);

//       console.log("Token stored in local storage :" ,localStorage.getItem("token"));
//       window.location.href = "/shop/home";

//       // navigate("/shop/home");
//     }
//     catch(err)
//     {
//       setError(err.message);
//     }
//     finally
//     {
//       setLoading(false);
//     }
//     // console.log("Form Data:", formData);
//   };

//   return (
//     <div className="w-full px-8 space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-900">Sign In To Your Account</h1>
//         <p className="mt-2 text-gray-600">
//           Don't have an account?
//           <Link className="text-blue-600 hover:underline ml-2" to="/auth/register">
//             Sign Up
//           </Link>
//         </p>
//       </div>
      
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       {loading && <p className="text-gray-600 text-center">Logging in...</p>}
//       <CommonForm
//         fromControls={loginFromControls}
//         buttonText={"Sign In"}
//         formData={formData}
//         setformData={setformData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthLogin;
