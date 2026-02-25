
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  FileSpreadsheet, 
  FileCheck, 
  Receipt, 
  MoreVertical, 
  Download, 
  Edit2, 
  Trash2, 
  Upload,
  Filter,
  ExternalLink,
  Eye,
  Type as TypeIcon,
  Copy,
  Check
} from 'lucide-react';
import { AppDocument, DocumentType } from '../types';

interface DocumentsViewProps {
  documents: AppDocument[];
  onAddDocument: (doc: Omit<AppDocument, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateDocument: (id: string, updates: Partial<AppDocument>) => void;
  onDeleteDocument: (id: string) => void;
}

const TEMPLATES = {
  contrato: {
    title: 'Contrato de Prestação de Serviços de Marcenaria',
    content: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATANTE: {{CLIENTE}}
CONTRATADO: VAIO MARCENARIA

1. OBJETO DO CONTRATO
O presente contrato tem como objeto a fabricação e instalação de móveis planejados conforme projeto anexo.

2. VALOR E FORMA DE PAGAMENTO
O valor total dos serviços é de R$ {{VALOR}}, a ser pago da seguinte forma:
{{PAGAMENTO}}

3. PRAZO DE ENTREGA
A entrega e montagem serão realizadas em até {{PRAZO}} dias úteis após a aprovação final do projeto.

4. GARANTIA
O CONTRATADO oferece garantia de 1 ano contra defeitos de fabricação.

Data: {{DATA}}

__________________________
Assinatura`
  },
  recibo: {
    title: 'Recibo de Pagamento',
    content: `RECIBO DE PAGAMENTO

Recebemos de {{CLIENTE}} a importância de R$ {{VALOR}} ({{VALOR_EXTENSO}}), referente ao pagamento de {{REFERENCIA}}.

Pelo que firmamos o presente recibo.

Data: {{DATA}}

__________________________
VAIO MARCENARIA`
  },
  orcamento: {
    title: 'Orçamento Detalhado',
    content: `ORÇAMENTO DE MÓVEIS PLANEJADOS

Cliente: {{CLIENTE}}
Data: {{DATA}}

DESCRIÇÃO DOS ITENS:
1. {{ITEM_1}} - R$ {{VALOR_1}}
2. {{ITEM_2}} - R$ {{VALOR_2}}

TOTAL ESTIMADO: R$ {{VALOR_TOTAL}}

Validade do orçamento: 15 dias.`
  }
};

const DocumentsView: React.FC<DocumentsViewProps> = ({ 
  documents, 
  onAddDocument, 
  onUpdateDocument, 
  onDeleteDocument 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<DocumentType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<AppDocument | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newDoc, setNewDoc] = useState<Omit<AppDocument, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    type: 'contrato',
    content: '',
    status: 'draft'
  });

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: DocumentType) => {
    switch (type) {
      case 'contrato': return <FileCheck className="text-blue-500" size={20} />;
      case 'planilha': return <FileSpreadsheet className="text-emerald-500" size={20} />;
      case 'orcamento': return <FileText className="text-blue-500" size={20} />;
      case 'recibo': return <Receipt className="text-purple-500" size={20} />;
      default: return <FileText className="text-slate-500" size={20} />;
    }
  };

  const handleSave = () => {
    if (editingDoc) {
      onUpdateDocument(editingDoc.id, newDoc);
    } else {
      onAddDocument(newDoc);
    }
    setIsModalOpen(false);
    setEditingDoc(null);
    setIsPreviewMode(false);
    setNewDoc({ title: '', type: 'contrato', content: '', status: 'draft' });
  };

  const handleEdit = (doc: AppDocument) => {
    setEditingDoc(doc);
    setNewDoc({
      title: doc.title,
      type: doc.type,
      content: doc.content,
      status: doc.status
    });
    setIsModalOpen(true);
  };

  const handleApplyTemplate = (type: keyof typeof TEMPLATES) => {
    const template = TEMPLATES[type];
    if (template) {
      setNewDoc({
        ...newDoc,
        title: template.title,
        type: type as DocumentType,
        content: template.content
      });
    }
  };

  const handleCopyContent = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAddDocument({
        title: file.name,
        type: 'outro',
        content: `Arquivo importado: ${file.name}`,
        status: 'final',
        fileUrl: '#'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documentos</h1>
          <p className="text-slate-500">Gerencie contratos, orçamentos e recibos da sua marcenaria</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
            <Upload size={18} />
            <span className="text-sm font-medium">Importar</span>
            <input type="file" className="hidden" onChange={handleImport} />
          </label>
          <button 
            onClick={() => {
              setEditingDoc(null);
              setNewDoc({ title: '', type: 'contrato', content: '', status: 'draft' });
              setIsModalOpen(true);
              setIsPreviewMode(false);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Novo Documento</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar documentos..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterType}
            onChange={e => setFilterType(e.target.value as any)}
          >
            <option value="all">Todos os tipos</option>
            <option value="contrato">Contratos</option>
            <option value="planilha">Planilhas</option>
            <option value="orcamento">Orçamentos</option>
            <option value="recibo">Recibos</option>
            <option value="outro">Outros</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">
                {getIcon(doc.type)}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleCopyContent(doc.content, doc.id)}
                  className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500"
                  title="Copiar conteúdo"
                >
                  {copiedId === doc.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
                <button 
                  onClick={() => handleEdit(doc)}
                  className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500"
                  title="Editar"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-1.5 hover:bg-red-50 rounded-md text-red-500"
                  title="Excluir"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1 truncate">{doc.title}</h3>
            <div className="flex items-center justify-between mt-4">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                doc.status === 'signed' ? 'bg-emerald-100 text-emerald-700' :
                doc.status === 'final' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {doc.status}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Download size={12} />
                Baixar PDF
              </button>
              {doc.fileUrl && (
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600">
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <FileText size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">Nenhum documento encontrado</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">
            Comece criando um novo contrato ou importando arquivos existentes.
          </p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingDoc ? 'Editar Documento' : 'Novo Documento'}
                </h2>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setIsPreviewMode(false)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${!isPreviewMode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Edit2 size={14} /> Editor
                  </button>
                  <button 
                    onClick={() => setIsPreviewMode(true)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${isPreviewMode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Eye size={14} /> Visualizar
                  </button>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              {!isPreviewMode ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Título do Documento</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          placeholder="Ex: Contrato de Cozinha - João"
                          value={newDoc.title}
                          onChange={e => setNewDoc({...newDoc, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Tipo</label>
                        <select 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          value={newDoc.type}
                          onChange={e => setNewDoc({...newDoc, type: e.target.value as DocumentType})}
                        >
                          <option value="contrato">Contrato</option>
                          <option value="planilha">Planilha</option>
                          <option value="orcamento">Orçamento</option>
                          <option value="recibo">Recibo</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    {!editingDoc && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Modelos Rápidos</label>
                        <div className="flex flex-wrap gap-2">
                          <button 
                            onClick={() => handleApplyTemplate('contrato')}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors border border-blue-100"
                          >
                            Contrato Padrão
                          </button>
                          <button 
                            onClick={() => handleApplyTemplate('recibo')}
                            className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors border border-purple-100"
                          >
                            Recibo Simples
                          </button>
                          <button 
                            onClick={() => handleApplyTemplate('orcamento')}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors border border-blue-100"
                          >
                            Orçamento Base
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                      <div className="flex gap-2">
                        {(['draft', 'final', 'signed'] as const).map(status => (
                          <button
                            key={status}
                            onClick={() => setNewDoc({...newDoc, status})}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                              newDoc.status === status 
                                ? 'bg-blue-600 border-blue-600 text-white' 
                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                            }`}
                          >
                            {status === 'draft' ? 'Rascunho' : status === 'final' ? 'Finalizado' : 'Assinado'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-500 uppercase">Conteúdo do Documento</label>
                      <div className="text-[10px] text-slate-400 italic">Dica: Use {'{{VARIAVEL}}'} para campos dinâmicos</div>
                    </div>
                    <textarea 
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-96 resize-none font-mono text-sm leading-relaxed"
                      placeholder="Comece a escrever seu documento aqui..."
                      value={newDoc.content}
                      onChange={e => setNewDoc({...newDoc, content: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto bg-white p-12 rounded-xl border border-slate-200 shadow-lg min-h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <FileText size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">VAIO MARCENARIA</h2>
                        <p className="text-xs text-slate-500">Marcenaria de Alto Padrão</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">{newDoc.type}</p>
                      <p className="text-xs text-slate-400">Ref: {editingDoc?.id || 'NOVO'}</p>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <h1 className="text-2xl font-bold text-center mb-8">{newDoc.title}</h1>
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {newDoc.content || 'Nenhum conteúdo para visualizar.'}
                    </div>
                  </div>

                  <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-end">
                    <div className="text-xs text-slate-400">
                      Gerado em {new Date().toLocaleDateString('pt-BR')} via VAIO MARCENARIA
                    </div>
                    <div className="text-center">
                      <div className="w-48 h-px bg-slate-300 mb-2"></div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Assinatura do Responsável</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-4">
                {isPreviewMode && (
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
                    <Download size={16} /> Baixar PDF
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!newDoc.title}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                >
                  {editingDoc ? 'Salvar Alterações' : 'Criar Documento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsView;
