import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data.allBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          >
            <img src={book.image} alt={book.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
