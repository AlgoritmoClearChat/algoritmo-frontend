import React, { useMemo } from "react";
import { Lead } from "../../types";
import {
  Card, Title, BarList, DonutChart, BarChart
} from "@tremor/react";

type Props = { leads: Lead[] };

export default function Charts({ leads }: Props) {
  const distribution = useMemo(() => {
    const a = leads.filter(l => l.score >= 70).length;
    const b = leads.filter(l => l.score >= 50 && l.score < 70).length;
    const c = leads.filter(l => l.score < 50).length;
    return [
      { name: "≥ 70", value: a },
      { name: "50–69", value: b },
      { name: "< 50", value: c },
    ];
  }, [leads]);

  const byUf = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach(l => map.set(l.uf, (map.get(l.uf) || 0) + 1));
    return Array.from(map.entries()).map(([key, value]) => ({ name: key, value })).sort((a,b)=>b.value - a.value);
  }, [leads]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card>
        <Title>Distribuição de Score</Title>
        <DonutChart data={distribution} category="value" index="name" />
      </Card>

      <Card>
        <Title>Leads por UF</Title>
        <BarList data={byUf.slice(0,6)} />
      </Card>

      <Card>
        <Title>Histórico rápido</Title>
        <div className="text-sm text-slate-500">Score médio: {leads.length ? Math.round(leads.reduce((s,l)=>s+l.score,0)/leads.length) : 0}</div>
      </Card>
    </div>
  );
}
