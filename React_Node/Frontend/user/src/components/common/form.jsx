import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function CommonForm({ fromControls, formData, setformData, onSubmit, buttonText }) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.type) {
      case "input":
        return (
          <Input
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            value={value}
            onChange={(event) =>
              setformData({ ...formData, [getControlItem.name]: event.target.value })
            }
            required
          />
        );

      case "textarea":
        return (
          <Textarea
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            value={value}
            onChange={(event) =>
              setformData({ ...formData, [getControlItem.name]: event.target.value })
            }
            required
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(event) =>
              setformData({ ...formData, [getControlItem.name]: event.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              {getControlItem.placeholder}
            </option>
            {getControlItem.options &&
              getControlItem.options.map((optionItem) => (
                <option key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </option>
              ))}
          </select>
        );

      default:
        return (
          <Input
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            value={value}
            onChange={(event) =>
              setformData({ ...formData, [getControlItem.name]: event.target.value })
            }
            required
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      {fromControls.map((controlItem) => (
        <div key={controlItem.name} className="flex flex-col gap-2">
          <Label className="text-gray-700 font-medium">{controlItem.label}</Label>
          {renderInputsByComponentType(controlItem)}
        </div>
      ))}

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
        type="submit"
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;




// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Textarea } from "../ui/textarea";

// function CommonForm({ fromControls, formData, setformData, onSubmit, buttonText }) {
//   function renderInputsByComponentType(getControlItem) {
//     const value = formData[getControlItem.name] || "";

//     switch (getControlItem.type) {
//       case "input":
//         return (
//           <Input
//             className="w-full border border-gray-300 p-2 rounded-md bg-white text-black"
//             type="text"
//             placeholder={getControlItem.placeholder}
//             name={getControlItem.name}
//             id={getControlItem.name}
//             value={value}
//             onChange={(event) =>
//               setformData({ ...formData, [getControlItem.name]: event.target.value })
//             }
//             required
//           />
//         );

//       case "textarea":
//         return (
//           <Textarea
//             className="w-full border border-gray-300 p-2 rounded-md bg-white text-black"
//             placeholder={getControlItem.placeholder}
//             name={getControlItem.name}
//             id={getControlItem.name}
//             value={value}
//             onChange={(event) =>
//               setformData({ ...formData, [getControlItem.name]: event.target.value })
//             }
//             required
//           />
//         );

//       case "select":
//         return (
//             <select 
//             value={value} 
//             onChange={(event) => setformData({...formData, [getControlItem.name]: event.target.value})}
//             className="w-full border border-gray-300 p-2 rounded"
//           >
//             <option value="" disabled>
//               {getControlItem.placeholder}
//             </option>
//             {getControlItem.options &&
//               getControlItem.options.map((optionItem) => (
//                 <option key={optionItem.id} value={optionItem.id}>
//                   {optionItem.label}
//                 </option>
//               ))}
//           </select>
//         );

//       default:
//         return (
//           <Input
//             className="w-full border border-gray-300 p-2 rounded-md bg-white text-black"
//             type="text"
//             placeholder={getControlItem.placeholder}
//             name={getControlItem.name}
//             id={getControlItem.name}
//             value={value}
//             onChange={(event) =>
//               setformData({ ...formData, [getControlItem.name]: event.target.value })
//             }
//             required
//           />
//         );
//     }
//   }

//   return (
//     <form onSubmit={onSubmit} className="w-full space-y-4">
//       {fromControls.map((controlItem) => (
//         <div key={controlItem.name} className="grid w-full gap-2">
//           <Label className="text-black">{controlItem.label}</Label>
//           {renderInputsByComponentType(controlItem)}
//         </div>
//       ))}

//       <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
//         {buttonText || "Submit"}
//       </button>
//     </form>
//   );
// }

// export default CommonForm;



