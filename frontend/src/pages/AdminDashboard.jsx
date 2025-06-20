import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', author: '', image: null });
  const [books, setBooks] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
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


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };


  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const form = new FormData();
    form.append('title', formData.title);
    form.append('author', formData.author);
    form.append('image', formData.image);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books/add`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Book uploaded successfully');
      setFormData({ title: '', author: '', image: null });
      window.location.reload();
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Failed to upload book');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Welcome to Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Upload Book
          </button>
        </form>
      </div>

      {/* Book Listing */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
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

export default AdminDashboard;
