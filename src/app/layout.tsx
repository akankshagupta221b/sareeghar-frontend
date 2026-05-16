import type { Metadata } from "next";
import { Playfair_Display, Alegreya, Instrument_Sans } from "next/font/google";
import Script from "next/script";

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

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SareeGhar - Premium Sarees Collection",
  description:
    "Your trusted destination for authentic and beautiful sarees. Discover the finest collection of traditional and modern sarees from across India.",
  icons: {
    icon: "https://res.cloudinary.com/dyc8h8dhp/image/upload/v1760883047/saree-ghar_qusgds.png",
  },
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
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>

      <body
        className={`
          ${playfairDisplay.variable}
          ${alegreya.variable}
          ${instrumentSans.variable}
          antialiased
        `}
      >
        <AuthProvider>
          <CommonLayout>{children}</CommonLayout>
          <Toaster />
        </AuthProvider>
      </body>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6SBFN2Z4P9"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6SBFN2Z4P9');
        `}
      </Script>
    </html>
  );
}
