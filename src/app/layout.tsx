import type { Metadata } from "next";
import { Nerko_One } from "next/font/google";

import "./globals.css";

const nerkoOne = Nerko_One({ subsets: ["latin"], weight: '400'});

export const metadata: Metadata = {
  title: "Caminho da fé",
  description: "Um jogo de tabuleiro católico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nerkoOne.className}>{children}</body>
    </html>
  );
}
