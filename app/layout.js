import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Quiz App",
    template: "%s | Quiz App",
  },
  description: "A quiz app built with Next.js",
  author: "Manish Gudewar",
  keywords: "quiz, next.js, react, javascript",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
