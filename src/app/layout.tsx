import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${inconsolata.variable} antialiased`}>{children}</body>
    </html>
  );
}
