import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Blackwolfsec Security Division | Pentesting & Red Team",
  description: "No somos auditores de papel. Somos el adversario que esperas no tener. Encontramos la grieta antes de que se convierta en noticia.",
  keywords: ["pentesting", "red team", "cybersecurity", "security audit", "vulnerability assessment"],
  authors: [{ name: "Blackwolfsec" }],
  openGraph: {
    title: "Blackwolfsec Security Division",
    description: "Pentesting profesional sin humo. Modelo Bounty o Red Team completo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
