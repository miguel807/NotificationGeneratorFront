import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3005/auth/login', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return {
    login,
    error,
  };
};

export default useAuth;
