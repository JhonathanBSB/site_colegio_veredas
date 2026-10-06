import React from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  Receipt,
  PlusCircle,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { NavTab } from './Sidebar';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenNewStudent: () => void;
  onOpenNewStaff: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenNewStudent,
  onOpenNewStaff
}) => {
  const {
    students,
    staff,
    classes,
    tuitionInvoices,
    accountsPayable,
    events,
    notices
  } = useSchool();

  // Financial calculations
  const totalTuitionExpected = tuitionInvoices.reduce((acc, i) => acc + i.netAmountDue, 0);
  const totalTuitionReceived = tuitionInvoices
    .filter(i => i.status === 'Pago')
    .reduce((acc, i) => acc + (i.paidAmount || i.netAmountDue), 0);
  const totalTuitionOverdue = tuitionInvoices
    .filter(i => i.status === 'Atrasado')
    .reduce((acc, i) => acc + i.netAmountDue, 0);
  
  const totalExpenses = accountsPayable.reduce((acc, a) => acc + a.amount, 0);
  const paidExpenses = accountsPayable
    .filter(a => a.status === 'Pago')
    .reduce((acc, a) => acc + a.amount, 0);

  const adimplenceRate = totalTuitionExpected > 0 
    ? Math.round((totalTuitionReceived / totalTuitionExpected) * 100) 
    : 0;

  const activeStudents = students.filter(s => s.status === 'Ativo').length;
  const activeStaff = staff.filter(s => s.status === 'Ativo').length;

  return (
    <div className="space-y-6">
      {/* Welcome & Christian Institutional Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#093532] via-[#0E4B47] to-[#125B56] text-white p-6 shadow-md border border-[#16635d]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3DC]/15 text-[#F6E5B8] text-xs font-semibold mb-2 border border-[#F6E5B8]/30">
              <span className="w-2 h-2 rounded-full bg-[#F6E5B8]" />
              Colégio Cristão Veredas • Gestão Integrada
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white font-crest">
              Paz seja com você, Diretoria Veredas!
            </h2>
            <p className="text-emerald-100/90 text-sm mt-1 max-w-2xl leading-relaxed">
              "Ensina a criança no caminho em que deve andar, e até quando envelhecer não se desviará dele." — Provérbios 22:6.
              Ano letivo 2026 com todas as rotinas pedagógicas e financeiras sincronizadas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              id="dash-quick-student-btn"
              onClick={onOpenNewStudent}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F6E5B8] text-[#093633] font-bold text-xs hover:bg-[#faeece] transition-colors shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              Matricular Aluno
            </button>
            <button
              id="dash-quick-staff-btn"
              onClick={onOpenNewStaff}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0e4440] hover:bg-[#12534e] text-emerald-100 font-semibold text-xs border border-emerald-600/40 transition-colors"
            >
              <Users className="w-4 h-4" />
              Cadastrar Colaborador
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Alunos */}
        <div 
          onClick={() => onNavigate('students')}
          className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs hover:border-[#0E4B47] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Alunos Ativos
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#E8F3F1] text-[#0E4B47] flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {activeStudents}
            </span>
            <span className="text-xs font-medium text-emerald-600">
              100% de ocupação
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <span>Distribuídos em {classes.length} turmas ativas</span>
          </div>
        </div>

        {/* Card 2: Corpo Docente e Funcionários */}
        <div 
          onClick={() => onNavigate('staff')}
          className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs hover:border-[#0E4B47] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Corpo Docente & RH
            </span>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {activeStaff}
            </span>
            <span className="text-xs font-medium text-blue-600">
              Educadores & Apoio
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <span>5 Professores • 3 Administrativos</span>
          </div>
        </div>

        {/* Card 3: Mensalidades Recebidas */}
        <div 
          onClick={() => onNavigate('finance')}
          className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs hover:border-[#0E4B47] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Receita de Mensalidades
            </span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              R$ {totalTuitionReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{adimplenceRate}% de adimplência no mês</span>
          </div>
        </div>

        {/* Card 4: Contas a Pagar & Despesas */}
        <div 
          onClick={() => onNavigate('accounts_payable')}
          className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-xs hover:border-[#0E4B47] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Despesas Institucionais
            </span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="mt-2 text-xs text-amber-700 font-medium flex items-center gap-1">
            <span>R$ {paidExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} liquidadas</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Financial Flow & Classes Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Resumo Financeiro & Demonstrativo */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div>
              <h3 className="font-bold text-[#0D4B46] text-base">
                Fluxo Financeiro & Previsão do Exercício
              </h3>
              <p className="text-xs text-gray-500">
                Comparativo de arrecadação de mensalidades versus despesas operacionais
              </p>
            </div>
            <button
              onClick={() => onNavigate('finance')}
              className="text-xs font-semibold text-[#0E4B47] hover:underline flex items-center gap-1"
            >
              Ver Detalhes
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Graphical Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-800 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  Mensalidades Recebidas (Setembro)
                </span>
                <span className="text-gray-900 font-bold">
                  R$ {totalTuitionReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R$ {totalTuitionExpected.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(adimplenceRate, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-800 flex items-center gap-1">
                  <ArrowDownRight className="w-4 h-4 text-amber-600" />
                  Despesas Pagas (Fornecedores + Manutenção)
                </span>
                <span className="text-gray-900 font-bold">
                  R$ {paidExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalExpenses > 0 ? (paidExpenses / totalExpenses) * 100 : 0}%` }}
                />
              </div>
            </div>

            {totalTuitionOverdue > 0 && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs text-rose-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Há <strong>R$ {totalTuitionOverdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> em mensalidades com vencimento expirado.</span>
                </div>
                <button
                  onClick={() => onNavigate('finance')}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded-md font-semibold text-[11px] hover:bg-rose-700"
                >
                  Cobrar
                </button>
              </div>
            )}
          </div>

          {/* Quick Turmas Overview */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              Ocupação das Turmas (Ano Letivo 2026)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {classes.map(c => {
                const pct = Math.round((c.currentStudentsCount / c.maxCapacity) * 100);
                return (
                  <div key={c.id} className="p-3 rounded-lg bg-[#F8FAF9] border border-gray-200/70">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-[#0D4B46]">{c.name}</div>
                        <div className="text-[11px] text-gray-500">{c.shift} • {c.room}</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {c.currentStudentsCount}/{c.maxCapacity} alunos
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2.5 overflow-hidden">
                      <div 
                        className="h-full bg-[#0E4B47] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Mural de Avisos & Próximos Eventos */}
        <div className="space-y-6">
          {/* Próximos Eventos e Cultos */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
              <h3 className="font-bold text-[#0D4B46] text-sm flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0D4B46]" />
                Agenda Escolar & Espiritual
              </h3>
              <button
                onClick={() => onNavigate('notices')}
                className="text-[11px] font-semibold text-[#0E4B47] hover:underline"
              >
                Ver Todos
              </button>
            </div>

            <div className="space-y-3">
              {events.slice(0, 3).map(ev => (
                <div key={ev.id} className="p-3 rounded-lg border border-gray-100 bg-[#FBFBFB] hover:bg-[#F3F7F6] transition-colors">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-bold text-[#0D4B46] bg-[#E8F3F1] px-2 py-0.5 rounded-md">
                      {new Date(ev.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                    </span>
                    <span>{ev.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 leading-snug">
                    {ev.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                    {ev.location} • {ev.type}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mural Cristão / Avisos da Diretoria */}
          <div className="bg-[#FAF6EC] rounded-xl border border-[#E7D6A7] shadow-xs p-5">
            <div className="flex items-center justify-between border-b border-[#E7D6A7]/60 pb-3 mb-3">
              <h3 className="font-bold text-[#6D4F11] text-sm flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-[#8C6D23]" />
                Mural de Avisos da Direção
              </h3>
              <button
                onClick={() => onNavigate('notices')}
                className="text-[11px] font-semibold text-[#6D4F11] hover:underline"
              >
                + Publicar
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 2).map(n => (
                <div key={n.id} className="text-xs">
                  <div className="font-bold text-gray-900">{n.title}</div>
                  <p className="text-gray-700 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                    {n.content}
                  </p>
                  {n.verse && (
                    <div className="mt-1.5 text-[10px] italic text-[#6D4F11] font-medium">
                      "{n.verse}"
                    </div>
                  )}
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    Publicado por: {n.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
