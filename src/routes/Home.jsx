import React from 'react';
import '../App.css'; // Importe o arquivo CSS onde a classe está definida
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'; // Ícone de exemplo
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Ícone de exemplo
import PhoneIcon from '@mui/icons-material/Phone'; //
import Retrato from '../assets/belamur.jpg'; // Importe a imagem de background


function Home() {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '70vh', // Defina a altura conforme necessário
          backgroundColor: 'gray',
          backgroundSize: 'auto', // Defina a imagem para exibir em seu tamanho original
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
        }}
      >
      </Box>
    <Box>
    <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
        <div style={{display: 'flex'}}>
          
        </div>
</Grid>
<Grid item xs={12} sm={4}>

</Grid>
<Grid item xs={12} sm={4}>

</Grid>
</Grid>
    </Box>
      <Box
          sx={{
            backgroundColor: '#f3eee8',
            width: '100%', // Take up the full width of the parent
          }}
        >
            <Box
          sx={{
            backgroundColor: '#FFFF',
            height: '100%', // Take up the full width of the parent
          }}
        ></Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img
                src={Retrato}
                alt="Retrato"
                style={{
                  width: '90%', // Make the image container responsive
                  height: '70vh', // Maintain aspect ratio
                  objectFit: 'cover',
                  borderRadius: '8px',
                  margin: '20px'
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <h1 className="titulo-customizado" variant="h4" gutterBottom>
                Quem somos?
              </h1>
              <p variant="body1">
              Nós, Isabela e Murilo, somos um casal movido à música e aos detalhes que marcam a trilha sonora de momentos especiais.<br />
              Nossa missão é cantar o amor, seja onde e como for. Já tivemos a honra de contar a história de amor de mais de 80 casais,<br />
             através de músicas personalizadas e escolhidas a dedo.
Desde violão, teclado, cello, violino até percussão, saxofone e clarins, contamos com músicos talentosos que estão ao nosso lado para completar as harmonias delicadas e especiais que <br />construímos juntos.
Nos deixa cantar o seu amor?


              </p>
            </Grid>
          </Grid>
        </Box>
    </div>
  );
}

export default Home;
