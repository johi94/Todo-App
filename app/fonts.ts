import { Geist, Geist_Mono, Cantarell, Lato } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const cantarell = Cantarell({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});
