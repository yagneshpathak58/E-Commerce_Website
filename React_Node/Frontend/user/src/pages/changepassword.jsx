import { useState } from "react";
import CommonForm from "@/components/common/form";
import {changepasswordFormControls} from "@/config/profileFormControls";
import MainLayout from "@/layout/MainLayout";

const ChangePassword = () => {

    const [formData, setFormData] = useState({

        U_PWD: "",
        U_NEWPWD: "",
        U_CONFIRMPWD: "",
    });

    const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState({type:"", Text:""});

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(formData.U_NEWPWD !== formData.U_CONFIRMPWD)
        {
            setMessage({type:"error", Text:"New Password and Confirm Password do not match"});
            return;
        }

        try 
        {
            setLoading(true);
            setMessage({type:"", Text:""});
            
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/api/auth/changepassword", {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    U_PWD: formData.U_PWD,
                    U_NEWPWD: formData.U_NEWPWD,
                    U_CONFIRMPWD: formData.U_CONFIRMPWD,
                }),
                
            });

            const result = await response.json();

            if(!response.ok)
            {
                throw new Error(result.message || "Failed to change password");
            }

            else
            {
                setMessage({type:"success", Text:"Password changed successfully"});

                console.log(result);
            }

            // Reset the form data
            setFormData({
                U_PWD: "",
                U_NEWPWD: "",
                U_CONFIRMPWD: "",
            });  
            
        }

        catch(error)
        {
            setMessage({type:"error", Text:error.message || "Failed to change password"});
        }

        finally
        {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-xl mx-auto mt-10 px-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Change Password</h1>

                    {message.Text && (
                        <p
                            className={`text-center mb-4 ${
                            message.type === "error" ? "text-red-600" : "text-green-600"
                            }`}
                        >
                            {message.Text}
                        </p>
                    )}

                <div className="flex-1 w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <CommonForm
                        fromControls={changepasswordFormControls}
                        buttonText={loading ? "Updating..." : "Change Password"}
                        formData={formData}
                        setformData={setFormData}
                        onSubmit={handleSubmit}
                        disabled={loading}
                    />
                </div>
            </div>
        </MainLayout>
    );

}

export default ChangePassword;