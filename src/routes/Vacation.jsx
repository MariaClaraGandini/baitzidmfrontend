import React, { useState, useEffect, useCallback } from "react";
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
import URL from '../api/config'
import { useDarkMode } from '../DarkModeContext'; 

function Vacation() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthToken();
  const { isDarkMode } = useDarkMode();
  const fetchVacationEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/usuarios/ferias`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (Array.isArray(response.data)) {
        const vacationEvents = response.data
          .filter(event => event && event.vacationInfo)
          .flatMap(event => {
            const vacationInfoArray = Array.isArray(event.vacationInfo) ? 
              event.vacationInfo : 
              [event.vacationInfo];
            
            return vacationInfoArray.map((info, index) => ({
              id: `${info.taskNameDesativar}-${index}`,  // Adicione um id único para cada evento
              start: `${info.dataInicioFerias}T${info.horarioInicioFerias}`,
              end: `${info.dataRetornoFerias}T${info.horarioRetornoFerias}`,
              title: `Férias-${event.username}`,  // Altere o título para incluir o taskNameDesativar
              extendedProps: {
                username: event.username,
                vacationDetails: info  // Adicione detalhes das férias como extendedProps
              }
            }));
          });
  
        setEvents(vacationEvents);
        console.log(response.data);
        console.log(`eventos: ${vacationEvents}`);
  
      } else {
        console.error('Resposta inesperada:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar eventos de férias:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);
  
  useEffect(() => {
    fetchVacationEvents();
  }, [fetchVacationEvents]);

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <>
      <div className={`h-95vh p-2 mt-8 relative`}>
        <div className={`p-8  ${isDarkMode ? 'bgdark1' : 'bg-white '} rounded-lg  mt-14`}>
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
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
            <Oval color="#1658f2" height={50} width={50} />
          </div>
        )}
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
