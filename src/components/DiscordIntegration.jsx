function DiscordIntegration({ language = "en" }) {
  const spanish = language === "es";

  const content = spanish
    ? {
        section: "14 / COMUNIDAD",
        title: "ÚNETE A",
        strong: "LMM.",
        description:
          "Conecta con los Legends, recibe noticias, sigue las guerras y forma parte de la comunidad.",
        online: "COMUNIDAD LMM",
        status: "COMUNIDAD ACTIVA",
        join: "UNIRSE AL DISCORD",
        follow: "SEGUIR A LMM",
        note:
          "Mantente al día con partidos, anuncios, eventos y novedades del clan."
      }
    : {
        section: "14 / COMMUNITY",
        title: "JOIN THE",
        strong: "LEGENDS.",
        description:
          "Connect with the Legends, get updates, follow wars and become part of the LMM community.",
        online: "LMM COMMUNITY",
        status: "COMMUNITY ACTIVE",
        join: "JOIN DISCORD",
        follow: "FOLLOW LMM",
        note:
          "Stay updated with matches, announcements, events and clan news."
      };

  const discordUrl = "https://discord.com/";

  return (
    <section className="discord-section" id="discord">
      <div className="discord-header">
        <div>
          <span>{content.section}</span>

          <h2>
            {content.title}
            <br />
            <strong>{content.strong}</strong>
          </h2>
        </div>

        <p>{content.description}</p>
      </div>

      <div className="discord-card">
        <div className="discord-card-top">
          <div className="discord-brand">
            <div className="discord-icon" aria-hidden="true">
              D
            </div>

            <div>
              <span>{content.online}</span>
              <h3>Legends of MiniMilitia</h3>
            </div>
          </div>

          <div className="discord-status">
            <span className="discord-status-dot" />
            {content.status}
          </div>
        </div>

        <div className="discord-card-body">
          <p>{content.note}</p>

          <div className="discord-actions">
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="discord-primary"
            >
              {content.join} ↗
            </a>

            <a
              href="#socials"
              className="discord-secondary"
            >
              {content.follow} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscordIntegration;