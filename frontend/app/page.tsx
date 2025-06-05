import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[80vh]">
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-10 max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 dark:text-yellow-400 mb-4 drop-shadow-lg">
          Welcome to SongRec!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
          Discover new music instantly. SongRec uses smart algorithms to
          recommend tracks based on your favorite genres or specific songs.
          Whether you’re a jazz lover or a rock enthusiast, we’ve got tunes for
          you!
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <div className="bg-indigo-100 dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-bold text-indigo-700 dark:text-yellow-300">
              Hybrid ML Model
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Combines tempo & genre for better recommendations.
            </p>
          </div>
          <div className="bg-indigo-100 dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-bold text-indigo-700 dark:text-yellow-300">
              Super Simple
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Just type a song or genre, and get suggestions.
            </p>
          </div>
          <div className="bg-indigo-100 dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-bold text-indigo-700 dark:text-yellow-300">
              Open Source
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Check out the code and contribute if you want!
            </p>
          </div>
        </div>
        <Link
          href="/predict"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow transition text-lg"
        >
          Try SongRec Now &rarr;
        </Link>
      </div>
    </div>
  );
}
