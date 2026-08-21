import { useState } from "react";
import {
  leaderboardCategories,
  leaderboardTimeframes,
  leaderboardEntries
} from "../data/leaderboardData";
import { records } from "../data/recordsData";
import {
  achievementCatalog,
  earnedAchievements
} from "../data/achievementsData";

const LMM_TOP_10 = [
  "LANDO",
  "CARTEL",
  "PLAGUE",
  "TEKATO",
  "ALONSO",
  "LEIN",
  "OVERSKY",
  "TRISTON",
  "SHADOW",
  "VICENZO"
];

function RankNumber({ rank }) {
  return (
    <span className="lmm-rank-number">
      {String(rank).padStart(2, "0")}
    </span>
  );
}

function LmmTopTen({ t }) {
  return (
    <div className="lmm-ranking-board">
      <div className="lmm-ranking-board-header">
        <div>
          <span className="lmm-ranking-kicker">
            LMM // ACTIVE RANKING
          </span>

          <h3>
            TOP <strong>10</strong>
          </h3>
        </div>

        <span className="lmm-ranking-status">
          <i aria-hidden="true" />
          CURRENT RANKING
        </span>
      </div>

      <div className="lmm-number-one">
        <div className="lmm-number-one-rank">
          <span>01</span>
          <small>RANK</small>
        </div>

        <div className="lmm-number-one-main">
          <span>TOP RANKED PLAYER</span>
          <strong>LANDO</strong>
          <small>LMM // NUMBER ONE</small>
        </div>

        <div className="lmm-number-one-mark" aria-hidden="true">
          #1
        </div>
      </div>

      <div className="lmm-ranking-list">
        {LMM_TOP_10.slice(1).map((player, index) => {
          const rank = index + 2;

          return (
            <article
              className={`lmm-ranking-row ${
                rank <= 3 ? "lmm-ranking-row-featured" : ""
              }`}
              key={player}
            >
              <RankNumber rank={rank} />

              <div className="lmm-ranking-player">
                <span>
                  {rank <= 3 ? "TOP CONTENDER" : "LMM // RANKED PLAYER"}
                </span>

                <strong>{player}</strong>
              </div>

              <div className="lmm-ranking-position">
                <span>POSITION</span>
                <strong>#{rank}</strong>
              </div>

              <div className="lmm-ranking-arrow" aria-hidden="true">
                ↗
              </div>
            </article>
          );
        })}
      </div>

      <div className="lmm-ranking-board-footer">
        <span>10 PLAYERS</span>
        <span>LMM RANKING SYSTEM</span>
        <span>2026</span>
      </div>
    </div>
  );
}

