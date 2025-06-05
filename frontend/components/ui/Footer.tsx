export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-700 dark:from-gray-900 dark:to-gray-800 text-gray-100 text-center py-6 mt-20 shadow-inner">
      <div>
        &copy; {new Date().getFullYear()} <b>SongRec</b> &ndash; Find your next
        favorite tune!
      </div>
      <div className="text-xs mt-1">
        Built with Next.js, FastAPI, and way too much coffee. <br />
        <span className="italic">Music recommendations are for fun only!</span>
      </div>
    </footer>
  );
}
