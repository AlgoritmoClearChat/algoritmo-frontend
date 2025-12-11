import React from "react";

type Props = {
  ufs: string[];
  cnaes: string[];
  statuses: string[];
  query: string;
  setQuery: (s: string) => void;
  selectedUFs: string[];
  setSelectedUFs: (s: string[]) => void;
  selectedCNAEs: string[];
  setSelectedCNAEs: (s: string[]) => void;
  scoreRange: [number, number];
  setScoreRange: (r: [number, number]) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (s: string[]) => void;
};

export default function FiltersSidebar(props: Props) {
  const {
    ufs,
    cnaes,
    statuses,
    query,
    setQuery,
    selectedUFs,
    setSelectedUFs,
    selectedCNAEs,
    setSelectedCNAEs,
    scoreRange,
    setScoreRange,
    selectedStatuses,
    setSelectedStatuses,
  } = props;

  function toggle<T>(arr: T[], v: T, setter: (x: T[]) => void) {
    if (arr.includes(v)) setter(arr.filter((a) => a !== v));
    else setter([...arr, v]);
  }

  return (
    <div className="sticky top-6 bg-white rounded-md shadow p-4 space-y-4">
      {/* Search */}
      <div>
        <label className="text-sm font-medium">Buscar</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-2 w-full border rounded p-2 text-sm"
          placeholder="Empresa, decisor ou CNPJ"
        />
      </div>

      {/* SCORE RANGE */}
      <div>
        <label className="text-sm font-medium">Score (range)</label>
        <div className="mt-2 text-sm">
          <input
            type="range"
            min={0}
            max={100}
            value={scoreRange[0]}
            onChange={(e) =>
              setScoreRange([Number(e.target.value), scoreRange[1]])
            }
          />
          <input
            type="range"
            min={0}
            max={100}
            value={scoreRange[1]}
            onChange={(e) =>
              setScoreRange([scoreRange[0], Number(e.target.value)])
            }
          />
          <div className="text-xs mt-1">
            {scoreRange[0]} — {scoreRange[1]}
          </div>
        </div>
      </div>

      {/* UF */}
      <div>
        <label className="text-sm font-medium">UF</label>
        <div className="mt-2 max-h-32 overflow-auto space-y-1">
          {ufs.map((u) => (
            <label key={u} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={selectedUFs.includes(u)}
                onChange={() => toggle(selectedUFs, u, setSelectedUFs)}
                className="mr-2"
              />
              {u}
            </label>
          ))}
        </div>
      </div>

      {/* CNAE */}
      <div>
        <label className="text-sm font-medium">CNAE</label>
        <div className="mt-2 max-h-32 overflow-auto space-y-1 text-xs">
          {cnaes.map((c) => (
            <label key={c} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={selectedCNAEs.includes(c)}
                onChange={() => toggle(selectedCNAEs, c, setSelectedCNAEs)}
                className="mr-2"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* STATUS */}
      <div>
        <label className="text-sm font-medium">Status</label>
        <div className="mt-2 text-sm space-y-1">
          {statuses.map((s) => (
            <label key={s} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(s)}
                onChange={() => toggle(selectedStatuses, s, setSelectedStatuses)}
                className="mr-2"
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* RESET BUTTON */}
      <div>
        <button
          onClick={() => {
            setSelectedUFs([]);
            setSelectedCNAEs([]);
            setSelectedStatuses([]);
            setScoreRange([0, 100]);
            setQuery("");
          }}
          className="w-full py-2 bg-slate-100 rounded"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
