import React, { useState, useEffect } from "react";
import { Button } from 'flowbite-react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import axios from 'axios';
import ModalVacationEdit from '../components/ModalVacationEdit';
import ModalVacationCreate from "../components/ModalVacationCreate";
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';
import "../assets/css/calendar.css";
import { useAuthToken } from '../api/AuthToken';

function Vacation() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Teste, setTeste] = useState([]);

  const [events, setEvents] = useState([]);
  const { token } = useAuthToken(); 

  useEffect(() => {
    async function fetchVacationEvents() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/ferias', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeste(response.data);
        console.log(Teste)
        const vacationEvents = response.data.map(event => {
            return {
              start: `${event.vacationInfo.dataInicioFerias}T${event.vacationInfo.horarioInicioFerias}`,
              end: `${event.vacationInfo.dataRetornoFerias}T${event.vacationInfo.horarioRetornoFerias}`,
              title: `${event.vacationInfo.taskNameDesativar}`, // Adicionei a propriedade title
              extendedProps: {
                username: event.username
              }
            };
          })
        
        setEvents(vacationEvents);
        console.log(events)
      } catch (error) {
        console.error('Erro ao buscar eventos de férias:', error);
      }
    }

    fetchVacationEvents();
  }, [token]);

  const handleDateClick = () => {
    setSelectedEvent(null);
    setOpenModalCreate(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpenModalEdit(true);
  };

  const handleCloseEditModal = () => {
    setOpenModalEdit(false);
  };

  const handleCloseCreateModal = () => {
    setOpenModalCreate(false);
  };

  return (
    <>
      <div className="h-95vh p-2 mt-8 bg-gray-100">
      <div className="p-8 bg-white rounded-lg dark:border-gray-700 mt-14">
        {/* <h1 className="text-3xl font-medium mb-2">Férias</h1> */}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,agendarFeriasButton"
          }}
          locale={ptBrLocale}
          customButtons={{
            agendarFeriasButton: {
              text: 'Agendar Férias',
              click: () => setOpenModalCreate(true)
            }
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
      <ModalVacationEdit
        openModal={openModalEdit}
        onClose={handleCloseEditModal}
        event={selectedEvent}
      />
      <ModalVacationCreate
        openModal={openModalCreate}
        onClose={handleCloseCreateModal}
      />
</div>
</> );
}

export default Vacation;
