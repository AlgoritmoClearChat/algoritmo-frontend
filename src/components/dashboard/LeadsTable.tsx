import React, { useMemo, useState } from "react";
import { Lead } from "../../types";
import ScoreBadge, { scoreColor } from "./ScoreBadge";

type Props = {
  leads: Lead[];
  loading: boolean;
  onChangeStatus: (id: string | number, status: string) => void;
};

export default function LeadsTable({ leads, loading, onChangeStatus }: Props) {
  const [sortKey, setSortKey] = useState<keyof Lead | null>("score");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("desc");

  const sorted = useMemo(() => {
    if (!sortKey) return leads;
    const arr = [...leads].sort((a,b) => {
      const va = (a as any)[sortKey];
      const vb = (b as any)[sortKey];
      if (typeof va === "number" && typeof vb === "number") return va - vb;
      return String(va).localeCompare(String(vb));
    });
    if (sortDir === "desc") arr.reverse();
    return arr;
  }, [leads, sortKey, sortDir]);

  function toggleSort(key: keyof Lead) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  if (loading) return <div>Carregando leads...</div>;
  if (!leads.length) return <div>Nenhum lead encontrado.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead>
          <tr className="text-left text-sm text-slate-600">
            <th className="p-2 cursor-pointer" onClick={() => toggleSort("nome_empresa")}>Empresa</th>
            <th className="p-2">CNPJ</th>
            <th className="p-2">CNAE</th>
            <th className="p-2" onClick={() => toggleSort("uf")}>UF</th>
            <th className="p-2">Decisor</th>
            <th className="p-2 cursor-pointer" onClick={() => toggleSort("score")}>Score</th>
            <th className="p-2">Status</th>
            <th className="p-2">LinkedIn</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {sorted.map(l => (
            <tr key={l.id} className="border-b">
              <td className="p-2">{l.nome_empresa}</td>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <span>{l.cnpj_completo}</span>
                  <button onClick={() => navigator.clipboard.writeText(l.cnpj_completo)} className="text-xs text-slate-500 hover:text-slate-800">Copiar</button>
                </div>
              </td>
              <td className="p-2">{l.cnae}</td>
              <td className="p-2">{l.uf}</td>
              <td className="p-2">{l.nome_decisor}</td>
              <td className="p-2"><ScoreBadge score={l.score} /></td>
              <td className="p-2">
                <select value={l.status_lead} onChange={(e) => onChangeStatus(l.id, e.target.value)} className="border rounded p-1 text-sm">
                  <option value="aberto">aberto</option>
                  <option value="em contato">em contato</option>
                  <option value="qualificado">qualificado</option>
                  <option value="perdido">perdido</option>
                </select>
              </td>
              <td className="p-2">
                {l.link_linkedin ? (
                  <a href={l.link_linkedin} target="_blank" rel="noreferrer" className="text-blue-600">Perfil</a>
                ) : <span className="text-slate-400">—</span>}
              </td>
              <td className="p-2">
                <div className="flex gap-2">
                  <a className="text-sm text-slate-600 hover:text-slate-900" href={`https://www.google.com/search?q=${encodeURIComponent(l.nome_empresa)}`} target="_blank" rel="noreferrer">Pesquisar</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
