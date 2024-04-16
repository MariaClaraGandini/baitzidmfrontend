import React from 'react';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe as bibliotecas do React Router
import { createRoot } from 'react-dom/client';
import SignIn from './routes/SignIn.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import SignUp from './routes/SignUp.jsx';
import Users from  './routes/Users.jsx';
import ChangePass from './routes/ChangePass.jsx'


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/registrar" element={<SignUp />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/alterarsenha" element={<ChangePass />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);




