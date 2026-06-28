export function formatDateRelative(dateInput, lang = "en") {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  const now = new Date();

  const diffMs = now - date;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 2) {
    const locale = lang === "bn" ? "bn-BD" : "en-GB";
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
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

  // < 1 minute
  if (diffMinutes < 1) return tr.justNow;

  // minutes
  if (diffMinutes < 60) {
    const unit = diffMinutes === 1 ? tr.minute : tr.minutes;
    return `${diffMinutes} ${unit} ${tr.ago}`;
  }

  // hours
  if (diffHours < 24) {
    const unit = diffHours === 1 ? tr.hour : tr.hours;
    return `${diffHours} ${unit} ${tr.ago}`;
  }

  // 1 day
  return `1 ${tr.day} ${tr.ago}`;
}
