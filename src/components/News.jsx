import { useState } from "react";

const news = [
  {
    id: 1,
    date: "AUG 2026",
    category: "WAR RESULT",
    title: "LMM DEFEATS CL 3-1",
    description:
      "LMM secured another victory in August 2026, defeating CL with a final score of 3-1.",
  },
  {
    id: 2,
    date: "AUG 2026",
    category: "LMM UPDATE",
    title: "THE 2026 ACTIVE ERA",
    description:
      "The Legends continue their active era with new battles, events and community activity.",
  },
  {
    id: 3,
    date: "AUG 2026",
    category: "COMMUNITY",
    title: "THE LEGENDS KEEP MOVING",
    description:
      "The LMM community continues to grow around competition, loyalty and the MiniMilitia legacy.",
  },
];

export default function News({ language = "en" }) {
  const [selectedNews, setSelectedNews] = useState(null);

  const spanish = language === "es";

  if (selectedNews) {
    return (
      <section className="news" id="news">
        <div className="news-detail">
          <button
            className="news-back"
            onClick={() => setSelectedNews(null)}
          >
            ← {spanish ? "VOLVER A NOTICIAS" : "BACK TO NEWS"}
          </button>

          <span className="news-detail-category">
            {selectedNews.category}
          </span>

          <h2>{selectedNews.title}</h2>

          <span className="news-detail-date">
            {selectedNews.date}
          </span>

          <p>{selectedNews.description}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="news" id="news">
      <div className="news-header">
        <div>
          <span>{spanish ? "09 / NOTICIAS" : "09 / NEWS"}</span>

          <h2>
            LMM
            <br />
            <strong>{spanish ? "NOTICIAS." : "NEWS."}</strong>
          </h2>
        </div>

        <p>
          {spanish
            ? "Resultados, actualizaciones y noticias de la comunidad LMM."
            : "War results, updates and stories from the LMM community."}
        </p>
      </div>

      <div className="news-list">
        {news.map((item) => (
          <article className="news-card" key={item.id}>
            <div className="news-card-meta">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <button onClick={() => setSelectedNews(item)}>
              {spanish ? "LEER NOTICIA" : "READ STORY"} ↗
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}