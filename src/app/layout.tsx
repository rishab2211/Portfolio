import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ContextSwitcher } from "@/components/shared/ContextSwitcher";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rishabraj.dev"),
  title: {
    default: "Rishab Raj | Software Engineer & Full-Stack AI Engineer",
    template: "%s | Rishab Raj",
  },
  description:
    "Software Development Engineer & Systems Builder. Architecting high-concurrency backends, edge runtimes, and autonomous AI systems in Delhi, India.",
  keywords: [
    "Rishab Raj",
    "Software Engineer",
    "Full-Stack AI Engineer",
    "Systems Architect",
    "Next.js",
    "Java",
    "Spring Boot",
    "Node.js",
    "Cloudflare Workers",
    "IEEE MAIT",
    "Portfolio",
  ],
  authors: [{ name: "Rishab Raj", url: "https://github.com/rishab2211" }],
  creator: "Rishab Raj",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rishab Raj | Software Engineer & Systems Architect",
    description:
      "I engineer intelligent systems that multiply leverage and build communities that empower builders.",
    url: "https://rishabraj.dev",
    siteName: "Rishab Raj Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishab Raj | Software Engineer",
    description:
      "Software Development Engineer & Systems Builder. Architecting scalable backends and AI systems.",
    creator: "@Rshb_twts",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-[#050505] text-white antialiased min-h-screen selection:bg-zinc-800 selection:text-white`}
      >
        <ContextSwitcher />
        {children}
      </body>
    </html>
  );
}