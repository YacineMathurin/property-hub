"use client";
import { Geist, Geist_Mono } from "next/font/google";
import React, { useState } from "react";
import { Menu, X, User, LogOut, Home as HomeIcon } from "lucide-react";
import { Twitter, Instagram, Facebook, Mail } from "lucide-react";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ajouter-certificat", label: "Authentifier" },
    { href: "/check-it", label: "Verifier" },
    { href: "/favorites", label: "Favorites" },
    { href: "/blog", label: "Blog" },
    { href: "/partners", label: "Partners" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const pathname = usePathname();
  console.log({ pathname });

  const isActive = (path: string) => pathname === path + "/";

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6" />
              <span className="font-bold text-xl">PropertyHub</span>
            </a>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} passHref legacyBehavior>
                <a
                  className={`relative py-2 ${
                    isActive(href)
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                  )}
                </a>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <User className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
            <LogOut className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} passHref legacyBehavior>
                  <a
                    className={`px-4 py-2 rounded-md transition-colors ${
                      isActive(href)
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Company Name */}
            <div>
              <span className="text-gray-100 font-medium text-lg">
                PropertyHub
              </span>
            </div>

            {/* Links */}
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap gap-6 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
            <p className="mt-4 md:mt-0">
              © {new Date().getFullYear()} PropertyHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
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
        <Footer />
      </body>
    </html>
  );
}
