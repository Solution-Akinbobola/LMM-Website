import { useMemo, useState } from "react";
import { ROLE, STATUS } from "../data/rosterData";

function Roster({
  t,
  roster,
  statsImages,
  onSelectPlayer,
  rosterReveal,
  rosterGridReveal
}) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const roleLabels = {
    ALL: t.rosAll,
    [ROLE.LEADER]: t.leader,
    [ROLE.CO_LEADER]: t.coLeader,
    [ROLE.MEMBER]: t.rosMember
  };

  const statusLabels = {
    ALL: t.rosAll,
    [STATUS.ACTIVE]: t.rosActive,
    [STATUS.INACTIVE]: t.rosInactive
  };

  const filteredRoster = useMemo(() => {
    const query = search.trim().toLowerCase();

    return roster.filter((player) => {
      const matchesSearch =
        query.length === 0 || player.name.toLowerCase().includes(query);
      const matchesRole = roleFilter === "ALL" || player.role === roleFilter;
      const matchesStatus =
        statusFilter === "ALL" || player.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [roster, search, roleFilter, statusFilter]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    roleFilter !== "ALL" ||
    statusFilter !== "ALL";

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("ALL");
    setStatusFilter("ALL");
  };

  return (
    <section className="roster" id="roster">
      <div className="roster-orb roster-orb-one" aria-hidden="true" />
      <div className="roster-orb roster-orb-two" aria-hidden="true" />
      <div className="roster-grid-lines" aria-hidden="true" />

      <div className="roster-header reveal" ref={rosterReveal}>
        <div className="roster-title-block">
          <span>03 / {t.rosterSection}</span>

          <h2>
            {t.theRoster}
            <br />
            <strong>{t.rosterWord}</strong>
          </h2>
        </div>

        <div className="roster-total">
          <div className="roster-total-number">
            <strong>{roster.length}</strong>
            <span aria-hidden="true">+</span>
          </div>
          <span>{t.activeMembers}</span>
        </div>
      </div>

      <div className="roster-command-bar">
        <div className="roster-command-copy">
          <span className="roster-command-kicker">LMM // ACTIVE UNIT</span>
          <span className="roster-command-count">
            {filteredRoster.length} / {roster.length}
          </span>
        </div>

        <div className="roster-command-line" aria-hidden="true" />
      </div>

      <div className="ros-controls" aria-label={t.rosterSection}>
        <label className="ros-search">
          <span className="ros-search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.rosSearchPlaceholder}
            aria-label={t.rosSearchPlaceholder}
          />

          {search && (
            <button
              type="button"
              className="ros-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>

        <div
          className="ros-filter-group"
          role="group"
          aria-label={t.rosFilterRole}
        >
          <span className="ros-filter-label">{t.rosFilterRole}</span>

          <div className="ros-filter-options">
            {["ALL", ROLE.LEADER, ROLE.CO_LEADER, ROLE.MEMBER].map(
              (role) => (
                <button
                  key={role}
                  type="button"
                  className={`ros-filter-btn ${
                    roleFilter === role ? "active" : ""
                  }`}
                  onClick={() => setRoleFilter(role)}
                  aria-pressed={roleFilter === role}
                >
                  {roleLabels[role]}
                </button>
              )
            )}
          </div>
        </div>

        <div
          className="ros-filter-group"
          role="group"
          aria-label={t.rosFilterStatus}
        >
          <span className="ros-filter-label">{t.rosFilterStatus}</span>

          <div className="ros-filter-options">
            {["ALL", STATUS.ACTIVE, STATUS.INACTIVE].map((status) => (
              <button
                key={status}
                type="button"
                className={`ros-filter-btn ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
                aria-pressed={statusFilter === status}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="ros-reset-btn"
            onClick={resetFilters}
          >
            RESET
            <span aria-hidden="true">↺</span>
          </button>
        )}
      </div>

      {filteredRoster.length === 0 ? (
        <div className="ros-empty">
          <span className="ros-empty-mark" aria-hidden="true">
            !
          </span>
          <p>{t.rosNoResults}</p>
          <button type="button" onClick={resetFilters}>
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="roster-grid" ref={rosterGridReveal}>
          {filteredRoster.map((player, index) => {
            const hasStats = Boolean(statsImages[player.name]);
            const roleClass = player.role
              .toLowerCase()
              .replaceAll("-", "_");

            return (
              <button
                type="button"
                className={`player player-role-${roleClass} ${
                  hasStats ? "player-has-stats" : ""
                }`}
                key={player.id}
                onClick={() => onSelectPlayer(player)}
                aria-haspopup="dialog"
                aria-label={`${player.name}, ${roleLabels[player.role]}`}
              >
                <span className="player-topline">
                  <span className="player-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`player-status ${
                      player.status === STATUS.ACTIVE ? "is-active" : ""
                    }`}
                  >
                    <span className="player-status-dot" aria-hidden="true" />
                    {statusLabels[player.status]}
                  </span>
                </span>

                <span className="player-main">
                  <strong className="player-name">{player.name}</strong>

                  <span className="ros-role-badge">
                    <span className="ros-role-badge-mark" aria-hidden="true">
                      {player.role === ROLE.LEADER
                        ? "★"
                        : player.role === ROLE.CO_LEADER
                          ? "◆"
                          : "•"}
                    </span>
                    {roleLabels[player.role]}
                  </span>
                </span>

                <span className="player-bottomline">
                  <span className="player-era">{player.era}</span>
                  <span className="player-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Roster;