import React from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#34D399','#60A5FA','#F59E0B','#F87171']

export default function ClassificacaoChart({ data }: any){
  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="font-semibold mb-4">Classificação Geral</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="classificacao" outerRadius={80}>
              {data && data.map((entry:any, index:number)=> <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
