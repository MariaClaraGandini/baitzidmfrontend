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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthToken } from '../api/AuthToken'; // Importe o hook useAuthToken
import  {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate para Vite

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

export default function ChangePass() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { token } = useAuthToken();
    const [user, setUser] = useState(null);
    const [invalidCredentials, setInvalidCredentials] = useState(false); // Estado para controlar a exibição do erro
    const [invalidCredentials1, setInvalidCredentials1] = useState(false); // Estado para controlar a exibição do erro
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        const decodedToken = decodeToken(token);
        setUser(decodedToken);
      } 
    }, [token]);
  
    const decodeToken = (token) => {
      if (token) {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        const username = payload.username;
        return { username };
      } else {
        return null;
      }
    };

    const onSubmit = async (data) => {
      try {
        const response = await axios.post('http://localhost:3000/usuarios/alterarsenha', data, {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionando o token JWT ao cabeçalho Authorization
          },
        });
        toast.success(response.data.message);
        reset();
      } catch (error) {
        
      if (error.response && error.response.status === 500) {
        toast.error('Ocorreu uma falha na redefinição de senha.');
        setInvalidCredentials(true); // Define o estado para exibir o erro

      } else {
        console.error('Erro:', error.message);
        toast.error('Ocorreu uma falha na redefinição de senha.');
        setInvalidCredentials1(true)
      }
      }
    };

  return (
    <div className="p-2 " style={{minHeight: '99.9vh'}}>

    <ThemeProvider theme={customTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: '60vh', marginTop: '5rem' }} className="flex items-center justify-center">
        <CssBaseline />
      
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} className="" sx={{ borderRadius: '0px 10px 10px 0px' }} square>
          <Box
            sx={{
              my: 4,
              px: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: '#3c6cfc' }}>
              <LockOutlinedIcon />
            </Avatar>
            {user && (
                <Typography component="h1" variant="h5">
                  {user.username}
                </Typography>
              )}
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <div id="error-message " className='my-2'>
                {/* Exibe a mensagem de erro apenas se o estado for verdadeiro */}
                {invalidCredentials && (
                  <Typography component="p" variant="body2" color="error">
                    *Senha atual incorreta
                  </Typography>
                )}
              </div>
              <div id="error-message " className='my-2'>
                {/* Exibe a mensagem de erro apenas se o estado for verdadeiro */}
                {invalidCredentials1 && (
                  <Typography component="p" variant="body2" color="error">
                    *Senhas novas não coincidem
                  </Typography>
                )}
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="currentPassword"
                name="currentPassword"
                label="Senha atual"
                autoComplete="current-password"
                type="password"
                autoFocus
                {...register('currentPassword', { required: 'Este campo é obrigatório' })}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
              
              <div className='mt-2'>
              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="Nova Senha"
                type="password"
                autoComplete="current-password"
                {...register('newPassword', { required: 'Este campo é obrigatório' })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirme a senha"
                type="password"
                autoComplete="current-password"
                {...register('confirmPassword', { required: 'Este campo é obrigatório' })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              </div>
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
    </div>

  );
}
