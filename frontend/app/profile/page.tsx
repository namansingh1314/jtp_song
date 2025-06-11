"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SongResult = {
  Song_Name: string;
  Artist: string;
  Sentiment_Label: string;
};

type HistoryItem = {
  query: string;
  results: SongResult[];
  timestamp: string;
};

function deduplicateResults(results: SongResult[]): SongResult[] {
  const seen = new Set<string>();
  return results.filter((res) => {
    const key = `${res.Song_Name}|${res.Artist}|${res.Sentiment_Label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [editEmail, setEditEmail] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
      }/userinfo`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const safeEmail = data.email ?? "";
        setEmail(safeEmail);
        setEditEmail(safeEmail);
      });

    fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
      }/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => setHistory(data.history));
  }, [token, router]);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditMsg("");
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000"
      }/userinfo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: editEmail }),
      }
    );
    if (res.ok) {
      setEmail(editEmail);
      setEditMsg("Email updated!");
    } else {
      setEditMsg("Failed to update email");
    }
  };

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Profile</h2>
          <p className="text-gray-700 dark:text-gray-200">
            Please log in to see your profile.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center mt-20 min-h-[80vh]">
      <div className="w-full max-w-xl bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center text-3xl font-bold text-indigo-700 dark:text-yellow-300 shadow mb-2">
            {user[0]?.toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold mb-1">Profile</h2>
          <div className="mb-2 text-gray-700 dark:text-gray-200">
            <b>Username:</b> {user}
          </div>
        </div>
        <form
          className="mb-4 flex flex-col gap-2 items-center"
          onSubmit={handleEmailUpdate}
        >
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            Email:
          </label>
          <input
            type="email"
            className="border rounded px-3 py-2 dark:bg-gray-700 w-full max-w-xs text-center"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <button
            className="bg-indigo-600 text-white py-1 rounded px-4 mt-2 hover:bg-indigo-700 transition"
            type="submit"
          >
            Update Email
          </button>
          {editMsg && <div className="text-green-600">{editMsg}</div>}
        </form>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 flex items-center justify-center rounded mb-6 max-w-xs mx-auto hover:bg-red-600 transition"
        >
          Logout
        </button>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-indigo-700 dark:text-yellow-300">
          Search History
        </h3>
        <ul className="bg-gray-100 dark:bg-gray-800 rounded p-4 max-h-64 overflow-y-auto space-y-2">
          {history?.length === 0 ? (
            <li className="text-gray-500">No history yet.</li>
          ) : (
            history?.map((h, i) => (
              <li
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-2"
              >
                <button
                  type="button"
                  className="flex items-center w-full justify-between text-left font-mono text-indigo-700 dark:text-yellow-300 focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`history-panel-${i}`}
                >
                  <span>
                    {h.query}
                    <span className="text-xs text-gray-500 ml-2">
                      ({new Date(h.timestamp).toLocaleString()})
                    </span>
                  </span>
                  <span className="ml-2 text-lg">
                    {openIdx === i ? "▲" : "▼"}
                  </span>
                </button>
                {openIdx === i && (
                  <div
                    id={`history-panel-${i}`}
                    className="ml-2 mt-2 transition-all"
                  >
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Results:
                    </span>
                    <ul className="ml-3 list-disc">
                      {deduplicateResults(h?.results || []).map((res, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-mono">{res.Song_Name}</span>{" "}
                          <span className="text-gray-500">by {res.Artist}</span>{" "}
                          <span className="bg-yellow-200 dark:bg-yellow-400 text-yellow-800 dark:text-gray-900 px-2 py-0.5 rounded text-xs font-bold ml-2">
                            {res.Sentiment_Label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
