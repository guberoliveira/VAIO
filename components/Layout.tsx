
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { ViewType } from '../types';
import { Menu, X, Hammer, ChevronRight, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  user: { name: string; role: string };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (activeView === 'website') {
      setSidebarOpen(false);
    }
  }, [activeView]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 w-0 lg:w-20'
        } fixed lg:relative bg-[#0f172a] text-white transition-all duration-300 flex flex-col z-40 h-full overflow-hidden`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-700/50 shrink-0">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Hammer size={24} className="text-white" />
          </div>
          {(isSidebarOpen || !isSidebarOpen) && (
            <span className={`${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 pointer-events-none'} font-bold text-lg tracking-tight whitespace-nowrap transition-opacity duration-300`}>
              VAIO MARCENARIA
            </span>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}>
                {item.icon}
              </span>
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {isSidebarOpen && activeView === item.id && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
           <div className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg ${isSidebarOpen ? 'bg-slate-800' : ''}`}>
             <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                 {user.name.split(' ').map(n => n[0]).join('')}
               </div>
               {isSidebarOpen && (
                 <div className="overflow-hidden">
                   <p className="text-sm font-medium truncate">{user.name}</p>
                   <p className="text-xs text-slate-400 truncate">{user.role}</p>
                 </div>
               )}
             </div>
             {isSidebarOpen && (
               <button 
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
                title="Sair"
               >
                 <LogOut size={16} />
               </button>
             )}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Floating Toggle for Website View */}
        {activeView === 'website' && (
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="fixed top-6 left-6 z-[60] p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        {/* Mobile toggle / Header bar */}
        {activeView !== 'website' && (
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-xl font-semibold text-slate-800">
                {MENU_ITEMS.find(i => i.id === activeView)?.label || 'Painel'}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Status da Marcenaria</span>
                  <span className="text-sm font-medium text-emerald-600">Produção 100% Ativa</span>
               </div>
               <div className="w-px h-8 bg-slate-200 mx-2"></div>
               <div className="text-slate-500 text-sm font-medium">
                 {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
               </div>
            </div>
          </header>
        )}

        <div className={`flex-1 overflow-y-auto ${activeView === 'website' ? '' : 'p-6 md:p-8'}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
