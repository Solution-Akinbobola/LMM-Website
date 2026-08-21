import { useEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

import lmmLogo from "./assets/lmm-logo.png";

import zerxStats from "./assets/zerx-stats.jpeg";
import shinobiStats from "./assets/shinobi-stats.jpeg";
import indraStats from "./assets/indra-stats.jpeg";
import bunnyStats from "./assets/bunny-stats.jpeg";
import shadowStats from "./assets/shadow-stats.jpeg";
import joseStats from "./assets/jose-stats.jpeg";
import loboStats from "./assets/lobo-stats.jpeg";
import velozxin from "./assets/velozxin-stats.jpg";
import unstoppable from "./assets/unstoppable-stats.jpg";

import { roster } from "./data/rosterData";
import {
  liveMatch,
  nextMatch,
  connectionStatus,
  streamOptions
} from "./data/liveMatchData";
import { matchHistory } from "./data/matchHistoryData";

import LiveMatchCenter from "./components/LiveMatchCenter";
import MatchHistory from "./components/MatchHistory";
import Roster from "./components/Roster";
import Rankings from "./components/Rankings";
import PlayerProfileModal from "./components/PlayerProfileModal";
import Footer from "./components/Footer";

const leaders = [
  { name: "LOBO", role: "leader", number: "01" },
  { name: "OVER", role: "coLeader", number: "02" },
  { name: "TEKATO", role: "coLeader", number: "03" },
  { name: "ANTONIO", role: "coLeader", number: "04" },
  { name: "LEIN", role: "coLeader", number: "05" }
];

const victories = [
  "CL", "IND", "HCL", "TL", "LNZ", "LZR", "L2K", "BELLOS", "BR2", "NICA",
  "GG", "MIL", "HL", "FL", "JDM", "HQ", "IL", "V", "F2", "NS", "TBL",
  "TDW", "LD", "V5", "DA", "NG", "SVD", "SL", "USA", "NN", "MVP", "HT",
  "BLK", "USARE", "XP", "P+G", "FAVOUR", "IG", "FC", "EXP", "DL", "RKG",
  "FRS", "ROLO", "TSG", "TGM", "BGM", "2R", "RPG", "RBL", "OT", "OP",
  "SNG", "PGS", "TM", "BOD", "CLC", "SF", "7G", "BD", "USSR", "6S", "ES",
  "LOUD", "2T", "GRIZZI", "UCW", "AF", "PM", "BNL", "U+T", "PNL", "ZXP",
  "LP", "LDN", "AD", "SP1", "APS", "JP", "PWR", "LGN", "RM", "TSR", "TXS",
  "PRIME", "PLN", "RWD", "DB", "CA", "LNM", "7N", "ZK", "PMS", "SAO",
  "TP", "V4", "GD", "TDK", "EXT", "BRICS", "LATM", "CID", "BTC", "SC",
  "MC502", "CNG", "UV", "MW", "TC", "GMT", "LGL", "CLM", "LF", "RR",
  "DW", "MD"
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
    rankings: "RANKINGS",
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
    youtube: "SUBSCRIBE ON YOUTUBE ↗",

    establishedShort: "EST.",
    footer: "© 2019 — 2026 LMM",

    statsFor: "PLAYER STATS",
    statsClose: "Close stats",
    statsUnavailable: "Stats coming soon",

    // LIVE MATCH CENTER
    lcConnectionConnected: "LIVE CONNECTION",
    lcConnectionReconnecting: "RECONNECTING...",
    lcConnectionOffline: "OFFLINE",
    lcLastUpdated: "UPDATED",
    lcCurrentMatch: "CURRENT MATCH",
    lcStatusLive: "LIVE",
    lcMvp: "MVP",
    lcMap: "MAP",
    lcStartTime: "START TIME",
    lcMatchType: "MATCH TYPE",
    lcWatchMatch: "WATCH MATCH",
    lcWatchOn: "WATCH ON",
    lcStreamSoon: "STREAM LINK COMING SOON",
    lcNoLiveTitle: "NO LIVE MATCH CURRENTLY",
    lcNoLiveDesc:
      "LMM isn't in an official match right now. Check back soon, or follow us below to catch the next one live.",
    lcNextUp: "NEXT UP",
    lcNoNextTitle: "NO UPCOMING MATCH SCHEDULED",
    lcNoNextDesc: "New fixtures will appear here as soon as they're confirmed.",
    lcTournament: "TOURNAMENT",
    "lcCountdown_days": "DAYS",
    "lcCountdown_hours": "HRS",
    "lcCountdown_minutes": "MIN",
    "lcCountdown_seconds": "SEC",

    // MATCH HISTORY / WARS
    mhArchiveTitle: "MATCH ARCHIVE",
    mhFilterLabel: "FILTER RESULTS",
    mhFilterAll: "ALL",
    mhFilterWin: "WINS",
    mhFilterLoss: "LOSSES",
    mhFilterDraw: "DRAWS",
    mhNoMatches: "NO MATCH HISTORY AVAILABLE YET",
    mhNoMatchesDesc:
      "Recorded matches will appear here once LMM's match archive is connected.",

    // ROSTER
    rosSearchPlaceholder: "SEARCH ROSTER...",
    rosFilterRole: "ROLE",
    rosFilterStatus: "STATUS",
    rosAll: "ALL",
    rosActive: "ACTIVE",
    rosInactive: "INACTIVE",
    rosMember: "MEMBER",
    rosNoResults: "NO PLAYERS MATCH YOUR SEARCH.",

    // PLAYER PROFILE
    ppStatsHeading: "PERFORMANCE STATS",
    ppMatchesPlayed: "MATCHES PLAYED",
    ppWins: "WINS",
    ppLosses: "LOSSES",
    ppWinRate: "WIN RATE",
    ppKd: "K/D",
    ppMvpAwards: "MVP AWARDS",
    ppStatsPending:
      "Detailed statistics haven't been connected yet — this will populate once LMM's stats system goes live.",

    // RANKINGS (leaderboards / records / achievements)
    progression: "PROGRESSION",
    rankTitle1: "TRACK THE",
    rankTitle2: "CLIMB.",
    rankDescription:
      "Leaderboards, clan records and achievements — the numbers behind the LMM name.",

    rkTabLeaderboards: "LEADERBOARDS",
    rkTabRecords: "RECORDS",
    rkTabAchievements: "ACHIEVEMENTS",

    lbWeekly: "WEEKLY",
    lbMonthly: "MONTHLY",
    lbSeason: "SEASON",
    lbAllTime: "ALL TIME",

    lbCatOverall: "OVERALL",
    lbCatWins: "WINS",
    lbCatWinRate: "WIN RATE",
    lbCatMvps: "MVPS",
    lbCatKd: "K/D",
    lbCatMatches: "MATCHES PLAYED",
    lbCatRecent: "RECENT FORM",

    lbRank: "RANK",
    lbPlayer: "PLAYER",
    lbValue: "VALUE",
    lbEmptyTitle: "LEADERBOARD COMING SOON",
    lbEmptyDesc:
      "Rankings will populate once real match and player statistics are tracked.",

    rcHolder: "HOLDER",
    rcValue: "VALUE",
    rcPendingNote:
      "Clan records will populate once real match and player statistics are tracked.",
    rcMostWins: "MOST WINS",
    rcMostMvps: "MOST MVPS",
    rcLongestStreak: "LONGEST WIN STREAK",
    rcMostMatches: "MOST MATCHES PLAYED",
    rcBestWinRate: "BEST WIN RATE",
    rcBiggestVictory: "BIGGEST VICTORY",
    rcLongestEra: "LONGEST LMM ERA",
    rcMostTournamentWins: "MOST TOURNAMENT WINS",

    acEarnedBy: "EARNED BY",
    acNoneYet: "NOT YET AWARDED",
    acCatalogNote:
      "Badges are awarded from real clan statistics as they're tracked.",
    acFirstVictory: "FIRST VICTORY",
    acFirstVictoryDesc: "Earned on a player's first recorded win with LMM.",
    acTenWins: "10 WINS",
    acTenWinsDesc: "Awarded after 10 recorded wins.",
    acFiftyWins: "50 WINS",
    acFiftyWinsDesc: "Awarded after 50 recorded wins.",
    acMvp: "MVP",
    acMvpDesc: "Awarded for being named MVP of a match.",
    acVeteran: "VETERAN",
    acVeteranDesc: "Awarded for long-standing, active LMM membership.",
    acClanLegend: "CLAN LEGEND",
    acClanLegendDesc: "Reserved for LMM's most iconic players.",
    acTournamentChampion: "TOURNAMENT CHAMPION",
    acTournamentChampionDesc:
      "Awarded for winning an official tournament with LMM.",
    acUndefeatedStreak: "UNDEFEATED STREAK",
    acUndefeatedStreakDesc: "Awarded for an extended run without a loss.",

    // FOOTER
    ftDescription:
      "The official digital home of LMM — Legends of MiniMilitia. A competitive Mini Militia clan since 2019.",
    ftNav: "NAVIGATION",
    ftConnect: "CONNECT"
  },

  es: {
    language: "Español",
    otherLanguage: "English",
    selectLanguage: "SELECCIONAR IDIOMA",

    home: "INICIO",
    legacy: "LEGADO",
    roster: "PLANTILLA",
    wars: "GUERRAS",
    rankings: "CLASIFICACIÓN",
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
    youtube: "SUSCRÍBETE EN YOUTUBE ↗",

    establishedShort: "EST.",
    footer: "© 2019 — 2026 LMM",

    statsFor: "ESTADÍSTICAS DEL JUGADOR",
    statsClose: "Cerrar estadísticas",
    statsUnavailable: "Estadísticas próximamente",

    // LIVE MATCH CENTER
    lcConnectionConnected: "CONEXIÓN EN VIVO",
    lcConnectionReconnecting: "RECONECTANDO...",
    lcConnectionOffline: "SIN CONEXIÓN",
    lcLastUpdated: "ACTUALIZADO",
    lcCurrentMatch: "PARTIDA ACTUAL",
    lcStatusLive: "EN VIVO",
    lcMvp: "MVP",
    lcMap: "MAPA",
    lcStartTime: "HORA DE INICIO",
    lcMatchType: "TIPO DE PARTIDA",
    lcWatchMatch: "VER PARTIDA",
    lcWatchOn: "VER EN",
    lcStreamSoon: "ENLACE DE TRANSMISIÓN PRÓXIMAMENTE",
    lcNoLiveTitle: "NO HAY PARTIDA EN VIVO ACTUALMENTE",
    lcNoLiveDesc:
      "LMM no está en una partida oficial en este momento. Vuelve pronto o síguenos abajo para ver la próxima en vivo.",
    lcNextUp: "PRÓXIMA PARTIDA",
    lcNoNextTitle: "NO HAY PARTIDA PROGRAMADA",
    lcNoNextDesc: "Las nuevas partidas aparecerán aquí en cuanto se confirmen.",
    lcTournament: "TORNEO",
    "lcCountdown_days": "DÍAS",
    "lcCountdown_hours": "HRS",
    "lcCountdown_minutes": "MIN",
    "lcCountdown_seconds": "SEG",

    // MATCH HISTORY / WARS
    mhArchiveTitle: "ARCHIVO DE PARTIDAS",
    mhFilterLabel: "FILTRAR RESULTADOS",
    mhFilterAll: "TODAS",
    mhFilterWin: "VICTORIAS",
    mhFilterLoss: "DERROTAS",
    mhFilterDraw: "EMPATES",
    mhNoMatches: "AÚN NO HAY HISTORIAL DE PARTIDAS",
    mhNoMatchesDesc:
      "Las partidas registradas aparecerán aquí una vez conectado el archivo de LMM.",

    // ROSTER
    rosSearchPlaceholder: "BUSCAR EN LA PLANTILLA...",
    rosFilterRole: "ROL",
    rosFilterStatus: "ESTADO",
    rosAll: "TODOS",
    rosActive: "ACTIVO",
    rosInactive: "INACTIVO",
    rosMember: "MIEMBRO",
    rosNoResults: "NINGÚN JUGADOR COINCIDE CON TU BÚSQUEDA.",

    // PLAYER PROFILE
    ppStatsHeading: "ESTADÍSTICAS DE RENDIMIENTO",
    ppMatchesPlayed: "PARTIDAS JUGADAS",
    ppWins: "VICTORIAS",
    ppLosses: "DERROTAS",
    ppWinRate: "% DE VICTORIAS",
    ppKd: "K/D",
    ppMvpAwards: "PREMIOS MVP",
    ppStatsPending:
      "Las estadísticas detalladas aún no están conectadas — se completarán cuando el sistema de estadísticas de LMM esté activo.",

    // RANKINGS (leaderboards / records / achievements)
    progression: "PROGRESIÓN",
    rankTitle1: "SIGUE LA",
    rankTitle2: "ASCENSIÓN.",
    rankDescription:
      "Clasificaciones, récords del clan y logros — los números detrás del nombre LMM.",

    rkTabLeaderboards: "CLASIFICACIÓN",
    rkTabRecords: "RÉCORDS",
    rkTabAchievements: "LOGROS",

    lbWeekly: "SEMANAL",
    lbMonthly: "MENSUAL",
    lbSeason: "TEMPORADA",
    lbAllTime: "HISTÓRICO",

    lbCatOverall: "GENERAL",
    lbCatWins: "VICTORIAS",
    lbCatWinRate: "% DE VICTORIAS",
    lbCatMvps: "MVPS",
    lbCatKd: "K/D",
    lbCatMatches: "PARTIDAS JUGADAS",
    lbCatRecent: "FORMA RECIENTE",

    lbRank: "PUESTO",
    lbPlayer: "JUGADOR",
    lbValue: "VALOR",
    lbEmptyTitle: "CLASIFICACIÓN PRÓXIMAMENTE",
    lbEmptyDesc:
      "La clasificación se completará cuando se registren estadísticas reales de partidas y jugadores.",

    rcHolder: "POSEEDOR",
    rcValue: "VALOR",
    rcPendingNote:
      "Los récords del clan se completarán cuando se registren estadísticas reales de partidas y jugadores.",
    rcMostWins: "MÁS VICTORIAS",
    rcMostMvps: "MÁS MVPS",
    rcLongestStreak: "RACHA DE VICTORIAS MÁS LARGA",
    rcMostMatches: "MÁS PARTIDAS JUGADAS",
    rcBestWinRate: "MEJOR % DE VICTORIAS",
    rcBiggestVictory: "VICTORIA MÁS GRANDE",
    rcLongestEra: "ERA LMM MÁS LARGA",
    rcMostTournamentWins: "MÁS TORNEOS GANADOS",

    acEarnedBy: "OBTENIDO POR",
    acNoneYet: "AÚN NO OTORGADO",
    acCatalogNote:
      "Las insignias se otorgan a partir de estadísticas reales del clan a medida que se registran.",
    acFirstVictory: "PRIMERA VICTORIA",
    acFirstVictoryDesc: "Se obtiene con la primera victoria registrada con LMM.",
    acTenWins: "10 VICTORIAS",
    acTenWinsDesc: "Otorgado tras 10 victorias registradas.",
    acFiftyWins: "50 VICTORIAS",
    acFiftyWinsDesc: "Otorgado tras 50 victorias registradas.",
    acMvp: "MVP",
    acMvpDesc: "Otorgado por ser nombrado MVP de una partida.",
    acVeteran: "VETERANO",
    acVeteranDesc: "Otorgado por membresía activa y prolongada en LMM.",
    acClanLegend: "LEYENDA DEL CLAN",
    acClanLegendDesc: "Reservado para los jugadores más icónicos de LMM.",
    acTournamentChampion: "CAMPEÓN DE TORNEO",
    acTournamentChampionDesc:
      "Otorgado por ganar un torneo oficial con LMM.",
    acUndefeatedStreak: "RACHA INVICTA",
    acUndefeatedStreakDesc: "Otorgado por una racha prolongada sin derrotas.",

    // FOOTER
    ftDescription:
      "La sede digital oficial de LMM — Legends of MiniMilitia. Un clan competitivo de Mini Militia desde 2019.",
    ftNav: "NAVEGACIÓN",
    ftConnect: "CONECTAR"
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
    Bunny: bunnyStats,
    Shadow: shadowStats,
    Jose: joseStats,
    LOBO: loboStats,
    velozxin: velozxin,
    unstoppable: unstoppable
  };

  const [selectedPlayer, setSelectedPlayer] = useState(null);

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

  const closeProfile = () => setSelectedPlayer(null);

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
        setSelectedPlayer(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Lock body scroll while the mobile menu OR the player profile is open.
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || selectedPlayer ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, selectedPlayer]);

  const legacyReveal = useReveal();
  const commandReveal = useReveal();
  const leadersReveal = useReveal();
  const rosterReveal = useReveal();
  const rosterGridReveal = useReveal();
  const warsReveal = useReveal();
  const rankingsReveal = useReveal();
  const liveReveal = useReveal();
  const rulesReveal = useReveal();
  const communityReveal = useReveal();

  const navLinks = [
    { href: "#home", label: t.home },
    { href: "#legacy", label: t.legacy },
    { href: "#roster", label: t.roster },
    { href: "#wars", label: t.wars },
    { href: "#rankings", label: t.rankings },
    { href: "#live", label: t.live }
  ];

  return (
    <div className="site">
      <Analytics />
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand">
       <img src={lmmLogo} alt="LMM Logo" className="brand-mark" />
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
            href="https://discord.gg/Vf4F3bneB"
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
            href="https://discord.gg/Vf4F3bneB"
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
            <b>{roster.length}</b>
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
      <Roster
        t={t}
        roster={roster}
        statsImages={memberStats}
        onSelectPlayer={setSelectedPlayer}
        rosterReveal={rosterReveal}
        rosterGridReveal={rosterGridReveal}
      />

      {/* PLAYER PROFILE MODAL */}
      {selectedPlayer && (
        <PlayerProfileModal
          t={t}
          player={selectedPlayer}
          statsImage={memberStats[selectedPlayer.name]}
          onClose={closeProfile}
        />
      )}

      {/* WAR ROOM / MATCH HISTORY */}
      <MatchHistory
        t={t}
        language={language}
        matchHistory={matchHistory}
        victories={victories}
        warsReveal={warsReveal}
      />

      {/* RANKINGS: LEADERBOARDS / RECORDS / ACHIEVEMENTS */}
      <Rankings t={t} rankingsReveal={rankingsReveal} />

      {/* LIVE MATCH CENTER */}
      <LiveMatchCenter
        t={t}
        language={language}
        liveMatch={liveMatch}
        nextMatch={nextMatch}
        connectionStatus={connectionStatus}
        streamOptions={streamOptions}
        liveReveal={liveReveal}
      />

      {/* RULES */}
      <section className="rules">
        <div className="section-top reveal" ref={rulesReveal}>
          <div>
            <span>07 / {t.clanCode}</span>

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
          <span>08 / {t.community}</span>

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

            <a
              href="https://youtube.com/@lmmoficial"
              target="_blank"
              rel="noreferrer"
              className="community-btn dark"
            >
              {t.youtube}
            </a>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer t={t} navLinks={navLinks} />
    </div>
  );
}

export default App;