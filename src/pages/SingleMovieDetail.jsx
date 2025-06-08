import axios from "axios";
import React from "react";
import { useLoaderData, Link } from "react-router";

export async function loader({ params }) {
  console.log("params", params);
  const imdbID = params.imdbID;
  console.log("imdbID", imdbID);
  const URL = `https://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_OMDB_API_KEY
  }&i=${imdbID}&plot=full`;
  try {
    const response = await axios.get(URL);
    return {
      movie: response.data,
      isError: false,
      error: "",
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.Error || error.message || "Something went wrong";
    return {
      movie: null,
      isError: true,
      error: errorMessage,
    };
  }
}

function SingleMovieDetail() {
  const { movie: movieDetail, isError, error } = useLoaderData();

  // Error handling with styled components
  if (movieDetail && movieDetail.Response === "False") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-white pt-20 px-4">
        <div className="max-w-6xl mx-auto py-8">
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
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-amber-100/70 mb-6">{movieDetail.Error}</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-red-700 text-white rounded-lg hover:from-amber-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-white pt-20 px-4">
        <div className="max-w-6xl mx-auto py-8">
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
              Error Loading Movie
            </h2>
            <p className="text-amber-100/70 mb-6">{error}</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-red-700 text-white rounded-lg hover:from-amber-700 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/20"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate rating stars
  const rating = parseFloat(movieDetail.imdbRating) || 0;
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-white pt-20 px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto py-8">
        <Link
          to="/"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Search
        </Link>

        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl overflow-hidden border border-amber-900/20 shadow-2xl">
          {/* Movie Header with Poster */}
          <div className="md:flex">
            <div className="md:w-2/5 lg:w-1/3">
              {movieDetail.Poster && movieDetail.Poster !== "N/A" ? (
                <div className="relative h-full">
                  <img
                    src={movieDetail.Poster}
                    alt={movieDetail.Title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent md:hidden"></div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-amber-900/30 to-red-900/30 h-full min-h-[300px] flex items-center justify-center">
                  <div className="text-center p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-amber-500/70 mb-4"
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
                    <span className="text-amber-300/80">
                      No Poster Available
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="md:w-3/5 lg:w-2/3 p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movieDetail.Title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-amber-900/30 text-amber-400 rounded-full text-sm">
                  {movieDetail.Year}
                </span>
                <span className="px-3 py-1 bg-gray-800/60 text-gray-300 rounded-full text-sm">
                  {movieDetail.Rated}
                </span>
                <span className="px-3 py-1 bg-gray-800/60 text-gray-300 rounded-full text-sm">
                  {movieDetail.Runtime}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(fullStars)].map((_, i) => (
                    <svg
                      key={`full-${i}`}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  {halfStar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ) : null}
                  {[...Array(emptyStars)].map((_, i) => (
                    <svg
                      key={`empty-${i}`}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-medium text-amber-400">
                  {movieDetail.imdbRating}
                </span>
                <span className="text-sm text-gray-400 ml-2">/ 10</span>
                <span className="text-gray-400 text-sm ml-1">
                  ({movieDetail.imdbVotes} votes)
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-amber-400 mb-1">
                  Genre
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movieDetail.Genre.split(", ").map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-900/20 text-amber-300/90 rounded-lg text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-amber-400 mb-1">
                  Released
                </h2>
                <p className="text-gray-300 mb-4">{movieDetail.Released}</p>

                <h2 className="text-lg font-semibold text-amber-400 mb-1">
                  Language
                </h2>
                <p className="text-gray-300 mb-4">{movieDetail.Language}</p>

                {movieDetail.Awards !== "N/A" && (
                  <>
                    <h2 className="text-lg font-semibold text-amber-400 mb-1">
                      Awards
                    </h2>
                    <p className="text-gray-300 mb-4">{movieDetail.Awards}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="p-6 md:p-8 border-t border-amber-900/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-amber-400 mb-4">
                    Plot
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {movieDetail.Plot}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-4">
                    Actors
                  </h2>
                  <div className="space-y-3">
                    {movieDetail.Actors.split(", ").map((actor, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-amber-700/30 flex items-center justify-center text-amber-400 mr-3">
                          {actor.charAt(0)}
                        </div>
                        <span className="text-gray-300">{actor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-amber-400 mb-6">
                  More Info
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <div className="flex justify-between pb-2 border-b border-gray-800">
                      <span className="text-gray-400">Director</span>
                      <span className="text-gray-200">
                        {movieDetail.Director}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between pb-2 border-b border-gray-800">
                      <span className="text-gray-400">Writer</span>
                      <span className="text-gray-200">
                        {movieDetail.Writer}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between pb-2 border-b border-gray-800">
                      <span className="text-gray-400">Country</span>
                      <span className="text-gray-200">
                        {movieDetail.Country}
                      </span>
                    </div>
                  </div>

                  {movieDetail.BoxOffice !== "N/A" && (
                    <div className="flex flex-col">
                      <div className="flex justify-between pb-2 border-b border-gray-800">
                        <span className="text-gray-400">Box Office</span>
                        <span className="text-gray-200">
                          {movieDetail.BoxOffice}
                        </span>
                      </div>
                    </div>
                  )}

                  {movieDetail.Metascore !== "N/A" && (
                    <div className="flex flex-col">
                      <div className="flex justify-between pb-2 border-b border-gray-800">
                        <span className="text-gray-400">Metascore</span>
                        <span
                          className={`px-2 py-0.5 rounded ${
                            parseInt(movieDetail.Metascore) >= 70
                              ? "bg-green-900/30 text-green-400"
                              : parseInt(movieDetail.Metascore) >= 50
                              ? "bg-amber-900/30 text-amber-400"
                              : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {movieDetail.Metascore}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <a
                    href={`https://www.imdb.com/title/${movieDetail.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-amber-600/20 text-amber-400 border border-amber-600/30 rounded-lg hover:bg-amber-600/30 transition-all duration-300"
                  >
                    View on IMDb
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMovieDetail;
