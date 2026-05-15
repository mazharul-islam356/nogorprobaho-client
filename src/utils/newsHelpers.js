import { toast } from "sonner";

export const formatDateTime = (date, lang) => {
  const d = new Date(date);

  if (lang === "bn") {
    return new Intl.DateTimeFormat("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
};

export const shareOnFacebook = (url) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank",
  );
};

export const shareOnTwitter = (url, text) => {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url,
    )}&text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

export const copyLink = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  } catch (err) {
    console.error("Copy failed", err);
  }
};
