export function formatDateRelative(dateInput, lang = "en") {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now - date;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

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

  // < 1 minute
  if (diffMinutes < 1) return tr.justNow;

  // minutes
  if (diffMinutes < 60) {
    const unit = diffMinutes === 1 ? tr.minute : tr.minutes;
    return lang === "bn"
      ? `${diffMinutes} ${unit} ${tr.ago}`
      : `${diffMinutes} ${unit} ${tr.ago}`;
  }

  // hours
  if (diffHours < 24) {
    const unit = diffHours === 1 ? tr.hour : tr.hours;
    return lang === "bn"
      ? `${diffHours} ${unit} ${tr.ago}`
      : `${diffHours} ${unit} ${tr.ago}`;
  }

  // days
  const unit = diffDays === 1 ? tr.day : tr.days;
  return lang === "bn"
    ? `${diffDays} ${unit} ${tr.ago}`
    : `${diffDays} ${unit} ${tr.ago}`;
}
