import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { mutate, isPending } = useResetPassword();

  const { resetPasswordToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutate({ resetPasswordToken, password: formData.password });
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 px-4">
      <div className="-md relative mt-30 h-fit w-full max-w-md bg-white p-8">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-semibold">Reset your password</h2>

        {/* Form */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black py-2 font-medium text-white"
        >
          {isPending ? "Resetting password..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
