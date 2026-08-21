import { useEffect, useState } from "react";

function getCountdownParts(targetDate) {
  const total = Math.max(
    0,
    new Date(targetDate).getTime() - Date.now()
  );

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60)
  };
}

function formatDateTime(isoString, language) {
  if (!isoString) return "—";

  try {
    return new Date(isoString).toLocaleString(
      language === "es" ? "es-ES" : "en-US",
      {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );
  } catch {
    return "—";
  }
}

function formatRelativeUpdated(isoString) {
  if (!isoString) return null;

  const diffMs =
    Date.now() - new Date(isoString).getTime();

  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) {
    return `${Math.max(diffSeconds, 0)}s ago`;
  }

  if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)}m ago`;
  }

  return `${Math.floor(diffSeconds / 3600)}h ago`;
}

function ConnectionBadge({ status, t }) {
  const stateConfig = {
    connected: {
      dot: "lmc-status-dot-live",
      label: t.lcConnectionConnected
    },

    reconnecting: {
      dot: "lmc-status-dot-warning",
      label: t.lcConnectionReconnecting
    },

    offline: {
      dot: "lmc-status-dot-offline",
      label: t.lcConnectionOffline
    }
  };

  const config =
    stateConfig[status?.state] ??
    stateConfig.offline;

  return (
    <div className="lmc-connection">
      <span
        className={`lmc-status-dot ${config.dot}`}
        aria-hidden="true"
      />

      <span>{config.label}</span>

      {status?.lastUpdated && (
        <span className="lmc-last-updated">
          {t.lcLastUpdated}{" "}
          {formatRelativeUpdated(status.lastUpdated)}
        </span>
      )}
    </div>
  );
}

function LiveMatchCard({
  match,
  t,
  language
}) {
  return (
    <article className="lmc-match-card lmc-match-card-live">
      <div className="lmc-match-card-header">
        <div className="lmc-match-state">
          <span className="lmc-live-indicator">
            <span />
          </span>

          <span>{t.lcStatusLive}</span>
        </div>

        {match.matchType && (
          <span className="lmc-match-type">
            {match.matchType}
          </span>
        )}
      </div>

      <div className="lmc-match-label">
        {t.lcCurrentMatch}
      </div>

      <div className="lmc-teams">
        <div className="lmc-team lmc-team-home">
          <span className="lmc-team-code">
            LMM
          </span>

          <strong>
            LMM
          </strong>
        </div>

        <div className="lmc-score-block">
          <div className="lmc-score">
            <strong>{match.scoreLmm}</strong>

            <span>:</span>

            <strong>{match.scoreOpponent}</strong>
          </div>

          <span className="lmc-score-label">
            LIVE
          </span>
        </div>

        <div className="lmc-team lmc-team-away">
          <span className="lmc-team-code">
            {match.opponentTag}
          </span>

          <strong>
            {match.opponentTag}
          </strong>
        </div>
      </div>

      {match.opponentName && (
        <div className="lmc-opponent-subtitle">
          {match.opponentName}
        </div>
      )}

      <div className="lmc-match-details">
        <div>
          <span>{t.lcMvp}</span>
          <strong>{match.mvp ?? "—"}</strong>
        </div>

        <div>
          <span>{t.lcMap}</span>
          <strong>{match.map ?? "—"}</strong>
        </div>

        <div>
          <span>{t.lcStartTime}</span>
          <strong>
            {formatDateTime(
              match.startedAt,
              language
            )}
          </strong>
        </div>
      </div>

      {match.stream ? (
        <a
          href={match.stream.url}
          target="_blank"
          rel="noreferrer"
          className="lmc-watch-link"
        >
          <span>WATCH MATCH</span>

          <span aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        <div className="lmc-stream-status">
          {t.lcStreamSoon}
        </div>
      )}
    </article>
  );
}

function OfflineCard({ t }) {
  return (
    <article className="lmc-match-card lmc-offline-card">
      <div className="lmc-match-card-header">
        <div className="lmc-match-state lmc-state-offline">
          <span className="lmc-offline-indicator" />

          <span>
            {t.lcConnectionOffline}
          </span>
        </div>

        <span className="lmc-match-type">
          MATCH CENTER
        </span>
      </div>

      <div className="lmc-offline-content">
        <span className="lmc-match-label">
          {t.lcCurrentMatch}
        </span>

        <h3>
          {t.lcNoLiveTitle}
        </h3>

        <p>
          {t.lcNoLiveDesc}
        </p>
      </div>

      <div className="lmc-offline-footer">
        <span>STATUS</span>

        <strong>
          NO ACTIVE MATCH
        </strong>
      </div>
    </article>
  );
}

function NextUpCard({
  match,
  t,
  language
}) {
  const [countdown, setCountdown] =
    useState(() =>
      match
        ? getCountdownParts(match.date)
        : null
    );

  useEffect(() => {
    if (!match) return undefined;

    const interval = setInterval(() => {
      setCountdown(
        getCountdownParts(match.date)
      );
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [match]);

  return (
    <article className="lmc-next-card">
      <div className="lmc-next-header">
        <span className="lmc-section-kicker">
          NEXT FIXTURE
        </span>

        <span className="lmc-fixture-index">
          01
        </span>
      </div>

      {!match ? (
        <div className="lmc-next-empty">
          <h3>
            {t.lcNoNextTitle}
          </h3>

          <p>
            {t.lcNoNextDesc}
          </p>

          <div className="lmc-fixture-status">
            <span />
            AWAITING CONFIRMATION
          </div>
        </div>
      ) : (
        <>
          <div className="lmc-next-match">
            <span>LMM</span>

            <small>VS</small>

            <strong>
              {match.opponentTag}
            </strong>
          </div>

          {match.tournament && (
            <p className="lmc-tournament">
              {match.tournament}
            </p>
          )}

          <div
            className="lmc-countdown"
            role="timer"
            aria-live="off"
          >
            {[
              "days",
              "hours",
              "minutes",
              "seconds"
            ].map((unit) => (
              <div key={unit}>
                <strong>
                  {String(
                    countdown?.[unit] ?? 0
                  ).padStart(2, "0")}
                </strong>

                <span>
                  {t[
                    `lcCountdown_${unit}`
                  ]}
                </span>
              </div>
            ))}
          </div>

          <div className="lmc-next-details">
            <div>
              <span>
                {t.lcStartTime}
              </span>

              <strong>
                {formatDateTime(
                  match.date,
                  language
                )}
              </strong>
            </div>

            <div>
              <span>
                {t.lcMatchType}
              </span>

              <strong>
                {match.matchType ?? "—"}
              </strong>
            </div>

            <div>
              <span>
                {t.lcMap}
              </span>

              <strong>
                {match.map ?? "—"}
              </strong>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

function StreamLinks({
  streamOptions,
  t
}) {
  if (!streamOptions?.length) {
    return null;
  }

  return (
    <div className="lmc-stream-section">
      <div className="lmc-stream-heading">
        <span>OFFICIAL BROADCAST</span>

        <span>
          {streamOptions.length}{" "}
          {streamOptions.length === 1
            ? "CHANNEL"
            : "CHANNELS"}
        </span>
      </div>

      <div className="lmc-stream-grid">
        {streamOptions.map((option, index) => (
          <a
            key={option.platform}
            href={option.url}
            target="_blank"
            rel="noreferrer"
            className="lmc-stream-card"
          >
            <span className="lmc-stream-number">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </span>

            <span className="lmc-stream-name">
              {option.label}
            </span>

            <span
              className="lmc-stream-arrow"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function LiveMatchCenter({
  t,
  language,
  liveMatch,
  nextMatch,
  connectionStatus,
  streamOptions,
  liveReveal
}) {
  return (
    <section
      className="live"
      id="live"
    >
      <div
        className="live-pattern"
        aria-hidden="true"
      />

      <div
        className="live-content reveal"
        ref={liveReveal}
      >
        <header className="lmc-page-header">
          <div>
            <span className="lmc-page-kicker">
              06 / {t.liveMatches}
            </span>

            <h2>
              MATCH
              <br />
              <strong>CENTER.</strong>
            </h2>
          </div>

          <div className="lmc-page-status">
            <ConnectionBadge
              status={connectionStatus}
              t={t}
            />

            <p>
              Official LMM match information,
              fixtures and broadcasts.
            </p>
          </div>
        </header>

        <div className="lmc-dashboard">
          {liveMatch ? (
            <LiveMatchCard
              match={liveMatch}
              t={t}
              language={language}
            />
          ) : (
            <OfflineCard t={t} />
          )}

          <NextUpCard
            match={nextMatch}
            t={t}
            language={language}
          />
        </div>

        <StreamLinks
          streamOptions={streamOptions}
          t={t}
        />
      </div>
    </section>
  );
}

export default LiveMatchCenter;