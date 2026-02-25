
import React from 'react';
import MetricCard from '../components/MetricCard';
import DashboardCard from '../components/DashboardCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { DollarSign, Briefcase, Factory, AlertCircle } from 'lucide-react';
import { Sale, Project, Transaction } from '../types';

interface OverviewProps {
  sales: Sale[];
  projects: Project[];
  transactions: Transaction[];
}

const Overview: React.FC<OverviewProps> = ({ sales, projects, transactions }) => {
  // Dados reais derivados do store
  const totalRevenue = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const activeProjectsCount = projects.filter(p => p.status !== 'finished').length;
  
  // Agrupar vendas por mês (simulado para os últimos 6 meses com base no ano atual)
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const chartData = months.map(m => {
    // Tentar encontrar transações reais para o mês (simplificado)
    return {
      name: m,
      vendas: Math.floor(totalRevenue / 6) + (Math.random() * 5000), // Simulação baseada no total
      meta: totalRevenue / 7
    };
  });

  // Distribuição de projetos
  const distributionMap: Record<string, number> = {};
  projects.forEach(p => {
    const type = p.title.split(' - ')[0] || 'Outros';
    distributionMap[type] = (distributionMap[type] || 0) + 1;
  });

  const projectDistribution = Object.entries(distributionMap).map(([name, value]) => ({
    name,
    value,
    color: name === 'Cozinha' ? '#3b82f6' : name === 'Quarto' ? '#6366f1' : '#10b981'
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Faturamento Total" value={`R$ ${totalRevenue.toLocaleString()}`} trend={12} icon={<DollarSign size={18} />} />
        <MetricCard label="Projetos Ativos" value={activeProjectsCount} trend={8} icon={<Briefcase size={18} />} />
        <MetricCard label="Taxa de Produção" value="94%" trend={2} icon={<Factory size={18} />} />
        <MetricCard label="Itens em Falta" value="3" trend={-15} icon={<AlertCircle size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Desempenho de Vendas" subtitle="Consolidado do período">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `R$${Math.floor(val/1000)}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Projetos por Tipo" subtitle="Composição da carteira">
          <div className="h-80 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectDistribution.length > 0 ? projectDistribution : [{name: 'Sem dados', value: 1, color: '#e2e8f0'}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 pr-10">
              {projectDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.value} projetos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DashboardCard title="Cronograma de Entregas" subtitle="Próximos compromissos registrados">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-slate-100">
                   <th className="py-4 px-2 text-sm font-semibold text-slate-600">Cliente</th>
                   <th className="py-4 px-2 text-sm font-semibold text-slate-600">Projeto</th>
                   <th className="py-4 px-2 text-sm font-semibold text-slate-600">Prazo Acordado</th>
                   <th className="py-4 px-2 text-sm font-semibold text-slate-600">Entrega Real/Prev</th>
                   <th className="py-4 px-2 text-sm font-semibold text-slate-600">Status</th>
                 </tr>
               </thead>
               <tbody>
                 {projects.filter(p => p.status !== 'finished').slice(0, 5).map((p) => (
                   <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                     <td className="py-4 px-2 font-medium text-slate-800">{p.customer}</td>
                     <td className="py-4 px-2 text-sm text-slate-600">{p.title}</td>
                     <td className="py-4 px-2 text-sm text-slate-600">{new Date(p.deadline).toLocaleDateString('pt-BR')}</td>
                     <td className="py-4 px-2 text-sm font-semibold text-blue-600">
                       {p.deliveryDate ? new Date(p.deliveryDate).toLocaleDateString('pt-BR') : 'A definir'}
                     </td>
                     <td className="py-4 px-2">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.status === 'production' ? 'bg-blue-100 text-blue-700' :
                          p.status === 'assembly' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {p.status}
                        </span>
                     </td>
                   </tr>
                 ))}
                 {projects.filter(p => p.status !== 'finished').length === 0 && (
                   <tr>
                     <td colSpan={5} className="py-8 text-center text-slate-400 italic">Nenhuma entrega pendente no momento.</td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Overview;
