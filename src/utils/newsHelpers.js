import { toast } from "sonner";

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
