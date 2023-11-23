import React from 'react';
import '../App.css'; // Importe o arquivo CSS onde a classe está definida
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import banner from '../assets/teste2.png'; // Importe a imagem de background
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '85vh',
          marginTop: '4rem',
          display: 'flex',
          backgroundImage: `url(${banner})`, // Use a imagem de banner
          backgroundSize: 'cover', // Ajuste o tamanho da imagem para cobrir o container
          backgroundPosition: 'center', // Centralize a imagem no container
        }}
      >
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs={false} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <div className="herotextcontainer"
            
            >
              <div className="herotext">Cantamos o</div>
              <div className="herotext2">amor</div>

              <div className="responsivebutton">
                <Button
                  fullWidth
                  variant="contained"
                  className="buttonhero"
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: '55%',
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
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3}  sx={{padding:'2rem', justifyContent:'center', alignItems:'center'}}>
      <Grid item xs={12} sm={4}>
        <p className="paragráfo">Teste</p>
</Grid>
<Grid item xs={12} sm={4}>

<p>80</p>

</Grid>
<Grid item xs={12} sm={4}>
<p>Teste2</p>

</Grid>

</Grid>



      <div>
            <p  className="titulo1">Serviços</p>
            <Grid container spacing={3}  sx={{padding:'2rem'}}>
            <Grid item xs={12} sm={4}>
            <div className="navegar-item imagembackground1">
            </div>

              </Grid>
              <Grid item xs={12} sm={4}>
            <div className="navegar-item imagembackground2">
            </div>

              </Grid>
              <Grid item xs={12} sm={4}>
            <div className="navegar-item imagembackground3">

            </div>

              </Grid>
              </Grid>

              <Grid container spacing={2}  sx={{padding:'2rem'}}>
            <Grid item xs={12} sm={4}>
            <div className="navegar-item1 imagembackground4" />
              </Grid>
              <Grid item xs={12} sm={8}>
              <Typography variant="h4" className="title">
Sobre Nós

          </Typography>
              <Typography variant="body1" className="paragraph">
              Nós, Isabela e Murilo, somos um casal movido à música e aos detalhes que marcam a trilha sonora de momentos especiais. Nossa missão é cantar o amor, seja onde e como for. Já tivemos a honra de contar a história de amor de mais de 80 casais, através de músicas personalizadas e escolhidas a dedo.
Desde violão, teclado, cello, violino até percussão, saxofone e clarins, contamos com músicos talentosos que estão ao nosso lado para completar as harmonias delicadas e especiais que construímos juntos.
Nos deixa cantar o seu amor?

          </Typography>
              </Grid>
              </Grid>

        </div>







    </div>
  );
}

export default Home;