import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "REN Enterprise Monitor",
  description: "Next-gen NOC Dashboard & Telemetry Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
