import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Phone,
  Mail,
  User,
  Shield,
  HeartPulse,
  Printer,
  Edit2,
  Trash2,
  FileText,
  X,
  AlertCircle
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Student, Guardian, Shift, GuardianRelationship } from '../types';

interface StudentsViewProps {
  onPrintCertificate: (student: Student) => void;
  isOpenNewModalInitially?: boolean;
  onCloseInitialModal?: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  onPrintCertificate,
  isOpenNewModalInitially = false,
  onCloseInitialModal
}) => {
  const { students, classes, addStudent, updateStudent, deleteStudent } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(isOpenNewModalInitially);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: 'M' as 'M' | 'F',
    cpf: '',
    rg: '',
    classId: classes[0]?.id || '',
    shift: 'Matutino' as Shift,
    bloodType: 'O+',
    allergies: '',
    medicalNotes: '',
    // Primary Guardian
    guardianName: '',
    guardianRelationship: 'Pai' as GuardianRelationship,
    guardianCpf: '',
    guardianProfession: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianAddress: '',
    isFinancialResponsible: true,
    isEmergencyContact: true
  });

  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ra.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardians.some(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesClass = selectedClassFilter === 'ALL' || s.classId === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const handleOpenNewModal = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      birthDate: '',
      gender: 'M',
      cpf: '',
      rg: '',
      classId: classes[0]?.id || '',
      shift: 'Matutino',
      bloodType: 'O+',
      allergies: '',
      medicalNotes: '',
      guardianName: '',
      guardianRelationship: 'Mãe',
      guardianCpf: '',
      guardianProfession: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianAddress: '',
      isFinancialResponsible: true,
      isEmergencyContact: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudent(student);
    const primaryG = student.guardians[0] || {} as Guardian;
    setFormData({
      name: student.name,
      birthDate: student.birthDate,
      gender: student.gender,
      cpf: student.cpf,
      rg: student.rg || '',
      classId: student.classId,
      shift: student.shift,
      bloodType: student.bloodType || 'O+',
      allergies: student.allergies || '',
      medicalNotes: student.medicalNotes || '',
      guardianName: primaryG.name || '',
      guardianRelationship: primaryG.relationship || 'Mãe',
      guardianCpf: primaryG.cpf || '',
      guardianProfession: primaryG.profession || '',
      guardianPhone: primaryG.phone || '',
      guardianEmail: primaryG.email || '',
      guardianAddress: primaryG.address || '',
      isFinancialResponsible: primaryG.isFinancialResponsible ?? true,
      isEmergencyContact: primaryG.isEmergencyContact ?? true
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    if (onCloseInitialModal) onCloseInitialModal();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const targetClass = classes.find(c => c.id === formData.classId);

    const guardian: Guardian = {
      id: editingStudent?.guardians[0]?.id || `guard-${Date.now()}`,
      name: formData.guardianName,
      relationship: formData.guardianRelationship,
      cpf: formData.guardianCpf,
      profession: formData.guardianProfession,
      phone: formData.guardianPhone,
      email: formData.guardianEmail,
      address: formData.guardianAddress,
      isFinancialResponsible: formData.isFinancialResponsible,
      isEmergencyContact: formData.isEmergencyContact
    };

    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender,
        cpf: formData.cpf,
        rg: formData.rg,
        classId: formData.classId,
        className: targetClass?.name || editingStudent.className,
        shift: formData.shift,
        bloodType: formData.bloodType,
        allergies: formData.allergies,
        medicalNotes: formData.medicalNotes,
        guardians: [guardian]
      });
    } else {
      addStudent({
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender,
        cpf: formData.cpf,
        rg: formData.rg,
        classId: formData.classId,
        className: targetClass?.name || 'Turma Atribuída',
        shift: formData.shift,
        status: 'Ativo',
        enrollmentDate: new Date().toISOString().split('T')[0],
        bloodType: formData.bloodType,
        allergies: formData.allergies,
        medicalNotes: formData.medicalNotes,
        guardians: [guardian]
      });
    }

    handleCloseModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Confirma a exclusão do cadastro do aluno ${name}?`)) {
      deleteStudent(id);
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action and filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="student-search-input"
              placeholder="Buscar aluno por nome, RA ou responsável..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#0E4B47] focus:ring-1 focus:ring-[#0E4B47]"
            />
          </div>

          <select
            id="class-filter-select"
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-white focus:outline-hidden focus:border-[#0E4B47]"
          >
            <option value="ALL">Todas as Turmas ({students.length})</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          id="add-student-btn"
          onClick={handleOpenNewModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Nova Matrícula de Aluno
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Aluno / RA</th>
                <th className="py-3.5 px-4">Turma & Turno</th>
                <th className="py-3.5 px-4">Responsável Legal (Menor)</th>
                <th className="py-3.5 px-4">Contato do Responsável</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Nenhum aluno encontrado com os critérios de busca.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => {
                  const guardian = st.guardians[0];
                  return (
                    <tr 
                      key={st.id} 
                      className="hover:bg-emerald-50/40 transition-colors"
                    >
                      {/* Name & RA */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0E4B47] text-[#F6E5B8] flex items-center justify-center font-bold text-xs shrink-0">
                            {st.name.charAt(0)}
                          </div>
                          <div>
                            <button
                              onClick={() => setSelectedStudent(st)}
                              className="font-bold text-gray-900 hover:text-[#0E4B47] hover:underline text-left block"
                            >
                              {st.name}
                            </button>
                            <span className="text-[10px] text-gray-500 font-mono">
                              RA: {st.ra} • {st.gender === 'M' ? 'Masc.' : 'Fem.'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">{st.className}</div>
                        <div className="text-[11px] text-gray-500">{st.shift}</div>
                      </td>

                      {/* Guardian */}
                      <td className="py-3.5 px-4">
                        {guardian ? (
                          <div>
                            <div className="font-bold text-gray-900 flex items-center gap-1">
                              <Shield className="w-3 h-3 text-[#0E4B47]" />
                              {guardian.name}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              {guardian.relationship} • {guardian.profession}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Não cadastrado</span>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        {guardian ? (
                          <div className="space-y-0.5 text-gray-600">
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>{guardian.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="truncate max-w-[140px]">{guardian.email}</span>
                            </div>
                          </div>
                        ) : null}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {st.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            id={`view-student-${st.id}`}
                            onClick={() => setSelectedStudent(st)}
                            title="Ficha Completa"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-[#0E4B47]"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            id={`print-student-${st.id}`}
                            onClick={() => onPrintCertificate(st)}
                            title="Declaração de Matrícula"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            id={`edit-student-${st.id}`}
                            onClick={() => handleOpenEditModal(st)}
                            title="Editar Aluno"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            id={`delete-student-${st.id}`}
                            onClick={() => handleDelete(st.id, st.name)}
                            title="Excluir Aluno"
                            className="p-1.5 rounded-md hover:bg-gray-100 text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#093633] to-[#0E4B47] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF3DC] text-[#0D4B46] flex items-center justify-center font-bold text-lg border-2 border-[#D1BA78]">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedStudent.name}</h3>
                  <p className="text-xs text-emerald-200 font-mono">
                    RA: {selectedStudent.ra} • {selectedStudent.className}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-xs text-gray-700">
              {/* Aluno Data */}
              <div>
                <h4 className="text-xs font-bold text-[#0D4B46] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Dados Gerais do Aluno
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F8FAF9] p-3 rounded-lg border border-gray-200/80">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Data de Nascimento</span>
                    <span className="font-bold">{new Date(selectedStudent.birthDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">CPF</span>
                    <span className="font-bold">{selectedStudent.cpf || 'Não informado'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Tipo Sanguíneo</span>
                    <span className="font-bold text-rose-600">{selectedStudent.bloodType || 'A+'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Turno</span>
                    <span className="font-bold">{selectedStudent.shift}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Data da Matrícula</span>
                    <span className="font-bold">{new Date(selectedStudent.enrollmentDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Situação Cadastral</span>
                    <span className="font-bold text-emerald-700">{selectedStudent.status}</span>
                  </div>
                </div>
              </div>

              {/* Health and Allergies */}
              {(selectedStudent.allergies || selectedStudent.medicalNotes) && (
                <div className="p-3 bg-rose-50/80 rounded-lg border border-rose-200 text-rose-900">
                  <h4 className="text-xs font-bold flex items-center gap-1.5 text-rose-800 mb-1">
                    <HeartPulse className="w-4 h-4 text-rose-600" />
                    Observações de Saúde & Alergias
                  </h4>
                  {selectedStudent.allergies && (
                    <p className="text-[11px] mb-1"><strong>Alergias:</strong> {selectedStudent.allergies}</p>
                  )}
                  {selectedStudent.medicalNotes && (
                    <p className="text-[11px]"><strong>Recomendações:</strong> {selectedStudent.medicalNotes}</p>
                  )}
                </div>
              )}

              {/* Responsáveis Legais */}
              <div>
                <h4 className="text-xs font-bold text-[#0D4B46] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Responsáveis Legais & Financeiros (Menor de Idade)
                </h4>
                <div className="space-y-3">
                  {selectedStudent.guardians.map(g => (
                    <div key={g.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-sm text-gray-900">{g.name}</div>
                          <div className="text-[11px] text-gray-600">
                            {g.relationship} • {g.profession} • CPF: {g.cpf}
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          {g.isFinancialResponsible && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F3F1] text-[#0D4B46] border border-[#0D4B46]/30">
                              Resp. Financeiro
                            </span>
                          )}
                          {g.isEmergencyContact && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              Emergência
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-gray-200/60">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{g.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{g.email}</span>
                        </div>
                      </div>

                      {g.address && (
                        <div className="text-[11px] text-gray-500 pt-1">
                          <strong>Endereço residencial:</strong> {g.address}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => onPrintCertificate(selectedStudent)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-semibold text-xs hover:bg-[#093532] transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Emitir Declaração de Matrícula
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-5 bg-[#093633] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#F6E5B8]" />
                <h3 className="font-bold text-base text-white">
                  {editingStudent ? 'Editar Cadastro do Aluno' : 'Nova Matrícula de Aluno (Ano Letivo 2026)'}
                </h3>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-emerald-200 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-5 text-xs">
              {/* Section 1: Aluno */}
              <div>
                <h4 className="text-xs font-bold text-[#0D4B46] uppercase tracking-wider mb-3 pb-1 border-b border-gray-100">
                  1. Dados do Aluno (Menor de Idade)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Nome Completo do Aluno *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: David Lucas de Carvalho"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Data de Nascimento *</label>
                    <input
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Sexo Biológico *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'M' | 'F' })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">CPF do Aluno</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Tipo Sanguíneo</label>
                    <select
                      value={formData.bloodType}
                      onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    >
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                      <option value="A-">A-</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Série / Turma *</label>
                    <select
                      value={formData.classId}
                      onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    >
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.shift})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Turno *</label>
                    <select
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value as Shift })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    >
                      <option value="Matutino">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                      <option value="Integral">Integral</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-gray-700 font-semibold mb-1">Alergias ou Cuidados Especiais de Saúde</label>
                    <input
                      type="text"
                      placeholder="Ex: Alergia a amendoim, intolerância à lactose, uso de inalador..."
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Responsável Legal */}
              <div>
                <h4 className="text-xs font-bold text-[#0D4B46] uppercase tracking-wider mb-3 pb-1 border-b border-gray-100 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  2. Dados do Responsável Legal & Financeiro (Obrigatório)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Nome do Responsável *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mariana Vasconcelos de Carvalho"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Parentesco *</label>
                    <select
                      value={formData.guardianRelationship}
                      onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value as GuardianRelationship })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    >
                      <option value="Mãe">Mãe</option>
                      <option value="Pai">Pai</option>
                      <option value="Avô/Avó">Avô/Avó</option>
                      <option value="Tutor Legal">Tutor Legal</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">CPF do Responsável *</label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={formData.guardianCpf}
                      onChange={(e) => setFormData({ ...formData, guardianCpf: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(31) 99999-9999"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">E-mail do Responsável *</label>
                    <input
                      type="email"
                      required
                      placeholder="responsavel@email.com"
                      value={formData.guardianEmail}
                      onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-gray-700 font-semibold mb-1">Endereço Residencial Completo</label>
                    <input
                      type="text"
                      placeholder="Rua, número, complemento, bairro, cidade - UF"
                      value={formData.guardianAddress}
                      onChange={(e) => setFormData({ ...formData, guardianAddress: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                    />
                  </div>
                  <div className="sm:col-span-3 flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.isFinancialResponsible}
                        onChange={(e) => setFormData({ ...formData, isFinancialResponsible: e.target.checked })}
                        className="rounded-sm text-[#0E4B47] focus:ring-[#0E4B47]"
                      />
                      <span>Responsável Financeiro pelas Mensalidades</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.isEmergencyContact}
                        onChange={(e) => setFormData({ ...formData, isEmergencyContact: e.target.checked })}
                        className="rounded-sm text-[#0E4B47] focus:ring-[#0E4B47]"
                      />
                      <span>Contato Prioritário de Emergência</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
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
                  {editingStudent ? 'Salvar Alterações' : 'Concluir Matrícula'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
