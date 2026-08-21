import { useEffect, useRef } from "react";

function StatCard({ label, value }) {
  return (
    <div className="ppro-stat-card">
      <strong>{value ?? "—"}</strong>
      <span>{label}</span>
    </div>
  );
}

function PlayerProfileModal({ t, player, statsImage, onClose }) {
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    closeButtonRef.current?.focus();

    return () => {
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const roleLabelMap = {
    LEADER: t.leader,
    "CO-LEADER": t.coLeader,
    MEMBER: t.rosMember
  };

  const roleLabel = roleLabelMap[player.role] ?? player.role;
  const isActive = player.status === "ACTIVE";

  return (
    <div
      className="ppro-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="ppro-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${player.name} — ${t.statsFor}`}
      >
        <button
          type="button"
          className="ppro-close"
          onClick={onClose}
          aria-label={t.statsClose}
          ref={closeButtonRef}
        >
          ×
        </button>

        <div className="ppro-body">
          {/* LEFT — DEDICATED IMAGE PANEL */}
          <div className="ppro-image-panel">
            <span className="ppro-panel-kicker">{player.name}</span>

            <div className="ppro-image-frame">
              {statsImage ? (
                <img src={statsImage} alt={`${player.name} stats`} />
              ) : (
                <div className="ppro-image-placeholder">
                  <span className="ppro-image-placeholder-mark" aria-hidden="true">
                    {player.name.charAt(0)}
                  </span>
                  <p>{t.statsUnavailable}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — DEDICATED INFORMATION PANEL */}
          <div className="ppro-info-panel">
            <div className="ppro-info-scroll">
              <span className="ppro-eyebrow">{t.statsFor}</span>
              <h3 className="ppro-name">{player.name}</h3>

              <div className="ppro-tags">
                <span className="ppro-tag ppro-tag-accent">{roleLabel}</span>

                <span
                  className={`ppro-tag ${
                    isActive ? "ppro-tag-active" : "ppro-tag-muted"
                  }`}
                >
                  <span className="ppro-tag-dot" aria-hidden="true" />
                  {player.status}
                </span>

                <span className="ppro-tag ppro-tag-muted">{player.era}</span>
              </div>

              <div className="ppro-identity-grid">
                <div className="ppro-identity-row">
                  <span>{t.rosFilterRole}</span>
                  <strong>{roleLabel}</strong>
                </div>

                <div className="ppro-identity-row">
                  <span>{t.rosFilterStatus}</span>
                  <strong>{player.status}</strong>
                </div>

                <div className="ppro-identity-row">
                  <span>ERA</span>
                  <strong>{player.era}</strong>
                </div>

                <div className="ppro-identity-row">
                  <span>CLAN</span>
                  <strong>LMM</strong>
                </div>
              </div>

              <div className="ppro-divider" aria-hidden="true" />

              <div className="ppro-stats-section">
                <span className="ppro-stats-heading">{t.ppStatsHeading}</span>

                <div className="ppro-stats-grid">
                  <StatCard label={t.ppMatchesPlayed} value="—" />
                  <StatCard label={t.ppWins} value="—" />
                  <StatCard label={t.ppLosses} value="—" />
                  <StatCard label={t.ppWinRate} value="—" />
                  <StatCard label={t.ppKd} value="—" />
                  <StatCard label={t.ppMvpAwards} value="—" />
                </div>

                <p className="ppro-stats-note">{t.ppStatsPending}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfileModal;