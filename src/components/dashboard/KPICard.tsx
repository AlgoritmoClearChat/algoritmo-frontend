import React from "react";

type Props = { title: string; value: string };

export default function KPICard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col">
      <span className="text-sm text-slate-500">{title}</span>
      <span className="text-2xl font-bold mt-2">{value}</span>
    </div>
  );
}
