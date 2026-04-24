import type { Metadata } from "next";
import Nav from "@/components/nav/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fumage — The Gentleman's Atlas",
  description:
    "Men's fragrance reference. From first bottle to full collection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
