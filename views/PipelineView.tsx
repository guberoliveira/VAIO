
import React, { useState } from 'react';
import { Lead, PipelineStage } from '../types';
import { 
  Plus, 
  MoreVertical, 
  Calendar, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  Search, 
  Filter, 
  Flame, 
  Thermometer, 
  Clock,
  LayoutGrid,
  List as ListIcon,
  Download,
  Users,
  MessageCircle,
  MapPin,
  DollarSign,
  ChevronDown,
  Info,
  History,
  UserPlus,
  Trash2,
  FileEdit,
  ExternalLink,
  CalendarDays
} from 'lucide-react';

interface PipelineViewProps {
  leads: Lead[];
  onUpdateStage: (id: string, stage: PipelineStage) => void;
  onUpdateLead: (id: string, updates: Partial<Lead>) => void;
  onAddLead: (lead: any) => void;
  onOpenBriefing: (lead: Lead) => void;
  onOpenQuote: (lead: Lead) => void;
  onQuickSchedule: (lead: Lead) => void;
}

const STAGES: { id: PipelineStage; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'lead', label: 'novos leads', icon: <Users size={20} />, color: 'text-rose-500 bg-rose-50' },
  { id: 'visita', label: 'em visita', icon: <MapPin size={20} />, color: 'text-blue-500 bg-blue-50' },
  { id: 'orcamento', label: 'em atendimento', icon: <MessageCircle size={20} />, color: 'text-blue-500 bg-blue-50' },
  { id: 'proposta', label: 'em proposta', icon: <DollarSign size={20} />, color: 'text-emerald-500 bg-emerald-50' },
  { id: 'aprovacao', label: 'em contrato', icon: <FileText size={20} />, color: 'text-blue-500 bg-blue-50' },
];

