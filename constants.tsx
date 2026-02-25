
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  ArrowRightLeft, 
  Factory, 
  Box, 
  Truck, 
  MessageSquare, 
  Users,
  Globe,
  Scissors
} from 'lucide-react';
import { ViewType } from './types';

export const MENU_ITEMS = [
  { id: 'overview' as ViewType, label: 'Visão Geral', icon: <LayoutDashboard size={20} /> },
  { id: 'pipeline' as ViewType, label: 'Vaio', icon: <ArrowRightLeft size={20} /> },
  { id: 'agenda' as ViewType, label: 'Agenda', icon: <Users size={20} /> },
  { id: 'vendas' as ViewType, label: 'Vendas', icon: <TrendingUp size={20} /> },
  { id: 'lucro' as ViewType, label: 'Lucro', icon: <DollarSign size={20} /> },
  { id: 'projetos' as ViewType, label: 'Projetos', icon: <Briefcase size={20} /> },
  { id: 'caixa' as ViewType, label: 'Fluxo de Caixa', icon: <ArrowRightLeft size={20} /> },
  { id: 'producao' as ViewType, label: 'Produção', icon: <Factory size={20} /> },
  { id: 'estoque' as ViewType, label: 'Estoque', icon: <Box size={20} /> },
  { id: 'montagem' as ViewType, label: 'Montagem', icon: <Truck size={20} /> },
  { id: 'documentos' as ViewType, label: 'Documentos', icon: <Briefcase size={20} /> },
  { id: 'corte' as ViewType, label: 'Corte', icon: <Scissors size={20} /> },
  { id: 'feedback' as ViewType, label: 'Feedback', icon: <MessageSquare size={20} /> },
  { id: 'fornecedor' as ViewType, label: 'Fornecedor', icon: <Users size={20} /> },
  { id: 'website' as ViewType, label: 'Site Premium', icon: <Globe size={20} /> },
];
