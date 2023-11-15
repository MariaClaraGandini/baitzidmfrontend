import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import Modal from "../components/Modal"
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getAllEvents } from "../api/calendar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css'
import "../assets/css/calendar.css"; // Importe seu arquivo CSS aqui

function Calendar() {
  const { register, handleSubmit, setValue, reset, watch, formState } = useForm({
    defaultValues: {
      eventname: '',
      data: '',
      hour: '',
      local: '',
      description: '',
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  // const [eventName, setEventName] = useState('');
  // const [eventDate, setEventDate] = useState('');
  // const [eventHour, setEventHour] = useState('');
  // const [eventDescription, setEventDescription] = useState('');
  // const [eventLocal, setEventLocal] = useState('');
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);


  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

// Usa método GET quando carrega a tela
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);

    if(modalOpen==false){
      reset(); 

    }
    
  };

//Cria o evento
  const handleCreateEvent = async () => {
    try {
      const response = await fetch('http://localhost:5000/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: watch('eventname'),
          start: `${watch('data')}T${watch('hour')}:00.000Z`,
          local: watch('local'),
          description: watch('description'),
        }),
      });
      

      if (response.ok) {
        // Lógica de sucesso
        setModalOpen(false); // Fechar o modal após o sucesso
        fetchEvents();
       toast.success("Evento cadastrado com sucesso!");
       reset(); // Limpa os valores do formulário após o envio bem-sucedido

      } else {
   
      }
    } catch (error) {
      console.error(error);

      // Lógica de erro
    }
  };
  const handleEventClick = async (eventClickInfo) => {
    try {
      const eventId = eventClickInfo.event.extendedProps._id;
      console.log(eventId)
      
      const response = await fetch(`http://localhost:5000/event/getEvent/${eventId}`);
      if (response.ok) {
        const eventData = await response.json();
        setEvent(eventData.event);
        setModalOpen(true);

        setValue("eventName", eventData.event.title);
        setValue("eventDate", eventData.event.start);
        setValue("eventHour", ""); // Talvez você precise ajustar isso dependendo do formato da hora
        setValue("eventLocal", eventData.event.local);
        setValue("eventDescription", eventData.event.description);
      } else {
        // Lógica de erro ao obter detalhes do evento
        console.error("Erro na resposta do servidor:", response.status, response.statusText);      }
    } catch (error) {
      console.error(error);
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
        eventClick={handleEventClick} 
        customButtons={{
          modal: {
            text: 'Add Event',
            click:handleOpenModal,
          },
        }}
      />

             {/* Botão para abrir o modal */}
        <ToastContainer />
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
  value={watch('hour')}  // Ajuste para usar 'eventname' em vez de 'hour'
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
        onClick={handleSubmit(handleCreateEvent)}
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
