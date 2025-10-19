import type { Metadata } from "next";
import { Inter, Playfair_Display, Alegreya } from "next/font/google";
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
      </head>
      <body
        className={`${playfairDisplay.variable} ${alegreya.variable}   antialiased`}
      >
        <AuthProvider>
          <CommonLayout>{children}</CommonLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
