
import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import MetricCard from '../components/MetricCard';
import FormModal from '../components/FormModal';
import { Project } from '../types';
import { Briefcase, Clock, CheckCircle, Calendar, Edit3, Trash2 } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onUpdateStatus: (id: string, status: Project['status'], progress: number) => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, onUpdateStatus, onUpdateProject }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'budget': return 'bg-slate-100 text-slate-600';
      case 'production': return 'bg-blue-100 text-blue-700';
      case 'assembly': return 'bg-blue-100 text-blue-700';
      case 'finished': return 'bg-emerald-100 text-emerald-700';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'budget': return 'Orçamento';
      case 'production': return 'Produção';
      case 'assembly': return 'Montagem';
      case 'finished': return 'Finalizado';
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      onUpdateProject(editingProject.id, {
        deliveryDate: editingProject.deliveryDate,
        deadline: editingProject.deadline,
        title: editingProject.title
      });
      setEditingProject(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard label="Em Aberto" value={projects.filter(p => p.status === 'budget').length} icon={<Clock size={18} />} />
        <MetricCard label="Em Produção" value={projects.filter(p => p.status === 'production').length} icon={<Briefcase size={18} />} />
        <MetricCard label="Em Montagem" value={projects.filter(p => p.status === 'assembly').length} icon={<Briefcase size={18} />} />
        <MetricCard label="Concluídos" value={projects.filter(p => p.status === 'finished').length} icon={<CheckCircle size={18} />} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DashboardCard title="Painel de Projetos Ativos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-slate-100 rounded-xl p-5 hover:border-blue-200 transition-all bg-slate-50/30 group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">{project.title}</h4>
                    <p className="text-xs text-slate-400">{project.customer}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(project.status)}`}>
                      {getStatusLabel(project.status)}
                    </span>
                    <button 
                      onClick={() => setEditingProject(project)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 transition-opacity"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progresso</span>
                    <span className="font-semibold text-slate-700">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-1000" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Calendar size={12} />
                    <span>Prazo: <span className="font-medium text-slate-600">{new Date(project.deadline).toLocaleDateString('pt-BR')}</span></span>
                  </div>
                  {project.deliveryDate && (
                    <div className="flex items-center gap-2 text-[10px] text-emerald-600">
                      <CheckCircle size={12} />
                      <span>Entrega: <span className="font-bold">{new Date(project.deliveryDate).toLocaleDateString('pt-BR')}</span></span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div className="flex gap-2 w-full">
                    {project.status === 'budget' && (
                      <button 
                        onClick={() => onUpdateStatus(project.id, 'production', 10)}
                        className="w-full text-[10px] bg-blue-600 text-white px-2 py-1.5 rounded-lg hover:bg-blue-700 font-bold transition-colors"
                      >
                        Iniciar Produção
                      </button>
                    )}
                    {project.status === 'production' && project.progress < 100 && (
                      <button 
                        onClick={() => onUpdateStatus(project.id, 'production', Math.min(100, project.progress + 20))}
                        className="w-full text-[10px] bg-slate-800 text-white px-2 py-1.5 rounded-lg hover:bg-black font-bold transition-colors"
                      >
                        Avançar +20%
                      </button>
                    )}
                    {project.status === 'production' && project.progress === 100 && (
                      <button 
                        onClick={() => onUpdateStatus(project.id, 'assembly', 0)}
                        className="w-full text-[10px] bg-blue-600 text-white px-2 py-1.5 rounded-lg hover:bg-blue-700 font-bold transition-colors"
                      >
                        Enviar p/ Montagem
                      </button>
                    )}
                    {project.status === 'assembly' && project.progress < 100 && (
                      <button 
                        onClick={() => onUpdateStatus(project.id, 'assembly', Math.min(100, project.progress + 25))}
                        className="w-full text-[10px] bg-blue-800 text-white px-2 py-1.5 rounded-lg hover:bg-blue-900 font-bold transition-colors"
                      >
                        Avançar Montagem
                      </button>
                    )}
                    {project.status === 'assembly' && project.progress === 100 && (
                      <button 
                        onClick={() => {
                          onUpdateStatus(project.id, 'finished', 100);
                          onUpdateProject(project.id, { deliveryDate: new Date().toISOString().split('T')[0] });
                        }}
                        className="w-full text-[10px] bg-emerald-600 text-white px-2 py-1.5 rounded-lg hover:bg-emerald-700 font-bold transition-colors"
                      >
                        Finalizar e Entregar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <FormModal isOpen={!!editingProject} onClose={() => setEditingProject(null)} title="Editar Detalhes do Projeto">
        {editingProject && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título do Projeto</label>
              <input 
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                value={editingProject.title}
                onChange={e => setEditingProject({...editingProject, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Prazo de Entrega</label>
                <input 
                  type="date"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  value={editingProject.deadline}
                  onChange={e => setEditingProject({...editingProject, deadline: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Entrega Real</label>
                <input 
                  type="date"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  value={editingProject.deliveryDate || ''}
                  onChange={e => setEditingProject({...editingProject, deliveryDate: e.target.value})}
                />
                {editingProject.deliveryDate && (
                  <button 
                    type="button"
                    onClick={() => setEditingProject({...editingProject, deliveryDate: undefined})}
                    className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 size={10} /> Limpar data
                  </button>
                )}
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg mt-4 transition-all hover:bg-blue-700">
              Salvar Alterações
            </button>
          </form>
        )}
      </FormModal>
    </div>
  );
};

export default ProjectsView;
