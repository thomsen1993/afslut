import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Afslutning dataservice",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="max-w-[1200px] mx-auto">{children}</main>
      </body>
    </html>
  );
}
