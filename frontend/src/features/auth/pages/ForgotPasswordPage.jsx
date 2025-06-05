import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(email);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 px-4">
      <div className="mt-30 h-fit w-full max-w-md bg-white p-8">
        <h2 className="mb-6 text-3xl font-semibold">Forgot Password</h2>
        <p className="mb-4 text-sm text-gray-600">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <label className="mb-1 block text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="jane@gmail.com"
              className="w-full border border-gray-300 px-3 py-2"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {isPending ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <NavLink to="/signin" className="text-black hover:underline">
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
