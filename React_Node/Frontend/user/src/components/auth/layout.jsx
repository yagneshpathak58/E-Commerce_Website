import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-screen">
      {/* Left Black Panel */}
      {/* <div className="flex items-center justify-center bg-black w-6/12">
        <div className="text-center text-white px-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to E-Commerce Shopping
          </h1>
        </div>
      </div> */}

      {/* Right Form Panel */}
      <div className="flex items-center justify-center bg-white w-full ">
        <div className="w-full max-w-lg px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;




// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full bg-gray-50">
//       {/* Left Black Panel */}
//       <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
//         <div className="max-w-md space-y-6 text-center text-white">
//           <h1 className="text-4xl font-extrabold tracking-tight">Welcome to E-Commerce Shopping</h1>
//         </div>
//       </div>

//       {/* Right Form Panel */}
//       <div className="flex items-center justify-center bg-white w-full lg:w-1/2 px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AuthLayout;