const PipelineView: React.FC<PipelineViewProps> = ({ leads, onUpdateStage, onUpdateLead, onAddLead, onOpenBriefing, onOpenQuote, onQuickSchedule }) => {
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
      setIsChangingStatus(false);
    };
    if (openMenuId) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLeadName.trim()) {
      onAddLead({ 
        name: newLeadName, 
        contact: '', 
        stage: 'lead',
        temperature: 'warm',
        source: 'WhatsApp',
        interest: 'NOVO PROJETO',
        assignee: 'Guber Oliveira'
      });
      setNewLeadName('');
      setIsAddingLead(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.contact && l.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (l.interest && l.interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Gestor de Leads</h1>
            <p className="text-sm text-slate-500">Acompanhe sua jornada de vendas em tempo real</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total em Negociação</p>
            <p className="text-3xl font-black text-indigo-600">R$ 0,00</p>
          </div>
          <button 
            onClick={() => setIsAddingLead(true)}
            className="bg-[#4c1d95] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3b0764] transition-all whitespace-nowrap shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            <Plus size={20} />
            Cadastrar novo lead
          </button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600" size={18} />
            <input 
              type="text"
              placeholder="Busque por código, nome ou contato"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-300 transition-all">
            Buscar
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-indigo-700 font-bold text-sm hover:underline">
            <Download size={18} /> Exportar
          </button>
          <button className="flex items-center gap-2 text-indigo-700 font-bold text-sm hover:underline">
            <Filter size={18} /> Filtrar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {STAGES.map((stage) => (
          <div key={stage.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className={`w-10 h-10 rounded-lg ${stage.color} flex items-center justify-center`}>
              {stage.icon}
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-slate-600">{leads.filter(l => l.stage === stage.id).length} {stage.label}</p>
              <p className="text-xl font-bold text-slate-900">0</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 w-12">
                  <div className="flex items-center justify-center w-10 h-8 border border-slate-200 rounded bg-slate-50 text-slate-400">
                    <ChevronDown size={16} />
                  </div>
                </th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">Status</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">Temp.</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">Cliente</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">Contato</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">MARCENEIRO</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">Interesse</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 flex items-center gap-1">
                  Origem <Info size={14} className="text-indigo-600" />
                </th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700">Data e hora</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-700 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  </td>
                  <td className="px-4 py-4">
                    <select 
                      value={lead.stage}
                      onChange={(e) => onUpdateStage(lead.id, e.target.value as PipelineStage)}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold border outline-none focus:ring-2 cursor-pointer uppercase transition-all appearance-none text-center min-w-[120px] ${
                        STAGES.find(s => s.id === lead.stage)?.color || 'bg-slate-50 text-slate-700 border-slate-100'
                      } ${
                        lead.stage === 'lead' ? 'border-rose-100 focus:ring-rose-200' :
                        lead.stage === 'visita' || lead.stage === 'orcamento' ? 'border-blue-100 focus:ring-blue-200' :
                        lead.stage === 'proposta' ? 'border-emerald-100 focus:ring-emerald-200' :
                        'border-blue-100 focus:ring-blue-200'
                      }`}
                    >
                      {STAGES.map(s => (
                        <option key={s.id} value={s.id} className="bg-white text-slate-700">
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-0.5 bg-slate-50 p-1 rounded-lg border border-slate-100 w-fit">
                      <button 
                        onClick={() => onUpdateLead(lead.id, { temperature: 'hot' })}
                        className={`p-1.5 rounded-md transition-all ${lead.temperature === 'hot' ? 'text-rose-600 bg-white shadow-sm border border-rose-100' : 'text-slate-400 hover:text-rose-500 hover:bg-white'}`}
                        title="Quente"
                      >
                        <Flame size={14} />
                      </button>
                      <button 
                        onClick={() => onUpdateLead(lead.id, { temperature: 'warm' })}
                        className={`p-1.5 rounded-md transition-all ${lead.temperature === 'warm' ? 'text-blue-600 bg-white shadow-sm border border-blue-100' : 'text-slate-400 hover:text-blue-500 hover:bg-white'}`}
                        title="Morno"
                      >
                        <Thermometer size={14} />
                      </button>
                      <button 
                        onClick={() => onUpdateLead(lead.id, { temperature: 'cold' })}
                        className={`p-1.5 rounded-md transition-all ${lead.temperature === 'cold' ? 'text-blue-600 bg-white shadow-sm border border-blue-100' : 'text-slate-400 hover:text-blue-500 hover:bg-white'}`}
                        title="Frio"
                      >
                        <Thermometer size={14} className="rotate-180" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{lead.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{lead.contact}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      {lead.assignee || 'Guber Oliveira'}
                      <Info size={14} className="text-slate-400" />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-800 uppercase">
                    {lead.interest || 'NOVO PROJETO'}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {lead.source || 'WhatsApp'}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500">
                    <div className="flex flex-col">
                      {lead.updatedAt && <span className="font-bold text-slate-700">Atualizado {lead.updatedAt}</span>}
                      <span>Recebido {new Date(lead.createdAt).toLocaleDateString('pt-BR')} às 10:00</span>
                    </div>
                  </td>
                  <td className={`px-4 py-4 text-right ${openMenuId === lead.id ? 'relative z-50' : ''}`}>
                    <div className="flex items-center justify-end gap-1">
                      {/* Quick Actions */}
                      <div className="flex items-center gap-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onOpenBriefing(lead)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                          title="Ver Briefing"
                        >
                          <FileText size={18} />
                        </button>
                        <button 
                          onClick={() => onQuickSchedule(lead)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                          title="Agendar Atividade"
                        >
                          <CalendarDays size={18} />
                        </button>
                        <button 
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" 
                          title="WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </button>
                      </div>
                      
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const newId = openMenuId === lead.id ? null : lead.id;
                            setOpenMenuId(newId);
                            if (newId === null) setIsChangingStatus(false);
                          }}
                          className={`p-2 rounded-lg transition-all ${openMenuId === lead.id ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                        >
                          <MoreVertical size={20} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openMenuId === lead.id && (
                          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-slate-100 py-2 z-[100] animate-in fade-in zoom-in-95 duration-200 text-left overflow-hidden">
                            {!isChangingStatus ? (
                              <div className="flex flex-col">
                                <div className="px-4 py-2 mb-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ações Rápidas</p>
                                </div>
                                <button 
                                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsChangingStatus(true);
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100">
                                      <Clock size={16} />
                                    </div>
                                    <span className="font-medium">Mudar status</span>
                                  </div>
                                  <ChevronRight size={16} className="text-slate-300" />
                                </button>
                                
                                <button 
                                  onClick={() => {
                                    onOpenBriefing(lead);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100">
                                      <FileEdit size={16} />
                                    </div>
                                    <span className="font-medium">Detalhes do lead</span>
                                  </div>
                                </button>

                                <button 
                                  onClick={() => {
                                    onQuickSchedule(lead);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100">
                                      <Calendar size={16} />
                                    </div>
                                    <span className="font-medium">Adicionar atividade</span>
                                  </div>
                                </button>

                                <button 
                                  className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-slate-100">
                                      <History size={16} />
                                    </div>
                                    <span className="font-medium">Histórico de atendimento</span>
                                  </div>
                                </button>

                                <div className="h-px bg-slate-100 my-2 mx-4"></div>
                                
                                <button 
                                  className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-slate-100">
                                      <UserPlus size={16} />
                                    </div>
                                    <span className="font-medium">Transferir lead</span>
                                  </div>
                                </button>

                                <button 
                                  className="w-full flex items-center px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors group"
                                  onClick={() => setOpenMenuId(null)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100">
                                      <Trash2 size={16} />
                                    </div>
                                    <span className="font-medium">Excluir lead</span>
                                  </div>
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="px-4 py-3 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsChangingStatus(false);
                                    }}
                                    className="p-1.5 hover:bg-white rounded-lg text-slate-400 shadow-sm transition-all"
                                  >
                                    <ChevronRight size={16} className="rotate-180" />
                                  </button>
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alterar Status</span>
                                </div>
                                <div className="max-h-72 overflow-y-auto py-1">
                                  {STAGES.map(s => (
                                    <button
                                      key={s.id}
                                      onClick={() => {
                                        onUpdateStage(lead.id, s.id);
                                        setOpenMenuId(null);
                                        setIsChangingStatus(false);
                                      }}
                                      className={`w-full text-left px-6 py-3 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${lead.stage === s.id ? 'text-indigo-600 font-bold bg-indigo-50/30' : 'text-slate-600'}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${s.color.split(' ')[0].replace('text-', 'bg-')}`} />
                                        <span>{s.label}</span>
                                      </div>
                                      {lead.stage === s.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingLead && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Novo Lead</h2>
            <form onSubmit={handleAddLead} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nome do Cliente</label>
                <input 
                  autoFocus
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={newLeadName}
                  onChange={e => setNewLeadName(e.target.value)}
                  placeholder="Ex: Leonardo e Jessica"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingLead(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#4c1d95] text-white rounded-xl hover:bg-[#3b0764] font-bold shadow-lg shadow-indigo-200"
                >
                  Criar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineView;
