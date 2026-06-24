import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { ContextSwitcher } from "@/components/shared/ContextSwitcher";

export const metadata: Metadata = {
  title: "Rishab Raj | Software Engineer",
  description: "I engineer intelligent systems and build communities.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rishab Raj | Full-Stack AI Engineer",
    description: "Architecting scalable systems and autonomous AI in Delhi.",
    url: "https://yourdomain.com",
    siteName: "Rishab Raj Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-black text-white antialiased min-h-screen selection:bg-white selection:text-black`}
      >
        <ContextSwitcher />
		{children}
      </body>
    </html>
  );
}