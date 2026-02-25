
import React, { useState } from 'react';
import { Lead, Briefing, BriefingItem } from '../types';
import { X, Plus, Trash2, Save, Flame, Thermometer } from 'lucide-react';

interface BriefingModalProps {
  lead: Lead;
  onClose: () => void;
  onSave: (briefing: Briefing, temperature?: 'hot' | 'warm' | 'cold') => void;
}

const BriefingModal: React.FC<BriefingModalProps> = ({ lead, onClose, onSave }) => {
  const [temperature, setTemperature] = useState<'hot' | 'warm' | 'cold' | undefined>(lead.temperature);
  const [briefing, setBriefing] = useState<Briefing>(lead.briefing || {
    clientName: lead.name,
    email: '',
    phone: lead.contact,
    address: '',
    propertyType: 'Apartamento',
    totalArea: 0,
    rooms: '',
    residents: '',
    style: '',
    hasProject: false,
    referencePhotos: [],
    spaceNeeds: '',
    notes: '',
    items: []
  });

  const addPhoto = () => {
    const url = prompt('Cole a URL da foto de referência:');
    if (url) {
      setBriefing({ ...briefing, referencePhotos: [...(briefing.referencePhotos || []), url] });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...(briefing.referencePhotos || [])];
    newPhotos.splice(index, 1);
    setBriefing({ ...briefing, referencePhotos: newPhotos });
  };

  const addItem = () => {
    const newItem: BriefingItem = {
      id: Math.random().toString(36).substr(2, 9),
      room: '',
      item: '',
      observations: ''
    };
    setBriefing({ ...briefing, items: [...briefing.items, newItem] });
  };

  const removeItem = (id: string) => {
    setBriefing({ ...briefing, items: briefing.items.filter(i => i.id !== id) });
  };

  const updateItem = (id: string, updates: Partial<BriefingItem>) => {
    setBriefing({
      ...briefing,
      items: briefing.items.map(i => i.id === id ? { ...i, ...updates } : i)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Planilha de Briefing</h2>
            <p className="text-sm text-slate-500">Cliente: {lead.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Pré-Qualificação */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Pré-Qualificação</h3>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Temperatura:</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setTemperature('hot')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all border ${temperature === 'hot' ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
                  >
                    <Flame size={12} /> QUENTE
                  </button>
                  <button 
                    onClick={() => setTemperature('warm')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all border ${temperature === 'warm' ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
                  >
                    <Thermometer size={12} /> MORNO
                  </button>
                  <button 
                    onClick={() => setTemperature('cold')}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all border ${temperature === 'cold' ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
                  >
                    <Thermometer size={12} className="rotate-180" /> FRIO
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nome do Cliente</label>
                <input 
                  className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                  value={briefing.clientName}
                  onChange={e => setBriefing({...briefing, clientName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">E-mail</label>
                <input 
                  className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                  value={briefing.email}
                  onChange={e => setBriefing({...briefing, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Telefone</label>
                <input 
                  className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                  value={briefing.phone}
                  onChange={e => setBriefing({...briefing, phone: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Endereço do Imóvel</label>
                <input 
                  className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                  value={briefing.address}
                  onChange={e => setBriefing({...briefing, address: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo do Imóvel</label>
                <input 
                  className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                  placeholder="Ex: Residencial - Apartamento"
                  value={briefing.propertyType}
                  onChange={e => setBriefing({...briefing, propertyType: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Detalhes do Projeto */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 border-b border-blue-100 pb-2">Detalhes do Projeto</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Metragem do Imóvel (m²)</label>
                <input 
                  type="number"
                  className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                  placeholder="Ex: 85"
                  value={briefing.totalArea || ''}
                  onChange={e => setBriefing({...briefing, totalArea: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Orçamento Estimado do Cliente</label>
                <div className="relative">
                  <span className="absolute left-0 top-1 text-slate-400 text-sm">R$</span>
                  <input 
                    type="number"
                    className="w-full border-b border-slate-200 py-1 pl-6 focus:border-blue-500 outline-none text-sm font-bold text-emerald-600"
                    placeholder="0,00"
                    value={briefing.budget || ''}
                    onChange={e => setBriefing({...briefing, budget: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Já possui projeto?</label>
                <div className="flex items-center gap-4 py-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="hasProject"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      checked={briefing.hasProject === true}
                      onChange={() => setBriefing({...briefing, hasProject: true})}
                    />
                    <span className="text-sm text-slate-600">Sim</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="hasProject"
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      checked={briefing.hasProject === false}
                      onChange={() => setBriefing({...briefing, hasProject: false})}
                    />
                    <span className="text-sm text-slate-600">Não</span>
                  </label>
                </div>
              </div>
              <div className="md:col-span-3 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Necessidade de Espaço / Funcionalidade</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 focus:border-blue-500 outline-none text-sm min-h-[80px] bg-slate-50/50"
                  placeholder="Descreva o que o cliente precisa em cada espaço..."
                  value={briefing.spaceNeeds || ''}
                  onChange={e => setBriefing({...briefing, spaceNeeds: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Fotos de Referência */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Fotos de Referência</h3>
              <button 
                onClick={addPhoto}
                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
              >
                <Plus size={14} /> Adicionar Foto
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {briefing.referencePhotos?.map((photo, index) => (
                <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img src={photo} alt={`Referência ${index + 1}`} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <button 
                onClick={addPhoto}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-slate-50/50"
              >
                <Plus size={24} />
                <span className="text-[10px] font-bold uppercase">Nova Foto</span>
              </button>
            </div>
          </section>

          {/* Referências */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 border-b border-blue-100 pb-2">Referências & Estilo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ambientes envolvidos</label>
                  <input 
                    className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                    placeholder="Cozinha, Sala de TV, Lavabo..."
                    value={briefing.rooms}
                    onChange={e => setBriefing({...briefing, rooms: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Quem mora / trabalha no ambiente?</label>
                  <input 
                    className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                    placeholder="Casal e 2 filhos..."
                    value={briefing.residents}
                    onChange={e => setBriefing({...briefing, residents: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Gostos e estilos</label>
                  <input 
                    className="w-full border-b border-slate-200 py-1 focus:border-blue-500 outline-none text-sm"
                    placeholder="Minimalista, Industrial, Clássico..."
                    value={briefing.style}
                    onChange={e => setBriefing({...briefing, style: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Medidas e Itens */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b border-blue-100 pb-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Itens & Medidas</h3>
              <button 
                onClick={addItem}
                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold"
              >
                <Plus size={14} /> Adicionar Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white text-[10px] uppercase tracking-wider">
                    <th className="p-3 text-left border border-slate-700">Ambiente / Móvel</th>
                    <th className="p-3 text-center border border-slate-700 w-20">Alt.</th>
                    <th className="p-3 text-center border border-slate-700 w-20">Larg.</th>
                    <th className="p-3 text-center border border-slate-700 w-20">Prof.</th>
                    <th className="p-3 text-left border border-slate-700">Detalhes / Observações</th>
                    <th className="p-3 text-center border border-slate-700 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {briefing.items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2 border border-slate-200">
                        <input 
                          className="w-full bg-transparent outline-none text-sm"
                          placeholder="Ex: Home - Painel"
                          value={item.room}
                          onChange={e => updateItem(item.id, { room: e.target.value })}
                        />
                      </td>
                      <td className="p-2 border border-slate-200">
                        <input 
                          type="number"
                          className="w-full bg-transparent outline-none text-sm text-center"
                          value={item.height || ''}
                          onChange={e => updateItem(item.id, { height: Number(e.target.value) })}
                        />
                      </td>
                      <td className="p-2 border border-slate-200">
                        <input 
                          type="number"
                          className="w-full bg-transparent outline-none text-sm text-center"
                          value={item.width || ''}
                          onChange={e => updateItem(item.id, { width: Number(e.target.value) })}
                        />
                      </td>
                      <td className="p-2 border border-slate-200">
                        <input 
                          type="number"
                          className="w-full bg-transparent outline-none text-sm text-center"
                          value={item.depth || ''}
                          onChange={e => updateItem(item.id, { depth: Number(e.target.value) })}
                        />
                      </td>
                      <td className="p-2 border border-slate-200">
                        <input 
                          className="w-full bg-transparent outline-none text-sm"
                          placeholder="..."
                          value={item.observations}
                          onChange={e => updateItem(item.id, { observations: e.target.value })}
                        />
                      </td>
                      <td className="p-2 border border-slate-200 text-center">
                        <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {briefing.items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 text-sm italic">
                        Nenhum item adicionado. Clique em "Adicionar Item" para começar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-white transition-all font-medium"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onSave(briefing, temperature)}
            className="px-8 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            <Save size={18} /> Salvar Briefing
          </button>
        </div>
      </div>
    </div>
  );
};

export default BriefingModal;
