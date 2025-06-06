"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Song = {
  Song_Name: string;
  Artist: string;
  Sentiment_Label: string;
};

function deduplicateSongs(songs: Song[]): Song[] {
  const seen = new Set<string>();
  return songs.filter((song) => {
    const key = `${song.Song_Name}|${song.Artist}|${song.Sentiment_Label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function Predict() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [emotion, setEmotion] = useState("");
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
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
        }/recommend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ emotion, num_recommendations: num }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Server error");
        setLoading(false);
        return;
      }
      const data = await res.json();

      setResults(deduplicateSongs(data.recommendations));
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
    <div className="flex items-center mt-8 justify-center min-h-[80vh]">
      <div className="w-full max-w-xl bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-yellow-300 mb-2">
          Get Song Recommendations
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Enter an <b>emotion</b> (like <code>Happy</code>, <code>Sad</code>,{" "}
          <code>Motivated</code>, <code>Relaxed</code>, etc).
          <br />
          You'll get a list of songs that match your mood!
        </p>
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleRecommend}>
          <input
            type="text"
            placeholder="Enter an emotion (e.g. Happy, Sad, Energetic...)"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
            required
          />
          <div className="flex items-center justify-start gap-3">
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
              className="bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition shadow"
              disabled={loading}
            >
              {loading ? "Loading..." : "Recommend"}
            </button>
          </div>
        </form>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-yellow-300">
              Recommendations:
            </h3>
            <ul className="space-y-2">
              {results.map((song, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <span className="font-mono text-base text-gray-900 dark:text-white">
                    {song.Song_Name}
                  </span>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {song.Artist}
                  </span>
                  <span className="ml-2 bg-yellow-200 dark:bg-yellow-400 text-yellow-800 dark:text-gray-900 px-3 py-1 rounded text-xs font-bold">
                    {song.Sentiment_Label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <b>Tip:</b> Try emotions like <code>Happy</code>, <code>Sad</code>,{" "}
          <code>Chill</code>, <code>Romantic</code>, etc.
        </div>
      </div>
    </div>
  );
}
