import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFromControls } from "@/config";
import MainLayout from "@/layout/MainLayout";

const initialState = {
  U_Name: "",
  U_EMAIL: "",
  U_PHONE: "",
  U_Address: "",
  U_Username: "",
  U_PWD: "",
};

function AuthRegister() {
  const [formData, setformData] = useState(initialState);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <MainLayout>
      <div className="w-full mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

        <CommonForm
          fromControls={registerFromControls}
          buttonText={"Sign Up"}
          formData={formData}
          setformData={setformData}
          onSubmit={onSubmit}
        />
          </div>

        </div>
        
        
      </div>
    </MainLayout>
  );
}

export default AuthRegister;



// import { Link } from "react-router-dom";
// import { useState } from "react";
// import CommonForm from "@/components/common/form";
// import { registerFromControls } from "@/config";

// const initialState = {
//   U_Name: "",
//   U_EMAIL: "",
//   U_PHONE: "",
//   U_Address: "",
//   U_Username: "",
//   U_PWD: "",
// };

// function AuthRegister() {
//   const [formData, setformData] = useState(initialState);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//   };

//   return (
//     <div className="w-full px-8 space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
//         <p className="mt-2 text-gray-600">
//           Already have an account?
//           <Link className="text-blue-600 hover:underline ml-2" to="/auth/login">
//             Sign In
//           </Link>
//         </p>
//       </div>

//       <CommonForm
//         fromControls={registerFromControls}
//         buttonText={"Sign Up"}
//         formData={formData}
//         setformData={setformData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// export default AuthRegister;





