import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Foto from '../assets/belamur.jpg'; // Importe a imagem de background


const AboutUsPage = () => {
  return (
    <Container style={{ marginTop:'4rem'}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div>
            {/* Substitua 'caminho/para/sua/imagem.jpg' pelo caminho real da sua imagem */}
            <img
              src={Foto}
              alt="Imagem Sobre Nós"
              style={{ width: '100%', height: '50%' }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <h4 style={{margin:'0'}} className='titulo-customizado' >
Nossa história         </h4>
         
            <Typography variant="body1" paragraph>
            Desde 2016, nós, Isabela e Murilo, formamos uma dupla musical movida pela paixão em transformar momentos especiais em experiências inesquecíveis. Nossa missão é entrelaçar a trilha sonora de amor em todos os lugares e de todas as formas possíveis. Ao longo desses anos, tivemos a alegria de compartilhar a história de mais de 80 casais, dando vida a músicas personalizadas e cuidadosamente escolhidas.

Em nossas apresentações, contamos com uma variedade de instrumentos, desde violão, teclado, cello, violino, até percussão, saxofone e clarins. Acompanhados por músicos talentosos, construímos harmonias delicadas e especiais, marcando cada celebração com uma atmosfera única.

Além dos casamentos, expandimos nosso alcance e agora também fazemos parte de outros tipos de eventos, como confraternizações de empresas e festas diversas. Cada ocasião é uma oportunidade para nós espalharmos o amor através da música.

Compartilhamos a alegria de fazer parte da trilha sonora de histórias de amor e celebrar momentos especiais ao lado de quem confia em nossa arte. Deixe-nos ser parte da sua história. Nos permita cantar o seu amor, seja em um acorde suave ou em uma nota vibrante, criando memórias musicais que perdurarão para sempre.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUsPage;
