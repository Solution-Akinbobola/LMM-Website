import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

import zerxStats from "./assets/zerx-stats.jpeg";
import shinobiStats from "./assets/shinobi-stats.jpeg";
import indraStats from "./assets/indra-stats.jpeg";
import bunnyStats from "./assets/bunny-stats.jpeg";

const members = [
  "CHEMA",
  "OVERSKY",
  "LOBO",
  "Alonso",
  "Zerx",
  "GHOST",
  "VICENZO",
  "PPCDSAPP",
  "LEIN",
  "tekato",
  "KEYSI",
  "KINDEL",
  "DRAK",
  "AARON",
  "KNIGHT",
  "HERTRIC",
  "JAMES",
  "Focus",
  "Ryze",
  "Adiel",
  "Shadow",
  "Daniel",
  "Jeremy",
  "shinobi",
  "Dazai",
  "Archer",
  "Kassette",
  "Krept",
  "Bunny",
  "wos",
  "sekhon",
  "Treak",
  "triston",
  "raizo",
  "itadori",
  "Lando",
  "savit",
  "indra",
  "obito"
];
const leaders = [
  { name: "LOBO", role: "leader", number: "01" },
  { name: "OVER", role: "coLeader", number: "02" },
  { name: "TEKATO", role: "coLeader", number: "03" },
  { name: "ANTONIO", role: "coLeader", number: "04" },
  { name: "LEIN", role: "coLeader", number: "05" }
];

const victories = [
  "CL",
  "IND",
  "HCL",
  "TL",
  "LNZ",
  "LZR",
  "L2K",
  "BELLOS",
  "BR2",
  "NICA",
  "GG",
  "MIL",
  "HL",
  "FL",
  "JDM",
  "HQ",
  "IL",
  "V",
  "F2",
  "NS",
  "TBL",
  "TDW",
  "LD",
  "V5",
  "DA",
  "NG",
  "SVD",
  "SL",
  "USA",
  "NN",
  "MVP",
  "HT",
  "BLK",
  "USARE",
  "XP",
  "P+G",
  "FAVOUR",
  "IG",
  "FC",
  "EXP",
  "DL",
  "RKG",
  "FRS",
  "ROLO",
  "TSG",
  "TGM",
  "BGM",
  "2R",
  "RPG",
  "RBL",
  "OT",
  "OP",
  "SNG",
  "PGS",
  "TM",
  "BOD",
  "CLC",
  "SF",
  "7G",
  "BD",
  "USSR",
  "6S",
  "ES",
  "LOUD",
  "2T",
  "GRIZZI",
  "UCW",
  "AF",
  "PM",
  "BNL",
  "U+T",
  "PNL",
  "ZXP",
  "LP",
  "LDN",
  "AD",
  "SP1",
  "APS",
  "JP",
  "PWR",
  "LGN",
  "RM",
  "TSR",
  "TXS",
  "PRIME",
  "PLN",
  "RWD",
  "DB",
  "CA",
  "LNM",
  "7N",
  "ZK",
  "PMS",
  "SAO",
  "TP",
  "V4",
  "GD",
  "TDK",
  "EXT",
  "BRICS",
  "LATM",
  "CID",
  "BTC",
  "SC",
  "MC502",
  "CNG",
  "UV",
  "MW",
  "TC",
  "GMT",
  "LGL",
  "CLM",
  "LF",
  "RR",
  "DW",
  "MD"
];

