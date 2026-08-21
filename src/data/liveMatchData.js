// LMM LIVE MATCH DATA — PLACEHOLDER / BACKEND-READY SCHEMA
// ----------------------------------------------------------------------
// Nothing here is real live data. `liveMatch` and `nextMatch` stay null
// until a real match is pushed from wherever LMM's live system ends up
// living (admin dashboard, Firebase/Supabase realtime doc, WebSocket/SSE
// feed, etc). The shapes below are what that system should send.
//
// LIVE MATCH SHAPE
// {
//   id: string,
//   opponentTag: string,       // e.g. "CL"
//   opponentName: string,      // e.g. "Crimson Legion"
//   status: "LIVE" | "STARTING_SOON" | "PAUSED",
//   scoreLmm: number,
//   scoreOpponent: number,
//   mvp: string | null,
//   map: string | null,
//   matchType: string | null,  // e.g. "Clan War", "Scrim"
//   startedAt: string,         // ISO timestamp
//   stream: { platform: "youtube" | "twitch" | "kick" | "tiktok", url: string } | null,
//   lastUpdated: string        // ISO timestamp
// }
//
// NEXT MATCH SHAPE
// {
//   id: string,
//   opponentTag: string,
//   opponentName: string,
//   date: string,              // ISO timestamp
//   matchType: string | null,
//   map: string | null,
//   tournament: string | null
// }

export const liveMatch = null;

export const nextMatch = null;

// Reflects the real-time connection (WebSocket/SSE) once that system is
// wired up. Defaults to "offline" — there is no live backend yet, so we
// never claim a live connection that doesn't exist.
export const connectionStatus = {
  state: "offline", // "connected" | "reconnecting" | "offline"
  lastUpdated: null
};

// Fallback / manual stream links LMM already uses today. Once a real
// stream-detection system exists, entries here can be swapped for
// live-detected platforms (YouTube / Twitch / Kick) per match.
export const streamOptions = [
  {
    platform: "tiktok",
    label: "TIKTOK",
    handle: "@zerxda2",
    url: "https://www.tiktok.com/@zerxda2"
  }
];