// LMM ROSTER DATA
// ----------------------------------------------------------------------
// Defines the LMM roster structure used by the interactive Roster UI.
// Role/status are kept intentionally simple right now — leaders get
// their known role, everyone else is MEMBER/ACTIVE, since this list
// represents the clan's current active membership.
//
// When a backend (Firebase/Supabase/API) is connected, this file can be
// replaced by a fetch that returns objects in the same shape:
//
//   { id, name, role, status, era }
//
// Do NOT add invented stats (wins, losses, K/D, real join dates, etc.)
// here — those belong in the player-profile schema and must stay
// null/"—" until real data exists. See PlayerProfileModal.jsx.

export const ROLE = {
  LEADER: "LEADER",
  CO_LEADER: "CO-LEADER",
  MEMBER: "MEMBER"
};

export const STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};

export const leaders = [
  { name: "LOBO", role: ROLE.LEADER, number: "01" },
  { name: "OVER", role: ROLE.CO_LEADER, number: "02" },
  { name: "TEKATO", role: ROLE.CO_LEADER, number: "03" },
  { name: "ANTONIO", role: ROLE.CO_LEADER, number: "04" },
  { name: "LEIN", role: ROLE.CO_LEADER, number: "05" }
];

export const members = [
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
  "Kindel",
  "DRAK",
  "AARON",
  "KNIGHT",
  "Ryze",
  "Shadow",
  "Daniel",
  "shinobi",
  "Archer",
  "Krept",
  "Bunny",
  "sekhon",
  "Treak",
  "triston",
  "raizo",
  "itadori",
  "Lando",
  "indra",
  "obito",
  "Jose",
  "velozxin",
  "unstoppable",
  "plague"
];

const leaderRoleByName = leaders.reduce((map, leader) => {
  map[leader.name.toLowerCase()] = leader.role;
  return map;
}, {});

export const roster = members.map((name, index) => ({
  id: `${name.toLowerCase()}-${index}`,
  name,
  role:
    leaderRoleByName[name.toLowerCase()] ??
    ROLE.MEMBER,
  status: STATUS.ACTIVE,
  era: "2026 ACTIVE ERA"
}));