function LeaderboardPanel({ t }) {
  const [timeframe, setTimeframe] = useState("allTime");
  const [category, setCategory] = useState("overall");

  const entries =
    leaderboardEntries[`${timeframe}:${category}`] ?? [];

  const isMainRanking =
    timeframe === "allTime" && category === "overall";

  return (
    <div className="rk-panel rk-leaderboard-panel">
      <div className="rk-lb-controls">
        <div className="rk-control-heading">
          <span>LMM // RANKING PERIOD</span>

          <div
            className="rk-chip-row"
            role="group"
            aria-label="Timeframe"
          >
            {leaderboardTimeframes.map((tf) => (
              <button
                key={tf.key}
                type="button"
                className={`rk-chip ${
                  timeframe === tf.key ? "active" : ""
                }`}
                onClick={() => setTimeframe(tf.key)}
                aria-pressed={timeframe === tf.key}
              >
                {t[tf.labelKey]}
              </button>
            ))}
          </div>
        </div>

        <div className="rk-control-heading">
          <span>LMM // CATEGORY</span>

          <div
            className="rk-chip-row"
            role="group"
            aria-label="Category"
          >
            {leaderboardCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`rk-chip rk-chip-muted ${
                  category === cat.key ? "active" : ""
                }`}
                onClick={() => setCategory(cat.key)}
                aria-pressed={category === cat.key}
              >
                {t[cat.labelKey]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMainRanking ? (
        <LmmTopTen t={t} />
      ) : entries.length === 0 ? (
        <div className="rk-empty">
          <span
            className="rk-empty-icon"
            aria-hidden="true"
          >
            —
          </span>

          <span className="rk-empty-kicker">
            LMM // DATA PENDING
          </span>

          <h3>{t.lbEmptyTitle}</h3>

          <p>{t.lbEmptyDesc}</p>
        </div>
      ) : (
        <div className="rk-lb-table">
          <div className="rk-lb-row rk-lb-head">
            <span>{t.lbRank}</span>
            <span>{t.lbPlayer}</span>
            <span>{t.lbValue}</span>
          </div>

          {entries.map((entry) => (
            <div
              className="rk-lb-row"
              key={`${entry.rank}-${entry.playerName}`}
            >
              <span className="rk-lb-rank">
                {String(entry.rank).padStart(2, "0")}
              </span>

              <span>{entry.playerName}</span>

              <span className="rk-lb-value">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RecordsPanel({ t }) {
  return (
    <div className="rk-panel">
      <div className="rk-panel-heading">
        <span>LMM // RECORDS</span>
        <h3>CLAN <strong>RECORDS.</strong></h3>
      </div>

      <div className="rk-records-grid">
        {records.map((record) => (
          <article
            className="rk-record-card"
            key={record.id}
          >
            <span className="rk-record-index">
              RECORD
            </span>

            <span className="rk-record-title">
              {t[record.labelKey]}
            </span>

            <div className="rk-record-body">
              <div>
                <span>{t.rcHolder}</span>
                <strong>{record.holder ?? "—"}</strong>
              </div>

              <div>
                <span>{t.rcValue}</span>
                <strong>{record.value ?? "—"}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="rk-pending-note">
        {t.rcPendingNote}
      </p>
    </div>
  );
}

function AchievementsPanel({ t }) {
  return (
    <div className="rk-panel lmm-achievements-panel">
      <div className="rk-panel-heading lmm-achievements-heading">
        <span>LMM // ACHIEVEMENTS</span>

        <h3>
          CLAN <strong>LEGACY.</strong>
        </h3>

        <p>
          Milestones earned through victories, performance,
          consistency and longevity within LMM.
        </p>
      </div>

      <div className="rk-achievement-grid">
        {achievementCatalog.map((badge, index) => {
          const earnedBy =
            earnedAchievements[badge.id] ?? [];

          const achievementNumber = String(index + 1).padStart(
            2,
            "0"
          );

          return (
            <article
              className={`rk-achievement-card ${
                earnedBy.length > 0
                  ? "is-earned"
                  : "is-locked"
              } ${badge.id}`}
              key={badge.id}
            >
              <div className="rk-achievement-top">
                <span className="rk-achievement-number">
                  {achievementNumber}
                </span>

                <span className="rk-achievement-rarity">
                  {earnedBy.length > 0
                    ? "EARNED"
                    : "LOCKED"}
                </span>
              </div>

              <div className="rk-achievement-insignia">
                <div className="rk-achievement-insignia-core">
                  <span>{achievementNumber}</span>
                </div>
              </div>

              <div className="rk-achievement-content">
                <span className="rk-achievement-tier">
                  LMM // ACHIEVEMENT
                </span>

                <h4>{t[badge.nameKey]}</h4>

                <p>{t[badge.descKey]}</p>
              </div>

              <div className="rk-achievement-footer">
                <div>
                  <span>STATUS</span>

                  <strong>
                    {earnedBy.length > 0
                      ? "UNLOCKED"
                      : "LOCKED"}
                  </strong>
                </div>

                <div>
                  <span>
                    {earnedBy.length > 0
                      ? t.acEarnedBy
                      : "AWARDED TO"}
                  </span>

                  <strong>
                    {earnedBy.length > 0
                      ? earnedBy.join(", ")
                      : "NOT YET AWARDED"}
                  </strong>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="rk-pending-note">
        {t.acCatalogNote}
      </p>
    </div>
  );
}

function Rankings({ t, rankingsReveal }) {
  const [tab, setTab] = useState("leaderboards");

  const tabs = [
    {
      key: "leaderboards",
      label: t.rkTabLeaderboards
    },
    {
      key: "records",
      label: t.rkTabRecords
    },
    {
      key: "achievements",
      label: t.rkTabAchievements
    }
  ];

  return (
    <section
      className="rankings"
      id="rankings"
    >
      <div
        className="rankings-background-grid"
        aria-hidden="true"
      />

      <div
        className="rankings-glow rankings-glow-one"
        aria-hidden="true"
      />

      <div
        className="rankings-glow rankings-glow-two"
        aria-hidden="true"
      />

      <div
        className="section-top reveal rankings-hero"
        ref={rankingsReveal}
      >
        <div>
          <span className="rankings-section-number">
            05 / {t.progression}
          </span>

          <h2>
            {t.rankTitle1}
            <br />
            <strong>{t.rankTitle2}</strong>
          </h2>
        </div>

        <p>
          LMM rankings. The players who stand at the top
          of the clan.
        </p>
      </div>

      <div
        className="rk-tabs"
        role="tablist"
        aria-label={t.rankings}
      >
        {tabs.map((tabItem) => (
          <button
            key={tabItem.key}
            type="button"
            role="tab"
            aria-selected={tab === tabItem.key}
            className={`rk-tab-btn ${
              tab === tabItem.key ? "active" : ""
            }`}
            onClick={() => setTab(tabItem.key)}
          >
            <span>
              {String(
                tabs.findIndex(
                  (item) => item.key === tabItem.key
                ) + 1
              ).padStart(2, "0")}
            </span>

            {tabItem.label}
          </button>
        ))}
      </div>

      {tab === "leaderboards" && (
        <LeaderboardPanel t={t} />
      )}

      {tab === "records" && (
        <RecordsPanel t={t} />
      )}

      {tab === "achievements" && (
        <AchievementsPanel t={t} />
      )}
    </section>
  );
}

export default Rankings;