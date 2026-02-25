
import { useState, useEffect } from 'react';
import { Sale, Project, Material, ProductionEntry, Lead, AgendaEvent, PipelineStage, AppDocument, Transaction, Supplier, CuttingService } from './types';

const STORAGE_KEY = 'woodmaster_data';

export const useStore = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [production, setProduction] = useState<ProductionEntry[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [agenda, setAgenda] = useState<AgendaEvent[]>([]);
  const [documents, setDocuments] = useState<AppDocument[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [cuttingServices, setCuttingServices] = useState<CuttingService[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setSales(data.sales || []);
      setProjects(data.projects || []);
      setMaterials(data.materials || []);
      setProduction(data.production || []);
      setLeads(data.leads || []);
      setAgenda(data.agenda || []);
      setDocuments(data.documents || []);
      setTransactions(data.transactions || []);
      setSuppliers(data.suppliers || []);
      setCuttingServices(data.cuttingServices || []);
    } else {
      // Seed initial data
      setSales([
        { id: '1', customer: 'Ricardo Silva', projectType: 'Cozinha', value: 15000, date: '2023-10-01', status: 'paid' },
        { id: '2', customer: 'Ana Paula', projectType: 'Quarto', value: 8500, date: '2023-10-05', status: 'pending' }
      ]);
      setProjects([
        { id: '1', title: 'Cozinha Planejada MDF', customer: 'Ricardo Silva', progress: 45, deadline: '2023-12-15', status: 'production' },
        { id: '2', title: 'Guarda-roupa Casal', customer: 'Ana Paula', progress: 10, deadline: '2024-01-10', status: 'budget' }
      ]);
      setMaterials([
        { id: '1', name: 'MDF Branco 18mm', category: 'Chapas', quantity: 15, unit: 'un', minQuantity: 5, price: 280 },
        { id: '2', name: 'Dobradiça Caneco 35mm', category: 'Ferragens', quantity: 120, unit: 'un', minQuantity: 50, price: 4.5 }
      ]);
      setTransactions([
        { id: 't1', description: 'Venda Cozinha - Ricardo', amount: 15000, type: 'income', category: 'Vendas', date: '2023-10-01', status: 'completed' },
        { id: 't2', description: 'Compra MDF', amount: 1400, type: 'expense', category: 'Materiais', date: '2023-10-02', status: 'completed' },
        { id: 't3', description: 'Pagamento Marceneiro', amount: 2500, type: 'expense', category: 'Mão de Obra', date: '2023-10-03', status: 'completed' }
      ]);
      setSuppliers([
        { id: 's1', name: 'Madeireira Central', category: 'Chapas', phone: '11 4444-5555', email: 'vendas@central.com', rating: 5 },
        { id: 's2', name: 'Ferragens & Cia', category: 'Ferragens', phone: '11 3333-2222', email: 'contato@ferragenscia.com', rating: 4 }
      ]);
      setDocuments([
        {
          id: 'd1',
          title: 'Contrato Padrão de Prestação de Serviços',
          type: 'contrato',
          content: 'Este contrato estabelece os termos...',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'draft'
        },
        {
          id: 'd2',
          title: 'Orçamento Detalhado - Ricardo Silva',
          type: 'orcamento',
          content: `ORÇAMENTO DE MÓVEIS PLANEJADOS\n\nCliente: Ricardo Silva\nData: 23/02/2026\n\nDESCRIÇÃO DOS ITENS:\n1. Cozinha Planejada MDF - R$ 15.000,00\n2. Ferragens e Acabamentos - Incluso\n\nTOTAL ESTIMADO: R$ 15.000,00\n\nValidade do orçamento: 15 dias.`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'final'
        }
      ]);
      setProduction([
        { id: 'p1', carpenter: 'João Silva', projectId: '1', task: 'Corte de chapas', hoursSpent: 4, date: '2023-10-10' },
        { id: 'p2', carpenter: 'João Silva', projectId: '1', task: 'Colagem de fita', hoursSpent: 2, date: '2023-10-11' }
      ]);
      setLeads([
        { 
          id: 'l1', 
          name: 'Gabriela', 
          contact: '11 99999-9999', 
          stage: 'lead', 
          createdAt: '2026-02-22T01:36:00', 
          notes: [],
          temperature: 'hot',
          source: 'WhatsApp',
          interest: 'REFORMA/CONCERTO',
          assignee: 'Vaio'
        },
        { 
          id: 'l2', 
          name: 'Elias marciano de Oli...', 
          contact: '11 98888-7777', 
          stage: 'lead', 
          createdAt: '2026-02-21T20:41:00', 
          updatedAt: '21/02/2026 às 21:28',
          notes: [],
          temperature: 'warm',
          source: 'WhatsApp',
          interest: 'NOVO PROJETO',
          assignee: 'Vaio'
        },
        { 
          id: 'l3', 
          name: 'Eduardo', 
          contact: '11 97777-6666', 
          stage: 'lead', 
          createdAt: '2026-02-21T11:02:00', 
          notes: [],
          temperature: 'hot',
          source: 'WhatsApp',
          interest: 'APTO COMPLETO',
          assignee: 'Vaio'
        }
      ]);
      setCuttingServices([
        {
          id: 'cs1',
          serviceNumber: '20033692',
          clientName: 'Guber Oliveira',
          modality: 'complete',
          central: 'BBB Madeiras - Pirituba',
          status: 'waiting_auth',
          createdAt: '2026-02-24T20:24:00',
          updatedAt: '2026-02-24T20:24:00',
          totalPrice: 380.60,
          pieces: [
            {
              id: 'p1',
              description: 'peça',
              quantity: 2,
              material: 'Mdf 15 Mm Branco Texturizado 2f Berneck ®',
              length: 850.0,
              width: 85.0,
              rotate: true,
              edgeBanding: { c1: true, c2: false, l1: false, l2: false },
              machining: false
            },
            {
              id: 'p2',
              description: 'peça',
              quantity: 4,
              material: 'Mdf 15 Mm Branco Texturizado 2f Berneck ®',
              length: 470.0,
              width: 85.0,
              rotate: true,
              edgeBanding: { c1: true, c2: false, l1: false, l2: false },
              machining: false
            }
          ]
        }
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ sales, projects, materials, production, leads, agenda, documents, transactions, suppliers, cuttingServices }));
    }
  }, [sales, projects, materials, production, leads, agenda, documents, transactions, suppliers, cuttingServices, isLoaded]);

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: Math.random().toString(36).substr(2, 9) };
    setSales([...sales, newSale]);
    
    // Auto-create transaction for cash flow
    addTransaction({
      description: `Venda: ${sale.projectType} - ${sale.customer}`,
      amount: sale.value,
      type: 'income',
      category: 'Vendas',
      date: sale.date,
      status: sale.status === 'paid' ? 'completed' : 'pending'
    });

    // Auto-create project and receipt if paid
    if (sale.status === 'paid') {
      addProject({
        title: `${sale.projectType} - ${sale.customer}`,
        customer: sale.customer,
        progress: 0,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'budget'
      });

      addDocument({
        title: `Recibo - ${sale.customer} - ${sale.projectType}`,
        type: 'recibo',
        content: `RECIBO DE PAGAMENTO\n\nRecebemos de ${sale.customer} a importância de R$ ${sale.value.toLocaleString()}, referente ao pagamento de ${sale.projectType}.\n\nPelo que firmamos o presente recibo.\n\nData: ${new Date().toLocaleDateString('pt-BR')}\n\n__________________________\nVAIO MARCENARIA`,
        status: 'final'
      });
    }
  };

  const updateSale = (id: string, updates: Partial<Sale>) => {
    const oldSale = sales.find(s => s.id === id);
    if (oldSale && updates.status === 'paid' && oldSale.status !== 'paid') {
      // Auto-create project
      addProject({
        title: `${oldSale.projectType} - ${oldSale.customer}`,
        customer: oldSale.customer,
        progress: 0,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'budget'
      });

      // Auto-create receipt
      addDocument({
        title: `Recibo - ${oldSale.customer} - ${oldSale.projectType}`,
        type: 'recibo',
        content: `RECIBO DE PAGAMENTO\n\nRecebemos de ${oldSale.customer} a importância de R$ ${oldSale.value.toLocaleString()}, referente ao pagamento de ${oldSale.projectType}.\n\nPelo que firmamos o presente recibo.\n\nData: ${new Date().toLocaleDateString('pt-BR')}\n\n__________________________\nVAIO MARCENARIA`,
        status: 'final'
      });

      // Update transaction status
      const transaction = transactions.find(t => t.description.includes(oldSale.customer) && t.description.includes(oldSale.projectType));
      if (transaction) {
        updateTransaction(transaction.id, { status: 'completed' });
      }
    }
    setSales(sales.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects([...projects, { ...project, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateProjectStatus = (id: string, status: Project['status'], progress: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status, progress } : p));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addMaterial = (material: Omit<Material, 'id'>) => {
    setMaterials([...materials, { ...material, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'notes'>) => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      notes: []
    };
    setLeads([...leads, newLead]);
  };

  const updateLeadStage = (id: string, stage: PipelineStage) => {
    setLeads(leads.map(l => l.id === id ? { ...l, stage } : l));
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(leads.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const addAgendaEvent = (event: Omit<AgendaEvent, 'id' | 'completed'>) => {
    const newEvent: AgendaEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      completed: false
    };
    setAgenda([...agenda, newEvent]);
  };

  const toggleAgendaEvent = (id: string) => {
    setAgenda(agenda.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const addDocument = (doc: Omit<AppDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDoc: AppDocument = {
      ...doc,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDocuments([...documents, newDoc]);
  };

  const updateDocument = (id: string, updates: Partial<AppDocument>) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d));
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Math.random().toString(36).substr(2, 9) };
    setTransactions([...transactions, newTransaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier = { ...supplier, id: Math.random().toString(36).substr(2, 9) };
    setSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(suppliers.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  const addProductionEntry = (entry: Omit<ProductionEntry, 'id'>) => {
    const newEntry = { ...entry, id: Math.random().toString(36).substr(2, 9) };
    setProduction([...production, newEntry]);
  };

  const addCuttingService = (service: Omit<CuttingService, 'id' | 'createdAt' | 'updatedAt' | 'serviceNumber'>) => {
    const newService: CuttingService = {
      ...service,
      id: Math.random().toString(36).substr(2, 9),
      serviceNumber: (20033692 + cuttingServices.length).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCuttingServices([...cuttingServices, newService]);
    return newService;
  };

  const updateCuttingService = (id: string, updates: Partial<CuttingService>) => {
    setCuttingServices(cuttingServices.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s));
  };

  const deleteCuttingService = (id: string) => {
    setCuttingServices(cuttingServices.filter(s => s.id !== id));
  };

  return {
    sales, projects, materials, production, leads, agenda, documents, transactions, suppliers, cuttingServices,
    addSale, updateSale, addProject, updateProjectStatus, updateProject, addMaterial,
    addLead, updateLeadStage, updateLead, addAgendaEvent, toggleAgendaEvent,
    addDocument, updateDocument, deleteDocument,
    addTransaction, updateTransaction, deleteTransaction,
    addSupplier, updateSupplier, deleteSupplier,
    addProductionEntry, addCuttingService, updateCuttingService, deleteCuttingService
  };
};
