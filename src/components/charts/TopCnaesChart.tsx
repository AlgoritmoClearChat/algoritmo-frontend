import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TopCnaesChart({ data }: any){
  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="font-semibold mb-4">Top CNAEs</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid stroke="#eee" />
            <XAxis type="number" />
            <YAxis dataKey="cnae" type="category" />
            <Tooltip />
            <Bar dataKey="score_medio" fill="#FB923C" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
