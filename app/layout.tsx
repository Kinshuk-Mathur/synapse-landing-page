import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNAPSE - AI Student Productivity Hub",
  description:
    "SYNAPSE is an AI-powered futuristic student productivity hub for focus, planning, goals, and intelligent learning.",
  icons: {
    icon: "/assets/synapse-icon-cropped.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
