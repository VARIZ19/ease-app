import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard — Ease Automation",
  description: "Admin app for managing Ease Automation leads and prompts.",
};

import AdminLayout from "../components/AdminLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}
