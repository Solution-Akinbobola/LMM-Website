// LMM MATCH HISTORY
// ----------------------------------------------------------------------
// TEMPORARY DEMO ARCHIVE
//
// This contains the 125 opponent tags supplied for the LMM website.
// Results, scores and dates are placeholder/demo values until the real
// historical match archive is available.
//
// The structure is kept compatible with MatchHistory.jsx so the real
// records can later replace this array without changing the UI.

export const opponentTags = [
  "CL",
  "IND",
  "HCL",
  "TL",
  "LNZ",
  "LZR",
  "L²K",
  "BELLOS",
  "BR²",
  "NICA",
  "GG",
  "MIL",
  "HL",
  "FL",
  "JDM",
  "HQ",
  "1T",
  "1L",
  "V1",
  "F3",
  "NS",
  "TBL",
  "TDW",
  "LD",
  "V5",
  "DA",
  "NG",
  "SVD",
  "SL",
  "@5",
  "+USA",
  "NN",
  "MVP",
  "T.S",
  "HT",
  "BLK",
  "USA",
  "XP",
  "PtG",
  "FAVOUR",
  "IG",
  "FC",
  "EXP",
  "DL",
  "RKG",
  "FRS",
  "ROLO",
  "TSG",
  "T",
  "TMG",
  "BGM",
  "2R",
  "RPG",
  "RBL",
  "OT",
  "OP",
  "SNG",
  "PGS",
  "+ED",
  "TM",
  "BOD",
  "CLC",
  "SF",
  "7G",
  "BD",
  "USSR",
  "6S",
  "L+L",
  "ES",
  "LOUD",
  "2T",
  "GRIZZI",
  "UCW",
  "CL",
  "+AF",
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
  "+LGN",
  "+RM",
  "TSR",
  "TXS",
  "+PRIME",
  "+PLN",
  "RWD",
  "DB",
  "+CA",
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
  "ES",
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
  "MD",
  "JMD"
];

// ----------------------------------------------------------------------
// Generate one demo record for every opponent.
// All records are marked as LMM wins because this archive represents
// the 125 recorded victories requested for the War Room.
//
// Scores and dates are deliberately generated placeholder values.
// Replace this dataset with real records when the historical archive
// becomes available.
// ----------------------------------------------------------------------

function getSeason(year) {
  if (year <= 2023) return "LMM Legacy Era";
  if (year === 2024) return "2024 Era";
  if (year === 2025) return "2025 Era";
  return "2026 Active Era";
}

function getDate(index) {
  // Spreads the 125 demo matches from early 2019 through August 2026.
  const start = new Date("2019-01-15T18:00:00Z");
  const date = new Date(start);

  date.setDate(date.getDate() + index * 22);

  // Keep the archive inside August 2026.
  const maxDate = new Date("2026-08-20T18:00:00Z");

  if (date > maxDate) {
    return maxDate.toISOString();
  }

  return date.toISOString();
}

function getScore(index) {
  // Demo scores only.
  // LMM always wins these temporary records.
  const lmmScores = [7, 8, 9, 10, 11, 8, 12, 9, 10, 13];
  const opponentScores = [3, 5, 6, 7, 4, 6, 8, 5, 7, 9];

  return {
    scoreLmm: lmmScores[index % lmmScores.length],
    scoreOpponent: opponentScores[index % opponentScores.length]
  };
}

export const matchHistory = opponentTags.map((opponentTag, index) => {
  const date = getDate(index);
  const year = new Date(date).getUTCFullYear();
  const { scoreLmm, scoreOpponent } = getScore(index);

  return {
    id: `lmm-match-${String(index + 1).padStart(3, "0")}`,

    opponentTag,

    opponentName: opponentTag,

    result: "WIN",

    scoreLmm,

    scoreOpponent,

    date,

    mvp: null,

    season: getSeason(year),

    matchType: "CLAN WAR",

    map: null,

    tournament: null,

    notes: "Temporary historical archive entry.",

    vodUrl: null,

    screenshots: []
  };
});

// ----------------------------------------------------------------------
// Seasons used by the archive.
// ----------------------------------------------------------------------

export const seasons = [
  "LMM Legacy Era",
  "2024 Era",
  "2025 Era",
  "2026 Active Era"
];