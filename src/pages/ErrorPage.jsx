import React from "react";
import { useRouteError, Link } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-900/70 backdrop-blur-md p-10 rounded-2xl border border-red-900/20 max-w-lg w-full text-center shadow-2xl">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-700/20 to-red-900/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold text-amber-500 mb-6">Oops!</h1>
        <div className="mb-6">
          <p className="text-xl mb-2 text-white/90">Something went wrong</p>
          <p className="text-amber-100/70">
            {error?.statusText || error?.message || "An unknown error occurred"}
          </p>
        </div>

        <div className="mt-8 relative overflow-hidden rounded-lg">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-red-700 animate-pulse rounded-lg"></div>
          <Link
            to="/"
            className="relative block bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
