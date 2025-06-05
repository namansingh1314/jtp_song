import Link from "next/link";
import { ModeToggle } from "./toggle";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-blue-500 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <span className="text-white font-extrabold text-2xl tracking-wide">
            SongRec
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <ModeToggle />
          <Link
            href="/"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            Home
          </Link>
          <Link
            href="/predict"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            Predict
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
