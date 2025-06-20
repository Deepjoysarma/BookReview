import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books/single/${id}`);
        setBook(res.data.book);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`);
        setReviews(res.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) setUserId(storedUserId);

    fetchBook();
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reviews/add`, {
        userId,
        bookId: id,
        text,
        rating,
      });

      setText('');
      setRating(5);
      
      // Refresh reviews after submission
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`);
      setReviews(res.data.reviews);

    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!book) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-72 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
        <p className="text-gray-600 mb-4 text-lg">by {book.author}</p>

        {/* Submit Review Form */}
        {userId && (
          <form onSubmit={handleSubmitReview} className="mb-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Add a Review</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Write your review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              max="5"
              className="w-full p-2 border border-gray-300 rounded"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 py-3">
                <p className="text-gray-700 font-medium">{review.user?.username || 'Anonymous'}</p>
                <p className="text-yellow-500">Rating: {review.rating} / 5</p>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
