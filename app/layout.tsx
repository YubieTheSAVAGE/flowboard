import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/components/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | Flowboard",
    default: "Flowboard",
  },
  description: "Flowboard is a platform for creating and managing your flowcharts.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased!`}
      >
        {children}
      </body>
    </html>
  );
}
