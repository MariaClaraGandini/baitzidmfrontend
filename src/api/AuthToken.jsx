import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate para Vite


// Função para armazenar o token JWT
export const useAuthToken = () => {
  const navigate = useNavigate(); // Use useNavigate para Vite

  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
    setToken(null);
    console.log("logout")

  };

  return { token, saveToken, deleteToken };
};

