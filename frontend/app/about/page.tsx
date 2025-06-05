export default function About() {
  return (
    <div className="max-w-3xl mx-auto mt-18 p-8 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-yellow-300">
        About SongRec
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        <b>SongRec</b> is a fun little project for recommending music using a
        hybrid machine learning model (genre and tempo). It started as a weekend
        experiment and now it’s a full-stack app!
      </p>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-200">
        <li>Backend: FastAPI + scikit-learn (Python)</li>
        <li>Frontend: Next.js + TypeScript + Tailwind CSS</li>
        <li>Dockerized for easy deployment</li>
      </ul>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        <b>Why?</b> Because finding new music is awesome, and building stuff is
        fun. Also, I wanted to try out FastAPI and Next.js together.
      </p>
      <div className="bg-indigo-50 dark:bg-gray-800 rounded-lg p-4 mt-6">
        <b>Note:</b> SongRec is for demo/learning purposes. Results may be
        silly, especially if your dataset is tiny or weird. Please don’t use it
        for real DJ gigs (yet).
      </div>
    </div>
  );
}
