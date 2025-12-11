import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ImportacoesChart({ data }: any){
  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="font-semibold mb-4">Importações Diárias</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total_importados" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
