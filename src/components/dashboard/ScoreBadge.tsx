import React from "react";

export function scoreColor(score: number) {
  if (score >= 80) return "bg-green-700 text-white";
  if (score >= 70) return "bg-green-400 text-white";
  if (score >= 50) return "bg-yellow-400 text-black";
  return "bg-red-500 text-white";
}

export default function ScoreBadge({ score }: { score: number }) {
  const cls = scoreColor(score);
  return (
    <span className={`px-2 py-1 rounded-md text-sm font-medium ${cls}`}>
      {score}
    </span>
  );
}
