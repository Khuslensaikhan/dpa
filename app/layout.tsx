import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { DevelopmentAgentation } from "./components/DevelopmentAgentation";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Data Power Analytics",
  description:
    "Data systems built for growth, clearer decisions, and measurable momentum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full bg-brand-navy font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <DevelopmentAgentation />
      </body>
    </html>
  );
}
