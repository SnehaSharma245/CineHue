import React from "react";
import { Link } from "react-router";

function MovieList({ data }) {
  const { movieApiResponse, searchTerm } = data;
  const movies = movieApiResponse?.Search || [];

  if (!movies.length) {
    return (
      <div className="text-center p-10 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-amber-900/20 shadow-xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-700/20 to-red-800/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-amber-500/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-amber-500 mb-4">
          No movies found
        </h2>
        <p className="text-amber-100/60 max-w-md mx-auto">
          We couldn't find any movies matching your search. Try using different
          keywords or check your spelling.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-gradient-to-r from-amber-600 to-red-700 text-white rounded-lg hover:from-amber-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/20"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-amber-400 flex items-center">
        Results for "{searchTerm}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie, index) => (
          <Link
            to={`/detail/${movie.imdbID}`}
            key={movie.imdbID}
            className="movie-card bg-gray-900/60 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-amber-900/20 shadow-lg group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-900/30 to-red-900/30 p-4 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-amber-500/70 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <span className="text-amber-300/80 font-medium">
                    {movie.Title}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                <h3 className="text-white font-bold truncate">{movie.Title}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-amber-400">{movie.Year}</span>
                  <span className="bg-amber-700/40 text-amber-300 text-xs px-2 py-1 rounded-md">
                    {movie.Type}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
