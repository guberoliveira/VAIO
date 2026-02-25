
import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import MetricCard from '../components/MetricCard';
import FormModal from '../components/FormModal';
import { Box, Plus, AlertTriangle, TrendingDown } from 'lucide-react';
import { Material } from '../types';

interface StockViewProps {
  materials: Material[];
  onAddMaterial: (material: Omit<Material, 'id'>) => void;
}

const StockView: React.FC<StockViewProps> = ({ materials, onAddMaterial }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const lowStockCount = materials.filter(m => m.quantity <= m.minQuantity).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Itens em Estoque" value={materials.length} icon={<Box size={18} />} />
        <MetricCard label="Baixo Estoque" value={lowStockCount} icon={<AlertTriangle size={18} className={lowStockCount > 0 ? 'text-rose-500' : ''} />} />
        <MetricCard label="Valor Inventário" value={`R$ ${materials.reduce((acc, m) => acc + (m.price * m.quantity), 0).toLocaleString()}`} icon={<TrendingDown size={18} />} />
      </div>

      <DashboardCard 
        title="Gerenciamento de Materiais"
        actions={
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} /> Novo Item
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Material</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Categoria</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase text-center">Quantidade</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase text-right">Preço Unit.</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {materials.map((m) => (
                <tr key={m.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-800">{m.name}</td>
                  <td className="py-4 text-sm text-slate-500">{m.category}</td>
                  <td className="py-4 text-sm font-semibold text-slate-800 text-center">{m.quantity} {m.unit}</td>
                  <td className="py-4 text-sm text-slate-800 text-right font-medium">R$ {m.price.toLocaleString()}</td>
                  <td className="py-4 text-center">
                    {m.quantity <= m.minQuantity ? (
                      <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase">Reposição</span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <FormModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Adicionar Material">
        <form onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as any;
          onAddMaterial({
            name: target.name.value,
            category: target.category.value,
            quantity: Number(target.quantity.value),
            unit: target.unit.value,
            minQuantity: Number(target.min.value),
            price: Number(target.price.value)
          });
          setModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Material</label>
            <input name="name" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
              <input name="category" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Unidade</label>
              <input name="unit" defaultValue="un" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Qtd Atual</label>
              <input name="quantity" type="number" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Qtd Min</label>
              <input name="min" type="number" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preço</label>
              <input name="price" type="number" step="0.01" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg mt-4 transition-all hover:bg-blue-700">
            Adicionar ao Estoque
          </button>
        </form>
      </FormModal>
    </div>
  );
};

export default StockView;
