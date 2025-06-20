import React from 'react';
import { Link } from 'react-router-dom'; // if you're using React Router

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Left: Title */}
      <h1 className="text-2xl font-bold">Books Review</h1>

      {/* Middle: Search bar */}
      <div className="flex w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search books..."
          className="p-2 flex-grow rounded-l-md text-black focus:outline-none"
        />
        <button className="bg-white text-blue-600 px-4 py-2 rounded-r-md hover:bg-gray-200">
          Search
        </button>
      </div>

      {/* Right: Profile link */}
      <Link
        to="/profile"
        className="text-white hover:underline text-sm sm:text-base text-right sm:text-left"
      >
        Profile
      </Link>
    </nav>
  );
};

export default Navbar;
