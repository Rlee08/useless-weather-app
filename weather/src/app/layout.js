import {DM_Sans} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: '--font-inter',
  subsets: ["latin"],
});

export const metadata = {
  title: "Useless Weather App",
  description: "Not the weather",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
