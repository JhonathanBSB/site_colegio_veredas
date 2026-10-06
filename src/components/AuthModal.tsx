import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  KeyRound, 
  ArrowRight, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { VeredasLogo } from './VeredasLogo';
import { AuthUser, Student, Staff } from '../types';
import { useSchool } from '../context/SchoolContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'guardian' | 'admin';
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'guardian',
  onLoginSuccess
}) => {
  const { students, staff } = useSchool();
  const [activeTab, setActiveTab] = useState<'guardian' | 'admin'>(defaultRole);

  // Form states for manual input
  const [cpfOrEmail, setCpfOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Extract unique guardians from students list
  const sampleGuardians = students.flatMap(st => 
    st.guardians.map(g => ({
      guardian: g,
      studentName: st.name,
      studentClass: st.className,
      studentId: st.id
    }))
  ).filter((item, index, self) => 
    index === self.findIndex(t => t.guardian.cpf === item.guardian.cpf)
  );

  // Sample staff for quick demonstration
  const sampleStaff = staff.filter(s => 
    ['staff-1', 'staff-2', 'staff-7', 'staff-8', 'staff-5'].includes(s.id)
  );

  const handleQuickLoginGuardian = (
    guardianName: string, 
    guardianCpf: string, 
    email: string, 
    studentId: string
  ) => {
    const user: AuthUser = {
      id: `user-${guardianCpf.replace(/\D/g, '')}`,
      name: guardianName,
      email: email || `${guardianName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      role: 'guardian',
      roleLabel: 'Responsável Legal & Financeiro',
      cpf: guardianCpf,
      studentIds: [studentId],
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleQuickLoginStaff = (staffMember: Staff) => {
    const user: AuthUser = {
      id: staffMember.id,
      name: staffMember.name,
      email: staffMember.email,
      role: 'admin',
      roleLabel: staffMember.role,
      phone: staffMember.phone,
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!cpfOrEmail.trim()) {
      setErrorMessage('Por favor, informe seu CPF, E-mail ou Matrícula.');
      return;
    }

    if (activeTab === 'guardian') {
      // Find matching guardian in existing students
      const cleanInput = cpfOrEmail.trim().toLowerCase();
      const matchedItem = sampleGuardians.find(
        g => g.guardian.cpf.toLowerCase().includes(cleanInput) ||
             g.guardian.email.toLowerCase().includes(cleanInput) ||
             g.guardian.name.toLowerCase().includes(cleanInput)
      );

      if (matchedItem) {
        handleQuickLoginGuardian(
          matchedItem.guardian.name,
          matchedItem.guardian.cpf,
          matchedItem.guardian.email,
          matchedItem.studentId
        );
      } else {
        // Allow simulated entrance with typed credentials
        const fallbackStudent = students[0];
        const user: AuthUser = {
          id: `user-${Date.now()}`,
          name: cpfOrEmail.includes('@') ? cpfOrEmail.split('@')[0].toUpperCase() : 'Responsável Cadastrado',
          email: cpfOrEmail.includes('@') ? cpfOrEmail : 'responsavel@colegiocristaoveredas.com.br',
          role: 'guardian',
          roleLabel: 'Responsável Legal',
          cpf: cpfOrEmail.includes('.') ? cpfOrEmail : '888.777.666-55',
          studentIds: [fallbackStudent ? fallbackStudent.id : 'stud-1']
        };
        onLoginSuccess(user);
        onClose();
      }
    } else {
      // Admin submit
      const cleanInput = cpfOrEmail.trim().toLowerCase();
      const matchedStaff = staff.find(
        s => s.email.toLowerCase().includes(cleanInput) ||
             s.name.toLowerCase().includes(cleanInput)
      );

      if (matchedStaff) {
        handleQuickLoginStaff(matchedStaff);
      } else {
        // Fallback admin login
        const defaultAdmin = staff[0] || {
          id: 'staff-1',
          name: 'Dra. Eunice Veredas',
          email: 'diretoria@colegiocristaoveredas.com.br',
          role: 'Diretoria Geral'
        };
        const user: AuthUser = {
          id: defaultAdmin.id,
          name: defaultAdmin.name,
          email: defaultAdmin.email,
          role: 'admin',
          roleLabel: defaultAdmin.role
        };
        onLoginSuccess(user);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden my-8">
        {/* Header with Institution Emblem */}
        <div className="bg-[#093633] px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-emerald-200/80 hover:text-white hover:bg-white/10 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <VeredasLogo size={44} showText={false} variant="light" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#F6E5B8]">
                Ambiente Seguro Veredas
              </span>
              <h2 className="text-xl font-bold font-crest tracking-wide text-white">
                Autenticação no Sistema
              </h2>
            </div>
          </div>

          <p className="text-xs text-emerald-100/80 mt-2">
            Acesso exclusivo para famílias matriculadas e corpo docente institucional.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('guardian');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'guardian'
                ? 'bg-white text-[#0D4B46] shadow-xs border border-gray-200/70 font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === 'guardian' ? 'text-[#0D4B46]' : 'text-gray-400'}`} />
            <span>Portal dos Pais</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-white text-[#0D4B46] shadow-xs border border-gray-200/70 font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeTab === 'admin' ? 'text-[#0D4B46]' : 'text-gray-400'}`} />
            <span>Gestão / Colaboradores</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {activeTab === 'guardian' ? 'CPF do Responsável ou E-mail' : 'E-mail Institucional ou CPF'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cpfOrEmail}
                  onChange={(e) => setCpfOrEmail(e.target.value)}
                  placeholder={
                    activeTab === 'guardian'
                      ? 'Ex: 888.777.666-55 ou roberto@gmail.com'
                      : 'Ex: diretoria@colegiocristaoveredas.com.br'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  Senha de Acesso
                </label>
                <span className="text-[11px] text-[#0D4B46] hover:underline cursor-pointer">
                  Esqueceu a senha?
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] transition-all bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#0D4B46] hover:bg-[#093633] text-[#FAF3DC] font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#F6E5B8]" />
              <span>Entrar no {activeTab === 'guardian' ? 'Portal da Família' : 'Sistema de Gestão'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demonstration Quick Access */}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Acesso Rápido de Demonstração (1 Clique):
              </span>
            </div>

            {activeTab === 'guardian' ? (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {sampleGuardians.slice(0, 4).map((item) => (
                  <button
                    key={item.guardian.id}
                    type="button"
                    onClick={() => handleQuickLoginGuardian(
                      item.guardian.name,
                      item.guardian.cpf,
                      item.guardian.email,
                      item.studentId
                    )}
                    className="w-full text-left p-2.5 rounded-lg bg-gray-50 hover:bg-[#F0F6F5] border border-gray-200/80 hover:border-[#0D4B46]/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-800 group-hover:text-[#0D4B46]">
                        {item.guardian.name}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {item.guardian.relationship} de {item.studentName} ({item.studentClass.split(' - ')[0]})
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#0D4B46] bg-[#0D4B46]/10 px-2 py-0.5 rounded-md group-hover:bg-[#0D4B46] group-hover:text-white transition-colors">
                      Entrar
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {sampleStaff.map((staffMember) => (
                  <button
                    key={staffMember.id}
                    type="button"
                    onClick={() => handleQuickLoginStaff(staffMember)}
                    className="w-full text-left p-2.5 rounded-lg bg-gray-50 hover:bg-[#F0F6F5] border border-gray-200/80 hover:border-[#0D4B46]/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-800 group-hover:text-[#0D4B46]">
                        {staffMember.name}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {staffMember.role} • {staffMember.department}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-[#0D4B46] bg-[#0D4B46]/10 px-2 py-0.5 rounded-md group-hover:bg-[#0D4B46] group-hover:text-white transition-colors">
                      Acessar
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center text-[11px] text-gray-500">
          Suporte à Família: secretaria@colegiocristaoveredas.com.br • (31) 98722-1000
        </div>
      </div>
    </div>
  );
};
