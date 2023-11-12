import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "../assets/css/calendar.css"; // Importe seu arquivo CSS aqui

function Calendar() {
  return (
    <div className="container" >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          end: "today prev,next,dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        locale={ptBrLocale}
        events={[
          {
            title: "Evento 1",
            start: "2023-11-10T10:00:00",
            end: "2023-11-10T12:00:00",
          },
          {
            title: "Evento 2",
            start: "2023-11-15T14:00:00",
            end: "2023-11-15T16:00:00",
          },
        ]}
      />

    </div>
  );
}

export default Calendar;
