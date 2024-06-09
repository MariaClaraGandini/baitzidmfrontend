import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Button, Label, Modal, TextInput,Checkbox } from 'flowbite-react';
// import { getAllEvents } from "../api/calendar";
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css'
import "../assets/css/calendar.css";
import ModalVacationUser from '../components/ModalVacationUser';
import axios from 'axios';

function Vacation() {
  const [openModal, setOpenModal] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchVacationEvents() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/ferias');
        const vacationEvents = response.data.map(event => ({
          title: event.vacationInfo.taskNameDesativar,
          start: `${event.vacationInfo.dataInicioFerias}T${event.vacationInfo.horarioInicioFerias}`,
          end: `${event.vacationInfo.dataRetornoFerias}T${event.vacationInfo.horarioRetornoFerias}`,
          description: `Período de férias de ${event.username}`
        }));
        setEvents(vacationEvents);
        console.log(events)
      } catch (error) {
        console.error('Erro ao obter eventos de férias:', error);
      }
    }

    fetchVacationEvents();
  }, []);
  const handleOpenModalCreate = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <div className="h-95vh p-2 mt-8 bg-gray-100">
            <div className="p-8  bg-white rounded-lg dark:border-gray-700 mt-14">

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
            text: 'Agendamento Férias',
            click: handleOpenModalCreate,
          },
        }}
      />

      {/* Botão para abrir o modal */}
  
      <ModalVacationUser openModal={openModal} onClose={handleCloseModal} />





      
          </div>
    </div>
  );
}

export default Vacation;