import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <img
          src="https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {user?.username || 'Loading...'}
        </h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
