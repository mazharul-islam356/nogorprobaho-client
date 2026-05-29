import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./context/CartContext";
import { Inter, Noto_Sans_Bengali, Tiro_Bangla } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import FontWrapper from "@/FontWrapper";
import Providers from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });
const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
});

export const metadata = {
  title: "The Sylheti",
  description: "Sylhet news portal",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${tiroBangla.className}`}>
        <TooltipProvider>
          <Toaster richColors />
          <CartProvider>
            {" "}
            <Providers>{children}</Providers>
          </CartProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
