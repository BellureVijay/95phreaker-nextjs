import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainTemplate from "./MainTemplate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "95PhrEAKers",
  description: "A social media app for coders",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <MainTemplate>
          {children}
        </MainTemplate>
      </body>
    </html>
  );
}