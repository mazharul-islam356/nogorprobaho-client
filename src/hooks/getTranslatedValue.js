export const getTranslatedValue = (field, lang = "en") => {
  if (!field) return "";

  if (typeof field !== "object") return field;

  return field[lang] || field["en"] || field["bn"] || "";
};
