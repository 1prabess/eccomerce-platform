import React, { useEffect, useState } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";

function AccountInfo() {
  const { data } = useProfile();
  const { mutate } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (data?.user?.address) {
      setFormData(data.user.address);
    }
  }, [data]);

  if (!data?.user) return <p>Loading...</p>;

  const { fullName, email, role, isVerified, profilePic, address } = data.user;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    mutate(formData);
    setIsEditing(false);
  }

  function handleCancel() {
    setFormData(
      address || { street: "", city: "", state: "", zip: "", country: "" },
    );
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full text-black">
        {/* Profile Info */}
        <div className="mb-10 flex items-center space-x-8">
          <img
            src={
              profilePic ||
              `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(fullName)}`
            }
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl">{fullName}</h1>
            <p className="text-sm">{email}</p>
            <p className="mt-1 text-xs">Role: {role}</p>
            <p className="mt-1 text-xs">
              {isVerified === "true" ? "Verified User" : "Unverified User"}
            </p>
          </div>
        </div>

        {/* Address Info */}
        <section>
          <h2 className="mb-6 text-lg">Account Address</h2>

          {!isEditing && address ? (
            <div className="max-w-md space-y-5">
              {Object.entries(address).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700 capitalize">
                    {key}
                  </label>
                  <div className="border-b border-black px-2 py-1 text-sm text-gray-800 italic">
                    {value || "none"}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setIsEditing(true)}
                className="border border-gray-400 px-6 py-2 text-sm hover:bg-gray-100"
              >
                Edit Address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="max-w-md space-y-5">
              {["street", "city", "state", "zip", "country"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label htmlFor={field} className="mb-1 text-sm capitalize">
                    {field}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type="text"
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="border border-gray-400 px-2 py-1 text-sm placeholder-black focus:border-black focus:outline-none"
                  />
                </div>
              ))}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-black px-6 py-2 text-sm text-white"
                >
                  {address ? "Update Address" : "Add Address"}
                </button>
                {address && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border border-gray-400 px-6 py-2 text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default AccountInfo;
