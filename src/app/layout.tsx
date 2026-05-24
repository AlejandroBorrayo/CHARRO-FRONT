import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Lato, Playfair_Display } from "next/font/google";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const charroDisplay = Playfair_Display({
  variable: "--font-charro-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});
const charroBody = Lato({
  variable: "--font-charro-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "El Charro González",
    template: "%s · El Charro González",
  },
  description:
    "Descubre la esencia de México con El Charro González. Únete a la comunidad y celebra la vida.",
  icons: {
    icon: "/images/el-charro-gonzalez-logo.png",
    apple: "/images/el-charro-gonzalez-logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${charroDisplay.variable} ${charroBody.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
