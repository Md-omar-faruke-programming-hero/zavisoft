import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zavisoft",
  description: "Zavisoft E-commerce Store",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col overflow-hidden bg-[#e9e6df] text-zinc-950">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12 md:px-8">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
