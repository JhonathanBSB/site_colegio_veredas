import React, { useState } from 'react';
import { 
  GraduationCap, 
  DollarSign, 
  BellRing, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Copy, 
  QrCode, 
  Printer, 
  LogOut, 
  Home, 
  User, 
  Phone, 
  Heart, 
  Sparkles, 
  Download,
  ShieldCheck,
  ChevronRight,
  Info,
  Check
} from 'lucide-react';
import { VeredasLogo } from './VeredasLogo';
import { AuthUser, Student, StudentReportCard, TuitionInvoice } from '../types';
import { useSchool } from '../context/SchoolContext';

interface ParentPortalViewProps {
  user: AuthUser;
  onLogout: () => void;
  onGoToLanding: () => void;
  onPrintReportCard: (card: StudentReportCard) => void;
  onPrintInvoice: (invoice: TuitionInvoice) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  user,
  onLogout,
  onGoToLanding,
  onPrintReportCard,
  onPrintInvoice
}) => {
  const { 
    students, 
    reportCards, 
    tuitionInvoices, 
    notices, 
    events, 
    markInvoicePaid 
  } = useSchool();

  // Find all students related to this guardian (or fallback to studentIds or first student)
  const relatedStudents = students.filter(st => {
    if (user.studentIds && user.studentIds.includes(st.id)) return true;
    if (user.cpf && st.guardians.some(g => g.cpf === user.cpf)) return true;
    if (st.guardians.some(g => g.name.toLowerCase() === user.name.toLowerCase())) return true;
    return false;
  });

  // If none matched, fallback to all or the first one for demonstration
  const availableStudents = relatedStudents.length > 0 ? relatedStudents : [students[0]].filter(Boolean);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    availableStudents[0]?.id || students[0]?.id || ''
  );

  const [activeTab, setActiveTab] = useState<'grades' | 'finance' | 'notices' | 'events' | 'health'>('grades');

  // Active student object
  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Active report card
  const currentReportCard = reportCards.find(r => r.studentId === currentStudent?.id) || {
    studentId: currentStudent?.id || '',
    studentName: currentStudent?.name || '',
    ra: currentStudent?.ra || '',
    classId: currentStudent?.classId || '',
    className: currentStudent?.className || '',
    year: 2026,
    overallAttendancePercentage: 97.5,
    grades: [
      { subject: 'Língua Portuguesa', b1: 8.8, b2: 9.0, b3: 9.2, b4: null, status: 'Aprovado' },
      { subject: 'Matemática', b1: 8.5, b2: 8.0, b3: 8.8, b4: null, status: 'Aprovado' },
      { subject: 'Ciências / Biologia', b1: 9.2, b2: 9.5, b3: 9.0, b4: null, status: 'Aprovado' },
      { subject: 'História & Geografia', b1: 9.0, b2: 8.7, b3: 9.1, b4: null, status: 'Aprovado' },
      { subject: 'Princípios Bíblicos & Ética', b1: 10.0, b2: 9.8, b3: 10.0, b4: null, status: 'Aprovado' },
      { subject: 'Língua Inglesa', b1: 8.5, b2: 8.8, b3: 9.0, b4: null, status: 'Aprovado' },
      { subject: 'Arte & Música', b1: 9.5, b2: 9.0, b3: 9.5, b4: null, status: 'Aprovado' },
      { subject: 'Educação Física', b1: 10.0, b2: 10.0, b3: 10.0, b4: null, status: 'Aprovado' },
    ]
  } as StudentReportCard;

  // Student invoices
  const studentInvoices = tuitionInvoices.filter(i => i.studentId === currentStudent?.id);

  // PIX Modal State
  const [pixModalInvoice, setPixModalInvoice] = useState<TuitionInvoice | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedBarcode, setCopiedBarcode] = useState<string | null>(null);
  const [simulatedPaymentSuccess, setSimulatedPaymentSuccess] = useState(false);

  const handleCopyPix = (payload: string) => {
    navigator.clipboard.writeText(payload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleCopyBarcode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedBarcode(code);
    setTimeout(() => setCopiedBarcode(null), 2500);
  };

  const handleConfirmPixPayment = (invoiceId: string) => {
    markInvoicePaid(invoiceId, 'PIX');
    setSimulatedPaymentSuccess(true);
    setTimeout(() => {
      setSimulatedPaymentSuccess(false);
      setPixModalInvoice(null);
    }, 2000);
  };

  // Filter notices for parents
  const parentNotices = notices.filter(n => n.targetAudience === 'Todos' || n.targetAudience === 'Pais e Alunos');

  // Summary Metrics
  const pendingInvoicesCount = studentInvoices.filter(i => i.status !== 'Pago').length;
  const averageGrade = currentReportCard.grades.reduce((acc, curr) => {
    const grades = [curr.b1, curr.b2, curr.b3, curr.b4].filter((g): g is number => g !== null);
    if (grades.length === 0) return acc;
    const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
    return acc + avg;
  }, 0) / (currentReportCard.grades.length || 1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans flex flex-col">
      {/* Top Header of Parent Portal */}
      <header className="bg-[#093633] text-white border-b border-[#0e4b47] shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <VeredasLogo size={46} showText={true} variant="light" />
            <div className="hidden md:block pl-4 border-l border-emerald-800/80">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#F6E5B8]">
                Área Restrita da Família
              </span>
              <h2 className="text-sm font-bold text-white font-crest">
                Portal dos Pais & Responsáveis
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Guardian Profile Badge */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0c3e3a] border border-emerald-800/60">
              <div className="w-8 h-8 rounded-full bg-[#FAF3DC] text-[#0D4B46] font-bold text-xs flex items-center justify-center">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white leading-tight">
                  {user.name}
                </div>
                <div className="text-[10px] text-emerald-200/80">
                  {user.roleLabel || 'Responsável Financeiro'}
                </div>
              </div>
            </div>

            {/* Link to School Website */}
            <button
              onClick={onGoToLanding}
              className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800/60 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Voltar ao site público da escola"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Site da Escola</span>
            </button>

            {/* Logout Button */}
            <button
              id="btn-parent-logout"
              onClick={onLogout}
              className="px-3 py-2 rounded-lg bg-emerald-950/80 hover:bg-rose-900/80 text-emerald-100 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 border border-emerald-800/60 cursor-pointer"
              title="Encerrar sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Child Selector & Student Header Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            {/* Student Switcher Dropdown (if multiple students) */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0D4B46] text-[#FAF3DC] flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                {currentStudent ? currentStudent.name.slice(0, 2).toUpperCase() : 'AL'}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Aluno(a) Selecionado(a)
                </span>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 font-crest">
                    {currentStudent?.name}
                  </h1>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Matrícula Ativa
                  </span>
                </div>
              </div>
            </div>

            {/* Dropdown to switch child if more than 1 */}
            {availableStudents.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Filho(a):</span>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0D4B46]/30"
                >
                  {availableStudents.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.className.split(' - ')[0]})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block text-[11px]">Matrícula (RA)</span>
              <span className="font-bold text-gray-800 mt-0.5 block">{currentStudent?.ra}</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block text-[11px]">Turma / Série</span>
              <span className="font-bold text-gray-800 mt-0.5 block truncate">{currentStudent?.className}</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block text-[11px]">Turno</span>
              <span className="font-bold text-gray-800 mt-0.5 block">{currentStudent?.shift}</span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block text-[11px]">Ano Letivo</span>
              <span className="font-bold text-emerald-800 mt-0.5 block">2026 • 3º Bimestre</span>
            </div>
          </div>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium">Média Geral Parcial</span>
              <div className="text-2xl font-extrabold text-[#0D4B46] mt-0.5">
                {averageGrade.toFixed(1)} <span className="text-xs font-normal text-gray-500">/ 10.0</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Desempenho excelente
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium">Frequência Escolar</span>
              <div className="text-2xl font-extrabold text-gray-900 mt-0.5">
                {currentReportCard.overallAttendancePercentage || 98}%
              </div>
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Presença assídua no ano
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200/90 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium">Situação Financeira</span>
              <div className="text-2xl font-extrabold mt-0.5">
                {pendingInvoicesCount === 0 ? (
                  <span className="text-emerald-700">Em dia</span>
                ) : (
                  <span className="text-amber-700">{pendingInvoicesCount} pendente</span>
                )}
              </div>
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                {pendingInvoicesCount === 0 ? 'Nenhuma mensalidade em atraso' : 'Vencendo no dia 10 do mês'}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
              pendingInvoicesCount === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-gray-200 bg-white rounded-xl p-1.5 shadow-xs overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('grades')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'grades'
                ? 'bg-[#0D4B46] text-[#FAF3DC] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Boletim & Desempenho</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'finance'
                ? 'bg-[#0D4B46] text-[#FAF3DC] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Mensalidades & Boletos</span>
            {pendingInvoicesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'notices'
                ? 'bg-[#0D4B46] text-[#FAF3DC] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <BellRing className="w-4 h-4" />
            <span>Notícias & Comunicados</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'events'
                ? 'bg-[#0D4B46] text-[#FAF3DC] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda Escolar & Cultos</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'health'
                ? 'bg-[#0D4B46] text-[#FAF3DC] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Ficha do Aluno</span>
          </button>
        </div>

        {/* TAB 1: Boletim & Desempenho */}
        {activeTab === 'grades' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-[#0D4B46] font-crest">
                    Boletim Escolar Bimestral • {currentReportCard.year}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Acompanhamento de aproveitamento acadêmico e assiduidade por disciplina.
                  </p>
                </div>

                <button
                  id="btn-print-parent-report-card"
                  onClick={() => onPrintReportCard(currentReportCard)}
                  className="px-4 py-2 rounded-xl bg-[#FAF3DC] hover:bg-[#F6E5B8] text-[#0D4B46] border border-[#D1BA78]/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-[#0D4B46]" />
                  <span>Imprimir Boletim Oficial Timbrado</span>
                </button>
              </div>

              {/* Grades Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Componente Curricular</th>
                      <th className="py-3 px-3 text-center">1º Bim</th>
                      <th className="py-3 px-3 text-center">2º Bim</th>
                      <th className="py-3 px-3 text-center">3º Bim</th>
                      <th className="py-3 px-3 text-center">4º Bim</th>
                      <th className="py-3 px-3 text-center">Média Parcial</th>
                      <th className="py-3 px-4 text-center">Situação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentReportCard.grades.map((g, idx) => {
                      const validScores = [g.b1, g.b2, g.b3, g.b4].filter((s): s is number => s !== null);
                      const avg = validScores.length > 0 ? (validScores.reduce((a, b) => a + b, 0) / validScores.length) : null;
                      const isPassing = avg !== null ? avg >= 7.0 : true;

                      return (
                        <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3 px-4 font-semibold text-gray-800">
                            {g.subject}
                          </td>
                          <td className="py-3 px-3 text-center font-medium text-gray-700">
                            {g.b1 !== null ? g.b1.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center font-medium text-gray-700">
                            {g.b2 !== null ? g.b2.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center font-medium text-gray-700">
                            {g.b3 !== null ? g.b3.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center font-medium text-gray-400">
                            {g.b4 !== null ? g.b4.toFixed(1) : 'Em curso'}
                          </td>
                          <td className="py-3 px-3 text-center font-bold">
                            <span className={avg !== null && avg < 7 ? 'text-rose-600' : 'text-[#0D4B46]'}>
                              {avg !== null ? avg.toFixed(1) : '-'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isPassing 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isPassing ? 'Satisfatório' : 'Atenção'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pedagogical Commentary Card */}
            <div className="p-5 rounded-2xl bg-[#F0F6F5] border border-[#D5E5E3] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D4B46] text-[#FAF3DC] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#F6E5B8]" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-[#0D4B46] text-sm">Parecer da Coordenação Pedagógica</h4>
                <p className="text-gray-700 leading-relaxed">
                  O educando demonstra excelente dedicação, companheirismo cristão e participação ativa nas atividades em sala e projetos da Feira Cultural. Mantém ótimo relacionamento com colegas e professores. Continuem incentivando o hábito diário da leitura e oração no lar.
                </p>
                <div className="pt-2 text-[11px] text-gray-500 font-semibold">
                  Profª Sarah Lima — Coordenação Pedagógica
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Financeiro & Mensalidades */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            {/* Payment Policy Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 block">Política de Desconto por Pontualidade:</span>
                Pagamentos realizados até o dia 10 de cada mês garantem <strong>5% de desconto automático</strong>. 
                O pagamento via PIX é compensado instantaneamente pelo sistema financeiro do Colégio Veredas.
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
              {studentInvoices.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-200">
                  Nenhuma fatura registrada para este aluno até o momento.
                </div>
              ) : (
                studentInvoices.map((inv) => {
                  const isPaid = inv.status === 'Pago';
                  const isOverdue = inv.status === 'Atrasado';

                  return (
                    <div 
                      key={inv.id}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-xs hover:border-[#0D4B46]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                            {inv.code}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isPaid ? 'bg-emerald-100 text-emerald-800' :
                            isOverdue ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {inv.status}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                          Mensalidade Escolar • {inv.monthReference}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                          <div>
                            Vencimento: <strong className="text-gray-900">{inv.dueDate}</strong>
                          </div>
                          <div>
                            Valor Original: <span className="line-through text-gray-400">R$ {inv.baseAmount.toFixed(2)}</span>
                          </div>
                          <div>
                            Valor c/ Desconto: <strong className="text-emerald-700 font-bold">R$ {inv.netAmountDue.toFixed(2)}</strong>
                          </div>
                        </div>

                        {isPaid && (
                          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 pt-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Quitado em {inv.paidDate} via {inv.paymentMethod || 'PIX'}</span>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {!isPaid ? (
                          <>
                            <button
                              onClick={() => setPixModalInvoice(inv)}
                              className="px-4 py-2.5 rounded-xl bg-[#0D4B46] hover:bg-[#093633] text-[#FAF3DC] font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                            >
                              <QrCode className="w-4 h-4 text-[#F6E5B8]" />
                              <span>Pagar com PIX</span>
                            </button>

                            <button
                              onClick={() => handleCopyBarcode(inv.barcode)}
                              className="px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Copiar linha digitável do boleto"
                            >
                              {copiedBarcode === inv.barcode ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  <span className="text-emerald-700">Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 text-gray-500" />
                                  <span>Cód. de Barras</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => onPrintInvoice(inv)}
                              className="px-3.5 py-2.5 rounded-xl bg-[#FAF3DC] hover:bg-[#F6E5B8] text-[#0D4B46] text-xs font-bold border border-[#D1BA78]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Printer className="w-4 h-4 text-[#0D4B46]" />
                              <span>Boleto Bancário</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => onPrintInvoice(inv)}
                            className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-emerald-700" />
                            <span>Recibo / Comprovante</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Notícias & Comunicados */}
        {activeTab === 'notices' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0D4B46] font-crest">
                Comunicados da Direção & Coordenação
              </h3>
              <span className="text-xs text-gray-500">Ano Letivo 2026</span>
            </div>

            {parentNotices.map((notice) => (
              <div 
                key={notice.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                    notice.category === 'Espiritual' ? 'bg-amber-100 text-amber-800' :
                    notice.category === 'Pedagógico' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    Publicado em {notice.publishDate}
                  </span>
                </div>

                <h4 className="text-base font-bold text-gray-900">
                  {notice.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {notice.content}
                </p>

                {notice.verse && (
                  <div className="p-3 rounded-xl bg-[#FAF3DC]/60 border border-[#E9DCB5] text-xs text-[#8C6D23] italic">
                    {notice.verse}
                  </div>
                )}

                <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                  Circular emitida por: <strong>{notice.author}</strong>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Agenda Escolar & Eventos */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0D4B46] font-crest">
                Calendário Escolar & Reuniões de Pais
              </h3>
              <span className="text-xs text-gray-500">Segundo Semestre</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div 
                  key={ev.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex items-start gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#F0F6F5] text-[#0D4B46] border border-[#D5E5E3] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold text-[#0D4B46]/70">
                      {new Date(ev.date).toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                    <span className="text-lg font-extrabold leading-none">
                      {ev.date.split('-')[2]}
                    </span>
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#D1BA78] uppercase tracking-wider">
                      {ev.type}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ev.description}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1 font-medium text-gray-700">
                        <Clock className="w-3.5 h-3.5 text-[#0D4B46]" />
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Ficha do Aluno & Saúde */}
        {activeTab === 'health' && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#0D4B46] font-crest">
                Ficha Cadastral e Dados de Saúde do Educando
              </h3>
              <p className="text-xs text-gray-500">
                Informações de prontuário informadas no ato da matrícula para suporte de emergência.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500 block text-[11px]">Tipo Sanguíneo</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">
                  {currentStudent?.bloodType || 'Não informado'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500 block text-[11px]">Alergias Cadastradas</span>
                <span className="font-bold text-rose-700 text-sm mt-0.5 block">
                  {currentStudent?.allergies || 'Nenhuma alergia relatada'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 sm:col-span-2 lg:col-span-1">
                <span className="text-gray-500 block text-[11px]">Observações Médicas</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">
                  {currentStudent?.medicalNotes || 'Sem observações especiais'}
                </span>
              </div>
            </div>

            {/* Guardians Info */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Responsáveis Cadastrados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStudent?.guardians.map((g) => (
                  <div key={g.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-sm">{g.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                        {g.relationship}
                      </span>
                    </div>
                    <div className="text-gray-600">CPF: {g.cpf}</div>
                    <div className="text-gray-600">Telefone: {g.phone}</div>
                    <div className="text-gray-600">E-mail: {g.email}</div>
                    {g.isFinancialResponsible && (
                      <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Responsável Financeiro Oficial
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Need to update details */}
            <div className="p-4 rounded-xl bg-[#FAF3DC]/60 border border-[#E9DCB5] text-xs flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-[#8C6D23] block">Deseja atualizar dados médicos ou de endereço?</span>
                <span className="text-gray-600 text-[11px]">Entre em contato com a secretaria da escola via WhatsApp para atualização do prontuário.</span>
              </div>
              <a
                href="https://wa.me/5531987221000"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#0D4B46] hover:bg-[#093633] text-white font-bold text-xs shrink-0 transition-colors"
              >
                Falar c/ Secretaria
              </a>
            </div>
          </div>
        )}
      </main>

      {/* PIX Payment Modal */}
      {pixModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100">
            <div className="bg-[#093633] px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#F6E5B8]" />
                <h3 className="text-base font-bold font-crest">Pagamento Instantâneo PIX</h3>
              </div>
              <button
                onClick={() => setPixModalInvoice(null)}
                className="text-emerald-200 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-center">
              {simulatedPaymentSuccess ? (
                <div className="py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0D4B46]">Pagamento Confirmado!</h4>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto">
                    O pagamento da mensalidade de {pixModalInvoice.monthReference} foi registrado com sucesso.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 font-medium">Valor a Pagar (com desconto pontualidade)</span>
                    <div className="text-3xl font-extrabold text-[#0D4B46]">
                      R$ {pixModalInvoice.netAmountDue.toFixed(2)}
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold block">
                      Vencimento: {pixModalInvoice.dueDate}
                    </span>
                  </div>

                  {/* Visual QR Code Generator Simulation */}
                  <div className="p-4 bg-white rounded-xl border-2 border-dashed border-[#0D4B46]/30 inline-block mx-auto shadow-xs">
                    <div className="w-44 h-44 bg-[#FAF3DC]/40 rounded-lg flex flex-col items-center justify-center p-3 text-center border border-[#D1BA78]/40">
                      <QrCode className="w-28 h-28 text-[#0D4B46]" />
                      <span className="text-[10px] text-gray-500 mt-1 font-mono">Chave: financeiro@colegio...</span>
                    </div>
                  </div>

                  {/* PIX Copy & Paste Button */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCopyPix(pixModalInvoice.pixQrCodePayload)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">Chave PIX Copiada com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-gray-600" />
                          <span>Copiar Código PIX Copia e Cola</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleConfirmPixPayment(pixModalInvoice.id)}
                      className="w-full py-3 px-4 rounded-xl bg-[#0D4B46] hover:bg-[#093633] text-[#FAF3DC] text-xs font-extrabold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F6E5B8]" />
                      <span>Simular Confirmação Imediata de Pagamento</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
              Ambiente Integrado ao Banco Central do Brasil • Banco Santander / Veredas
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
