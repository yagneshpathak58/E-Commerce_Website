import { useState } from "react";
import CommonForm from "@/components/common/form";
import { resetpasswordFormControls } from "@/config/profileFormControls";
import MainLayout from "@/layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

    const [formData, setFormData] = useState({U_NEWPWD: "", U_CONFIRMPWD: ""});
    const [message, setMessage] = useState({type: "", Text: ""});
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage({type: "", Text: ""});

        const {U_NEWPWD, U_CONFIRMPWD} = formData;

        if(!U_NEWPWD || !U_CONFIRMPWD || U_NEWPWD !== U_CONFIRMPWD)
        {
            return setMessage({type: "error", Text: "New Password and Confirm Password do not match or Not empty"});
        }
        
        try
        {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/auth/resetpassword/${token}`, {

                method: "POST",
                headers : {"Content-Type": "application/json"},
                body: JSON.stringify({U_NEWPWD, U_CONFIRMPWD}),
                
            });

            const result = await response.json();

            if(!response.ok)
            {
                throw new Error(result.message || "Reset Password Failed!");
            }
            else
            {
                setMessage({type: "success", Text:"Reset Password Successfully!"});

                setTimeout ( () => {
                    
                    navigate("/auth/login");

                }, 2000);
            }
        }
        catch(err)
        {
            setMessage({type: "error", Text: err.message});
        }
        finally
        {
            setLoading(false);
        }
             

    };

    return (
        <MainLayout>
            <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>

                {message.text && (
                    <p
                        className={`text-center mb-4 ${
                        message.type === "error" ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {message.text}
                    </p>
                )}

                <div className="flex-1 w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                    <CommonForm
                        fromControls={resetpasswordFormControls}
                        buttonText={loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;