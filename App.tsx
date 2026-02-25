
import React, { useState } from 'react';
import Layout from './components/Layout';
import Overview from './views/Overview';
import PipelineView from './views/PipelineView';
import AgendaView from './views/AgendaView';
import SalesView from './views/SalesView';
import ProjectsView from './views/ProjectsView';
import StockView from './views/StockView';
import DocumentsView from './views/DocumentsView';
import CashFlowView from './views/CashFlowView';
import SuppliersView from './views/SuppliersView';
import ProductionView from './views/ProductionView';
import CorteView from './views/CorteView';
import WebsiteView from './views/WebsiteView';
import LoginView from './views/LoginView';
import PlaceholderView from './views/PlaceholderView';
import BriefingModal from './components/BriefingModal';
import QuoteModal from './components/QuoteModal';
import { useStore } from './store';
import { ViewType, Lead } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [selectedLeadForBriefing, setSelectedLeadForBriefing] = useState<Lead | null>(null);
  const [selectedLeadForQuote, setSelectedLeadForQuote] = useState<Lead | null>(null);
  const store = useStore();

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <Overview sales={store.sales} projects={store.projects} transactions={store.transactions} />;
      case 'pipeline':
        return (
          <PipelineView 
            leads={store.leads} 
            onUpdateStage={store.updateLeadStage} 
            onUpdateLead={store.updateLead}
            onAddLead={store.addLead}
            onOpenBriefing={setSelectedLeadForBriefing}
            onOpenQuote={setSelectedLeadForQuote}
            onQuickSchedule={(lead) => {
              store.addAgendaEvent({
                title: `Visita Técnica - ${lead.name}`,
                type: 'visita',
                date: new Date().toISOString().split('T')[0],
                time: '14:00',
                description: `Visita agendada via Vaio para o lead ${lead.name}.`,
                leadId: lead.id
              });
              setActiveView('agenda');
            }}
          />
        );
      case 'agenda':
        return (
          <AgendaView 
            events={store.agenda} 
            onAddEvent={store.addAgendaEvent} 
            onToggleEvent={store.toggleAgendaEvent} 
          />
        );
      case 'vendas':
        return <SalesView 
          sales={store.sales} 
          onAddSale={store.addSale} 
          onUpdateSale={store.updateSale}
        />;
      case 'projetos':
        return <ProjectsView 
          projects={store.projects} 
          onUpdateStatus={store.updateProjectStatus} 
          onUpdateProject={store.updateProject}
        />;
      case 'estoque':
        return <StockView materials={store.materials} onAddMaterial={store.addMaterial} />;
      case 'documentos':
        return (
          <DocumentsView 
            documents={store.documents}
            onAddDocument={store.addDocument}
            onUpdateDocument={store.updateDocument}
            onDeleteDocument={store.deleteDocument}
          />
        );
      case 'corte':
        return (
          <CorteView 
            services={store.cuttingServices}
            onAddService={store.addCuttingService}
            onUpdateService={store.updateCuttingService}
            onDeleteService={store.deleteCuttingService}
          />
        );
      case 'website':
        return <WebsiteView />;
      case 'lucro':
        const totalProfit = store.sales.reduce((acc, s) => acc + (s.value * 0.35), 0); // Margem de 35% simulada
        return <PlaceholderView 
          title="Lucro Estimado" 
          metrics={[
            { label: 'Lucro Total', value: totalProfit.toLocaleString(), prefix: 'R$', trend: 20 },
            { label: 'Margem Bruta', value: '38%', trend: 2 },
            { label: 'Projeção Anual', value: (totalProfit * 12).toLocaleString(), prefix: 'R$', trend: 10 }
          ]} 
        />;
      case 'caixa':
        return (
          <CashFlowView 
            transactions={store.transactions}
            onAddTransaction={store.addTransaction}
            onUpdateTransaction={store.updateTransaction}
            onDeleteTransaction={store.deleteTransaction}
          />
        );
      case 'producao':
        return (
          <ProductionView 
            projects={store.projects}
            production={store.production}
            onAddProductionEntry={store.addProductionEntry}
            onUpdateProjectProgress={store.updateProjectStatus}
          />
        );
      case 'montagem':
        return (
          <ProductionView 
            projects={store.projects}
            production={store.production}
            onAddProductionEntry={store.addProductionEntry}
            onUpdateProjectProgress={store.updateProjectStatus}
          />
        );
      case 'feedback':
        return <PlaceholderView 
          title="Feedback" 
          metrics={[
            { label: 'Satisfação Geral', value: '4.9/5' },
            { label: 'Novos Depoimentos', value: '14' },
            { label: 'Taxa de Reclamação', value: '0.5%', trend: -50 }
          ]} 
        />;
      case 'fornecedor':
        return (
          <SuppliersView 
            suppliers={store.suppliers}
            onAddSupplier={store.addSupplier}
            onUpdateSupplier={store.updateSupplier}
            onDeleteSupplier={store.deleteSupplier}
          />
        );
      default:
        return <Overview sales={store.sales} projects={store.projects} />;
    }
  };

  if (!user) {
    return <LoginView onLogin={setUser} />;
  }

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={setActiveView} 
      user={user} 
      onLogout={() => setUser(null)}
    >
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </div>

      {selectedLeadForBriefing && (
        <BriefingModal 
          lead={selectedLeadForBriefing} 
          onClose={() => setSelectedLeadForBriefing(null)} 
          onSave={(briefing, temperature) => {
            store.updateLead(selectedLeadForBriefing.id, { 
              briefing,
              temperature,
              contact: briefing.phone,
              name: briefing.clientName
            });
            setSelectedLeadForBriefing(null);
          }}
        />
      )}

      {selectedLeadForQuote && (
        <QuoteModal 
          lead={selectedLeadForQuote} 
          onClose={() => setSelectedLeadForQuote(null)} 
          onSave={(quote) => {
            store.updateLead(selectedLeadForQuote.id, { quote });
            setSelectedLeadForQuote(null);
          }}
        />
      )}
    </Layout>
  );
};

export default App;
