import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import '../index.css'

function Budget() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implemente o tratamento do envio do formulário aqui
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} style={{
      margin: '2.5rem',
      padding: '2.5rem',
      boxShadow: 'rgba(0.1, 0.1, 0.1, 0.1) 2px 2px 10px',
      marginTop: '7rem',
      borderRadius: '10px', // Valor ajustável para arredondar as bordas
    }}>
    <h1 className="titulo-customizado">Orçamento</h1>

      <TextField
        margin="normal"
        required
        fullWidth
        id="nome"
        label="Nome"
        name="nome"
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
        id="telefone"
        label="Telefone"
        name="telefone"
      />
      </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="estado"
        label="Estado"
        name="estado"
      />
      </Grid>
        <Grid item xs={12} sm={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="cidade"
        label="Cidade"
        name="cidade"
      />
      </Grid>
      </Grid>
     <h2 className="titulo-customizado" style={{fontSize:"40px"}}>Formação Musical</h2>

      <FormControl fullWidth>
        <FormControlLabel
          control={<Checkbox />}
          label="Voz + violão"
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Cajón"
        />
          <FormControlLabel
          control={<Checkbox />}
          label="Cello"
        />
           <FormControlLabel
          control={<Checkbox />}
          label="Teclado"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Saxofone"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Violino"
        />
    
      </FormControl>
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
        Enviar
      </Button>
    </Box>
  );
}

export default Budget;
