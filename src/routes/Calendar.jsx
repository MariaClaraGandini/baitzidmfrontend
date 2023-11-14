import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import '../index.css'

import "../assets/css/calendar.css"; // Importe seu arquivo CSS aqui
import Modal from "../components/Modal"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getAllEvents } from "../api/calendar";



function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventHour, setEventHour] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocal, setEventLocal] = useState('');
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
    
  };


  const handleCreateEvent = async () => {
    try {
      // Enviar dados do evento para o backend
      const response = await fetch('http://localhost:5000/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: eventName,
          start: `${eventDate}T${eventHour}:00`,
          local: eventLocal,
          description: eventDescription,
        }),
      });

      if (response.ok) {
        // Lógica de sucesso
        setModalOpen(false); // Fechar o modal após o sucesso
      
      } else {
        console.log(eventHour)
        console.log(eventDate)
        // Lógica de erro
      }
    } catch (error) {
      console.error(error);
      console.log(eventHour)
        console.log(eventDate)
      // Lógica de erro
    }
  };

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          end: "today prev,next,dayGridMonth,timeGridWeek,timeGridDay, modal",
        }}
        height="90vh"
        locale={ptBrLocale}
        events={events
        }
        // Adicione o evento para lidar com o clique no botão do cabeçalho
        customButtons={{
          modal: {
            text: 'Add Event',
            click:handleOpenModal,
          },
        }}
      />

             {/* Botão para abrir o modal */}

{/* Renderiza o componente Modal com base no estado modalOpen */}
<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
<TextField
        margin="normal"
        required
        fullWidth
        id="eventname"
        label="Evento"
        name="eventname"
        onChange={(e) => setEventName(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
<Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="date"
      label="Data"
      name="data"
      type="date"  // Defina o tipo como "date" para obter um campo de entrada de data
      onChange={(e) => setEventDate(e.target.value)}
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
  value={eventHour}
  onChange={(e) => setEventHour(e.target.value)}
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
          value={eventLocal}
          onChange={(e) => setEventLocal(e.target.value)}
        />
        <TextField
      margin="normal"
      required
      fullWidth
      id="textarea"
      label="Descrição"
      name="descricao"
      multiline  // Indica que este é um campo de texto de área
      rows={4}  
      onChange={(e) => setEventDescription(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }} // Define o número inicial de linhas visíveis
    />

<Button
        type="submit"
        onClick={handleCreateEvent}
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