const translations = {
  en: {
    language: "English",
    otherLanguage: "Español",
    selectLanguage: "SELECT LANGUAGE",

    home: "HOME",
    legacy: "LEGACY",
    roster: "ROSTER",
    wars: "WARS",
    live: "LIVE",
    join: "JOIN LMM",

    menuOpen: "Open menu",
    menuClose: "Close menu",

    established: "LMM // ESTABLISHED 2019",
    heroTitle1: "LEGENDS",
    heroTitle2: "OF MINIMILITIA",
    heroDescription:
      "Seven years of competition. One name built through battle. Welcome to the official headquarters of LMM.",

    enterClan: "ENTER THE CLAN",
    watchMatches: "WATCH LIVE MATCHES",

    founded: "FOUNDED",
    victories: "VICTORIES",
    members: "MEMBERS",
    activeEra: "ACTIVE ERA",

    theLegacy: "THE LEGACY",
    built: "BUILT",
    through: "THROUGH",
    battle: "BATTLE.",

    legacyText1:
      "Legends of MiniMilitia, known as LMM, was established in 2019.",
    legacyText2:
      "What started as a clan became a competitive community with years of battles, rivalries, tournaments and victories.",
    legacyText3:
      "The LMM name continues to represent skill, loyalty and competitive Mini Militia gameplay.",

    foundation: "FOUNDATION",
    stillHere: "STILL HERE",

    command: "COMMAND",
    peopleBehind: "THE PEOPLE",
    behindLMM: "BEHIND LMM.",
    commandDescription:
      "Leadership responsible for guiding the clan and protecting the LMM legacy.",

    leader: "LEADER",
    coLeader: "CO-LEADER",
    commandLabel: "LMM COMMAND",

    rosterSection: "ROSTER",
    theRoster: "THE LMM",
    rosterWord: "ROSTER.",
    activeMembers: "ACTIVE MEMBERS",

    competition: "COMPETITION",
    warRoom: "THE",
    warRoom2: "WAR ROOM.",
    clanRecord: "CLAN RECORD",
    recordedVictories: "RECORDED VICTORIES",

    victoryArchive: "LMM // VICTORY ARCHIVE",
    recordTitle1: "A RECORD",
    recordTitle2: "BUILT OVER",
    recordTitle3: "YEARS.",
    recordDescription:
      "The LMM victory archive contains the recorded names and tags of battles won throughout the clan's history.",

    liveLabel: "LMM LIVE",
    liveMatches: "LIVE CLAN MATCHES",
    seeLMM: "SEE LMM",
    inBattle: "IN BATTLE.",
    liveDescription:
      "Follow the official LMM TikTok page for live clan matches, competitive battles and LMM gameplay.",
    watchTikTok: "WATCH LIVE ON TIKTOK",
    tiktok: "TIKTOK / @zerxda2",

    clanCode: "CLAN CODE",
    rulesTitle1: "THE RULES",
    rulesTitle2: "OF LMM.",
    rulesDescription:
      "The principles that keep the LMM community organized and competitive.",

    rule1Title: "NO STICKER SPAM",
    rule1Description:
      "Keep the clan community clean. Do not flood the group with sticker spam.",

    rule2Title: "AUTHORIZED WARS",
    rule2Description:
      "Clan wars cannot be organized without authorization from the leader or a co-leader.",

    community: "COMMUNITY",
    joinTitle1: "JOIN THE",
    joinTitle2: "LEGENDS.",
    communityDescription:
      "Connect with LMM, follow our matches and become part of the community.",

    discord: "JOIN DISCORD ↗",
    followTikTok: "FOLLOW TIKTOK ↗",

    establishedShort: "EST.",
    footer: "© 2019 — 2026 LMM",

    statsFor: "PLAYER STATS",
    statsClose: "Close stats",
    statsUnavailable: "Stats coming soon"
  },

  es: {
    language: "Español",
    otherLanguage: "English",
    selectLanguage: "SELECCIONAR IDIOMA",

    home: "INICIO",
    legacy: "LEGADO",
    roster: "PLANTILLA",
    wars: "GUERRAS",
    live: "EN VIVO",
    join: "UNIRSE A LMM",

    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",

    established: "LMM // ESTABLECIDO EN 2019",
    heroTitle1: "LEYENDAS",
    heroTitle2: "DE MINIMILITIA",
    heroDescription:
      "Siete años de competición. Un nombre construido en batalla. Bienvenido a la sede oficial de LMM.",

    enterClan: "ENTRAR AL CLAN",
    watchMatches: "VER PARTIDAS EN VIVO",

    founded: "FUNDADO",
    victories: "VICTORIAS",
    members: "MIEMBROS",
    activeEra: "ERA ACTIVA",

    theLegacy: "EL LEGADO",
    built: "CONSTRUIDO",
    through: "A TRAVÉS DE",
    battle: "BATALLAS.",

    legacyText1:
      "Legends of MiniMilitia, conocido como LMM, fue establecido en 2019.",
    legacyText2:
      "Lo que comenzó como un clan se convirtió en una comunidad competitiva con años de batallas, rivalidades, torneos y victorias.",
    legacyText3:
      "El nombre LMM continúa representando habilidad, lealtad y competición en Mini Militia.",

    foundation: "FUNDACIÓN",
    stillHere: "AÚN AQUÍ",

    command: "COMANDO",
    peopleBehind: "LAS PERSONAS",
    behindLMM: "DETRÁS DE LMM.",
    commandDescription:
      "El equipo de liderazgo responsable de guiar al clan y proteger el legado de LMM.",

    leader: "LÍDER",
    coLeader: "CO-LÍDER",
    commandLabel: "COMANDO LMM",

    rosterSection: "PLANTILLA",
    theRoster: "LA",
    rosterWord: "PLANTILLA LMM.",
    activeMembers: "MIEMBROS ACTIVOS",

    competition: "COMPETICIÓN",
    warRoom: "LA",
    warRoom2: "SALA DE GUERRA.",
    clanRecord: "RÉCORD DEL CLAN",
    recordedVictories: "VICTORIAS REGISTRADAS",

    victoryArchive: "LMM // ARCHIVO DE VICTORIAS",
    recordTitle1: "UN RÉCORD",
    recordTitle2: "CONSTRUIDO A LO",
    recordTitle3: "LARGO DE LOS AÑOS.",
    recordDescription:
      "El archivo de victorias de LMM contiene los nombres y etiquetas registrados de las batallas ganadas a lo largo de la historia del clan.",

    liveLabel: "LMM EN VIVO",
    liveMatches: "PARTIDAS DEL CLAN EN VIVO",
    seeLMM: "MIRA A LMM",
    inBattle: "EN BATALLA.",
    liveDescription:
      "Sigue la página oficial de TikTok de LMM para partidas en vivo, batallas competitivas y contenido de Mini Militia.",
    watchTikTok: "VER EN VIVO EN TIKTOK",
    tiktok: "TIKTOK / @zerxda2",

    clanCode: "CÓDIGO DEL CLAN",
    rulesTitle1: "LAS REGLAS",
    rulesTitle2: "DE LMM.",
    rulesDescription:
      "Los principios que mantienen a la comunidad LMM organizada y competitiva.",

    rule1Title: "NO SPAM DE STICKERS",
    rule1Description:
      "Mantén limpia la comunidad del clan. No inundes el grupo con spam de stickers.",

    rule2Title: "GUERRAS AUTORIZADAS",
    rule2Description:
      "Las guerras de clanes no pueden organizarse sin la autorización del líder o de un co-líder.",

    community: "COMUNIDAD",
    joinTitle1: "ÚNETE A LAS",
    joinTitle2: "LEYENDAS.",
    communityDescription:
      "Conecta con LMM, sigue nuestras partidas y forma parte de la comunidad.",

    discord: "UNIRSE A DISCORD ↗",
    followTikTok: "SEGUIR TIKTOK ↗",

    establishedShort: "EST.",
    footer: "© 2019 — 2026 LMM",

    statsFor: "ESTADÍSTICAS DEL JUGADOR",
    statsClose: "Cerrar estadísticas",
    statsUnavailable: "Estadísticas próximamente"
  }
};

