
export type ViewType = 
  | 'overview'
  | 'pipeline'
  | 'vendas' 
  | 'lucro' 
  | 'projetos' 
  | 'caixa' 
  | 'producao' 
  | 'estoque' 
  | 'montagem' 
  | 'feedback' 
  | 'fornecedor'
  | 'agenda'
  | 'documentos'
  | 'corte'
  | 'website';

export interface CuttingService {
  id: string;
  serviceNumber: string;
  clientName: string;
  modality: 'complete' | 'modules' | 'tiras';
  central: string;
  status: 'draft' | 'waiting_auth' | 'saved' | 'billed';
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  pieces: CuttingPiece[];
  hoursToProduce?: number;
  downPayment?: number;
  installments?: number;
  interest?: number;
  markup?: number;
  observations?: string;
}

export interface CuttingPiece {
  id: string;
  description: string;
  quantity: number;
  client?: string;
  material: string;
  length: number;
  width: number;
  rotate: boolean;
  edgeBanding: {
    c1: boolean;
    c2: boolean;
    l1: boolean;
    l2: boolean;
  };
  machining: boolean;
}

export type PipelineStage = 
  | 'lead' 
  | 'visita' 
  | 'orcamento' 
  | 'proposta' 
  | 'analise' 
  | 'aprovacao' 
  | 'venda' 
  | 'entrega' 
  | 'montagem';

export interface Briefing {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  totalArea: number;
  rooms: string;
  residents: string;
  style: string;
  hasProject: boolean;
  budget?: number;
  referencePhotos?: string[];
  spaceNeeds?: string;
  notes: string;
  items: BriefingItem[];
}

export interface BriefingItem {
  id: string;
  room: string;
  item: string;
  height?: number;
  width?: number;
  depth?: number;
  observations: string;
}

export interface Quote {
  id: string;
  leadId: string;
  preparedFor: string;
  address: string;
  date: string;
  validity: number; // days
  startDate: string;
  deliveryDate: string;
  preparedBy: string;
  description: string;
  totalValue: number;
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  stage: PipelineStage;
  createdAt: string;
  briefing?: Briefing;
  quote?: Quote;
  notes: string[];
  temperature?: 'hot' | 'warm' | 'cold';
  source?: string;
  interest?: string;
  assignee?: string;
  updatedAt?: string;
}

export interface AgendaEvent {
  id: string;
  title: string;
  type: 'visita' | 'tarefa' | 'anotacao';
  date: string;
  time?: string;
  description: string;
  leadId?: string;
  completed: boolean;
}

export interface Sale {
  id: string;
  customer: string;
  projectType: string;
  value: number;
  date: string;
  status: 'pending' | 'paid' | 'cancelled';
}

export interface Project {
  id: string;
  title: string;
  customer: string;
  progress: number;
  deadline: string;
  deliveryDate?: string; // Novo campo: Data de entrega real/prevista final
  status: 'budget' | 'production' | 'assembly' | 'finished';
  assignedTo?: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  price: number;
}

export interface ProductionEntry {
  id: string;
  carpenter: string;
  projectId: string;
  task: string;
  hoursSpent: number;
  date: string;
}

export interface KPI {
  label: string;
  value: string | number;
  trend?: number;
  prefix?: string;
}

export type DocumentType = 'contrato' | 'planilha' | 'orcamento' | 'recibo' | 'outro';

export interface AppDocument {
  id: string;
  title: string;
  type: DocumentType;
  content: string;
  createdAt: string;
  updatedAt: string;
  leadId?: string;
  projectId?: string;
  fileUrl?: string;
  status: 'draft' | 'final' | 'signed';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Supplier {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  category: string;
  address?: string;
  cnpj?: string;
  notes?: string;
  rating?: number;
}
