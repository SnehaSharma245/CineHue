import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import MovieList from "../components/MovieList";
import { useLoaderData } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

export async function loadSampleData({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "";
  try {
    const movieSearhEndpoint = `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&s=${searchTerm}`;

    const response = await axios.get(movieSearhEndpoint);
    return {
      movieApiResponse: response.data,
      searchTerm,
      isError: false,
      error: "",
    };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.Error || error.message || "something went wrong";
    return {
      movieApiResponse: null,
      searchTerm,
      isError: true,
      error: errorMessage,
    };
  }
}

function Home() {
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-white pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <img
            src="/CineHue_LOGO.png"
            alt="CineHue Logo"
            className="mx-auto h-16 w-auto mb-3 drop-shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
              Movies
            </span>
          </h1>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl shadow-2xl p-4 mb-6 border border-amber-900/20 relative z-30">
          <SearchForm searchTerm={data.searchTerm} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="fade-in transition-all duration-300 relative z-[1]">
            {data.isError ? (
              <div className="text-center p-10 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-xl">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-700/20 to-amber-800/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  Error Occurred
                </h2>
                <p className="text-amber-100/70 mb-4">{data.error}</p>
                <p className="text-amber-100/60 max-w-md mx-auto">
                  Please try searching for something else or come back later.
                </p>
              </div>
            ) : (
              <MovieList data={data} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
