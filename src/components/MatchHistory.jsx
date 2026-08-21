import { useMemo, useState } from "react";

const DEMO_MATCHES = [
  {
    id: "demo-cl",
    opponentTag: "CL",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 6,
    date: "2026-01-18"
  },
  {
    id: "demo-ind",
    opponentTag: "IND",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 7,
    date: "2026-01-29"
  },
  {
    id: "demo-hcl",
    opponentTag: "HCL",
    result: "WIN",
    scoreLmm: 9,
    scoreOpponent: 5,
    date: "2026-02-11"
  },
  {
    id: "demo-tl",
    opponentTag: "TL",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 4,
    date: "2026-02-24"
  },
  {
    id: "demo-lnz",
    opponentTag: "LNZ",
    result: "WIN",
    scoreLmm: 8,
    scoreOpponent: 6,
    date: "2026-03-08"
  },
  {
    id: "demo-lzr",
    opponentTag: "LZR",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 8,
    date: "2026-03-21"
  },
  {
    id: "demo-l2k",
    opponentTag: "L2K",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 3,
    date: "2026-04-02"
  },
  {
    id: "demo-bellos",
    opponentTag: "BELLOS",
    result: "WIN",
    scoreLmm: 9,
    scoreOpponent: 6,
    date: "2026-04-17"
  },
  {
    id: "demo-br2",
    opponentTag: "BR2",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 7,
    date: "2026-05-03"
  },
  {
    id: "demo-nica",
    opponentTag: "NICA",
    result: "WIN",
    scoreLmm: 8,
    scoreOpponent: 5,
    date: "2026-05-19"
  },
  {
    id: "demo-gg",
    opponentTag: "GG",
    result: "WIN",
    scoreLmm: 10,
    scoreOpponent: 8,
    date: "2026-06-06"
  }
];

const DEMO_OPPONENTS = [
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
  "GG"
];

function formatDate(isoString, language) {
  if (!isoString) return "—";

  try {
    return new Date(isoString).toLocaleDateString(
      language === "es" ? "es-ES" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );
  } catch {
    return "—";
  }
}

