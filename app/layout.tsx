import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InstaWish",
  description: "Réseau social privé basé sur Instagram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-6 w-96 bg-red-300 rounded-lg m-auto">
          {/* NavBar */}
          <NavBar />
          {/* Footer */}
          {children}
        </main>
      </body>
    </html>
  );
}
