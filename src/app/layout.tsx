import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Alegreya,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CommonLayout from "@/components/common/layout";
import AuthProvider from "@/components/providers/AuthProvider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const InstrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SareeGhar - Premium Sarees Collection",
  description:
    "Your trusted destination for authentic and beautiful sarees. Discover the finest collection of traditional and modern sarees from across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://res.cloudinary.com/dyc8h8dhp/image/upload/v1760883047/saree-ghar_qusgds.png"
        ></link>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${InstrumentSans.variable}   antialiased`}
      >
        <AuthProvider>
          <CommonLayout>{children}</CommonLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
