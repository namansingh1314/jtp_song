"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Register() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
        }/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setErr(data.detail || "Registration failed");
        return;
      }
      setSuccess("Registration successful! Logging you in...");

      const loginRes = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
        }/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const loginData = await loginRes.json();
      login(username, loginData.access_token);
      router.push("/profile");
    } catch {
      setErr("Could not connect to backend");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) return null;

  return (
    <div className="h-[60vh] mt-30">
      <div className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-3 py-2 dark:bg-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2 dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2 dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            type="submit"
          >
            Register
          </button>
        </form>
        {err && <div className="text-red-600 mt-3">{err}</div>}
        {success && <div className="text-green-600 mt-3">{success}</div>}
        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
