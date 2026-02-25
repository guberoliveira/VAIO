
import React, { useState } from 'react';
import { 
  Scissors, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  ChevronRight, 
  Cloud, 
  Info, 
  Printer, 
  Check, 
  X,
  ArrowUpRight,
  Monitor,
  Layout as LayoutIcon,
  Maximize2,
  FileText,
  User,
  MapPin,
  Mail,
  Phone,
  Save,
  RotateCw,
  Trash,
  DollarSign,
  Box
} from 'lucide-react';
import { CuttingService, CuttingPiece } from '../types';

interface CorteViewProps {
  services: CuttingService[];
  onAddService: (service: Omit<CuttingService, 'id' | 'createdAt' | 'updatedAt' | 'serviceNumber'>) => CuttingService;
  onUpdateService: (id: string, updates: Partial<CuttingService>) => void;
  onDeleteService: (id: string) => void;
}

const CorteView: React.FC<CorteViewProps> = ({ services, onAddService, onUpdateService, onDeleteService }) => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedService, setSelectedService] = useState<CuttingService | null>(null);
  const [isNewServiceModalOpen, setIsNewServiceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'peças' | 'clientes' | 'chapas' | 'fitas' | 'componentes'>('peças');

  const mockChapas = [
    { id: '1', name: 'MDF 15 MM BRANCO MAX MATT 2 F EUCATEX ®', dim: '2750 X 1850', brand: 'EUCATEX', finish: 'MATT', color: 'BRANCO MAX' },
    { id: '2', name: 'MDF 18 MM GRAFITE MATT 2 F DURATEX ®', dim: '2750 X 1840', brand: 'DURATEX', finish: 'MATT', color: 'GRAFITE' },
    { id: '3', name: 'MDF 06 MM BRANCO TX 1 F ARAUCO ®', dim: '2750 X 1840', brand: 'ARAUCO', finish: 'TX', color: 'BRANCO' },
  ];

  const mockFitas = [
    { id: '1', name: 'FITA 0.4 X 22 MM BRANCO TEXTURIZADO MULTIMARCAS', width: '22 mm', brand: 'MULTIMARCAS', finish: 'TEXTURIZADO', color: 'BRANCO' },
    { id: '2', name: 'FITA 1.0 X 22 MM GRAFITE MATT PROADEC', width: '22 mm', brand: 'PROADEC', finish: 'MATT', color: 'GRAFITE' },
  ];

  const handleOpenDetail = (service: CuttingService) => {
    setSelectedService(service);
    setView('detail');
    setActiveTab('peças');
  };

  const handleCreateService = (modality: CuttingService['modality']) => {
    const newS = onAddService({
      clientName: '',
      modality,
      central: 'BBB Madeiras - Pirituba',
      status: 'draft',
      totalPrice: 0,
      pieces: []
    });
    setSelectedService(newS);
    setView('detail');
    setActiveTab('peças');
    setIsNewServiceModalOpen(false);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedService(null);
  };

  const getStatusBadge = (status: CuttingService['status']) => {
    switch (status) {
      case 'waiting_auth':
        return <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">Aguardando autorização</span>;
      case 'saved':
        return <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">Salvo</span>;
      case 'billed':
        return <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">Faturado</span>;
      case 'draft':
        return <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">Rascunho</span>;
      default:
        return null;
    }
  };

  if (view === 'detail' && selectedService) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Detail Header */}
        <div className="bg-[#2d4a63] text-white -mx-6 md:-mx-8 -mt-6 md:-mt-8 p-3 flex items-center justify-between shadow-md sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <button onClick={handleBackToList} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Cloud size={24} className="text-blue-300" />
              <span className="font-black tracking-tighter text-xl italic">CORTECLOUD</span>
            </div>
            <div className="h-6 w-px bg-white/20 mx-2 hidden md:block"></div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold">
              <button className="hover:text-blue-300 transition-colors flex items-center gap-2">
                <Monitor size={16} /> SERVIÇOS
              </button>
              <button className="hover:text-blue-300 transition-colors flex items-center gap-2">
                <MapPin size={16} /> CENTRAIS
              </button>
              <button className="hover:text-blue-300 transition-colors flex items-center gap-2">
                <Info size={16} /> AJUDA
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Marceneiro</p>
               <p className="text-sm font-bold">Guber Oliveira</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white/20 flex items-center justify-center text-sm font-black shadow-inner">
               GO
             </div>
          </div>
        </div>

        {/* Service Info Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800">Serviço <span className="text-slate-400">#{selectedService.serviceNumber}</span></h2>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase">Produzir</span>
               <input type="text" value="1" className="w-8 bg-white border border-slate-200 rounded px-1 py-0.5 text-center text-xs font-bold" readOnly />
               <span className="text-[10px] font-black text-slate-400 uppercase">vezes</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
             <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-xs font-bold uppercase">
               <FileText size={14} /> Markup <Info size={12} />
             </button>
             <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-xs font-bold uppercase">
               <LayoutIcon size={14} /> Sobras <ArrowUpRight size={12} />
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-bold shadow-lg shadow-emerald-100">
               <DollarSign size={16} /> Gerar orçamento
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 -mx-6 md:-mx-8 px-6 md:px-8 bg-white sticky top-[64px] z-10 overflow-x-auto no-scrollbar">
          <div className="flex min-w-max">
            {(['peças', 'clientes', 'chapas', 'fitas', 'componentes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'peças' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Lista de peças</h2>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Buscar peça" className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm w-full sm:w-48" />
                </div>
                <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option>ORDENAR</option>
                </select>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-xs font-bold uppercase shadow-sm">
                  Importar
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-xs font-bold uppercase shadow-sm">
                  Lista salva
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-bold uppercase shadow-lg shadow-blue-100">
                  <Plus size={16} /> Inserir peça
                </button>
              </div>
            </div>

            {/* Inserir Peça Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase text-center w-10">#</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase text-center w-16">Qtde</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase text-center w-24">C (mm)</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase text-center w-24">L (mm)</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase text-center w-16">Girar</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase">Chapa</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase">Fita</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase">Função da peça</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase">Cliente</th>
                      <th className="px-3 py-3 text-[10px] font-black text-slate-400 uppercase text-center w-16">Usinar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Active Input Row */}
                    <tr className="bg-red-50/50 border-b border-red-100">
                      <td className="px-3 py-2 text-center text-xs font-bold text-slate-400">1</td>
                      <td className="px-2 py-2">
                        <input type="text" value="1" className="w-full px-2 py-1.5 border border-slate-200 rounded text-center text-sm font-bold" />
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-1">
                          <input type="text" value="234" className="w-full px-2 py-1.5 border border-slate-200 rounded text-center text-sm font-bold" />
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="relative">
                          <input type="text" value="34" className="w-full px-2 py-1.5 border border-red-500 bg-white rounded text-center text-sm font-bold text-red-600" />
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                            L não pode ser menor que 40
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors mx-auto">
                          <RotateCw size={14} className="text-slate-400" />
                        </button>
                      </td>
                      <td className="px-2 py-2">
                        <div className="relative">
                          <input type="text" value="MDF BRANCO MAX 15 mm MATT EUCATE" className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs font-medium" />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <ArrowUpRight size={12} className="text-slate-400 rotate-90" />
                            <X size={12} className="text-slate-400" />
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="relative">
                          <div className="w-full px-3 py-1.5 border border-slate-200 rounded bg-white flex items-center justify-between">
                            <div className="flex gap-1">
                              <span className="text-[9px] font-black text-slate-300">C1</span>
                              <span className="text-[9px] font-black text-slate-300">C2</span>
                              <span className="text-[9px] font-black text-slate-300">L1</span>
                              <span className="text-[9px] font-black text-slate-300">L2</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ArrowUpRight size={12} className="text-slate-400 rotate-90" />
                              <X size={12} className="text-slate-400" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="relative">
                          <input type="text" placeholder="Ex: Lateral, Base, etc" className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                          <X size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="relative">
                          <input type="text" placeholder="Sem cliente" className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Monitor size={12} className="text-slate-400" />
                            <MoreVertical size={12} className="text-slate-400" />
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 mx-auto"></div>
                      </td>
                    </tr>
                    {/* Existing Pieces */}
                    {selectedService.pieces.map((piece, idx) => (
                      <tr key={piece.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-3 text-center text-xs font-bold text-slate-400">{idx + 2}</td>
                        <td className="px-3 py-3 text-center text-sm font-bold text-slate-700">{piece.quantity}</td>
                        <td className="px-3 py-3 text-center text-sm font-bold text-slate-700">{piece.length}</td>
                        <td className="px-3 py-3 text-center text-sm font-bold text-slate-700">{piece.width}</td>
                        <td className="px-3 py-3 text-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center mx-auto ${piece.rotate ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                            {piece.rotate && <Check size={12} />}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-xs text-slate-600 truncate max-w-[150px]">{piece.material}</td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1 justify-center">
                            {['C1', 'C2', 'L1', 'L2'].map((edge, i) => (
                              <div key={i} className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${Object.values(piece.edgeBanding)[i] ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
                                {edge}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-xs text-slate-600">{piece.description}</td>
                        <td className="px-3 py-3 text-xs text-slate-600">{piece.client || '-'}</td>
                        <td className="px-3 py-3 text-center">
                          <div className={`w-5 h-5 rounded-full border-2 mx-auto ${piece.machining ? 'border-blue-600 bg-blue-50' : 'border-slate-200'}`}></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center py-4">
               <button className="flex items-center gap-2 px-8 py-2.5 bg-white border border-blue-600 text-blue-600 rounded-xl font-black text-sm hover:bg-blue-50 transition-all shadow-sm uppercase tracking-wider">
                 <Plus size={18} /> Inserir peça
               </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
               <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1"><kbd className="bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-sm text-slate-600">CTRL</kbd> + <kbd className="bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-sm text-slate-600">D</kbd> <span>Duplicar peça</span></div>
                  <div className="flex items-center gap-1"><kbd className="bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-sm text-slate-600">CTRL</kbd> + <kbd className="bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-sm text-slate-600">ENTER</kbd> <span>Nova peça</span></div>
                  <div className="flex items-center gap-1"><kbd className="bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-sm text-slate-600">TAB</kbd> <span>Próximo campo</span></div>
                  <div className="flex items-center gap-1"><kbd className="bg-white border border-slate-300 px-1.5 py-0.5 rounded shadow-sm text-slate-600">ESC</kbd> <span>Cancelar</span></div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Gerenciar Clientes</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vincule peças a clientes e ambientes específicos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Nome do Cliente <Info size={12} /></label>
                <input type="text" placeholder="Ex: João Silva" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Ambiente <Info size={12} /></label>
                <input type="text" placeholder="Ex: Cozinha Planejada" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold" />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                Adicionar Cliente
              </button>
            </div>
            <div className="border-t border-slate-100 pt-6">
               <table className="w-full text-left">
                 <thead>
                   <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <th className="pb-4">#</th>
                     <th className="pb-4">Cliente</th>
                     <th className="pb-4">Ambiente</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-t border-slate-50">
                     <td colSpan={3} className="py-8 text-center text-slate-400 text-sm italic">Nenhum cliente adicionado</td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'chapas' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Tipo <Info size={12} /></label>
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold">
                  <option>MDF</option>
                  <option>MDP</option>
                  <option>HDF</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Espessura <Info size={12} /></label>
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold">
                  <option>15 mm</option>
                  <option>18 mm</option>
                  <option>06 mm</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Faces <Info size={12} /></label>
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold">
                  <option>2 Faces</option>
                  <option>1 Face</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Busca <Info size={12} /></label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Cor, marca..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div>
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Lista de chapas</h3>
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase">3 Encontradas</span>
                 </div>
                 <div className="border border-slate-200 rounded-xl overflow-hidden">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-slate-50 border-b border-slate-200">
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Cor</th>
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Acabamento</th>
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Marca</th>
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Dimensão</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       {mockChapas.map(chapa => (
                         <tr key={chapa.id} className="hover:bg-blue-50 transition-colors cursor-pointer group">
                           <td className="px-4 py-4 text-sm font-bold text-slate-700 group-hover:text-blue-600">{chapa.color}</td>
                           <td className="px-4 py-4 text-xs text-slate-500">{chapa.finish}</td>
                           <td className="px-4 py-4 text-xs text-slate-500">{chapa.brand}</td>
                           <td className="px-4 py-4 text-xs font-mono text-slate-400">{chapa.dim}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
               <div>
                 <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Chapas adicionadas no serviço</h3>
                 <div className="space-y-4">
                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center shadow-sm">
                       <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <p className="text-sm font-black text-slate-800">91870681 - MDF 15 MM BRANCO MAX MATT 2 F EUCATEX ®</p>
                          </div>
                          <p className="text-xs font-bold text-slate-400 ml-5">( 2750 X 1850 )</p>
                       </div>
                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consumo</p>
                             <p className="text-sm font-black text-blue-600">0,01 m²</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fração <Info size={10} className="inline" /></p>
                             <p className="text-xs font-bold text-slate-400">NÃO POSSUI</p>
                          </div>
                          <div className="flex items-center gap-1">
                             <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-lg border border-slate-200 shadow-sm"><RotateCw size={16} /></button>
                             <button className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white rounded-lg border border-slate-200 shadow-sm"><Trash size={16} /></button>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'fitas' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Espessura <Info size={12} /></label>
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold">
                  <option>0.4 mm</option>
                  <option>1.0 mm</option>
                  <option>2.0 mm</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Busca <Info size={12} /></label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Cor, marca..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Largura <Info size={12} /></label>
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold">
                  <option>22 mm</option>
                  <option>35 mm</option>
                  <option>64 mm</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div>
                 <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Lista de fitas</h3>
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full uppercase">2 Encontradas</span>
                 </div>
                 <div className="border border-slate-200 rounded-xl overflow-hidden">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-slate-50 border-b border-slate-200">
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Cor</th>
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Acabamento</th>
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Marca</th>
                         <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase">Largura</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       {mockFitas.map(fita => (
                         <tr key={fita.id} className="hover:bg-blue-50 transition-colors cursor-pointer group">
                           <td className="px-4 py-4 text-sm font-bold text-slate-700 group-hover:text-blue-600">{fita.color}</td>
                           <td className="px-4 py-4 text-xs text-slate-500">{fita.finish}</td>
                           <td className="px-4 py-4 text-xs text-slate-500">{fita.brand}</td>
                           <td className="px-4 py-4 text-xs font-mono text-slate-400">{fita.width}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
               <div>
                 <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Fitas adicionadas no serviço</h3>
                 <div className="space-y-4">
                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center shadow-sm">
                       <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <p className="text-sm font-black text-slate-800">FITA 0.4 X 22 MM BRANCO TEXTURIZADO MULTIMARCAS</p>
                          </div>
                          <p className="text-xs font-bold text-slate-400 ml-5">Largura: 22 mm</p>
                       </div>
                       <div className="flex items-center gap-8">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consumo</p>
                             <p className="text-sm font-black text-blue-600">12,4 m</p>
                          </div>
                          <div className="flex items-center gap-1">
                             <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-lg border border-slate-200 shadow-sm"><RotateCw size={16} /></button>
                             <button className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white rounded-lg border border-slate-200 shadow-sm"><Trash size={16} /></button>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'componentes' && (
          <div className="bg-white p-20 rounded-2xl shadow-sm border border-slate-200 text-center">
             <Box size={48} className="mx-auto text-slate-200 mb-4" />
             <h3 className="text-lg font-bold text-slate-800">Componentes</h3>
             <p className="text-slate-500">Nenhum componente disponível para este serviço.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meus serviços</h1>
          <p className="text-slate-500">Gerencie seus planos de corte e orçamentos</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            Formulário padrão
          </button>
          <button 
            onClick={() => setIsNewServiceModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold shadow-lg shadow-blue-100"
          >
            <Plus size={18} /> Novo serviço
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Busque pelo número do serviço, cliente, loja, alteração ou status" 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>Ordenar por</option>
            <option>Data (Mais recente)</option>
            <option>Data (Mais antigo)</option>
            <option>Valor (Maior)</option>
            <option>Valor (Menor)</option>
          </select>
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>Unir ou excluir</option>
          </select>
        </div>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Serviço <ChevronRight size={10} className="inline rotate-90" /></th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cliente <ChevronRight size={10} className="inline rotate-90" /></th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Modalidade <ChevronRight size={10} className="inline rotate-90" /></th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Central <ChevronRight size={10} className="inline rotate-90" /></th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services.map((service, idx) => (
                <tr key={service.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => handleOpenDetail(service)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{service.serviceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{service.clientName || 'Sem cliente'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-blue-600 hover:underline">
                      {service.modality === 'complete' ? 'Serviço completo' : service.modality === 'modules' ? 'Serviço com módulos' : 'TIRASfull'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{service.central}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {getStatusBadge(service.status)}
                      <span className="text-[10px] text-slate-400 mt-1 italic">{new Date(service.createdAt).toLocaleDateString('pt-BR')} {new Date(service.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Copiar"><FileText size={16} /></button>
                      <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Fixar"><Plus size={16} /></button>
                      <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Download"><ArrowUpRight size={16} className="rotate-90" /></button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteService(service.id);
                        }}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {services.length === 0 && (
          <div className="text-center py-20">
            <Cloud size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Nenhum serviço encontrado</h3>
            <p className="text-slate-500">Comece criando um novo serviço de corte.</p>
          </div>
        )}
      </div>

      {/* New Service Modal */}
      {isNewServiceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Novo serviço</h2>
              <button onClick={() => setIsNewServiceModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Option 1 */}
               <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 transition-all group cursor-pointer">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
                       <LayoutIcon size={64} className="text-blue-500" />
                    </div>
                    <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Recomendado</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Serviço com módulos</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">Projete com módulos prontos e lista automática de peças em um ambiente 3D.</p>
                  <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline mb-6">Saiba mais <ArrowUpRight size={14} /></button>
                  <button 
                    onClick={() => handleCreateService('modules')}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Criar serviço
                  </button>
               </div>

               {/* Option 2 */}
               <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 transition-all group cursor-pointer">
                  <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                     <Maximize2 size={64} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Serviço completo</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">Envie sua lista de peças com as medidas personalizadas.</p>
                  <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline mb-6">Saiba mais <ArrowUpRight size={14} /></button>
                  <button 
                    onClick={() => handleCreateService('complete')}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Criar serviço
                  </button>
               </div>

               {/* Option 3 */}
               <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 transition-all group cursor-pointer">
                  <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                     <Scissors size={64} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">TIRAS<span className="text-emerald-600">full</span>®</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">Produção de tiras para finalizar serviços na marcenaria.</p>
                  <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline mb-6">Saiba mais <ArrowUpRight size={14} /></button>
                  <button 
                    onClick={() => handleCreateService('tiras')}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Criar serviço
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorteView;
