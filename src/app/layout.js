import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YogaGhar | Transform Your Mind, Body & Spirit",
  description: "Join thousands on their journey to wellness through authentic yoga practices, guided meditation, and mindful living. Discover the ancient wisdom that brings balance to modern life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            <Navbar></Navbar>
          {children}
            <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
