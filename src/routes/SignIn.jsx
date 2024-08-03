import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Foto from '../assets/wallpaper.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthToken } from '../api/AuthToken.jsx';
import URL from '../api/config';
import { useDarkMode } from '../DarkModeContext'; // Importar o contexto do modo noturno
import 'react-toastify/dist/ReactToastify.css';

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#2484fc',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2484fc',
          },
        },
      },
    },
  },
});
export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { saveToken } = useAuthToken();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { isDarkMode } = useDarkMode(); // Usar o estado do modo noturno

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${URL}/entrar`, data);
      const token = response.data.token;
      saveToken(token);

      try {
        const permissionResponse = await axios.get(`${URL}/usuarios/groups`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (permissionResponse.status === 200) {
          navigate('/usuarios');
          window.location.reload();
        }
      } catch (error) {
        if (error.response.status === 402) {
          console.error('Usuário não autorizado');
          navigate('/alterarsenha');
          window.location.reload();
        } else {
          console.error('Erro:', error.message);
          toast.error('Ocorreu um erro ao fazer a solicitação.');
        }
      }
    } catch (error) {
      setInvalidCredentials(true);
      console.error('Error:', error.message);
      toast.error('Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: '90vh', marginTop: '5rem', padding: '2.5rem' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          elevation={4}
          md={5}
          sx={{
                    backgroundImage: `url(${Foto})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px 0 0 10px',
                    backgroundColor: isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'
                }}
        />
        <Grid item xs={12} sm={12} md={7} component={Paper} elevation={3} sx={{ borderRadius: '0px 10px 10px 0px' }} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#3c6cfc' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Fazer Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <div id="error-message" className='my-2'>
                {invalidCredentials && (
                  <Typography component="p" variant="body2" color="error">
                    *Usuário ou senha incorreto
                  </Typography>
                )}
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuário"
                autoComplete="username"
                autoFocus
                {...register('username', { required: 'Este campo é obrigatório' })}
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  style: {
                    color: isDarkMode ? 'white' : 'black',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: isDarkMode ? 'white' : 'black',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    color: isDarkMode ? 'white' : 'black', // Cor do texto digitado
                  },
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? 'white' : 'black', // Cor do rótulo
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                {...register('password', { required: 'Este campo é obrigatório' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  style: {
                    color: isDarkMode ? 'white' : 'black',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: isDarkMode ? 'white' : 'black',
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#2484fc',
                  ':hover': {
                    backgroundColor: '#3c6cfc',
                  },
                  ':active': {
                    backgroundColor: '#2a47a1',
                  },
                }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
