import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
  Building,
  TrendingDown,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { AccountPayable, ExpenseCategory } from '../types';

export const AccountsPayableView: React.FC = () => {
  const { accountsPayable, tuitionInvoices, payroll, addAccountPayable, payAccountPayable } = useSchool();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    category: 'Material Pedagógico / Bíblico' as ExpenseCategory,
    supplier: '',
    amount: 1500,
    dueDate: new Date().toISOString().split('T')[0],
    invoiceNumber: ''
  });

  const filteredAccounts = accountsPayable.filter(a => {
    const matchesCategory = categoryFilter === 'ALL' || a.category === categoryFilter;
    const matchesSearch = 
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.invoiceNumber && a.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalAmount = accountsPayable.reduce((acc, a) => acc + a.amount, 0);
  const paidAmount = accountsPayable
    .filter(a => a.status === 'Pago')
    .reduce((acc, a) => acc + a.amount, 0);
  const pendingAmount = accountsPayable
    .filter(a => a.status === 'Pendente')
    .reduce((acc, a) => acc + a.amount, 0);

  // Simple DRE metrics
  const totalTuitionRevenue = tuitionInvoices
    .filter(i => i.status === 'Pago')
    .reduce((acc, i) => acc + (i.paidAmount || i.netAmountDue), 0);
  const totalPayrollCost = payroll.reduce((acc, p) => acc + p.netSalary, 0);
  const totalOperationalExpenses = paidAmount;
  const netInstitutionalResult = totalTuitionRevenue - (totalPayrollCost + totalOperationalExpenses);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccountPayable({
      description: formData.description,
      category: formData.category,
      supplier: formData.supplier,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      invoiceNumber: formData.invoiceNumber || undefined,
      status: 'Pendente'
    });
    setIsModalOpen(false);
    setFormData({
      description: '',
      category: 'Material Pedagógico / Bíblico',
      supplier: '',
      amount: 1500,
      dueDate: new Date().toISOString().split('T')[0],
      invoiceNumber: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase">
            <span>Total de Despesas Cadastradas</span>
            <Receipt className="w-4 h-4 text-gray-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-gray-900">
            R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-gray-500">
            {accountsPayable.length} títulos operacionais
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 uppercase">
            <span>Contas Liquidadas</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-800">
            R$ {paidAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            Pagamentos pontuais realizados
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700 uppercase">
            <span>A Pagar / Pendentes</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-800">
            R$ {pendingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-1 text-[11px] text-amber-700 font-medium">
            {accountsPayable.filter(a => a.status === 'Pendente').length} contas a vencer
          </div>
        </div>
      </div>

      {/* DRE Simplificado Card */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#FAF6EC] to-[#F5EED8] border border-[#E7D6A7] shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-[#E7D6A7]/60 pb-2">
          <div className="flex items-center gap-2 text-[#6D4F11] font-bold text-sm">
            <FileSpreadsheet className="w-4 h-4 text-[#8C6D23]" />
            <span>DRE Simplificado • Balanço Mensal Estimado</span>
          </div>
          <span className="text-xs font-semibold text-[#8C6D23]">Exercício 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/80 p-3 rounded-lg border border-[#E7D6A7]/40">
            <span className="text-gray-500 block text-[10px] uppercase font-bold">(+) Receitas Efetivas</span>
            <span className="text-base font-extrabold text-emerald-700">
              R$ {totalTuitionRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-[#E7D6A7]/40">
            <span className="text-gray-500 block text-[10px] uppercase font-bold">(-) Folha de Pessoal</span>
            <span className="text-base font-extrabold text-rose-700">
              R$ {totalPayrollCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-[#E7D6A7]/40">
            <span className="text-gray-500 block text-[10px] uppercase font-bold">(-) Despesas Fornecedores</span>
            <span className="text-base font-extrabold text-amber-700">
              R$ {totalOperationalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg border border-[#0D4B46]/30">
            <span className="text-gray-700 block text-[10px] uppercase font-bold">(=) Saldo Operacional</span>
            <span className={`text-base font-extrabold ${netInstitutionalResult >= 0 ? 'text-[#0D4B46]' : 'text-rose-700'}`}>
              R$ {netInstitutionalResult.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar despesa por descrição, fornecedor ou NF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0E4B47]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white focus:outline-hidden focus:border-[#0E4B47]"
          >
            <option value="ALL">Todas as Categorias ({accountsPayable.length})</option>
            <option value="Material Pedagógico / Bíblico">Material Pedagógico / Bíblico</option>
            <option value="Energia, Água & Conectividade">Energia & Conectividade</option>
            <option value="Manutenção & Infraestrutura">Manutenção & Obras</option>
            <option value="Tecnologia & Softwares">Tecnologia & Softwares</option>
          </select>
        </div>

        <button
          id="btn-add-expense"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Novo Lançamento de Conta
        </button>
      </div>

      {/* Payables Table */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 text-[11px] font-bold uppercase">
              <tr>
                <th className="py-3.5 px-4">Descrição da Despesa</th>
                <th className="py-3.5 px-4">Fornecedor / Credor</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">Vencimento</th>
                <th className="py-3.5 px-4">Valor</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAccounts.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{a.description}</div>
                    {a.invoiceNumber && (
                      <span className="text-[10px] text-gray-500 font-mono">Doc: {a.invoiceNumber}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">
                    {a.supplier}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#F0F5F4] text-[#0D4B46] font-medium border border-[#D5E5E3]">
                      {a.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    {new Date(a.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-sm text-gray-900">
                    R$ {a.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      a.status === 'Pago' ? 'bg-emerald-100 text-emerald-800' :
                      a.status === 'Atrasado' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {a.status}
                    </span>
                    {a.paymentDate && (
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        Liquidado em: {new Date(a.paymentDate).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {a.status !== 'Pago' ? (
                      <button
                        onClick={() => payAccountPayable(a.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-md transition-colors"
                      >
                        Liquidar
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Pago
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#0D4B46] flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#8C6D23]" />
                Novo Lançamento de Conta a Pagar
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Descrição do Gasto / Serviço *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Reforma do parquinho infantil"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Fornecedor / Prestador *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Madeira & Cia Ltda"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Categoria *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Material Pedagógico / Bíblico">Material Pedagógico / Bíblico</option>
                    <option value="Energia, Água & Conectividade">Energia & Conectividade</option>
                    <option value="Manutenção & Infraestrutura">Manutenção & Infraestrutura</option>
                    <option value="Tecnologia & Softwares">Tecnologia & Softwares</option>
                    <option value="Alimentação & Cantina">Alimentação & Cantina</option>
                    <option value="Tributos & Taxas">Tributos & Taxas</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Valor (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Data de Vencimento *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Nº da Nota Fiscal / Fatura</label>
                  <input
                    type="text"
                    placeholder="NF-12345"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold hover:bg-[#0a3834]"
                >
                  Registrar Despesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
