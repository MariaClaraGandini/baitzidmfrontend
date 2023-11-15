import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal"
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import '../index.css'
import "../assets/css/calendar.css"; // Importe seu arquivo CSS aqui

function Calendar() {
    const { register, handleSubmit, setValue, reset, watch, formState } = useForm({
        defaultValues: {
          eventId: '',  // Adicione o campo eventId aos defaultValues
          eventname: '',
          data: '',
          hour: '',
          local: '',
          description: '',
        },
      });
    const handleEditEvent = async () => {
        try {
          const eventId = watch("eventId"); // Adicionado para obter o ID do evento
    
          console.log(eventId);
    
          const editResponse = await fetch(`http://localhost:5000/event/edit/${eventId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: watch('eventname'),
              start: `${watch('data')}T${watch('hour')}:00.000`,
              local: watch('local'),
              description: watch('description'),
            }),
          });
    
          
    
          if (editResponse.ok) {
            setModalOpen(false);
            fetchEvents();
            toast.success("Evento atualizado com sucesso!");
            reset();
          } else {
            console.error("Erro na edição do evento:", editResponse.status, editResponse.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="container">
      {/* Renderiza o componente Modal com base no estado modalOpen */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="eventname"
          label="Evento"
          name="eventname"
          {...register('eventname', { required: 'Nome do evento é obrigatório' })}
          value={watch('eventname')}  // Ajuste para usar 'eventname' em vez de 'hour'
          InputLabelProps={{
            shrink: true,
          }}
        />
        {formState.errors?.eventname && (
          <p>{formState.errors.eventname.message}</p>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="data"
              label="Data"
              name="data"
              type="date"  // Defina o tipo como "date" para obter um campo de entrada de data
              {...register('data', { required: 'Data do evento é obrigatório' })}
              value={watch('data')}  // Ajuste para usar 'eventname' em vez de 'hour'
              InputLabelProps={{
                shrink: true,
              }}
            />

          </Grid>
          <Grid item xs={12} sm={6}>


            <TextField
              margin="normal"
              required
              fullWidth
              id="hour"
              label="Hora"
              name="hour"
              type="time"
              {...register('hour', { required: 'Horário do evento é obrigatório' })}
              value={watch('hour')}
              InputLabelProps={{
                shrink: true,
              }} 
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          required
          fullWidth
          id="local"
          label="Endereço"
          name="local"
          {...register('local', { required: 'Local do evento é obrigatório' })}
          value={watch('local')}  // Ajuste para usar 'eventname' em vez de 'hour'
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="textarea"
          label="Descrição"
          name="description"
          multiline  // Indica que este é um campo de texto de área
          rows={4}
          {...register('description')}
          value={watch('description')}  // Ajuste para usar 'eventname' em vez de 'hour'
          InputLabelProps={{
            shrink: true,
          }} // Define o número inicial de linhas visíveis
        />

        <Button
          type="submit"
          onClick= {handleSubmit(handleEditEvent)}
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

   
      </Modal>

    </div>
  );
}

export default Calendar;