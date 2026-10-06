import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  UserCheck,
  Plus,
  Printer,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { ClockRecord, PayrollItem } from '../types';

interface HRViewProps {
  onPrintPayroll: (item: PayrollItem) => void;
}

export const HRView: React.FC<HRViewProps> = ({ onPrintPayroll }) => {
  const { staff, clockRecords, payroll, addClockRecord, updatePayrollStatus, generateMonthlyPayroll } = useSchool();

  const [activeSubTab, setActiveSubTab] = useState<'clock' | 'payroll'>('clock');
  const [isClockModalOpen, setIsClockModalOpen] = useState(false);

  // Clock Form State
  const [clockFormData, setClockFormData] = useState({
    staffId: staff[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    entry1: '07:30',
    exit1: '12:00',
    entry2: '13:00',
    exit2: '17:00'
  });

  const [payrollMonth, setPayrollMonth] = useState('09/2026');

  const handleSaveClock = (e: React.FormEvent) => {
    e.preventDefault();
    const st = staff.find(s => s.id === clockFormData.staffId);
    if (!st) return;

    // Calculate minutes
    const parseMins = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    const morningMins = Math.max(0, parseMins(clockFormData.exit1) - parseMins(clockFormData.entry1));
    const afternoonMins = Math.max(0, parseMins(clockFormData.exit2) - parseMins(clockFormData.entry2));
    const totalWorked = morningMins + afternoonMins;
    const expected = 480; // 8 hours standard
    const extra = Math.max(0, totalWorked - expected);
    const delay = Math.max(0, expected - totalWorked);

    let status: 'Normal' | 'Hora Extra' | 'Atraso' = 'Normal';
    if (extra > 15) status = 'Hora Extra';
    if (delay > 15) status = 'Atraso';

    addClockRecord({
      staffId: st.id,
      staffName: st.name,
      date: clockFormData.date,
      entry1: clockFormData.entry1,
      exit1: clockFormData.exit1,
      entry2: clockFormData.entry2,
      exit2: clockFormData.exit2,
      totalWorkedMinutes: totalWorked,
      expectedMinutes: expected,
      extraMinutes: extra,
      delayMinutes: delay,
      status
    });

    setIsClockModalOpen(false);
  };

  const handleGeneratePayroll = () => {
    if (window.confirm(`Deseja recalcular e gerar a folha de pagamento de ${payrollMonth} para todos os funcionários ativos?`)) {
      generateMonthlyPayroll(payrollMonth);
    }
  };

  const totalPayrollValue = payroll.reduce((acc, p) => acc + p.netSalary, 0);
  const paidPayrollValue = payroll
    .filter(p => p.paymentStatus === 'Pago')
    .reduce((acc, p) => acc + p.netSalary, 0);

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex bg-white p-1 rounded-xl border border-gray-200/90 shadow-xs max-w-md">
        <button
          onClick={() => setActiveSubTab('clock')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'clock'
              ? 'bg-[#0E4B47] text-[#FDF4D4] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Controle de Ponto Eletrônico</span>
        </button>
        <button
          onClick={() => setActiveSubTab('payroll')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'payroll'
              ? 'bg-[#0E4B47] text-[#FDF4D4] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Folha de Pagamento & Holerites</span>
        </button>
      </div>

      {/* VIEW 1: CLOCK RECORDS */}
      {activeSubTab === 'clock' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
            <div>
              <h3 className="font-bold text-[#0D4B46] text-sm">
                Registro de Batidas de Ponto do Colégio
              </h3>
              <p className="text-xs text-gray-500">
                Acompanhamento diário de pontualidade, horas trabalhadas e banco de horas
              </p>
            </div>

            <button
              id="btn-register-clock"
              onClick={() => setIsClockModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Lançar Batida de Ponto
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 text-[11px] font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Colaborador(a)</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4 text-center">Manhã (Entrada / Saída)</th>
                  <th className="py-3 px-4 text-center">Tarde (Retorno / Saída)</th>
                  <th className="py-3 px-4 text-center">Horas Trabalhadas</th>
                  <th className="py-3 px-4 text-right">Ocorrência</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clockRecords.map((rec) => {
                  const hours = Math.floor(rec.totalWorkedMinutes / 60);
                  const mins = rec.totalWorkedMinutes % 60;
                  return (
                    <tr key={rec.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {rec.staffName}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(rec.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-medium">
                        {rec.entry1} — {rec.exit1}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-medium">
                        {rec.entry2} — {rec.exit2}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-[#0D4B46]">
                        {hours}h {mins > 0 ? `${mins}m` : ''}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rec.status === 'Normal' ? 'bg-emerald-100 text-emerald-800' :
                          rec.status === 'Hora Extra' ? 'bg-blue-100 text-blue-800' :
                          rec.status === 'Atraso' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {rec.status}
                          {rec.extraMinutes > 0 && ` (+${rec.extraMinutes}m)`}
                          {rec.delayMinutes > 0 && ` (-${rec.delayMinutes}m)`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: PAYROLL */}
      {activeSubTab === 'payroll' && (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
              <span className="text-xs font-semibold text-gray-500 uppercase">Mês de Competência</span>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-lg font-bold text-[#0D4B46]">{payrollMonth}</span>
                <button
                  onClick={handleGeneratePayroll}
                  className="text-xs text-[#0E4B47] hover:underline font-bold"
                >
                  Recalcular Folha
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
              <span className="text-xs font-semibold text-gray-500 uppercase">Total Líquido da Folha</span>
              <div className="mt-1 text-xl font-extrabold text-gray-900">
                R$ {totalPayrollValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
              <span className="text-xs font-semibold text-gray-500 uppercase">Salários Quitados</span>
              <div className="mt-1 text-xl font-extrabold text-emerald-700">
                R$ {paidPayrollValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Payroll List */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-[#0D4B46] text-sm">
                Demonstrativo de Folha de Pagamento por Colaborador
              </h3>
              <span className="text-xs text-gray-500">
                {payroll.length} colaboradores listados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 text-[11px] font-bold uppercase">
                  <tr>
                    <th className="py-3 px-4">Colaborador / Cargo</th>
                    <th className="py-3 px-4">Salário Base</th>
                    <th className="py-3 px-4">Adicionais / Bônus</th>
                    <th className="py-3 px-4">Deduções (INSS/IRRF)</th>
                    <th className="py-3 px-4 font-extrabold">Salário Líquido</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payroll.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{p.staffName}</div>
                        <div className="text-[11px] text-gray-500">{p.role}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-700 font-medium">
                        R$ {p.baseSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                        + R$ {p.bonusAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        <span className="text-[10px] text-gray-500 block">{p.bonusDetails}</span>
                      </td>
                      <td className="py-3.5 px-4 text-rose-700 font-semibold">
                        - R$ {(p.inssDeduction + p.otherDeductions).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        <span className="text-[10px] text-gray-500 block">{p.deductionDetails}</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-sm text-[#0D4B46]">
                        R$ {p.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.paymentStatus === 'Pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {p.paymentStatus !== 'Pago' ? (
                            <button
                              onClick={() => updatePayrollStatus(p.id, 'Pago')}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded-md font-bold text-[11px] hover:bg-emerald-700"
                            >
                              Dar Baixa
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-700 font-medium">Pago</span>
                          )}

                          <button
                            onClick={() => onPrintPayroll(p)}
                            title="Imprimir Holerite Oficial"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-[#0E4B47]"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Clock Record Modal */}
      {isClockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200">
            <div className="p-4 bg-[#093633] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#F6E5B8]" />
                <h3 className="font-bold text-sm text-white">Lançar Registro de Ponto</h3>
              </div>
              <button onClick={() => setIsClockModalOpen(false)} className="text-emerald-200 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClock} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Colaborador(a) *</label>
                <select
                  value={clockFormData.staffId}
                  onChange={(e) => setClockFormData({ ...clockFormData, staffId: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                >
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Data *</label>
                <input
                  type="date"
                  required
                  value={clockFormData.date}
                  onChange={(e) => setClockFormData({ ...clockFormData, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Entrada Manhã</label>
                  <input
                    type="time"
                    required
                    value={clockFormData.entry1}
                    onChange={(e) => setClockFormData({ ...clockFormData, entry1: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Saída Almoço</label>
                  <input
                    type="time"
                    required
                    value={clockFormData.exit1}
                    onChange={(e) => setClockFormData({ ...clockFormData, exit1: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Retorno Tarde</label>
                  <input
                    type="time"
                    required
                    value={clockFormData.entry2}
                    onChange={(e) => setClockFormData({ ...clockFormData, entry2: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Saída Final</label>
                  <input
                    type="time"
                    required
                    value={clockFormData.exit2}
                    onChange={(e) => setClockFormData({ ...clockFormData, exit2: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClockModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold text-xs hover:bg-[#0a3834]"
                >
                  Salvar Batida
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
