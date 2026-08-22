import { useState } from "react";

const legends = [
  {
    id: 1,
    rank: "01",
    name: "LOBO",
    title: "LEGENDARY MVP",
    era: "2026",
    achievement: "MVP — LMM vs CL",
    description:
      "A standout competitor and one of the names representing the competitive spirit of LMM.",
    image: "/hall-of-fame/lobo.jpg"
  },
  {
    id: 2,
    rank: "02",
    name: "LMM LEGENDS",
    title: "CLAN LEGACY",
    era: "2019 — PRESENT",
    achievement: "125+ VICTORIES",
    description:
      "The players who built the LMM legacy through years of competition, loyalty and teamwork.",
    image: "/hall-of-fame/lmm-legends.jpg"
  },
  {
    id: 3,
    rank: "03",
    name: "THE FOUNDERS",
    title: "FOUNDING ERA",
    era: "2019",
    achievement: "LMM ESTABLISHED",
    description:
      "The beginning of Legends of MiniMilitia and the foundation of the clan's identity.",
    image: "/hall-of-fame/founders.jpg"
  }
];

function HallOfFame({ language = "en" }) {
  const [selectedLegend, setSelectedLegend] = useState(null);

  const spanish = language === "es";

  const labels = spanish
    ? {
        section: "13 / LEGADO",
        title: "SALÓN DE",
        strong: "LA FAMA.",
        description:
          "Los jugadores, equipos y momentos que ayudaron a construir el legado de LMM.",
        explore: "VER LEYENDA",
        back: "VOLVER AL SALÓN DE LA FAMA",
        achievement: "LOGRO",
        era: "ERA",
        story: "HISTORIA"
      }
    : {
        section: "13 / LEGACY",
        title: "HALL OF",
        strong: "FAME.",
        description:
          "The players, teams and moments that helped build the LMM legacy.",
        explore: "VIEW LEGEND",
        back: "BACK TO HALL OF FAME",
        achievement: "ACHIEVEMENT",
        era: "ERA",
        story: "STORY"
      };

  if (selectedLegend) {
    return (
      <section className="hall-of-fame" id="hall-of-fame">
        <div className="hall-detail">
          <button
            type="button"
            className="hall-back"
            onClick={() => setSelectedLegend(null)}
          >
            ← {labels.back}
          </button>

          <div className="hall-detail-grid">
            <div className="hall-detail-image">
              <img
                src={selectedLegend.image}
                alt={selectedLegend.name}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="hall-detail-content">
              <span className="hall-rank">
                {selectedLegend.rank}
              </span>

              <span className="hall-title">
                {selectedLegend.title}
              </span>

              <h2>{selectedLegend.name}</h2>

              <div className="hall-detail-stats">
                <div>
                  <small>{labels.achievement}</small>
                  <strong>
                    {selectedLegend.achievement}
                  </strong>
                </div>

                <div>
                  <small>{labels.era}</small>
                  <strong>{selectedLegend.era}</strong>
                </div>
              </div>

              <div className="hall-story">
                <small>{labels.story}</small>
                <p>{selectedLegend.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hall-of-fame" id="hall-of-fame">
      <div className="hall-header">
        <div>
          <span>{labels.section}</span>

          <h2>
            {labels.title}
            <br />
            <strong>{labels.strong}</strong>
          </h2>
        </div>

        <p>{labels.description}</p>
      </div>

      <div className="hall-grid">
        {legends.map((legend) => (
          <article className="hall-card" key={legend.id}>
            <div className="hall-card-image">
              <img
                src={legend.image}
                alt={legend.name}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <span className="hall-card-rank">
                {legend.rank}
              </span>
            </div>

            <div className="hall-card-content">
              <span>{legend.title}</span>

              <h3>{legend.name}</h3>

              <p>{legend.achievement}</p>

              <button
                type="button"
                onClick={() => setSelectedLegend(legend)}
              >
                {labels.explore} ↗
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HallOfFame;