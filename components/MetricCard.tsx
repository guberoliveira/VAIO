
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
  prefix?: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, prefix, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-slate-400 text-sm font-semibold">{prefix}</span>}
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-sm font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{Math.abs(trend)}% em relação ao mês anterior</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
