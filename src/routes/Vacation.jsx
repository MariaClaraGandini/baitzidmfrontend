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
// import { getAllEvents } from "../api/calendar";
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css'
import "../assets/css/calendar.css";

function Vacation() {
  const { register, handleSubmit, setValue, reset, watch, formState } = useForm({
    defaultValues: {
      eventId: '',  
      eventname: '',
      data: '',
      hour: '',
      local: '',
      description: '',
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenCreate, setModalOpenCreate] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

//   const [events, setEvents] = useState([]);

const events=[{'title':'teste','start':'00:00', 'local': 'abv','description':'aaaa' }]
//   const fetchEvents = async () => {
//     try {
//       const data = await getAllEvents();
//       setEvents(data);
//       console.log(data)
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

  
  const handleOpenModalCreate = () => {
    setModalOpenCreate(true);

    if (modalOpenCreate == false) {
      reset();

    }

  };


  //  Abrir modal de editar
  const handleOpenModalEdit = () => {
    setModalOpenEdit(true);

    if (modalOpenEdit == false) {
      reset();

    }

  };

  //Cria o evento
//   const handleCreateEvent = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/event/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ5YTEyMDkyYWZlMzNlNzU2ZDk4OSIsImlhdCI6MTY5Mzc2NTM1M30.sbJiaY4U67IVXcEUyWTD586lvARn-8VulZ4lCKkrwzI',

//         },
//         body: JSON.stringify({
//           title: watch('eventname'),
//           start: `${watch('data')}T${watch('hour')}:00.000`,
//           local: watch('local'),
//           description: watch('description'),
//         }),
//       });


//       if (response.ok) {
//         // Lógica de sucesso
//         setModalOpenCreate(false); // Fechar o modal após o sucesso
//         fetchEvents();
//         toast.success("Evento cadastrado com sucesso!");
//         reset(); // Limpa os valores do formulário após o envio bem-sucedido

//       } else {

//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//Metodo editar
//   const handleEditEvent = async () => {
//     try {
//       const eventId = watch("eventId"); // Adicionado para obter o ID do evento

//       console.log(eventId);

//       const editResponse = await fetch(`http://localhost:5000/event/edit/${eventId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: watch('eventname'),
//           start: `${watch('data')}T${watch('hour')}:00.000`,
//           local: watch('local'),
//           description: watch('description'),
//         }),
//       });

      

//       if (editResponse.ok) {
//         setModalOpenEdit(false);
//         fetchEvents();
//         toast.success("Evento atualizado com sucesso!");
//         reset();
//       } else {
//         console.error("Erro na edição do evento:", editResponse.status, editResponse.statusText);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


  //Exine as informações informações do evento no modal
//   const handleEventClick = async (eventClickInfo) => {
//     try {
//       const eventId = eventClickInfo.event.extendedProps._id;
//       console.log(eventId);

//       const response = await fetch(`http://localhost:5000/event/getEvent/${eventId}`);
//       if (response.ok) {
//         const eventData = await response.json();
//         const formattedDate = format(new Date(eventData.event.start), 'yyyy-MM-dd', { locale: ptBR });
//         const formattedHour = format(new Date(eventData.event.start), 'HH:mm', { locale: ptBR });

//         setModalOpenEdit(true);
//         setValue("eventId", eventId);  // Defina o valor do eventId
//         setValue("eventname", eventData.event.title);
//         setValue("data", formattedDate);
//         setValue("hour", formattedHour);
//         setValue("local", eventData.event.local);
//         setValue("description", eventData.event.description);

//         // Agora chamamos a função handleEditEvent aqui, após ter sido definida
//       } else {
//         console.error("Erro na resposta do servidor:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const handleDeleteEvent = async () => {
//     try {
//       const eventId = watch("eventId"); // Adicionado para obter o ID do evento

//       console.log(eventId);

//       const deleteResponse = await fetch(`http://localhost:5000/event/delete/${eventId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//     if (deleteResponse.ok) {
//       setModalOpenEdit(false);
//       fetchEvents();
//       toast.success("Evento excluído com sucesso!");
//       reset();
//     } else {
//       console.error("Erro na exclusão do evento:", deleteResponse.status, deleteResponse.statusText);
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   };



  

  return (
    <div className="container bg-white rounded">
    <h1 className="text-3xl font-medium mb-1">Férias</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          end: "today prev,next,dayGridMonth,timeGridWeek,timeGridDay, modal",
        }}
        locale={ptBrLocale}
        events={events}
        timeZone="local"  // Definindo o fuso horário local
        // eventClick={handleEventClick}
        customButtons={{
          modal: {
            text: 'Novo Evento',
            click: handleOpenModalCreate,
          },
        }}
      />

      {/* Botão para abrir o modal */}
      <ToastContainer />
      {/* Renderiza o componente Modal com base no estado modalOpen */}
      <Modal className="modal" isOpen={modalOpenCreate} onClose={() => setModalOpenCreate(false)}>
       <h1 className="titulo-customizado" style={{textAlign: 'center'}}>Criar evento</h1> 

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
//            onClick={(e) => {
//     e.preventDefault(); // Adicione o preventDefault aqui
//     handleSubmit(watch("eventId") ? handleEditEvent : handleCreateEvent)();
//   }}
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

      <Modal isOpen={modalOpenEdit} onClose={() => setModalOpenEdit(false)}>
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
        //    onClick={handleSubmit(handleEditEvent)}
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
        <Button
          type="submit"
        //    onClick={handleSubmit(handleDeleteEvent)}
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
          Deletar
        </Button>
      </Modal>




      

    </div>
  );
}

export default Vacation;