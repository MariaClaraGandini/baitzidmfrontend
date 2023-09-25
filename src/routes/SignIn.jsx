import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Foto from '../assets/signin.jpg'; // Importe a imagem de background



// TODO remove, this demo shouldn't need to reset the theme.

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

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Grid container component="main" sx={{ height: '100vh', padding: '2.5rem',}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          elevation={4} 
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${Foto})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius:'10px 0 0 10px'

          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={3} sx={{borderRadius:'0px 10px 10px 0px'}} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#d76a3d' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Fazer Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
        
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
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
                  <Link href="#" sx={{color: "#cc6236", textDecorationColor: "#a5522d"}} variant="body2">
                   Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item >
                  <Link href="#" sx={{color: "#cc6236", textDecorationColor: "#a5522d"}} variant="body2">
                    {"Não possui uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
