import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom'; // Use useNavigate para Vite
import { useAuthToken } from '../api/AuthToken.jsx';

import 'react-toastify/dist/ReactToastify.css'; // Importe os estilos CSS do react-toastify

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#2484fc', // Altere a cor do label quando o TextField está em foco para azul
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2484fc', // Altere a cor da borda quando o TextField está em foco para azul
          },
        },
      },
    },
  },
});



export default function SignIn() {
  const { register, handleSubmit,formState: { errors }, reset } = useForm(); // Adicionei reset para limpar os erros
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false); // Estado para controlar a exibição do erro
  const { saveToken } = useAuthToken();
  
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      // clearFormErrors()      // setError('')
      reset()
      console.log(errors)

      const response = await axios.post('http://localhost:3000/entrar', data);
      const token = response.data.token;
      saveToken(token);
  
      const permissionResponse = await axios.get('http://localhost:3000/usuarios/groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (permissionResponse.status === 200) {
        navigate('/usuarios');
        window.location.reload();
      }
    } catch (error) {
      // clearErrors();
      // setError('')
      console.log(errors)

      if (error.response && error.response.status === 401) {
        toast.error('Usuário e/ou senha incorreto.');
        setInvalidCredentials(true); // Define o estado para exibir o erro

      } else {
        console.error('Erro:', error.message);
        toast.error('Ocorreu uma falha na autenticação!');
      }
    }
  };
  
  
  return (
    <ThemeProvider theme={customTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: '90vh', marginTop: '3rem', padding: '2.5rem' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          elevation={4}
          
          md={5}
          sx={{
            backgroundImage: `url(${Foto})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px 0 0 10px',
          }}
        />
        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={3} sx={{ borderRadius: '0px 10px 10px 0px' }} square>
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
            <div id="error-message " className='my-2'>
                {/* Exibe a mensagem de erro apenas se o estado for verdadeiro */}
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
