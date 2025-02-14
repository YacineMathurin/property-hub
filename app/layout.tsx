"use client";
import { Geist, Geist_Mono } from "next/font/google";
import React, { useState } from "react";
import { Menu, X, User, LogOut, Home as HomeIcon } from "lucide-react";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6" />
            <span className="font-bold text-xl">PropertyHub</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="/check-it" className="text-gray-600 hover:text-gray-900">
              Check it
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Favorites
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <User className="h-5 w-5 text-gray-600" />
            <LogOut className="h-5 w-5 text-gray-600" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                Properties
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                Favorites
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <main className="container mx-auto p-4 pt-20">{children}</main>
      </body>
    </html>
  );
}