function MatchHistory({
  t,
  language,
  matchHistory,
  victories,
  warsReveal
}) {
  const [resultFilter, setResultFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  /*
   * Temporary demo data.
   *
   * Once real match data exists, your existing matchHistory
   * automatically takes priority.
   */
  const displayedMatches =
    matchHistory && matchHistory.length > 0
      ? matchHistory
      : DEMO_MATCHES;

  const displayedOpponents =
    victories && victories.length > 0
      ? victories
      : DEMO_OPPONENTS;

 const filteredMatches = useMemo(() => {
  const query = searchQuery.trim().toLowerCase();

  return displayedMatches.filter((match) => {
    const matchesResult =
      resultFilter === "ALL" ||
      match.result === resultFilter;

    const matchesSearch =
      !query ||
      match.opponentTag
        ?.toLowerCase()
        .includes(query);

    return matchesResult && matchesSearch;
  });
}, [displayedMatches, resultFilter, searchQuery]);

  const filters = [
    {
      key: "ALL",
      label: t.mhFilterAll
    },
    {
      key: "WIN",
      label: t.mhFilterWin
    },
    {
      key: "LOSS",
      label: t.mhFilterLoss
    },
    {
      key: "DRAW",
      label: t.mhFilterDraw
    }
  ];

  const wins = displayedMatches.filter(
    (match) => match.result === "WIN"
  ).length;

  const losses = displayedMatches.filter(
    (match) => match.result === "LOSS"
  ).length;

  const draws = displayedMatches.filter(
    (match) => match.result === "DRAW"
  ).length;

  const isDemo =
    !matchHistory || matchHistory.length === 0;

  return (
    <section className="wars" id="wars">
      <div
        className="wars-background-grid"
        aria-hidden="true"
      />

      <div
        className="wars-glow wars-glow-one"
        aria-hidden="true"
      />

      <div
        className="wars-glow wars-glow-two"
        aria-hidden="true"
      />

      {/* =========================================================
          WAR ROOM HEADER
      ========================================================= */}

      <div
        className="wars-header reveal"
        ref={warsReveal}
      >
        <div className="wars-heading">
          <span className="wars-section-number">
            04 / {t.competition}
          </span>

          <h2>
            {t.warRoom}
            <br />
            <strong>{t.warRoom2}</strong>
          </h2>

          <p className="wars-intro">
            {t.recordDescription}
          </p>
        </div>

        <div className="wars-record-card">
          <div className="wars-record-top">
            <span className="wars-record-label">
              {t.clanRecord}
            </span>

            <span
              className="wars-record-status"
              aria-hidden="true"
            />
          </div>

          <strong className="wars-record-number">
            125+
          </strong>

          <span className="wars-record-caption">
            {t.recordedVictories}
          </span>

          <div className="wars-record-line" />

          <div className="wars-mini-record">
            <div>
              <strong>{wins}</strong>
              <span>WINS</span>
            </div>

            <div>
              <strong>{losses}</strong>
              <span>LOSS</span>
            </div>

            <div>
              <strong>{draws}</strong>
              <span>DRAW</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          DEMO NOTICE
      ========================================================= */}

      {isDemo && (
        <div className="wars-demo-notice">
          <span className="wars-demo-dot" />
          <span>
            ARCHIVE PREVIEW // MATCH RECORDS ARE TEMPORARY
          </span>
        </div>
      )}

      {/* =========================================================
          MATCH ARCHIVE
      ========================================================= */}

      <div className="mh-archive reveal">
        <div className="mh-archive-top">
          <div>
            <span className="mh-eyebrow">
              LMM // MATCH ARCHIVE
            </span>

            <h3>
              {t.mhArchiveTitle}
            </h3>
          </div>

          <div className="mh-search">
            <span className="mh-search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="SEARCH OPPONENT"
              aria-label="Search opponent"
              spellCheck="false"
              autoComplete="off"
            />

            {searchQuery && (
              <button
                type="button"
                className="mh-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div
            className="mh-filter-wrap"
            role="group"
            aria-label={t.mhFilterLabel}
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`mh-filter-btn ${
                  resultFilter === filter.key
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setResultFilter(filter.key)
                }
                aria-pressed={
                  resultFilter === filter.key
                }
              >
                <span
                  className="mh-filter-dot"
                  aria-hidden="true"
                />

                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mh-archive-line">
          <span>
            {filteredMatches.length} MATCH
            {filteredMatches.length === 1
              ? ""
              : "ES"}
          </span>

          <span>
            {displayedMatches.length} TOTAL RECORDED
          </span>
        </div>

        <div className="mh-match-list">
          {filteredMatches.map((match, index) => {
            const resultClass =
              match.result?.toLowerCase() || "draw";

            return (
              <article
                className={`mh-match-card mh-match-${resultClass}`}
                key={match.id}
              >
                <div className="mh-match-index">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="mh-match-result">
                  <span
                    className="mh-result-dot"
                    aria-hidden="true"
                  />

                  <span>
                    {match.result}
                  </span>
                </div>

                <div className="mh-match-versus">
                  <span className="mh-team-name">
                    LMM
                  </span>

                  <span className="mh-vs">
                    VS
                  </span>

                  <span className="mh-team-opponent">
                    {match.opponentTag}
                  </span>
                </div>

                <div className="mh-match-score">
                  <span>
                    {match.scoreLmm}
                  </span>

                  <i>:</i>

                  <span>
                    {match.scoreOpponent}
                  </span>
                </div>

                <div className="mh-match-details">
                  <span>
                    <small>DATE</small>
                    {formatDate(
                      match.date,
                      language
                    )}
                  </span>

                  {match.mvp && (
                    <span>
                      <small>{t.lcMvp}</small>
                      {match.mvp}
                    </span>
                  )}
                </div>

                <span
                  className="mh-match-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </article>
            );
          })}
        </div>
      </div>

      
    </section>
  );
}

export default MatchHistory;
