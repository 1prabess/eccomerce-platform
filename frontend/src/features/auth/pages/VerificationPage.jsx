import { useVerifyAccount } from "@/hooks/auth/useVerifyAccount";
import { useState } from "react";

const VerificationPage = () => {
  const [code, setCode] = useState("");
  const { mutate, isPending } = useVerifyAccount();

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setCode(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(code);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 px-4">
      <div className="mt-30 h-fit w-full max-w-md bg-white p-8">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Enter Verification Code
        </h2>
        <p className="mb-4 text-center text-sm text-gray-600">
          We've sent a 6-digit code to your email. Enter it below to verify your
          account.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={handleChange}
            className="mb-4 w-full border border-gray-300 px-3 py-2 text-center text-lg tracking-widest"
            placeholder="••••••"
          />

          <button
            type="submit"
            className="w-full bg-black py-2 font-medium text-white"
          >
            {isPending ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
