import { useSignin } from "@/hooks/auth/useSignin";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useSignin();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email")
      setFormData((prev) => ({
        ...prev,
        email: value,
      }));

    if (name === "password")
      setFormData((prev) => ({
        ...prev,
        password: value,
      }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 px-4">
      <div className="-md relative mt-30 h-fit w-full max-w-md bg-white p-8">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-semibold">Log in to your account</h2>

        {/* Form */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="jane@gmail.com"
            className="w-full border border-gray-300 px-3 py-2"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="mb-6 flex items-center justify-between text-sm">
          <NavLink to={"/forgot-password"}>Forgot Password</NavLink>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-black py-2 font-medium text-white"
        >
          Log in
        </button>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <NavLink to={"/signup"}>Register Now</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
