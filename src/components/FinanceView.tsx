import React, { useState } from 'react';
import {
  DollarSign,
  QrCode,
  Barcode,
  Printer,
  CheckCircle,
  Clock,
  AlertTriangle,
  Copy,
  Plus,
  Filter,
  Check,
  Search
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { TuitionInvoice } from '../types';

interface FinanceViewProps {
  onPrintInvoice: (invoice: TuitionInvoice) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ onPrintInvoice }) => {
  const { tuitionInvoices, markInvoicePaid, generateTuitionForMonth } = useSchool();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pago' | 'Pendente' | 'Atrasado'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<TuitionInvoice | null>(null);
  const [copiedPixId, setCopiedPixId] = useState<string | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const [genMonth, setGenMonth] = useState('Outubro / 2026');
  const [genDueDate, setGenDueDate] = useState('2026-10-10');

  const filteredInvoices = tuitionInvoices.filter(inv => {
    const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    const matchesSearch = 
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalBilled = tuitionInvoices.reduce((acc, i) => acc + i.netAmountDue, 0);
  const totalReceived = tuitionInvoices
    .filter(i => i.status === 'Pago')
    .reduce((acc, i) => acc + (i.paidAmount || i.netAmountDue), 0);
  const totalOverdue = tuitionInvoices
    .filter(i => i.status === 'Atrasado')
    .reduce((acc, i) => acc + i.netAmountDue, 0);

  const handleCopyPix = (invoice: TuitionInvoice) => {
    navigator.clipboard.writeText(invoice.pixQrCodePayload);
    setCopiedPixId(invoice.id);
    setTimeout(() => setCopiedPixId(null), 3000);
  };

  const handleGenerateInvoices = (e: React.FormEvent) => {
    e.preventDefault();
    generateTuitionForMonth(genMonth, genDueDate);
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase">
            <span>Faturamento Previsto</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-gray-900">
            R$ {totalBilled.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            Base: {tuitionInvoices.length} cobranças emitidas
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 uppercase">
            <span>Mensalidades Recebidas</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-800">
            R$ {totalReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            {totalBilled > 0 ? Math.round((totalReceived / totalBilled) * 100) : 0}% liquidado
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-700 uppercase">
            <span>Inadimplência / Atrasos</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-700">
            R$ {totalOverdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-rose-600 font-medium">
            {tuitionInvoices.filter(i => i.status === 'Atrasado').length} títulos vencidos
          </div>
        </div>
      </div>

      {/* Filter & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por aluno, responsável ou código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0E4B47]"
            />
          </div>

          <div className="flex items-center gap-1">
            {(['ALL', 'Pago', 'Pendente', 'Atrasado'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === st 
                    ? 'bg-[#0E4B47] text-[#FDF4D4]' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st === 'ALL' ? 'Todos' : st}
              </button>
            ))}
          </div>
        </div>

        <button
          id="btn-generate-invoices"
          onClick={() => setIsGenerateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Gerar Lote de Mensalidades
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 text-[11px] font-bold uppercase">
              <tr>
                <th className="py-3.5 px-4">Código / Referência</th>
                <th className="py-3.5 px-4">Aluno & Turma</th>
                <th className="py-3.5 px-4">Responsável Financeiro</th>
                <th className="py-3.5 px-4">Vencimento</th>
                <th className="py-3.5 px-4">Valor Líquido</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Ações de Cobrança</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-gray-900">{inv.code}</div>
                    <div className="text-[11px] text-gray-500">{inv.monthReference}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{inv.studentName}</div>
                    <div className="text-[11px] text-gray-500">{inv.className}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-gray-800">{inv.guardianName}</div>
                    <div className="text-[11px] text-gray-500">CPF: {inv.guardianCpf}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-gray-700">
                    {new Date(inv.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-sm text-[#0D4B46]">
                      R$ {inv.netAmountDue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    {inv.discountUntilDue > 0 && inv.status !== 'Pago' && (
                      <span className="text-[10px] text-emerald-700 block">
                        Desc. pontualidade: R$ {inv.discountUntilDue.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      inv.status === 'Pago' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      inv.status === 'Atrasado' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {inv.status}
                    </span>
                    {inv.paidDate && (
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {new Date(inv.paidDate).toLocaleDateString('pt-BR')} via {inv.paymentMethod}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {/* Copy PIX */}
                      <button
                        onClick={() => handleCopyPix(inv)}
                        title="Copiar Código PIX"
                        className="p-1.5 rounded-md hover:bg-gray-100 text-emerald-700"
                      >
                        {copiedPixId === inv.id ? <Check className="w-4 h-4 text-emerald-600" /> : <QrCode className="w-4 h-4" />}
                      </button>

                      {/* Print Boleto/Carnê */}
                      <button
                        onClick={() => onPrintInvoice(inv)}
                        title="Imprimir Carnê / Boleto Oficial"
                        className="p-1.5 rounded-md hover:bg-gray-100 text-[#0E4B47]"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {/* Baixa Manual */}
                      {inv.status !== 'Pago' && (
                        <button
                          onClick={() => markInvoicePaid(inv.id, 'PIX')}
                          className="px-2 py-1 bg-emerald-600 text-white font-bold text-[11px] rounded-md hover:bg-emerald-700 transition-colors"
                        >
                          Baixar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Batch Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-[#0D4B46] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#8C6D23]" />
              Gerar Lote de Mensalidades Escolares
            </h3>
            <p className="text-gray-600 leading-relaxed">
              O sistema irá gerar automaticamente os títulos de cobrança, código de barras e QR Codes PIX para todos os alunos ativos no sistema.
            </p>

            <form onSubmit={handleGenerateInvoices} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Mês de Referência *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Outubro / 2026"
                  value={genMonth}
                  onChange={(e) => setGenMonth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Data de Vencimento Padrão *</label>
                <input
                  type="date"
                  required
                  value={genDueDate}
                  onChange={(e) => setGenDueDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="p-3 bg-[#FAF6EC] rounded-lg border border-[#EAD08C]/70 text-[#6D4F11]">
                <span className="font-bold block">Desconto de Pontualidade Padrão</span>
                <span className="text-[11px]">5% de desconto automático para pagamentos realizados até a data de vencimento.</span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold hover:bg-[#0a3834]"
                >
                  Confirmar Emissão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
