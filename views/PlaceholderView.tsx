
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import MetricCard from '../components/MetricCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PlaceholderProps {
  title: string;
  metrics: { label: string; value: string; trend?: number; prefix?: string }[];
}

const PlaceholderView: React.FC<PlaceholderProps> = ({ title, metrics }) => {
  const dummyChartData = [
    { name: 'Sem 1', valor: 4000, meta: 3500 },
    { name: 'Sem 2', valor: 3000, meta: 3500 },
    { name: 'Sem 3', valor: 2000, meta: 3500 },
    { name: 'Sem 4', valor: 2780, meta: 3500 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <DashboardCard title={`Detalhamento de ${title}`} subtitle="Consolidado mensal">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Realizado" />
                <Bar dataKey="meta" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title={`Lista de Itens: ${title}`}>
        <div className="flex items-center justify-center h-40 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
          Dados específicos de {title.toLowerCase()} apareceriam aqui em formato de tabela detalhada.
        </div>
      </DashboardCard>
    </div>
  );
};

export default PlaceholderView;
