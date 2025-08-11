import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ClerkProvider } from '@clerk/nextjs';
import { AuthProvider } from '../context/AuthContext';
// import { UserProvider } from "@/context/UserContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "FoodMy - Your Culinary Companion",
  description: "Discover, create, and manage your favorite recipes with our modern cooking platform",
  keywords: "recipes, cooking, food, culinary, kitchen, cooking timer",
  authors: [{ name: "FoodMy Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={inter.variable}>
        <body className="antialiased">
          {/* <UserProvider> */}
            {children}
          {/* </UserProvider> */}
        </body>
      </html>
    </AuthProvider>
  );
}
