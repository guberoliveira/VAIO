
import React, { useState } from 'react';
import { AgendaEvent } from '../types';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Circle, Plus, MapPin, FileText } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';

interface AgendaViewProps {
  events: AgendaEvent[];
  onAddEvent: (event: any) => void;
  onToggleEvent: (id: string) => void;
}

const AgendaView: React.FC<AgendaViewProps> = ({ events, onAddEvent, onToggleEvent }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'visita' as AgendaEvent['type'],
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(formData);
    setIsAdding(false);
    setFormData({ title: '', type: 'visita', date: new Date().toISOString().split('T')[0], time: '09:00', description: '' });
  };

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time || '00:00'}`);
    const dateB = new Date(`${b.date} ${b.time || '00:00'}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Agenda & Tarefas</h1>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Próximos Compromissos">
            <div className="space-y-4">
              {sortedEvents.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <CalendarIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Nenhum compromisso agendado</p>
                </div>
              ) : (
                sortedEvents.map(event => (
                  <div key={event.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${event.completed ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-blue-200 shadow-sm'}`}>
                    <button 
                      onClick={() => onToggleEvent(event.id)}
                      className={`mt-1 transition-colors ${event.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-blue-500'}`}
                    >
                      {event.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-bold ${event.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={12} /> {new Date(event.date).toLocaleDateString('pt-BR')}
                            </span>
                            {event.time && (
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {event.time}
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              event.type === 'visita' ? 'bg-blue-100 text-blue-700' :
                              event.type === 'tarefa' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-6">
          <DashboardCard title="Resumo Semanal">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 text-white rounded-lg"><MapPin size={16} /></div>
                  <span className="text-sm font-medium text-blue-900">Visitas Técnicas</span>
                </div>
                <span className="text-lg font-bold text-blue-900">{events.filter(e => e.type === 'visita' && !e.completed).length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 text-white rounded-lg"><CheckCircle2 size={16} /></div>
                  <span className="text-sm font-medium text-blue-900">Tarefas Pendentes</span>
                </div>
                <span className="text-lg font-bold text-blue-900">{events.filter(e => e.type === 'tarefa' && !e.completed).length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 text-white rounded-lg"><FileText size={16} /></div>
                  <span className="text-sm font-medium text-purple-900">Anotações</span>
                </div>
                <span className="text-lg font-bold text-purple-900">{events.filter(e => e.type === 'anotacao').length}</span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Novo Agendamento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                <input 
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Visita Técnica - Leonardo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                  >
                    <option value="visita">Visita</option>
                    <option value="tarefa">Tarefa</option>
                    <option value="anotacao">Anotação</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Horário (Opcional)</label>
                <input 
                  type="time"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <textarea 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Detalhes adicionais..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaView;
