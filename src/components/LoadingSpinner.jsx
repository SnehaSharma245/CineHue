import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 flex flex-col items-center justify-center z-[9999]">
      {/* CineHue Logo */}
      <div className="mb-8">
        <span className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
          CineHue
        </span>
      </div>

      {/* Modern Spinner */}
      <div className="relative w-20 h-20 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-amber-900/30"></div>
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-red-600 animate-spin"></div>
        {/* Inner glow effect */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-600/20 to-red-700/20 animate-pulse"></div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-amber-400 text-lg font-medium animate-pulse">
          Loading...
        </p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
