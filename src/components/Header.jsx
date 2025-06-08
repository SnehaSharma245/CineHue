import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md shadow-md border-b border-amber-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-red-600 bg-clip-text text-transparent">
              CineHue
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
