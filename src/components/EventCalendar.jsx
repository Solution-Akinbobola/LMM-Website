import { useMemo, useState } from "react";
import { eventsData } from "../data/eventsData";

function EventCalendar({ language = "en" }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const labels = {
    en: {
      section: "12 / EVENTS",
      title: "LMM",
      titleStrong: "CALENDAR.",
      description:
        "Upcoming wars, training sessions, tournaments and community events.",
      upcoming: "UPCOMING EVENTS",
      all: "ALL",
      war: "WAR",
      training: "TRAINING",
      tournament: "TOURNAMENT",
      community: "COMMUNITY",
      opponent: "OPPONENT",
      date: "DATE",
      time: "TIME",
      upcomingLabel: "UPCOMING"
    },

    es: {
      section: "12 / EVENTOS",
      title: "CALENDARIO",
      titleStrong: "LMM.",
      description:
        "Próximas guerras, entrenamientos, torneos y eventos comunitarios.",
      upcoming: "PRÓXIMOS EVENTOS",
      all: "TODOS",
      war: "GUERRA",
      training: "ENTRENAMIENTO",
      tournament: "TORNEO",
      community: "COMUNIDAD",
      opponent: "OPONENTE",
      date: "FECHA",
      time: "HORA",
      upcomingLabel: "PRÓXIMO"
    }
  }[language];

  const filters = [
    {
      value: "ALL",
      label: labels.all
    },
    {
      value: "WAR",
      label: labels.war
    },
    {
      value: "TRAINING",
      label: labels.training
    },
    {
      value: "TOURNAMENT",
      label: labels.tournament
    },
    {
      value: "COMMUNITY",
      label: labels.community
    }
  ];

  const filteredEvents = useMemo(() => {
    if (activeFilter === "ALL") {
      return eventsData;
    }

    return eventsData.filter(
      (event) => event.type === activeFilter
    );
  }, [activeFilter]);

  const formatDate = (date) => {
    const formatted = new Date(`${date}T12:00:00`);

    return formatted.toLocaleDateString(
      language === "es" ? "es-ES" : "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );
  };

  const getDay = (date) => {
    const formatted = new Date(`${date}T12:00:00`);

    return formatted.toLocaleDateString(
      language === "es" ? "es-ES" : "en-US",
      {
        day: "2-digit"
      }
    );
  };

  const getMonth = (date) => {
    const formatted = new Date(`${date}T12:00:00`);

    return formatted
      .toLocaleDateString(
        language === "es" ? "es-ES" : "en-US",
        {
          month: "short"
        }
      )
      .toUpperCase();
  };

  return (
    <section className="event-calendar" id="calendar">
      <div className="event-calendar-header">
        <div>
          <span>{labels.section}</span>

          <h2>
            {labels.title}
            <br />
            <strong>{labels.titleStrong}</strong>
          </h2>
        </div>

        <p>{labels.description}</p>
      </div>

      <div className="event-calendar-toolbar">
        <span>{labels.upcoming}</span>

        <div className="event-filters">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.value}
              className={
                activeFilter === filter.value
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter.value)
              }
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="event-list">
        {filteredEvents.map((event) => {
          const eventText =
            event[language] || event.en;

          return (
            <article
              className="event-card"
              key={event.id}
            >
              <div className="event-date-box">
                <strong>{getDay(event.date)}</strong>
                <span>{getMonth(event.date)}</span>
              </div>

              <div className="event-main">
                <div className="event-top">
                  <span className="event-type">
                    {eventText.type}
                  </span>

                  <span className="event-status">
                    {labels.upcomingLabel}
                  </span>
                </div>

                <h3>{eventText.title}</h3>

                <p>{eventText.description}</p>

                <div className="event-details">
                  <span>
                    <small>{labels.date}</small>
                    {formatDate(event.date)}
                  </span>

                  <span>
                    <small>{labels.time}</small>
                    {event.time}
                  </span>

                  <span>
                    <small>{labels.opponent}</small>
                    {event.opponent}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default EventCalendar;