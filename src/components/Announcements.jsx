import { useState } from "react";

const announcements = [
  {
    id: 1,
    date: "AUG 2026",
    type: "OFFICIAL",
    title: "LMM 2026 ACTIVE ERA IS HERE",
    description:
      "The Legends are entering another active competitive era with more wars, events and community activity.",
  },
  {
    id: 2,
    date: "AUG 2026",
    type: "ROSTER",
    title: "ROSTER OPERATIONS ARE ACTIVE",
    description:
      "The LMM roster is active and preparing for upcoming competitive battles.",
  },
  {
    id: 3,
    date: "AUG 2026",
    type: "COMMUNITY",
    title: "THE LEGENDS KEEP MOVING",
    description:
      "The LMM community continues to grow around competition, loyalty and legacy.",
  },
];

export default function Announcements({ language = "en" }) {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const spanish = language === "es";

  if (selectedAnnouncement) {
    return (
      <section
        className="announcements"
        id="announcements"
      >
        <div className="announcement-detail">
          <button
            className="announcement-back"
            onClick={() => setSelectedAnnouncement(null)}
          >
            ←{" "}
            {spanish
              ? "VOLVER A ANUNCIOS"
              : "BACK TO ANNOUNCEMENTS"}
          </button>

          <span className="announcement-detail-type">
            {selectedAnnouncement.type}
          </span>

          <h2>{selectedAnnouncement.title}</h2>

          <span className="announcement-detail-date">
            {selectedAnnouncement.date}
          </span>

          <p>{selectedAnnouncement.description}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="announcements"
      id="announcements"
    >
      <div className="announcements-header">
        <div>
          <span>
            {spanish
              ? "10 / ANUNCIOS"
              : "10 / ANNOUNCEMENTS"}
          </span>

          <h2>
            {spanish ? "ACTUALIZACIONES" : "OFFICIAL"}
            <br />
            <strong>
              {spanish ? "OFICIALES." : "UPDATES."}
            </strong>
          </h2>
        </div>

        <p>
          {spanish
            ? "Los últimos anuncios oficiales de Legends of MiniMilitia."
            : "The latest official announcements from the Legends of MiniMilitia."}
        </p>
      </div>

      <div className="announcements-list">
        {announcements.map((item) => (
          <article
            className="announcement-card"
            key={item.id}
          >
            <div className="announcement-card-date">
              {item.date}
            </div>

            <div className="announcement-card-content">
              <span>{item.type}</span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <button
                onClick={() =>
                  setSelectedAnnouncement(item)
                }
              >
                {spanish
                  ? "LEER ACTUALIZACIÓN"
                  : "READ UPDATE"}{" "}
                ↗
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}