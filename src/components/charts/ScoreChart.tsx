import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ScoreChart({ data }: any){
  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="font-semibold mb-4">Score Médio Diário</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score_medio" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
