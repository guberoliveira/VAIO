
import React, { useState } from 'react';
import { Lead, Quote } from '../types';
import { X, Printer, Send, Save, FileText } from 'lucide-react';

interface QuoteModalProps {
  lead: Lead;
  onClose: () => void;
  onSave: (quote: Quote) => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ lead, onClose, onSave }) => {
  const generateInitialDescription = () => {
    if (!lead.briefing) return '';
    
    const b = lead.briefing;
    let desc = `Projeto para ${b.propertyType}.\n`;
    desc += `Ambientes: ${b.rooms}\n`;
    desc += `Estilo: ${b.style}\n\n`;
    
    if (b.items && b.items.length > 0) {
      desc += `Itens detalhados:\n`;
      b.items.forEach(item => {
        desc += `- ${item.room}: ${item.item} (${item.width || '?'}x${item.height || '?'}x${item.depth || '?'})\n`;
        if (item.observations) desc += `  Obs: ${item.observations}\n`;
      });
    }
    
    if (b.notes) {
      desc += `\nNotas adicionais: ${b.notes}`;
    }
    
    return desc;
  };

  const [quote, setQuote] = useState<Quote>(lead.quote || {
    id: Math.random().toString(36).substr(2, 9),
    leadId: lead.id,
    preparedFor: lead.briefing?.clientName || lead.name,
    address: lead.briefing?.address || '',
    date: new Date().toLocaleDateString('pt-BR'),
    validity: 30,
    startDate: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    preparedBy: 'Guber Oliveira',
    description: generateInitialDescription(),
    totalValue: lead.briefing?.budget || 0
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Gerador de Orçamento</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-inner font-serif">
            <div className="max-w-2xl mx-auto bg-white p-12 shadow-sm border border-slate-100 min-h-[600px] flex flex-col">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-2 inline-block">
                  ORÇAMENTO DE MARCENARIA
                </h1>
              </div>

              <div className="space-y-6 text-sm text-slate-800 leading-relaxed">
                <div>
                  <span className="font-bold">Orçamento elaborado para:</span>
                  <input 
                    className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none w-64"
                    value={quote.preparedFor}
                    onChange={e => setQuote({...quote, preparedFor: e.target.value})}
                  />
                </div>

                <div>
                  <span className="font-bold">Endereço:</span>
                  <input 
                    className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none w-full"
                    value={quote.address}
                    onChange={e => setQuote({...quote, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold">Data do orçamento:</span>
                    <input 
                      className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none w-32"
                      value={quote.date}
                      onChange={e => setQuote({...quote, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <span className="font-bold">Validade do orçamento:</span>
                    <input 
                      type="number"
                      className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none w-12 text-center"
                      value={quote.validity}
                      onChange={e => setQuote({...quote, validity: Number(e.target.value)})}
                    /> dias
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold">Data de início:</span>
                    <input 
                      type="date"
                      className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none"
                      value={quote.startDate}
                      onChange={e => setQuote({...quote, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <span className="font-bold">Data de entrega/conclusão:</span>
                    <input 
                      type="date"
                      className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none"
                      value={quote.deliveryDate}
                      onChange={e => setQuote({...quote, deliveryDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <span className="font-bold">Orçamento elaborado por:</span>
                  <input 
                    className="ml-2 border-b border-slate-200 focus:border-slate-900 outline-none w-64"
                    value={quote.preparedBy}
                    onChange={e => setQuote({...quote, preparedBy: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <span className="font-bold block mb-2">Descrição do projeto:</span>
                  <textarea 
                    className="w-full border border-slate-200 p-4 rounded-lg focus:border-slate-900 outline-none min-h-[200px] resize-none leading-relaxed"
                    placeholder="Descreva os detalhes do projeto, materiais, acabamentos..."
                    value={quote.description}
                    onChange={e => setQuote({...quote, description: e.target.value})}
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Valor Total do Investimento</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">R$</span>
                      <input 
                        type="number"
                        className="text-3xl font-bold text-slate-900 outline-none w-48 text-right"
                        value={quote.totalValue}
                        onChange={e => setQuote({...quote, totalValue: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex gap-2">
            <button className="p-3 text-slate-600 hover:bg-white border border-slate-200 rounded-xl transition-all" title="Imprimir">
              <Printer size={20} />
            </button>
            <button className="p-3 text-slate-600 hover:bg-white border border-slate-200 rounded-xl transition-all" title="Enviar por E-mail">
              <Send size={20} />
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-white transition-all font-medium"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onSave(quote)}
              className="px-8 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold flex items-center gap-2 shadow-lg shadow-indigo-200"
            >
              <Save size={18} /> Salvar Orçamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
