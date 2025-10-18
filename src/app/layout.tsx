import type { Metadata } from "next";
import { Inter, Playfair_Display, Alegreya } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CommonLayout from "@/components/common/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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



// const architectsDaughter = Architects_Daughter({
//   variable: "--font-architects-daughter",
//   subsets: ["latin"],
//   weight: ["400"],
// });

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
      <body
        className={`${playfairDisplay.variable} ${alegreya.variable}   antialiased`}
      >
        <CommonLayout>{children}</CommonLayout>
        <Toaster />
      </body>
    </html>
  );
}
