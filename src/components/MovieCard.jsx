import React from "react";
import { Link } from "react-router";

function MovieCard({ Title, Type, Year, imdbID, Poster }) {
  return (
    <Link
      to={`/detail/${imdbID}`}
      className="movie-card bg-gray-900/60 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 border border-amber-900/20 shadow-lg group h-full"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {Poster && Poster !== "N/A" ? (
          <img
            src={Poster}
            alt={Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ""; // Clear the broken image
              e.target.parentNode.classList.add("poster-error");
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-900/30 to-red-900/30 p-3 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-amber-500/70 mb-3"
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
            <span className="text-amber-300/80 font-medium text-sm line-clamp-2">
              {Title}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent p-3">
          <h3 className="text-white font-bold text-sm line-clamp-2 min-h-[2rem]">
            {Title}
          </h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-amber-400 text-xs">{Year}</span>
            <span className="bg-amber-700/40 text-amber-300 text-xs px-2 py-0.5 rounded-md capitalize">
              {Type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
