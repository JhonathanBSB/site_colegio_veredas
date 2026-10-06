import React from 'react';
import { Menu, Calendar, ShieldCheck, LogOut, Home } from 'lucide-react';
import { NavTab } from './Sidebar';
import { AuthUser } from '../types';

interface HeaderProps {
  onOpenMobile: () => void;
  currentTab: NavTab;
  onNavigate?: (tab: NavTab) => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onGoToLanding?: () => void;
}

const TAB_TITLES: Record<NavTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Painel da Direção Escolar',
    subtitle: 'Visão executiva integrada e indicadores institucionais'
  },
  students: {
    title: 'Cadastro de Alunos & Responsáveis',
    subtitle: 'Gestão cadastral, filiação, histórico de saúde e matrículas'
  },
  classes: {
    title: 'Séries, Turmas & Organização Curricular',
    subtitle: 'Estrutura pedagógica, salas, capacidades e professores regentes'
  },
  academic: {
    title: 'Controle de Frequência & Notas',
    subtitle: 'Diário de classe eletrônico, lançamento por bimestre e boletins'
  },
  staff: {
    title: 'Corpo Docente & Equipe Administrativa',
    subtitle: 'Cadastro de professores, secretária, coordenação e qualificações'
  },
  hr: {
    title: 'Gestão de RH, Ponto & Folha de Pagamento',
    subtitle: 'Controle de ponto eletrônico, horas trabalhadas e holerites'
  },
  finance: {
    title: 'Gestão de Mensalidades & Cobrança',
    subtitle: 'Boletos bancários, PIX com QR code, fluxo de recebíveis e baixas'
  },
  accounts_payable: {
    title: 'Contas a Pagar & Despesas Operacionais',
    subtitle: 'Controle de fornecedores, concessionárias, notas e pagamentos'
  },
  notices: {
    title: 'Mural Institucional & Calendário de Eventos',
    subtitle: 'Comunicados aos pais, cultos, reuniões pedagógicas e datas festivas'
  }
};

export const Header: React.FC<HeaderProps> = ({
  onOpenMobile,
  currentTab,
  currentUser,
  onLogout,
  onGoToLanding
}) => {
  const info = TAB_TITLES[currentTab] || { title: 'Sistema de Gestão', subtitle: 'Colégio Cristão Veredas' };
  const initials = currentUser?.name 
    ? currentUser.name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'EV';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 px-4 sm:px-6 py-3.5 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-btn"
            onClick={onOpenMobile}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden focus:outline-hidden"
            aria-label="Abrir menu lateral"
          >
            <Menu className="w-5 h-5 text-[#0D4B46]" />
          </button>
          
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0D4B46] tracking-tight">
              {info.title}
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Date, Term, User Profile & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F0F6F5] text-[#0D4B46] text-xs font-medium border border-[#D5E5E3]">
            <Calendar className="w-3.5 h-3.5 text-[#0D4B46]" />
            <span>3º Bimestre • Setembro / 2026</span>
          </div>

          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-gray-600 hover:text-[#0D4B46] hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
              title="Ir para a página inicial da escola"
            >
              <Home className="w-3.5 h-3.5 text-[#0D4B46]" />
              <span>Site da Escola</span>
            </button>
          )}

          {/* User Profile Card */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-[#0D4B46] text-[#F6E5B8] flex items-center justify-center font-bold text-xs shadow-xs border border-[#F6E5B8]/40">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-gray-800 flex items-center gap-1">
                {currentUser?.name || 'Dra. Eunice Veredas'}
                <ShieldCheck className="w-3.5 h-3.5 text-[#0D4B46]" title="Administrador(a)" />
              </div>
              <div className="text-[10px] text-gray-500 font-medium">
                {currentUser?.roleLabel || 'Diretoria Geral'}
              </div>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-xs font-semibold text-gray-600 hover:text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-1 border border-transparent hover:border-rose-200 cursor-pointer"
              title="Encerrar sessão"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

