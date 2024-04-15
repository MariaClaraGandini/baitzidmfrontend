import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Foto from '../assets/signup.jpeg'; // Importe a imagem de background
import { ToastContainer, toast } from 'react-toastify';


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
export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    try {
      const requestData = {
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        state: data.get('state'),
        city: data.get('city'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
      };
  
      console.log('Data being sent to the backend:', requestData);
  
      const response = await axios.post('http://localhost:5000/auth/register', requestData);
  
      console.log('Response from the backend:', response.data);
      
      toast.success("Evento atualizado com sucesso!");

    } catch (error) {
      console.error('Error:', error.response.data);
      toast.error(error.response.data.msg)
    }
  };
  
  return (
    <div>
    <ThemeProvider theme={customTheme}>
    <ToastContainer />
      <Grid container component="main" sx={{marginTop:'3rem',padding: '2.5rem' }}>
        <Grid
          item
          xs={false}
          elevation={4}
          sm={4}
          md={4}
          sx={{
            backgroundImage: `url(${Foto})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px 0 0 10px'
          }}
        />
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={3} sx={{ borderRadius: '0px 10px 10px 0px', display: 'flex' }}>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%', // Defina a largura para ocupar todo o espaço disponível
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#d76a3d' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastre-se
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
             
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Telefone"
                    name="phone"
                    autoComplete="phone"
                  />
                </Grid>
              </Grid>


         <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="state"
                    label="Estado"
                    name="state"
                    autoComplete="state"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="Cidade"
                    name="city"
                    autoComplete="city"
                  />
                </Grid>
              </Grid>            



              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirme a senha"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#c0623c',
                  ':hover': {
                    backgroundColor: '#a5522d',
                  },
                  ':active': {
                    backgroundColor: '#8f4324', // Cor para quando o botão estiver ativo
                  },
                }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" sx={{ color: "#cc6236", textDecorationColor: "#a5522d" }} variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" sx={{ color: "#cc6236", textDecorationColor: "#a5522d" }} variant="body2">
                    {"Não possui uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
}
