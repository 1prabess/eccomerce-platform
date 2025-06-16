import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreatingProductOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
      <AiOutlineLoading3Quarters className="animate-spin text-6xl text-gray-700" />
      <p className="mt-4 text-lg font-medium text-gray-700">
        Creating product...
      </p>
    </div>
  );
};

export default CreatingProductOverlay;
