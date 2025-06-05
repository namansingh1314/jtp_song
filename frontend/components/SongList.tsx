type Song = {
  filename: string;
  label: string;
};

export default function SongList({
  recommendations,
}: {
  recommendations: Song[];
}) {
  if (!recommendations || recommendations.length === 0) return null;
  return (
    <div>
      <h3>Recommendations:</h3>
      <ul>
        {recommendations.map((song, idx) => (
          <li key={idx}>
            <b>{song.filename}</b>{" "}
            <span style={{ color: "#888" }}>({song.label})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
