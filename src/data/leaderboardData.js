// LMM LEADERBOARD DATA — schema + config only, no fabricated rankings.
// ----------------------------------------------------------------------
// leaderboardEntries starts empty. When a backend is connected, populate
// it (or fetch it) keyed as `${timeframeKey}:${categoryKey}`, with each
// value an array of entries shaped like:
//
//   { rank: number, playerName: string, value: string | number }

export const leaderboardCategories = [
  { key: "overall", labelKey: "lbCatOverall" },
  { key: "wins", labelKey: "lbCatWins" },
  { key: "winRate", labelKey: "lbCatWinRate" },
  { key: "mvps", labelKey: "lbCatMvps" },
  { key: "kd", labelKey: "lbCatKd" },
  { key: "matchesPlayed", labelKey: "lbCatMatches" },
  { key: "recentForm", labelKey: "lbCatRecent" }
];

export const leaderboardTimeframes = [
  { key: "weekly", labelKey: "lbWeekly" },
  { key: "monthly", labelKey: "lbMonthly" },
  { key: "season", labelKey: "lbSeason" },
  { key: "allTime", labelKey: "lbAllTime" }
];

export const leaderboardEntries = {};