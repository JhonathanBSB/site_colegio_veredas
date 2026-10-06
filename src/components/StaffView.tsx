import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  Award,
  DollarSign,
  Calendar,
  Building2,
  Edit2,
  Trash2,
  X,
  CreditCard
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Staff, StaffRole, StaffDepartment } from '../types';

interface StaffViewProps {
  isOpenNewModalInitially?: boolean;
  onCloseInitialModal?: () => void;
}

export const StaffView: React.FC<StaffViewProps> = ({
  isOpenNewModalInitially = false,
  onCloseInitialModal
}) => {
  const { staff, addStaff, updateStaff, deleteStaff } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(isOpenNewModalInitially);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Professor(a)' as StaffRole,
    department: 'Pedagógico' as StaffDepartment,
    cpf: '',
    rg: '',
    email: '',
    phone: '',
    qualification: '',
    admissionDate: new Date().toISOString().split('T')[0],
    salary: 4000,
    weeklyHours: 30,
    status: 'Ativo' as 'Ativo' | 'Férias' | 'Licença' | 'Inativo',
    bank: 'Banco do Brasil',
    agency: '',
    account: '',
    pixKey: '',
    subjectsTaught: ''
  });

  const filteredStaff = staff.filter(st => {
    const matchesSearch = 
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.cpf.includes(searchQuery);
    const matchesDept = selectedDeptFilter === 'ALL' || st.department === selectedDeptFilter;
    return matchesSearch && matchesDept;
  });

  const handleOpenNewModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      role: 'Professor(a)',
      department: 'Pedagógico',
      cpf: '',
      rg: '',
      email: '',
      phone: '',
      qualification: '',
      admissionDate: new Date().toISOString().split('T')[0],
      salary: 4200,
      weeklyHours: 30,
      status: 'Ativo',
      bank: 'Nubank',
      agency: '0001',
      account: '',
      pixKey: '',
      subjectsTaught: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (st: Staff) => {
    setEditingStaff(st);
    setFormData({
      name: st.name,
      role: st.role,
      department: st.department,
      cpf: st.cpf,
      rg: st.rg || '',
      email: st.email,
      phone: st.phone,
      qualification: st.qualification,
      admissionDate: st.admissionDate,
      salary: st.salary,
      weeklyHours: st.weeklyHours,
      status: st.status,
      bank: st.bankInfo?.bank || 'Banco do Brasil',
      agency: st.bankInfo?.agency || '',
      account: st.bankInfo?.account || '',
      pixKey: st.bankInfo?.pixKey || '',
      subjectsTaught: st.subjectsTaught?.join(', ') || ''
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
    if (onCloseInitialModal) onCloseInitialModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjects = formData.subjectsTaught 
      ? formData.subjectsTaught.split(',').map(s => s.trim()).filter(Boolean) 
      : undefined;

    const bankInfo = {
      bank: formData.bank,
      agency: formData.agency,
      account: formData.account,
      pixKey: formData.pixKey
    };

    if (editingStaff) {
      updateStaff({
        ...editingStaff,
        name: formData.name,
        role: formData.role,
        department: formData.department,
        cpf: formData.cpf,
        rg: formData.rg,
        email: formData.email,
        phone: formData.phone,
        qualification: formData.qualification,
        admissionDate: formData.admissionDate,
        salary: Number(formData.salary),
        weeklyHours: Number(formData.weeklyHours),
        status: formData.status,
        subjectsTaught: subjects,
        bankInfo
      });
    } else {
      addStaff({
        name: formData.name,
        role: formData.role,
        department: formData.department,
        cpf: formData.cpf,
        rg: formData.rg,
        email: formData.email,
        phone: formData.phone,
        qualification: formData.qualification,
        admissionDate: formData.admissionDate,
        salary: Number(formData.salary),
        weeklyHours: Number(formData.weeklyHours),
        status: formData.status,
        subjectsTaught: subjects,
        bankInfo
      });
    }

    handleCloseModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Deseja remover o cadastro do funcionário(a) ${name}?`)) {
      deleteStaff(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="staff-search-input"
              placeholder="Buscar por nome, cargo ou CPF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0E4B47] focus:ring-1 focus:ring-[#0E4B47]"
            />
          </div>

          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white focus:outline-hidden focus:border-[#0E4B47]"
          >
            <option value="ALL">Todos os Departamentos ({staff.length})</option>
            <option value="Pedagógico">Pedagógico / Professores</option>
            <option value="Diretoria">Diretoria</option>
            <option value="Secretaria">Secretaria Escolar</option>
            <option value="Financeiro/RH">Financeiro & RH</option>
            <option value="Operacional">Operacional & Apoio</option>
          </select>
        </div>

        <button
          id="add-staff-btn"
          onClick={handleOpenNewModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Funcionário
        </button>
      </div>

      {/* Staff Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((st) => (
          <div
            key={st.id}
            className="bg-white rounded-xl border border-gray-200/90 shadow-xs hover:border-[#0E4B47] transition-all p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0E4B47] text-[#F6E5B8] flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    {st.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight">
                      {st.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#0E4B47] block mt-0.5">
                      {st.role}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  st.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {st.status}
                </span>
              </div>

              {/* Department & Qualification */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-3.5 h-3.5 text-[#0E4B47] shrink-0" />
                  <span>Departamento: <strong>{st.department}</strong></span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <Award className="w-3.5 h-3.5 text-[#8C6D23] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 text-[11px] leading-relaxed">
                    {st.qualification}
                  </span>
                </div>

                {st.subjectsTaught && st.subjectsTaught.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1">
                    {st.subjectsTaught.map((sub, i) => (
                      <span key={i} className="text-[10px] bg-[#E8F3F1] text-[#0D4B46] px-2 py-0.5 rounded-md font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contacts and Salary */}
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span className="text-[11px]">{st.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="text-[11px] truncate">{st.email}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-gray-500 font-medium">
                    {st.weeklyHours}h semanais
                  </span>
                  <span className="font-bold text-[#0D4B46] text-xs">
                    R$ {st.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-gray-400">
                Admissão: {new Date(st.admissionDate).toLocaleDateString('pt-BR')}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEditModal(st)}
                  className="p-1.5 rounded-md hover:bg-gray-100 text-blue-600"
                  title="Editar"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(st.id, st.name)}
                  className="p-1.5 rounded-md hover:bg-gray-100 text-rose-600"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-5 bg-[#093633] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#F6E5B8]" />
                <h3 className="font-bold text-base text-white">
                  {editingStaff ? 'Editar Colaborador' : 'Novo Colaborador / Professor'}
                </h3>
              </div>
              <button onClick={handleCloseModal} className="text-emerald-200 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Prof. André Silveira"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Cargo / Função *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as StaffRole })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Professor(a)">Professor(a)</option>
                    <option value="Coordenadora Pedagógica">Coordenadora Pedagógica</option>
                    <option value="Diretora Geral">Diretora Geral</option>
                    <option value="Secretária Escolar">Secretária Escolar</option>
                    <option value="Orientador(a) Educacional">Orientador(a) Educacional</option>
                    <option value="Analista Financeiro / RH">Analista Financeiro / RH</option>
                    <option value="Auxiliar de Sala">Auxiliar de Sala</option>
                    <option value="Apoio / Manutenção">Apoio / Manutenção</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Departamento *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as StaffDepartment })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Pedagógico">Pedagógico</option>
                    <option value="Diretoria">Diretoria</option>
                    <option value="Secretaria">Secretaria</option>
                    <option value="Financeiro/RH">Financeiro/RH</option>
                    <option value="Operacional">Operacional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">CPF *</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(31) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">E-mail Institucional ou Pessoal *</label>
                  <input
                    type="email"
                    required
                    placeholder="professor@colegiocristaoveredas.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Titulação / Formação Acadêmica *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Licenciatura Plena em História e Pedagogia / Pós em Teologia Bíblica"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Salário Base Mensal (R$) *</label>
                  <input
                    type="number"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Carga Horária Semanal (Horas) *</label>
                  <input
                    type="number"
                    required
                    value={formData.weeklyHours}
                    onChange={(e) => setFormData({ ...formData, weeklyHours: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Disciplinas que Leciona (separadas por vírgula)</label>
                  <input
                    type="text"
                    placeholder="Ex: Língua Portuguesa, Princípios Bíblicos, Redação"
                    value={formData.subjectsTaught}
                    onChange={(e) => setFormData({ ...formData, subjectsTaught: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Chave PIX para Pagamento</label>
                  <input
                    type="text"
                    placeholder="CPF, e-mail ou celular"
                    value={formData.pixKey}
                    onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Situação / Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Férias">Em Férias</option>
                    <option value="Licença">Licença</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold text-xs hover:bg-[#0a3834] transition-colors shadow-xs"
                >
                  {editingStaff ? 'Salvar Colaborador' : 'Concluir Cadastro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
