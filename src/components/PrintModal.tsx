import React from 'react';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';
import { VeredasLogo } from './VeredasLogo';
import { StudentReportCard, TuitionInvoice, PayrollItem } from '../types';

interface PrintModalProps {
  type: 'reportCard' | 'invoice' | 'payroll';
  data: StudentReportCard | TuitionInvoice | PayrollItem | null;
  onClose: () => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({ type, data, onClose }) => {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print p-4 bg-[#093633] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#F6E5B8]" />
            <h3 className="font-bold text-sm text-white">
              Visualização de Impressão Oficial • Colégio Cristão Veredas
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E2C376] hover:bg-[#d4b360] text-[#093633] font-bold text-xs shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / Salvar PDF
            </button>
            <button onClick={onClose} className="p-1.5 text-emerald-200 hover:text-white rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 overflow-y-auto print-container space-y-6 text-gray-800 bg-white">
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-[#0E4B47] pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VeredasLogo size="md" />
              <div>
                <h1 className="font-serif font-black text-lg tracking-wide text-[#0D4B46] uppercase">
                  Colégio Cristão Veredas
                </h1>
                <p className="text-[10px] text-gray-600 font-semibold tracking-wider uppercase">
                  Educação por Princípios • Formação Integral & Cristã
                </p>
                <p className="text-[9px] text-gray-500">
                  Portaria SEE/MG Nº 1.482/2018 • CNPJ: 14.892.441/0001-85 • Belo Horizonte - MG
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-[#FAF6EC] border border-[#EAD08C] rounded text-[#6D4F11] font-bold text-xs uppercase tracking-wider">
                {type === 'reportCard' && 'Boletim Escolar Oficial'}
                {type === 'invoice' && 'Fatura Escolar / Boleto PIX'}
                {type === 'payroll' && 'Recibo de Pagamento de Salário'}
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                Emitido em: {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>

          {/* 1. REPORT CARD */}
          {type === 'reportCard' && (
            <div className="space-y-6 text-xs">
              {(() => {
                const rc = data as StudentReportCard;
                return (
                  <>
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Nome do Aluno</span>
                        <span className="font-bold text-sm text-gray-900">{rc.studentName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Matrícula (RA)</span>
                        <span className="font-mono font-bold text-gray-900">{rc.ra}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Série / Turma</span>
                        <span className="font-semibold text-gray-800">{rc.className}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[10px] uppercase font-bold">Ano Letivo / Frequência</span>
                        <span className="font-semibold text-gray-800">{rc.year} • {rc.overallAttendancePercentage}% Presença</span>
                      </div>
                    </div>

                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0E4B47] text-[#FDF4D4] font-bold text-[11px] uppercase">
                          <th className="border border-gray-300 p-2 text-left">Componente Curricular</th>
                          <th className="border border-gray-300 p-2 text-center">1º Bim</th>
                          <th className="border border-gray-300 p-2 text-center">2º Bim</th>
                          <th className="border border-gray-300 p-2 text-center">3º Bim</th>
                          <th className="border border-gray-300 p-2 text-center">4º Bim</th>
                          <th className="border border-gray-300 p-2 text-center">Média Anual</th>
                          <th className="border border-gray-300 p-2 text-center">Resultado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rc.grades.map((g, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 p-2 font-bold">{g.subject}</td>
                            <td className="border border-gray-300 p-2 text-center">{g.b1 ?? '—'}</td>
                            <td className="border border-gray-300 p-2 text-center">{g.b2 ?? '—'}</td>
                            <td className="border border-gray-300 p-2 text-center">{g.b3 ?? '—'}</td>
                            <td className="border border-gray-300 p-2 text-center">{g.b4 ?? '—'}</td>
                            <td className="border border-gray-300 p-2 text-center font-bold text-[#0D4B46]">
                              {g.average !== undefined ? g.average.toFixed(1) : '—'}
                            </td>
                            <td className="border border-gray-300 p-2 text-center font-bold">
                              {g.status || 'Cursando'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="pt-12 grid grid-cols-2 gap-12 text-center">
                      <div className="border-t border-gray-400 pt-2">
                        <p className="font-bold text-gray-800">Dra. Eunice Veredas</p>
                        <p className="text-[10px] text-gray-500">Diretora Pedagógica Geral</p>
                      </div>
                      <div className="border-t border-gray-400 pt-2">
                        <p className="font-bold text-gray-800">Secretaria Escolar Veredas</p>
                        <p className="text-[10px] text-gray-500">Registro SEE/MEC</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* 2. TUITION INVOICE / CARNÊ */}
          {type === 'invoice' && (
            <div className="space-y-6 text-xs">
              {(() => {
                const inv = data as TuitionInvoice;
                return (
                  <>
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded-xl space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-bold">Identificação do Título</span>
                          <p className="font-mono font-bold text-sm text-gray-900">{inv.code}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-500 uppercase font-bold">Vencimento</span>
                          <p className="font-bold text-sm text-rose-700">
                            {new Date(inv.dueDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-gray-500 text-[10px] font-bold uppercase">Aluno</span>
                          <p className="font-bold text-gray-900">{inv.studentName}</p>
                          <p className="text-gray-600 text-[11px]">{inv.className}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] font-bold uppercase">Responsável Financeiro</span>
                          <p className="font-bold text-gray-900">{inv.guardianName}</p>
                          <p className="text-gray-600 text-[11px]">CPF: {inv.guardianCpf}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <span className="text-gray-600">Mensalidade: R$ {inv.baseAmount.toFixed(2)}</span>
                          {inv.discountUntilDue > 0 && (
                            <p className="text-[11px] text-emerald-700 font-semibold">
                              Desconto até o vencimento: R$ {inv.discountUntilDue.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-gray-500">Valor a Pagar</span>
                          <p className="text-lg font-extrabold text-[#0D4B46]">
                            R$ {inv.netAmountDue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>

                      {/* PIX section */}
                      <div className="pt-2 border-t flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-100 border rounded flex items-center justify-center font-mono text-[9px] text-center p-1">
                          [QR CODE PIX INSTITUCIONAL]
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-bold text-[#0D4B46]">Pague instantaneamente via PIX</p>
                          <p className="text-[11px] text-gray-600">
                            Chave Copia e Cola / Payload:
                          </p>
                          <div className="p-1.5 bg-gray-100 rounded font-mono text-[9px] break-all select-all">
                            {inv.pixQrCodePayload}
                          </div>
                        </div>
                      </div>

                      {/* Barcode line */}
                      <div className="pt-3 border-t">
                        <span className="text-[10px] text-gray-500 font-mono block mb-1">
                          Linha Digitável: 75691.31018 01000.000104 00012.345678 1 984500000{inv.netAmountDue.toFixed(0)}
                        </span>
                        <div className="h-10 bg-repeating-linear-gradient flex items-center justify-center font-mono text-xs text-gray-400 border border-gray-300">
                          |||||| | ||||| |||| || |||||||| | |||| ||| |||||| ||||| ||||||| ||| ||| |||
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* 3. PAYROLL HOLERITE */}
          {type === 'payroll' && (
            <div className="space-y-6 text-xs">
              {(() => {
                const pay = data as PayrollItem;
                return (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-gray-500 text-[10px] font-bold uppercase">Colaborador</span>
                        <p className="font-bold text-gray-900 text-sm">{pay.staffName}</p>
                        <p className="text-gray-600">{pay.role}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 text-[10px] font-bold uppercase">Mês de Referência</span>
                        <p className="font-bold text-gray-900 text-sm">{pay.month}</p>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {pay.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0E4B47] text-[#FDF4D4] font-bold uppercase text-[10px]">
                          <th className="border border-gray-300 p-2 text-left">Código / Descrição</th>
                          <th className="border border-gray-300 p-2 text-right">Vencimentos (R$)</th>
                          <th className="border border-gray-300 p-2 text-right">Descontos (R$)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2">001 Salário Base Mensal</td>
                          <td className="border border-gray-300 p-2 text-right font-medium">
                            {pay.baseSalary.toFixed(2)}
                          </td>
                          <td className="border border-gray-300 p-2 text-right">—</td>
                        </tr>
                        {pay.bonusAmount > 0 && (
                          <tr>
                            <td className="border border-gray-300 p-2">102 {pay.bonusDetails}</td>
                            <td className="border border-gray-300 p-2 text-right font-medium text-emerald-700">
                              {pay.bonusAmount.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 p-2 text-right">—</td>
                          </tr>
                        )}
                        <tr>
                          <td className="border border-gray-300 p-2">501 Contribuição Previdenciária (INSS)</td>
                          <td className="border border-gray-300 p-2 text-right">—</td>
                          <td className="border border-gray-300 p-2 text-right text-rose-700 font-medium">
                            {pay.inssDeduction.toFixed(2)}
                          </td>
                        </tr>
                        {pay.otherDeductions > 0 && (
                          <tr>
                            <td className="border border-gray-300 p-2">505 Deduções Legais / Benefícios ({pay.deductionDetails})</td>
                            <td className="border border-gray-300 p-2 text-right">—</td>
                            <td className="border border-gray-300 p-2 text-right text-rose-700 font-medium">
                              {pay.otherDeductions.toFixed(2)}
                            </td>
                          </tr>
                        )}
                        <tr className="bg-gray-100 font-bold">
                          <td className="border border-gray-300 p-2">Totais</td>
                          <td className="border border-gray-300 p-2 text-right text-emerald-800">
                            R$ {(pay.baseSalary + pay.bonusAmount).toFixed(2)}
                          </td>
                          <td className="border border-gray-300 p-2 text-right text-rose-800">
                            R$ {(pay.inssDeduction + pay.otherDeductions).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="p-4 bg-[#FAF6EC] border border-[#EAD08C] rounded-xl flex justify-between items-center">
                      <span className="font-bold text-sm text-[#6D4F11]">VALOR LÍQUIDO A RECEBER:</span>
                      <span className="text-xl font-extrabold text-[#0D4B46]">
                        R$ {pay.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="pt-8 border-t border-gray-300">
                      <p className="text-[10px] text-gray-500 mb-6">
                        Declaro ter recebido a importância líquida discriminada neste recibo, referente aos serviços prestados no mês acima indicado.
                      </p>
                      <div className="grid grid-cols-2 gap-8 text-center pt-4">
                        <div className="border-t border-gray-400 pt-2 text-[10px] text-gray-600">
                          Data: ____/____/________
                        </div>
                        <div className="border-t border-gray-400 pt-2 text-[10px] text-gray-600">
                          Assinatura do Colaborador(a)
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Footer note */}
          <div className="pt-6 border-t border-gray-200 text-center text-[9px] text-gray-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E4B47]" />
            <span>Colégio Cristão Veredas • Sistema Integrado de Gestão Escolar e Acadêmica</span>
          </div>
        </div>
      </div>
    </div>
  );
};
