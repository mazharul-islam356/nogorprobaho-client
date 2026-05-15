"use client";

import { LanguageProvider } from "@/context/lagnguageContext";
import FontWrapper from "@/FontWrapper";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <FontWrapper>{children}</FontWrapper>
    </LanguageProvider>
  );
}
