export function formatFullDate(dateInput, lang = "en") {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (lang === "bn") {
    return new Intl.DateTimeFormat("bn-BD", options).format(date);
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
