// LMM ACHIEVEMENTS / BADGES
// ----------------------------------------------------------------------
// Static achievement definitions.
// No emojis. The visual insignia is rendered by the Rankings component.
// earnedAchievements remains empty until real achievement data exists.

export const achievementCatalog = [
  {
    id: "firstVictory",
    nameKey: "acFirstVictory",
    descKey: "acFirstVictoryDesc",
    tier: "I",
    className: "first-victory",
    rarity: "STANDARD"
  },
  {
    id: "tenWins",
    nameKey: "acTenWins",
    descKey: "acTenWinsDesc",
    tier: "II",
    className: "ten-wins",
    rarity: "STANDARD"
  },
  {
    id: "fiftyWins",
    nameKey: "acFiftyWins",
    descKey: "acFiftyWinsDesc",
    tier: "III",
    className: "fifty-wins",
    rarity: "ELITE"
  },
  {
    id: "mvp",
    nameKey: "acMvp",
    descKey: "acMvpDesc",
    tier: "ELITE",
    className: "mvp",
    rarity: "ELITE"
  },
  {
    id: "veteran",
    nameKey: "acVeteran",
    descKey: "acVeteranDesc",
    tier: "LEGACY",
    className: "veteran",
    rarity: "LEGACY"
  },
  {
    id: "clanLegend",
    nameKey: "acClanLegend",
    descKey: "acClanLegendDesc",
    tier: "LEGENDARY",
    className: "clan-legend",
    rarity: "LEGENDARY"
  },
  {
    id: "tournamentChampion",
    nameKey: "acTournamentChampion",
    descKey: "acTournamentChampionDesc",
    tier: "ELITE",
    className: "tournament-champion",
    rarity: "ELITE"
  },
  {
    id: "undefeatedStreak",
    nameKey: "acUndefeatedStreak",
    descKey: "acUndefeatedStreakDesc",
    tier: "ELITE",
    className: "undefeated-streak",
    rarity: "ELITE"
  }
];

export const earnedAchievements = {};