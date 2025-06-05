"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ModeToggle } from "./toggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-blue-500 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <span className="text-white font-extrabold text-2xl tracking-wide">
            SongRec
          </span>
        </Link>
        <div className="flex justify-center gap-6 items-center">
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
        <div className="flex items-center justify-center">
          <ModeToggle />

          <div className="pt-1">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="ml-6 text-white hover:text-yellow-300 font-medium"
                >
                  Login
                </Link>
                <Button className="ml-2" variant={"outline"}>
                  <Link
                    href="/register"
                    className=" text-white hover:text-yellow-300 font-medium"
                  >
                    Register
                  </Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-6">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user}`}
                      />
                      <AvatarFallback>{user[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={"/profile"} className="cursor-pointer">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
