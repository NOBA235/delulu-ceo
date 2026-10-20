import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delulu CEO — Your worst decisions. Our next unicorn.",
  description: "Transform your questionable life decisions into ridiculous, hyper-confident startup pitch decks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAF9F6] text-[#171717] min-h-screen selection:bg-[#E6F4EA] selection:text-[#087F5B]">
        {children}
      </body>
    </html>
  );
}

