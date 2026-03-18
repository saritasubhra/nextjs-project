"use client";

import Link from "next/link";
import { ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import useLogout from "@/hooks/useLogout";

export default function Header() {
  const { auth } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <header className="bg-linear-to-r from-yellow-400 to-yellow-300 px-4 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            🍕 SliceNow
          </h1>
          <p className="text-yellow-900 text-lg">
            Handcrafted with love, delivered fresh to your table
          </p>
        </div>

        {/* Right-side Buttons */}
        <div className="flex items-center space-x-4">
          {!auth ? (
            <>
              <Link
                href="/login"
                className="bg-white text-yellow-800 font-semibold px-4 py-2 rounded-md hover:bg-yellow-200 transition"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="bg-yellow-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-900 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/cart"
                className="relative text-yellow-900 hover:text-yellow-950 transition"
              >
                <ShoppingCart size={28} />
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center bg-white text-yellow-800 font-semibold px-3 py-2 rounded-md hover:bg-yellow-200 transition"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
