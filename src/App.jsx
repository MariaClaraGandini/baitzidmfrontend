// App.js
import './App.css';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from './DarkModeContext';

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#c16035', // Altere a cor do label quando o TextField está em foco para azul
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c16035', // Altere a cor da borda quando o TextField está em foco para azul
          },
        },
      },
    },
  },
});

function App() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={customTheme}>

      <Navbar />
      <Outlet />
        </ThemeProvider>

  );
}

export default App;
