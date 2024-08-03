import React from 'react';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe as bibliotecas do React Router
import { createRoot } from 'react-dom/client';
import SignIn from './routes/SignIn.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Users from  './routes/Users.jsx';
import ChangePass from './routes/ChangePass.jsx'
import Vacation from './routes/Vacation.jsx'
import { DarkModeProvider } from './DarkModeContext.jsx';


const root = createRoot(document.getElementById('root'));
root.render(
  <DarkModeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/entrar" element={<SignIn />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/alterarsenha" element={<ChangePass />} />
          <Route path="/ferias" element={<Vacation />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </DarkModeProvider>
  );




