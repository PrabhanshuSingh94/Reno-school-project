"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-white cursor-pointer">
          Reno Platform
        </h1>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link href="/" className="hover:text-gray-200 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/addSchool" className="hover:text-gray-200 transition-colors duration-200">
              Add School
            </Link>
          </li>
        </ul>
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-blue-600 px-4 pb-4 space-y-4 text-white font-medium">
          <li>
            <Link href="/showSchool" className="block hover:text-gray-200 transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/addSchool" className="block hover:text-gray-200 transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Add School
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
