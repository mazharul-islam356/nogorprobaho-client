export const formatNumber = (num, lang = "en") => {
  const padded = String(num).padStart(2, "0");

  if (lang === "bn") {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return padded
      .split("")
      .map((d) => bnDigits[Number(d)])
      .join("");
  }

  return padded;
};
