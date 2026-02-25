
import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  ExternalLink,
  Building2,
  FileText
} from 'lucide-react';
import { Supplier } from '../types';

interface SuppliersViewProps {
  suppliers: Supplier[];
  onAddSupplier: (s: Omit<Supplier, 'id'>) => void;
  onUpdateSupplier: (id: string, updates: Partial<Supplier>) => void;
  onDeleteSupplier: (id: string) => void;
}

const SuppliersView: React.FC<SuppliersViewProps> = ({ 
  suppliers, 
  onAddSupplier, 
  onUpdateSupplier, 
  onDeleteSupplier 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const [newSupplier, setNewSupplier] = useState<Omit<Supplier, 'id'>>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    category: 'Chapas',
    address: '',
    cnpj: '',
    notes: '',
    rating: 5
  });

  const categories = useMemo(() => {
    const cats = new Set(suppliers.map(s => s.category));
    return ['all', ...Array.from(cats)];
  }, [suppliers]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           s.contactName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [suppliers, searchTerm, filterCategory]);

  const handleSave = () => {
    if (editingSupplier) {
      onUpdateSupplier(editingSupplier.id, newSupplier);
    } else {
      onAddSupplier(newSupplier);
    }
    setIsModalOpen(false);
    setEditingSupplier(null);
    setNewSupplier({
      name: '',
      contactName: '',
      email: '',
      phone: '',
      category: 'Chapas',
      address: '',
      cnpj: '',
      notes: '',
      rating: 5
    });
  };

  const handleEdit = (s: Supplier) => {
    setEditingSupplier(s);
    setNewSupplier({
      name: s.name,
      contactName: s.contactName || '',
      email: s.email || '',
      phone: s.phone || '',
      category: s.category,
      address: s.address || '',
      cnpj: s.cnpj || '',
      notes: s.notes || '',
      rating: s.rating || 5
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fornecedores</h1>
          <p className="text-slate-500">Gerencie seus parceiros e fornecedores de materiais</p>
        </div>
        <button 
          onClick={() => {
            setEditingSupplier(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">Novo Fornecedor</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou contato..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas as categorias' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 size={24} />
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < (s.rating || 0) ? 'fill-blue-400 text-blue-400' : 'text-slate-200'} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{s.name}</h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {s.category}
                </span>
              </div>

              <div className="space-y-3">
                {s.contactName && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Edit2 size={14} />
                    </div>
                    <span>{s.contactName}</span>
                  </div>
                )}
                {s.phone && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Phone size={14} />
                    </div>
                    <span>{s.phone}</span>
                  </div>
                )}
                {s.email && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Mail size={14} />
                    </div>
                    <span className="truncate">{s.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={() => handleEdit(s)}
                className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <Edit2 size={14} /> EDITAR
              </button>
              <button 
                onClick={() => onDeleteSupplier(s.id)}
                className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} /> EXCLUIR
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <Truck size={48} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">Nenhum fornecedor encontrado</h3>
          <p className="text-slate-500">Tente ajustar sua busca ou adicione um novo fornecedor.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Preencha as informações do seu parceiro comercial</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <Plus size={24} className="rotate-45 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome da Empresa *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Ex: Madeireira Silva"
                      value={newSupplier.name}
                      onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">CNPJ</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="00.000.000/0001-00"
                      value={newSupplier.cnpj}
                      onChange={e => setNewSupplier({...newSupplier, cnpj: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Categoria</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={newSupplier.category}
                    onChange={e => setNewSupplier({...newSupplier, category: e.target.value})}
                  >
                    <option value="Chapas">Chapas (MDF/MDP)</option>
                    <option value="Ferragens">Ferragens</option>
                    <option value="Tintas/Químicos">Tintas/Químicos</option>
                    <option value="Ferramentas">Ferramentas</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Avaliação</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star}
                        onClick={() => setNewSupplier({...newSupplier, rating: star})}
                        className={`p-1 rounded-md transition-colors ${star <= (newSupplier.rating || 0) ? 'text-blue-400' : 'text-slate-200'}`}
                      >
                        <Star size={24} fill={star <= (newSupplier.rating || 0) ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome do Contato</label>
                  <div className="relative">
                    <Edit2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      placeholder="Ex: Roberto Carlos"
                      value={newSupplier.contactName}
                      onChange={e => setNewSupplier({...newSupplier, contactName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      placeholder="(00) 00000-0000"
                      value={newSupplier.phone}
                      onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="email" 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      placeholder="email@fornecedor.com"
                      value={newSupplier.email}
                      onChange={e => setNewSupplier({...newSupplier, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Endereço</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
                    <textarea 
                      className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 h-20 resize-none"
                      placeholder="Rua, número, bairro, cidade..."
                      value={newSupplier.address}
                      onChange={e => setNewSupplier({...newSupplier, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Observações Internas</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-24 resize-none"
                  placeholder="Notas sobre prazos, qualidade, negociações..."
                  value={newSupplier.notes}
                  onChange={e => setNewSupplier({...newSupplier, notes: e.target.value})}
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={!newSupplier.name}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {editingSupplier ? 'Salvar Alterações' : 'Cadastrar Fornecedor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersView;
