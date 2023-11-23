import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import axios from 'axios';



import '../index.css'

function Budget() {
  const [selectedMusicalTraining, setSelectedMusicalTraining] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, 
  } = useForm()


  const handleMusicalTrainingChange = (value) => {
    setSelectedMusicalTraining((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  
 
  const handleCreateBudget = async (data) => {
    try {
      // Concatene o array antes de criar o objeto formData
      const musicalTrainingString = selectedMusicalTraining.join(' + ');
      const formData = {
        ...data,
        musicaltraining: musicalTrainingString,
      };
  
      // Make an Axios request to your endpoint with the form data
      const response = await axios.post('http://localhost:5000/budget/create', formData);
  
      // Handle the response as needed (e.g., show a success message)
      console.log(response.data);
      toast.success('Budget created successfully!');
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating budget:', error);
      toast.error('Error creating budget. Please try again.');
    }
  };
  

  return (
    <Box component="form"       onSubmit={handleSubmit(handleCreateBudget)} noValidate style={{
      margin: '2.5rem',
      padding: '2.5rem',
      boxShadow: 'rgba(0.1, 0.1, 0.1, 0.1) 2px 2px 10px',
      marginTop: '7rem',
      borderRadius: '10px', // Valor ajustável para arredondar as bordas
    }}>
    <h1 className="titulo-customizado" style={{textAlign: 'center'}}>Orçamento</h1>
    <ToastContainer />

      <TextField
        margin="normal"
        required
        fullWidth
        id="nome"
        label="Nome"
        {...register('name', { required: 'Name is required' })}      />
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail"
        autoComplete="email"
        {...register('email', { required: 'E-mail is required' })}      />
      </Grid>
      <Grid item xs={12} sm={6}>

      <TextField
        margin="normal"
        required
        fullWidth
        id="telefone"
        label="Telefone"
        {...register('phone', { required: 'Telefone is required' })}       />
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
        {...register('state', { required: 'Estado is required' })}      />
      </Grid>
        <Grid item xs={12} sm={6}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="cidade"
        label="Cidade"
        {...register('city', { required: 'City is required' })}      />
    
      </Grid>
      </Grid>
     <h2 className="titulo-customizado" style={{fontSize:"40px", textAlign: 'center'}}>Formação Musical</h2>

     <FormControl fullWidth>
        <FormControlLabel control={<Checkbox onChange={() => handleMusicalTrainingChange('Voz + violão')}/>} label="Voz + violão" />
        <FormControlLabel control={<Checkbox onChange={() => handleMusicalTrainingChange('Cajón')} />} label="Cajón" />
        {/* <FormControlLabel control={<Checkbox {...register('musicaltraining')} value="Cello" />} label="Cello" />
        <FormControlLabel control={<Checkbox {...register('musicaltraining')} value="Teclado" />} label="Teclado" />
        <FormControlLabel control={<Checkbox {...register('musicaltraining')} value="Saxofone" />} label="Saxofone" />
        <FormControlLabel control={<Checkbox {...register('musicaltraining')} value="Violino" />} label="Violino" /> */}
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
