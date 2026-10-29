// Shared date helpers for news. Use these everywhere instead of
// `new Date(x).toLocale...()`, which converts to the viewer's timezone.
//
// `publishedAt` is a "wall-clock" value: the server stores what the editor
// typed in the UTC fields of the date (e.g. "2026-10-29T10:30:00.000Z" means
// 29 Oct 2026, 10:30 for every visitor). The "Z" carries no meaning, so we
// always format with `timeZone: "UTC"` and never convert.
//
// `createdAt` / `updatedAt` are real moments in time; when they are shown as a
// fallback they are converted to the newsroom timezone once, in getNewsDate.

// Newsroom timezone (must match the server's utils/wallClock.js)
export const SITE_TIME_ZONE = "Asia/Dhaka";

const WALL_CLOCK_RE = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/;

const pad = (n) => String(n).padStart(2, "0");

// Wall-clock value (string or Date) -> Date whose UTC fields are the wall-clock
const toWallClock = (value) => {
  if (!value) return null;

  if (value instanceof Date) return isNaN(value) ? null : value;

  const m = String(value).match(WALL_CLOCK_RE);
  if (!m) return null;

  const [, y, mo, d, h, mi, s = "0"] = m;
  return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s));
};

// Real instant -> wall-clock in SITE_TIME_ZONE
const instantToWallClock = (instant) => {
  const date = new Date(instant);
  if (isNaN(date)) return null;

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: SITE_TIME_ZONE,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );

  return new Date(
    Date.UTC(
      +parts.year,
      +parts.month - 1,
      +parts.day,
      +parts.hour,
      +parts.minute,
      +parts.second,
    ),
  );
};

// The date to show for a news item, as a wall-clock Date
export function getNewsDate(news) {
  if (!news) return null;

  if (news.publishedAt) return toWallClock(news.publishedAt);

  const fallback = news.updatedAt || news.createdAt;
  return fallback ? instantToWallClock(fallback) : null;
}

// e.g. "29 October 2026" / "২৯ অক্টোবর ২০২৬"; pass Intl options to change
// the parts shown (timeZone is always forced to UTC)
export function formatNewsDate(
  value,
  lang = "en",
  options = { day: "numeric", month: "long", year: "numeric" },
) {
  const date = toWallClock(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-US", {
    ...options,
    timeZone: "UTC",
  }).format(date);
}

// e.g. "Thursday, 29 October 2026 at 10:30 AM"
export function formatNewsDateTime(value, lang = "en") {
  return formatNewsDate(value, lang, {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// "3 hours ago", measured against the current time in SITE_TIME_ZONE
export function formatDateRelative(value, lang = "en") {
  const date = toWallClock(value);
  if (!date) return "";

  const diffMs = instantToWallClock(Date.now()) - date;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // older items show the date instead, e.g. "29 October 2026"
  if (diffDays >= 2) {
    return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }

  const t = {
    en: {
      justNow: "just now",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days",
      ago: "ago",
    },
    bn: {
      justNow: "এইমাত্র",
      minute: "মিনিট",
      minutes: "মিনিট",
      hour: "ঘন্টা",
      hours: "ঘন্টা",
      day: "দিন",
      days: "দিন",
      ago: "আগে",
    },
  };

  const tr = t[lang] || t.en;

  // < 1 minute (also future dates)
  if (diffMinutes < 1) return tr.justNow;

  if (diffMinutes < 60) {
    const unit = diffMinutes === 1 ? tr.minute : tr.minutes;
    return `${diffMinutes} ${unit} ${tr.ago}`;
  }

  if (diffHours < 24) {
    const unit = diffHours === 1 ? tr.hour : tr.hours;
    return `${diffHours} ${unit} ${tr.ago}`;
  }

  return `1 ${tr.day} ${tr.ago}`;
}

// Value for <input type="datetime-local">, e.g. "2026-10-29T10:30"
export function toDateTimeLocalValue(value) {
  const date = toWallClock(value);
  if (!date) return "";

  return (
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-` +
    `${pad(date.getUTCDate())}T${pad(date.getUTCHours())}:` +
    `${pad(date.getUTCMinutes())}`
  );
}