/** Fades sections in as they enter the viewport. Applied via a ref + className. */
function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      node.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

function App() {
  const memberStats = {
    Zerx: zerxStats,
    shinobi: shinobiStats,
    indra: indraStats,
    bunny: bunnyStats
  };

  const [selectedMember, setSelectedMember] = useState(null);
  const statsCloseButtonRef = useRef(null);
  const statsPreviouslyFocusedRef = useRef(null);

  const [language, setLanguage] = useState(() => {
    try {
      const savedLanguage = window.localStorage.getItem("lmm-language");

      return savedLanguage === "es" || savedLanguage === "en"
        ? savedLanguage
        : "en";
    } catch {
      return "en";
    }
  });

  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const languageSelectorRef = useRef(null);

  const t = translations[language];

  const changeLanguage = (lang) => {
    if (lang !== "en" && lang !== "es") return;

    setLanguage(lang);
    setLanguageOpen(false);

    try {
      window.localStorage.setItem("lmm-language", lang);
    } catch {
      // Continue normally if browser storage is unavailable.
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const hasStatsForSelected =
    !!selectedMember && !!memberStats[selectedMember];

  const closeStatsPopup = () => setSelectedMember(null);

  const handleMemberClick = (member) => {
    // Members without a stats image are still clickable; no popup, no error.
    if (!memberStats[member]) return;

    statsPreviouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelectedMember(member);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        languageSelectorRef.current &&
        !languageSelectorRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setLanguageOpen(false);
        setMenuOpen(false);
        setSelectedMember(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Lock body scroll while the mobile menu OR the stats popup is open.
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || hasStatsForSelected ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, hasStatsForSelected]);

  // Move focus into the popup when it opens, and restore focus on close.
  useEffect(() => {
    if (hasStatsForSelected) {
      statsCloseButtonRef.current?.focus();
    } else if (statsPreviouslyFocusedRef.current) {
      statsPreviouslyFocusedRef.current.focus();
      statsPreviouslyFocusedRef.current = null;
    }
  }, [hasStatsForSelected]);

  const legacyReveal = useReveal();
  const commandReveal = useReveal();
  const leadersReveal = useReveal();
  const rosterReveal = useReveal();
  const rosterGridReveal = useReveal();
  const warsReveal = useReveal();
  const liveReveal = useReveal();
  const rulesReveal = useReveal();
  const communityReveal = useReveal();

  const navLinks = [
    { href: "#home", label: t.home },
    { href: "#legacy", label: t.legacy },
    { href: "#roster", label: t.roster },
    { href: "#wars", label: t.wars },
    { href: "#live", label: t.live }
  ];

  return (
    <div className="site">
      <Analytics />
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand">
          <div className="brand-mark">L</div>

          <div>
            <strong>LMM</strong>
            <span>LEGENDS OF MINIMILITIA</span>
          </div>
        </a>

        <nav>
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          {/* LANGUAGE MENU */}
          <div
            className={`language-selector ${
              languageOpen ? "is-open" : ""
            }`}
            ref={languageSelectorRef}
          >
            <button
              type="button"
              className="language-button"
              onClick={() => setLanguageOpen((isOpen) => !isOpen)}
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
              aria-label={`${t.language}. ${t.selectLanguage}`}
            >
              <span className="language-globe" aria-hidden="true">
                ◎
              </span>

              <span className="language-current">
                {language === "en" ? "EN" : "ES"}
              </span>

              <span
                className={`chevron ${languageOpen ? "open" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {languageOpen && (
              <div
                className="language-menu"
                role="listbox"
                aria-label={t.selectLanguage}
              >
                <div className="language-title">
                  {t.selectLanguage}
                </div>

                <button
                  type="button"
                  role="option"
                  aria-selected={language === "en"}
                  className={`language-option ${
                    language === "en" ? "selected" : ""
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  <span className="language-flag" aria-hidden="true">
                    🇬🇧
                  </span>

                  <span className="language-name">
                    English
                    <small>EN</small>
                  </span>

                  {language === "en" && (
                    <span className="language-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  role="option"
                  aria-selected={language === "es"}
                  className={`language-option ${
                    language === "es" ? "selected" : ""
                  }`}
                  onClick={() => changeLanguage("es")}
                >
                  <span className="language-flag" aria-hidden="true">
                    🇪🇸
                  </span>

                  <span className="language-name">
                    Español
                    <small>ES</small>
                  </span>

                  {language === "es" && (
                    <span className="language-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          <a
            href="https://discord.gg/QYBgSgBM"
            target="_blank"
            rel="noreferrer"
            className="join-top"
          >
            {t.join}
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      {menuOpen && (
        <nav className="mobile-nav" aria-label={t.selectLanguage}>
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://discord.gg/QYBgSgBM"
            target="_blank"
            rel="noreferrer"
            className="join-top"
            onClick={() => setMenuOpen(false)}
          >
            {t.join}
          </a>
        </nav>
      )}

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-noise"></div>
        <div className="hero-lines"></div>

        <div className="hero-content">
          <div className="hero-status">
            <span></span>
            {t.established}
          </div>

          <h1>
            {t.heroTitle1}
            <em>{t.heroTitle2}</em>
          </h1>

          <p>{t.heroDescription}</p>

          <div className="hero-actions">
            <a href="#roster" className="primary-btn">
              {t.enterClan}
              <span>↗</span>
            </a>

            <a href="#live" className="secondary-btn">
              {t.watchMatches}
              <span>▶</span>
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <div>
            <b>2019</b>
            <small>{t.founded}</small>
          </div>

          <div>
            <b>125+</b>
            <small>{t.victories}</small>
          </div>

          <div>
            <b>{members.length}</b>
            <small>{t.members}</small>
          </div>

          <div>
            <b>2026</b>
            <small>{t.activeEra}</small>
          </div>
        </div>

        <div className="hero-corner">LMM / 001</div>
      </section>

      {/* LEGACY */}
      <section className="intro reveal" id="legacy" ref={legacyReveal}>
        <div className="intro-number">01</div>

        <div className="intro-heading">
          <span>{t.theLegacy}</span>

          <h2>
            {t.built}
            <br />
            {t.through}
            <br />
            <strong>{t.battle}</strong>
          </h2>
        </div>

        <div className="intro-text">
          <p>{t.legacyText1}</p>
          <p>{t.legacyText2}</p>
          <p>{t.legacyText3}</p>

          <div className="timeline">
            <div>
              <strong>2019</strong>
              <span>{t.foundation}</span>
            </div>

            <div className="timeline-line"></div>

            <div>
              <strong>2026</strong>
              <span>{t.stillHere}</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMMAND */}
      <section className="command">
        <div className="section-top reveal" ref={commandReveal}>
          <div>
            <span>02 / {t.command}</span>

            <h2>
              {t.peopleBehind}
              <br />
              {t.behindLMM}
            </h2>
          </div>

          <p>{t.commandDescription}</p>
        </div>

        <div
          className="leaders reveal-stagger reveal"
          ref={leadersReveal}
        >
          {leaders.map((leader, index) => (
            <div
              className={`leader ${
                index === 0 ? "leader-main" : ""
              }`}
              key={leader.name}
            >
              <div className="leader-top">
                <span>{leader.number}</span>

                <span>
                  {leader.role === "leader"
                    ? t.leader
                    : t.coLeader}
                </span>
              </div>

              <div className="leader-bottom">
                <h3>{leader.name}</h3>
                <span>{t.commandLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROSTER */}
      <section className="roster" id="roster">
        <div className="roster-header reveal" ref={rosterReveal}>
          <div>
            <span>03 / {t.rosterSection}</span>

            <h2>
              {t.theRoster}
              <br />
              <strong>{t.rosterWord}</strong>
            </h2>
          </div>

          <div className="roster-total">
            <strong>{members.length}</strong>
            <span>{t.activeMembers}</span>
          </div>
        </div>

        <div className="roster-grid reveal" ref={rosterGridReveal}>
          {members.map((member, index) => {
            const isClickable = !!memberStats[member];

            return (
              <div
                className={`player ${
                  isClickable ? "player-has-stats" : ""
                }`}
                key={member}
                onClick={() => handleMemberClick(member)}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={
                  isClickable
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleMemberClick(member);
                        }
                      }
                    : undefined
                }
                aria-haspopup={isClickable ? "dialog" : undefined}
              >
                <span className="player-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{member}</strong>

                <span className="player-arrow">↗</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* MEMBER STATS POPUP */}
      {hasStatsForSelected && (
        <div
          className="stats-popup"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeStatsPopup();
            }
          }}
        >
          <div
            className="stats-popup-content"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMember} — ${t.statsFor}`}
          >
            <div className="stats-popup-header">
              <span className="stats-popup-eyebrow">{t.statsFor}</span>
              <h3>{selectedMember}</h3>
            </div>

            <button
              type="button"
              className="stats-popup-close"
              onClick={closeStatsPopup}
              aria-label={t.statsClose}
              ref={statsCloseButtonRef}
            >
              ×
            </button>

            <div className="stats-popup-image-wrap">
              <img
                src={memberStats[selectedMember]}
                alt={`${selectedMember} stats`}
              />
            </div>
          </div>
        </div>
      )}

      {/* WAR ROOM */}
      <section className="wars" id="wars">
        <div className="wars-header reveal" ref={warsReveal}>
          <div>
            <span>04 / {t.competition}</span>

            <h2>
              {t.warRoom}
              <br />
              <strong>{t.warRoom2}</strong>
            </h2>
          </div>

          <div className="record">
            <span>{t.clanRecord}</span>
            <strong>125+</strong>
            <small>{t.recordedVictories}</small>
          </div>
        </div>

        <div className="war-feature">
          <div className="war-left">
            <span className="war-label">{t.victoryArchive}</span>

            <h3>
              {t.recordTitle1}
              <br />
              {t.recordTitle2}
              <br />
              <strong>{t.recordTitle3}</strong>
            </h3>

            <p>{t.recordDescription}</p>
          </div>

          <div className="victory-cloud">
            {victories.map((victory, index) => (
              <span key={`${victory}-${index}`}>{victory}</span>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE */}
      <section className="live" id="live">
        <div className="live-pattern"></div>

        <div className="live-content reveal" ref={liveReveal}>
          <div className="live-top">
            <span className="live-dot"></span>
            {t.liveLabel}
          </div>

          <span className="live-number">
            05 / {t.liveMatches}
          </span>

          <h2>
            {t.seeLMM}
            <br />
            <strong>{t.inBattle}</strong>
          </h2>

          <p>{t.liveDescription}</p>

          <a
            href="https://www.tiktok.com/@zerxda2"
            target="_blank"
            rel="noreferrer"
            className="live-btn"
          >
            <span>▶</span>
            {t.watchTikTok}
            <b>↗</b>
          </a>

          <div className="tiktok-handle">{t.tiktok}</div>
        </div>
      </section>

      {/* RULES */}
      <section className="rules">
        <div className="section-top reveal" ref={rulesReveal}>
          <div>
            <span>06 / {t.clanCode}</span>

            <h2>
              {t.rulesTitle1}
              <br />
              <strong>{t.rulesTitle2}</strong>
            </h2>
          </div>

          <p>{t.rulesDescription}</p>
        </div>

        <div className="rules-grid">
          <div className="rule">
            <span>01</span>

            <div>
              <h3>{t.rule1Title}</h3>
              <p>{t.rule1Description}</p>
            </div>
          </div>

          <div className="rule">
            <span>02</span>

            <div>
              <h3>{t.rule2Title}</h3>
              <p>{t.rule2Description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="community">
        <div className="community-inner reveal" ref={communityReveal}>
          <span>07 / {t.community}</span>

          <h2>
            {t.joinTitle1}
            <br />
            <strong>{t.joinTitle2}</strong>
          </h2>

          <p>{t.communityDescription}</p>

          <div className="community-buttons">
            <a
              href="https://discord.gg/QYBgSgBM"
              target="_blank"
              rel="noreferrer"
              className="community-btn gold"
            >
              {t.discord}
            </a>

            <a
              href="https://www.tiktok.com/@zerxda2"
              target="_blank"
              rel="noreferrer"
              className="community-btn dark"
            >
              {t.followTikTok}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <strong>LMM</strong>
          <span>LEGENDS OF MINIMILITIA</span>
        </div>

        <div className="footer-middle">
          {t.establishedShort} 2019 • 125+ {t.victories} • 2026
        </div>

        <div className="footer-right">{t.footer}</div>
      </footer>
    </div>
  );
}

export default App;
