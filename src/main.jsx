import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe as bibliotecas do React Router
import { createRoot } from 'react-dom/client';

import Home from './routes/Home.jsx';
import SignIn from './routes/SignIn.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Videos from './routes/Videos.jsx';
import Budget from './routes/Budget.jsx';
import SignUp from './routes/SignUp.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/registrar" element={<SignUp />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/orcamento" element={<Budget />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);




