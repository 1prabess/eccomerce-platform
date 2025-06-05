import { useSignup } from "@/hooks/auth/useSignup";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useSignup();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName")
      setFormData((prev) => ({
        ...prev,
        fullName: value,
      }));

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
      <div className="relative mt-30 h-fit w-full max-w-md bg-white p-8">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-semibold">Create your account</h2>

        {/* Form */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full border border-gray-300 px-3 py-2"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

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

        <div className="mb-6 text-sm"></div>

        <button
          onClick={handleSubmit}
          className="w-full bg-black py-2 font-medium text-white"
        >
          {isPending ? "Signing up.." : "Sign up"}
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <NavLink to={"/signin"}>Login Now</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
