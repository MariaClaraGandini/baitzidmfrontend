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
import { Oval } from 'react-loader-spinner';

function Vacation() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false); // Novo estado de carregamento
  const { token } = useAuthToken(); 

  async function fetchVacationEvents() {
    setLoading(true);
    try {
        const response = await axios.get('http://localhost:3000/usuarios/ferias', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (Array.isArray(response.data)) {
            const vacationEvents = response.data
                .filter(event => event && event.vacationInfo)
                .map(event => {
                    return {
                        start: `${event.vacationInfo.dataInicioFerias}T${event.vacationInfo.horarioInicioFerias}`,
                        end: `${event.vacationInfo.dataRetornoFerias}T${event.vacationInfo.horarioRetornoFerias}`,
                        title: `${event.vacationInfo.taskNameDesativar}`,
                        extendedProps: {
                            username: event.username
                        }
                    };
                });
            setEvents(vacationEvents);
        } else {
            console.error('Resposta inesperada:', response.data);
        }
        console.log(response.data);
    } catch (error) {
        console.error('Erro ao buscar eventos de férias:', error);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
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
    fetchVacationEvents(); // Re-fetch events after creating a new vacation
  };

  return (
    <>
      <div className="h-95vh p-2 mt-8 bg-gray-100">
        <div className="p-8 bg-white rounded-lg dark:border-gray-700 mt-14">
          {loading ? (
            <div className="flex justify-center items-center">
              <Oval color="#1658f2" height={50} width={50} />
            </div>
          ) : (
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
          )}
        </div>
        <ModalVacationEdit
          openModal={openModalEdit}
          onClose={handleCloseEditModal}
          event={selectedEvent}
        />
        <ModalVacationCreate
          openModal={openModalCreate}
          onClose={handleCloseCreateModal}
          user={null}
        />
      </div>
    </>
  );
}

export default Vacation;
