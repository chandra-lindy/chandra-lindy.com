import type { Metadata } from "next";
import { Inconsolata, Merriweather_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Chandra Lindy",
  description: "Chandra Lindy's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} ${merriweatherSans.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
