import React, { useEffect, useMemo, useState } from "react";
import { fetchLeads, patchLeadStatus } from "../services/api";
import { Lead } from "../types";
import KPICard from "../components/dashboard/KPICard";
import Charts from "../components/dashboard/Charts";
import FiltersSidebar from "../components/dashboard/FiltersSidebar";
import LeadsTable from "../components/dashboard/LeadsTable";

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [query, setQuery] = useState("");
  const [selectedUFs, setSelectedUFs] = useState<string[]>([]);
  const [selectedCNAEs, setSelectedCNAEs] = useState<string[]>([]);
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Load leads
  useEffect(() => {
    setLoading(true);
    fetchLeads()
      .then((d) => {
        if (Array.isArray(d)) {
          // Normalize values for safety
          const normalized = d.map((l) => ({
            ...l,
            uf: l.uf ?? "",
            cnae: l.cnae ?? "",
            status: l.status ?? "",
            nome_decisor: l.nome_decisor ?? "",
            nome_empresa: l.nome_empresa ?? "",
            cnpj_completo: l.cnpj_completo ?? "",
          }));
          setLeads(normalized);
        } else {
          setLeads([]);
        }
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  // Update status
  const handleStatusChange = async (id: string | number, status: string) => {
    try {
      await patchLeadStatus(String(id), status);
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: status } : l))
      );
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar status");
    }
  };

  // ---- Unique arrays for filters (removes duplicates and undefined) ----
  const ufs = useMemo(
    () => [...new Set(leads.map((l) => l.uf).filter(Boolean))],
    [leads]
  );

  const cnaes = useMemo(
    () => [...new Set(leads.map((l) => l.cnae).filter(Boolean))],
    [leads]
  );

  const statuses = useMemo(
    () => [...new Set(leads.map((l) => l.status).filter(Boolean))],
    [leads]
  );

  // ---- Filter logic ----
  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const status = l.status ?? "";
      const uf = l.uf ?? "";
      const cnae = l.cnae ?? "";
      const decisor = l.nome_decisor?.toLowerCase() ?? "";
      const empresa = l.nome_empresa?.toLowerCase() ?? "";
      const cnpj = l.cnpj_completo ?? "";

      // Search
      if (query) {
        const q = query.toLowerCase();
        if (
          !empresa.includes(q) &&
          !decisor.includes(q) &&
          !cnpj.includes(q)
        ) {
          return false;
        }
      }

      // UF
      if (selectedUFs.length && !selectedUFs.includes(uf)) return false;

      // CNAE
      if (selectedCNAEs.length && !selectedCNAEs.includes(cnae)) return false;

      // Status
      if (selectedStatuses.length && !selectedStatuses.includes(status))
        return false;

      // Score
      if (l.score < scoreRange[0] || l.score > scoreRange[1]) return false;

      return true;
    });
  }, [
    leads,
    query,
    selectedUFs,
    selectedCNAEs,
    selectedStatuses,
    scoreRange,
  ]);

  // ---- KPI counts ----
  const highPriority = filtered.filter((l) => l.score >= 70).length;
  const medium = filtered.filter((l) => l.score >= 50 && l.score < 70).length;
  const total = filtered.length;

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Leads & Prioridades</h1>
        <p className="text-sm text-slate-500">
          Acompanhe e priorize oportunidades com base no score.
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard title="Prioridade Alta (≥70)" value={String(highPriority)} />
        <KPICard title="Prioridade Média (50–69)" value={String(medium)} />
        <KPICard title="Total (filtrado)" value={String(total)} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1">
          <FiltersSidebar
            ufs={ufs}
            cnaes={cnaes}
            statuses={statuses}
            query={query}
            setQuery={setQuery}
            selectedUFs={selectedUFs}
            setSelectedUFs={setSelectedUFs}
            selectedCNAEs={selectedCNAEs}
            setSelectedCNAEs={setSelectedCNAEs}
            scoreRange={scoreRange}
            setScoreRange={setScoreRange}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
          />
        </aside>

        {/* Main area */}
        <main className="col-span-3">
          {/* Charts */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <Charts leads={filtered} />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow p-4">
            <LeadsTable
              leads={filtered}
              loading={loading}
              onChangeStatus={handleStatusChange}
            />
          </div>
        </main>
      </div>

      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
}
