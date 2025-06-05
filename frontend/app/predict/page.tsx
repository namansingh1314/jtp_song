"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SongList from "@/components/SongList";
import { useAuth } from "@/context/AuthContext";

type Song = {
  filename: string;
  label: string;
};

export default function Predict() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [num, setNum] = useState(5);
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ song_title: query, num_recommendations: num }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Server error");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data.recommendations);
    } catch (err) {
      setError("Could not connect to backend. Is it running?");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Recommendations</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Please log in to get song recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-xl bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-yellow-300 mb-2">
          Get Song Recommendations
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Type a <b>song filename</b> (like <code>jazz.00025.7.wav</code>) or a{" "}
          <b>genre</b> (like <code>jazz</code>, <code>rock</code>, etc).
          <br />
          You’ll get a list of similar songs in seconds!
        </p>
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleRecommend}>
          <input
            type="text"
            placeholder="Enter song filename or genre"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
          />
          <div className="flex items-center gap-3">
            <label htmlFor="num" className="text-gray-700 dark:text-gray-200">
              How many?
            </label>
            <input
              id="num"
              type="number"
              min={1}
              max={10}
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 w-16 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition shadow"
              disabled={loading}
            >
              {loading ? "Loading..." : "Recommend"}
            </button>
          </div>
        </form>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <SongList recommendations={results} />
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <b>Tip:</b> Try genres like <code>pop</code>, <code>classical</code>,
          or a specific filename from your dataset.
        </div>
      </div>
    </div>
  );
}
