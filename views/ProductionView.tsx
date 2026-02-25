
import React, { useState, useMemo } from 'react';
import { 
  Factory, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Search, 
  History,
  TrendingUp,
  Layout,
  Hammer,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { Project, ProductionEntry } from '../types';

interface ProductionViewProps {
  projects: Project[];
  production: ProductionEntry[];
  onAddProductionEntry: (entry: Omit<ProductionEntry, 'id'>) => void;
  onUpdateProjectProgress: (id: string, status: Project['status'], progress: number) => void;
}

const ProductionView: React.FC<ProductionViewProps> = ({ 
  projects, 
  production, 
  onAddProductionEntry,
  onUpdateProjectProgress
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const [newEntry, setNewEntry] = useState<Omit<ProductionEntry, 'id'>>({
    carpenter: '',
    projectId: '',
    task: '',
    hoursSpent: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const activeProductionProjects = useMemo(() => {
    return projects.filter(p => p.status === 'production' || p.status === 'assembly');
  }, [projects]);

  const filteredProjects = activeProductionProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentEntries = useMemo(() => {
    return [...production].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  }, [production]);

  const handleLogProduction = () => {
    if (!newEntry.projectId || !newEntry.carpenter || !newEntry.task) return;
    
    onAddProductionEntry(newEntry);
    
    // Optional: Update progress automatically or manually? 
    // For now, let's just log.
    
    setIsLogModalOpen(false);
    setNewEntry({
      carpenter: '',
      projectId: '',
      task: '',
      hoursSpent: 0,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const getProjectTitle = (id: string) => {
    return projects.find(p => p.id === id)?.title || 'Projeto Desconhecido';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produção & Montagem</h1>
          <p className="text-slate-500">Acompanhe o status de fabricação e registre atividades</p>
        </div>
        <button 
          onClick={() => setIsLogModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">Registrar Atividade</span>
        </button>
      </div>

      {/* Production KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Factory size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Em Produção</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {projects.filter(p => p.status === 'production').length}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Layout size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Em Montagem</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {projects.filter(p => p.status === 'assembly').length}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Horas Logadas (Mês)</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {production.reduce((acc, curr) => acc + curr.hoursSpent, 0)}h
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Atrasados</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">0</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar projeto em produção..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${project.status === 'production' ? 'bg-blue-500' : 'bg-blue-500'}`}></span>
                      <h3 className="font-bold text-slate-900">{project.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500">Cliente: {project.customer}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prazo</span>
                    <p className="text-sm font-medium text-slate-700">{new Date(project.deadline).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>PROGRESSO</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${project.status === 'production' ? 'bg-blue-500' : 'bg-blue-500'}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex -space-x-2">
                    {[1, 2].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        M{i}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setNewEntry({...newEntry, projectId: project.id});
                        setIsLogModalOpen(true);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      LOGAR HORA
                    </button>
                    <select 
                      className="text-xs font-bold text-slate-600 bg-slate-50 border-none rounded-lg px-2 py-1.5 focus:ring-0 cursor-pointer"
                      value={project.status}
                      onChange={(e) => onUpdateProjectProgress(project.id, e.target.value as any, project.progress)}
                    >
                      <option value="production">Produção</option>
                      <option value="assembly">Montagem</option>
                      <option value="finished">Finalizado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500">Nenhum projeto ativo em produção.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <History size={18} className="text-slate-400" />
              <h2 className="font-bold text-slate-900">Atividade Recente</h2>
            </div>
            
            <div className="space-y-6">
              {recentEntries.map(entry => (
                <div key={entry.id} className="relative pl-6 border-l-2 border-slate-100 pb-1">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-slate-900">{entry.carpenter}</p>
                    <span className="text-[10px] text-slate-400">{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{entry.task}</p>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-blue-600">
                    <Clock size={10} />
                    {entry.hoursSpent}h em {getProjectTitle(entry.projectId)}
                  </div>
                </div>
              ))}

              {recentEntries.length === 0 && (
                <p className="text-sm text-slate-400 italic text-center">Nenhuma atividade registrada.</p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl shadow-slate-200">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Hammer size={18} className="text-blue-500" />
              Dica de Produção
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mantenha o registro de horas atualizado para calcular o custo real de mão de obra de cada projeto.
            </p>
          </div>
        </div>
      </div>

      {/* Log Activity Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Registrar Atividade</h2>
              <button onClick={() => setIsLogModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Projeto</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={newEntry.projectId}
                  onChange={e => setNewEntry({...newEntry, projectId: e.target.value})}
                >
                  <option value="">Selecionar projeto...</option>
                  {activeProductionProjects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Marceneiro / Responsável</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Nome do profissional"
                  value={newEntry.carpenter}
                  onChange={e => setNewEntry({...newEntry, carpenter: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Tarefa Realizada</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: Corte de chapas, Colagem de fita..."
                  value={newEntry.task}
                  onChange={e => setNewEntry({...newEntry, task: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Horas Gastas</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="0"
                    value={newEntry.hoursSpent || ''}
                    onChange={e => setNewEntry({...newEntry, hoursSpent: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Data</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={newEntry.date}
                    onChange={e => setNewEntry({...newEntry, date: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsLogModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleLogProduction}
                disabled={!newEntry.projectId || !newEntry.carpenter || !newEntry.task}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
              >
                Salvar Registro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionView;
