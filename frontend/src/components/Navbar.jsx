import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Left: Title */}
      <h1 className="text-2xl font-bold">Books Review</h1>

      {/* Middle: Search bar */}
      {/* <div className="flex w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search books..."
          className="p-2 flex-grow rounded-l-md text-black focus:outline-none"
        />
        <button className="bg-white text-blue-600 px-4 py-2 rounded-r-md hover:bg-gray-200">
          Search
        </button>
      </div> */}

      {/* Right: Profile & Logout */}
      <div className="flex gap-4 items-center">
        <Link
          to={userId ? `/profile/${userId}` : '/login'}
          className="text-white hover:underline text-sm sm:text-base"
        >
          Profile
        </Link>
        {userId && (
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm sm:text-base"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
