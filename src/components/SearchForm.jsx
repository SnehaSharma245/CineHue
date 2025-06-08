import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form, useNavigate, useLocation } from "react-router";
import axios from "axios";

function SearchForm({ searchTerm }) {
  const [query, setQuery] = useState(searchTerm || "");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null);
  const formRef = useRef(null);

  // Reset dropdown state when location changes (navigation occurs)
  useEffect(() => {
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    setIsLoading(false);
    setIsFocused(false);
  }, [location]);

  // Update query when searchTerm prop changes
  useEffect(() => {
    setQuery(searchTerm || "");
  }, [searchTerm]);

  // Debounced fetch suggestions from OMDB API
  const fetchSuggestions = useCallback(async (searchText) => {
    if (!searchText || searchText.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${searchText}`
      );

      if (response.data.Response === "True" && response.data.Search) {
        // Get unique titles only (remove duplicates)
        const uniqueTitles = [
          ...new Set(response.data.Search.map((movie) => movie.Title)),
        ];
        setSuggestions(uniqueTitles.slice(0, 5)); // Show max 5 suggestions
        setShowSuggestions(uniqueTitles.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search input with proper timing for API calls
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.length >= 2) {
      timeoutRef.current = setTimeout(() => {
        fetchSuggestions(query);
      }, 600); // Increased from 300ms to 600ms for better API response time
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, fetchSuggestions]);

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion, e) => {
    // Prevent default behavior
    if (e) {
      e.preventDefault();
    }

    // Immediately navigate instead of setting state first
    navigate(`/?search=${encodeURIComponent(suggestion)}`);

    // Clean up states after navigation
    setQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleInputBlur = (e) => {
    // Hide suggestions immediately when input loses focus
    setIsFocused(false);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    // Show suggestions if we have them and query is long enough, also trigger search if needed
    if (query.length >= 2) {
      if (suggestions.length > 0) {
        setShowSuggestions(true);
      } else {
        // Trigger search when focusing if no suggestions exist
        fetchSuggestions(query);
      }
    }
  };

  return (
    <Form className="w-full relative z-50" ref={formRef}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies..."
          className={`w-full bg-gray-900/60 text-white border-2 ${
            isFocused ? "border-amber-600" : "border-amber-900/20"
          } rounded-xl py-3.5 pl-12 ${
            query ? "pr-36" : "pr-20"
          } text-lg placeholder-gray-500 outline-none
          transition-all duration-300 ease-in-out shadow-inner backdrop-blur-sm hover:border-amber-800/50 focus:shadow-amber-900/30 focus:shadow-lg`}
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-all duration-200 p-1.5 rounded-lg hover:bg-gray-800/50"
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
                    bg-gradient-to-r from-amber-600 to-red-700 text-white px-5 py-2 rounded-lg
                    hover:from-amber-700 hover:to-red-800 transition-all duration-300 ease-in-out
                    font-medium shadow-lg border border-amber-600/20 hover:shadow-amber-900/40"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown - Only show when focused and have suggestions */}
      {isFocused && (showSuggestions || (isLoading && query.length >= 2)) && (
        <div
          ref={suggestionsRef}
          style={{ zIndex: 9999 }}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-amber-900/30 rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
          onMouseDown={(e) => {
            // Prevent input from losing focus when clicking on dropdown
            e.preventDefault();
          }}
        >
          <div className="p-2">
            <div className="text-xs text-amber-400/80 px-3 py-1 border-b border-amber-900/20 mb-1">
              {isLoading ? "Searching..." : "Suggestions"}
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {!isLoading && suggestions.length === 0 && query.length >= 2 && (
              <div className="text-center py-4 text-gray-400">
                No movies found with that title
              </div>
            )}

            {!isLoading &&
              suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={(e) => {
                    handleSuggestionClick(suggestion, e);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center ${
                    selectedIndex === index
                      ? "bg-amber-600/20 text-amber-300"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-amber-400"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-3 text-amber-500/70"
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
                  <span className="flex-1">{suggestion}</span>
                  {selectedIndex === index && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
          </div>

          {!isLoading && suggestions.length > 0 && (
            <div className="border-t border-amber-900/20 p-2">
              <div className="text-xs text-gray-500 px-3 py-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Use ↑↓ arrows to navigate, Enter to select
              </div>
            </div>
          )}
        </div>
      )}

      {isFocused &&
        query &&
        !showSuggestions &&
        !isLoading &&
        query.length >= 2 && (
          <div className="mt-2 text-xs text-amber-400/80 animate-fadeIn pl-2">
            Press Enter to search for "{query}"
          </div>
        )}
    </Form>
  );
}

export default SearchForm;
