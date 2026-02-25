
import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import MetricCard from '../components/MetricCard';
import FormModal from '../components/FormModal';
import { Plus, DollarSign, Search, Edit } from 'lucide-react';
import { Sale } from '../types';

interface SalesViewProps {
  sales: Sale[];
  onAddSale: (sale: Omit<Sale, 'id'>) => void;
  onUpdateSale: (id: string, updates: Partial<Sale>) => void;
}

const SalesView: React.FC<SalesViewProps> = ({ sales, onAddSale, onUpdateSale }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingSaleId, setEditingSaleId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer: '',
    projectType: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as Sale['status']
  });

  const totalValue = sales.reduce((acc, curr) => acc + curr.value, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saleData = {
      customer: formData.customer,
      projectType: formData.projectType,
      value: Number(formData.value),
      date: formData.date,
      status: formData.status
    };

    if (editingSaleId) {
      onUpdateSale(editingSaleId, saleData);
    } else {
      onAddSale(saleData);
    }
    
    handleCloseModal();
  };

  const handleEdit = (sale: Sale) => {
    setEditingSaleId(sale.id);
    setFormData({
      customer: sale.customer,
      projectType: sale.projectType,
      value: sale.value.toString(),
      date: sale.date,
      status: sale.status
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingSaleId(null);
    setFormData({ 
      customer: '', 
      projectType: '', 
      value: '', 
      date: new Date().toISOString().split('T')[0], 
      status: 'pending' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Faturamento Total" value={`R$ ${totalValue.toLocaleString()}`} trend={12} icon={<DollarSign size={18} />} />
        <MetricCard label="Ticket Médio" value={`R$ ${(totalValue / (sales.length || 1)).toLocaleString()}`} icon={<DollarSign size={18} />} />
        <MetricCard label="Vendas Fechadas" value={sales.length} icon={<Plus size={18} />} />
      </div>

      <DashboardCard 
        title="Histórico de Vendas" 
        actions={
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} /> Nova Venda
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Cliente</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Projeto</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Valor</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Data</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="pb-4 text-xs font-semibold text-slate-400 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sales.map((sale) => (
                <tr key={sale.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-800">{sale.customer}</td>
                  <td className="py-4 text-sm text-slate-600">{sale.projectType}</td>
                  <td className="py-4 text-sm font-semibold text-slate-800">R$ {sale.value.toLocaleString()}</td>
                  <td className="py-4 text-sm text-slate-500">{new Date(sale.date).toLocaleDateString('pt-BR')}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      sale.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 
                      sale.status === 'pending' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {sale.status === 'paid' ? 'Pago' : sale.status === 'pending' ? 'Pendente' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => handleEdit(sale)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Editar Venda"
                    >
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <FormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingSaleId ? "Editar Venda" : "Nova Venda"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
            <input 
              required
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Nome do cliente"
              value={formData.customer}
              onChange={e => setFormData({...formData, customer: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Projeto</label>
            <select 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={formData.projectType}
              onChange={e => setFormData({...formData, projectType: e.target.value})}
            >
              <option value="">Selecione...</option>
              <option value="Cozinha">Cozinha</option>
              <option value="Quarto">Quarto</option>
              <option value="Sala">Sala</option>
              <option value="Banheiro">Banheiro</option>
              <option value="Comercial">Comercial</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
              <input 
                required
                type="number"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="0.00"
                value={formData.value}
                onChange={e => setFormData({...formData, value: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="pending">Pendente</option>
                <option value="paid">Pago</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all mt-4">
            {editingSaleId ? "Atualizar Venda" : "Salvar Venda"}
          </button>
        </form>
      </FormModal>
    </div>
  );
};

export default SalesView;
