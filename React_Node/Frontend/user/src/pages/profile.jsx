import { useEffect, useState } from "react";
import CommonForm from "@/components/common/form";
import { profileFormControls } from "@/config/profileFormControls";
import MainLayout from "@/layout/MainLayout";

const Profile = () => {
  const [formData, setFormData] = useState({
    U_Name: "",
    U_EMAIL: "",
    U_PHONE: "",
    U_Address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {

            method: "GET",
          
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        const user = data.user || {};

        setFormData({
          U_Name: user.U_Name || "",
          U_EMAIL: user.U_EMAIL || "",
          U_PHONE: user.U_PHONE || "",
          U_Address: user.U_Address || "",
          U_Username: user.U_Username || "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: call PUT / PATCH API to update profile here

    try
    {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/auth/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if(!response.ok)
      {
        throw new Error(result.message || "Failed to update profile");
      }
      alert(result.message || "Profile updated successfully");
    }
    catch(error)
    {
      console.error("Error updating profile:", error);
      alert(error.message || "Failed to update profile");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">My Profile</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />

            <div className="flex-1 w-full">
              <CommonForm
                fromControls={profileFormControls}
                buttonText="Update Profile"
                formData={formData}
                setformData={setFormData}
                onSubmit={handleSubmit}
                // onSubmitSuccess={() => alert("Profile updated successfully")} 
              />
            </div>
            {/* <div className="mt-4 text-center">
              <a
                href="/change-password"
                className="text-blue-600 hover:underline font-medium"
              >
                Change Password
              </a>
            </div> */}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
