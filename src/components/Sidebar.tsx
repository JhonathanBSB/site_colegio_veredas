import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Receipt,
  Clock,
  BellRing,
  RotateCcw,
  Sparkles,
  Home,
  LogOut
} from 'lucide-react';
import { VeredasLogo } from './VeredasLogo';
import { useSchool } from '../context/SchoolContext';

export type NavTab = 
  | 'dashboard'
  | 'students'
  | 'staff'
  | 'classes'
  | 'academic'
  | 'finance'
  | 'accounts_payable'
  | 'hr'
  | 'notices';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onGoToLanding?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onGoToLanding,
  onLogout
}) => {
  const { students, staff, tuitionInvoices, accountsPayable, resetToDefaults } = useSchool();

  const overdueInvoicesCount = tuitionInvoices.filter(i => i.status === 'Atrasado').length;
  const pendingPayablesCount = accountsPayable.filter(p => p.status === 'Pendente').length;

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'students', label: 'Alunos & Responsáveis', icon: GraduationCap, badge: students.length },
    { id: 'classes', label: 'Séries & Turmas', icon: BookOpen },
    { id: 'academic', label: 'Notas & Frequência', icon: ClipboardCheck },
    { id: 'staff', label: 'Corpo Docente & Equipe', icon: Users, badge: staff.length },
    { id: 'hr', label: 'RH, Ponto & Folha', icon: Clock },
    { 
      id: 'finance', 
      label: 'Mensalidades & Cobrança', 
      icon: DollarSign,
      badge: overdueInvoicesCount > 0 ? `${overdueInvoicesCount} pendentes` : undefined,
      badgeColor: 'bg-rose-500/90 text-white'
    },
    { 
      id: 'accounts_payable', 
      label: 'Contas a Pagar & Despesas', 
      icon: Receipt,
      badge: pendingPayablesCount > 0 ? pendingPayablesCount : undefined,
      badgeColor: 'bg-amber-400 text-[#0D4B46] font-bold'
    },
    { id: 'notices', label: 'Mural & Calendário', icon: BellRing }
  ];

  const handleSelect = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar os dados de demonstração oficiais do Colégio Cristão Veredas?')) {
      resetToDefaults();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#093633] text-white flex flex-col border-r border-[#0e4b47]
        transition-transform duration-200 ease-in-out lg:translate-x-0
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header with official logo */}
        <div className="p-5 border-b border-[#0d4b46] bg-[#072927]">
          <div className="flex items-center gap-3">
            <VeredasLogo size={52} showText={true} variant="light" />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-emerald-300/80 bg-[#0d4540]/60 px-2.5 py-1.5 rounded-md border border-[#145953]/40">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ano Letivo 2026
            </span>
            <span className="text-[#F6E5B8] text-[11px] font-semibold">SIGE Veredas v2.4</span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-widest text-emerald-400/70">
            Módulos de Gestão
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                  ${isActive 
                    ? 'bg-[#0E4B47] text-[#FDF4D4] shadow-sm border border-[#1D6C66] font-semibold' 
                    : 'text-emerald-100/80 hover:bg-[#0c3f3b] hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F6E5B8]' : 'text-emerald-300/70'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    item.badgeColor || (isActive ? 'bg-[#F6E5B8] text-[#0D4B46]' : 'bg-[#0e4440] text-emerald-200')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Verse Banner & Reset */}
        <div className="p-4 border-t border-[#0e4b47] bg-[#072a27]/80 space-y-3">
          <div className="p-2.5 rounded-lg bg-[#0c3e3a]/70 border border-[#175d56]/50">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#F6E5B8]">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E5B8]" />
              <span>Princípio Bíblico</span>
            </div>
            <p className="text-[11px] text-emerald-100/85 mt-1 italic leading-relaxed">
              "A vereda dos justos é como a luz da aurora, brilhando até o dia perfeito."
            </p>
            <span className="text-[10px] text-emerald-300/60 block text-right mt-0.5 font-medium">
              Provérbios 4:18
            </span>
          </div>

          <div className="pt-1 flex items-center gap-2">
            {onGoToLanding && (
              <button
                onClick={onGoToLanding}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[11px] font-semibold text-emerald-200/80 hover:text-white hover:bg-[#0d4742] transition-colors border border-emerald-800/40"
                title="Voltar para a página inicial pública da escola"
              >
                <Home className="w-3.5 h-3.5 text-[#F6E5B8]" />
                <span>Site Escola</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[11px] font-semibold text-rose-300 hover:text-white hover:bg-rose-900/60 transition-colors border border-rose-900/40"
                title="Encerrar sessão de trabalho"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            )}
          </div>

          <button
            id="reset-defaults-btn"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-md text-[11px] text-emerald-200/60 hover:text-emerald-100 hover:bg-[#0d4742] transition-colors border border-emerald-800/30"
            title="Recarrega os registros de demonstração originais"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restaurar Demonstração</span>
          </button>
        </div>
      </aside>
    </>
  );
};
