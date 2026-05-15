"use client";

import { Inter, Tiro_Bangla } from "next/font/google";
import { useLanguage } from "./context/lagnguageContext";

const inter = Inter({ subsets: ["latin"] });
const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
});

export default function FontWrapper({ children }) {
  const { lang } = useLanguage();

  return (
    <div className={lang === "bn" ? tiroBangla.className : inter.className}>
      {children}
    </div>
  );
}
