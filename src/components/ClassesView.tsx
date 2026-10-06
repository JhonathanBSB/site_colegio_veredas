import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Users,
  Clock,
  MapPin,
  ClipboardList,
  Edit2,
  X,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SchoolClass, GradeLevel, Shift } from '../types';

interface ClassesViewProps {
  onGoToAttendance: (classId: string) => void;
  onGoToGrades: (classId: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({
  onGoToAttendance,
  onGoToGrades
}) => {
  const { classes, staff, students, addClass, updateClass } = useSchool();

  const [selectedGradeFilter, setSelectedGradeFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    gradeLevel: 'Ensino Fundamental I' as GradeLevel,
    shift: 'Matutino' as Shift,
    room: 'Sala 201 - Bloco A',
    year: 2026,
    headTeacherId: staff[0]?.id || '',
    maxCapacity: 25,
    subjects: 'Língua Portuguesa, Matemática, História, Geografia, Ciências, Princípios Bíblicos, Educação Física, Artes'
  });

  const filteredClasses = classes.filter(c => {
    return selectedGradeFilter === 'ALL' || c.gradeLevel === selectedGradeFilter;
  });

  const handleOpenNew = () => {
    setEditingClass(null);
    setFormData({
      name: '',
      gradeLevel: 'Ensino Fundamental I',
      shift: 'Matutino',
      room: 'Sala 201 - Bloco A',
      year: 2026,
      headTeacherId: staff[0]?.id || '',
      maxCapacity: 25,
      subjects: 'Língua Portuguesa, Matemática, História, Geografia, Ciências, Princípios Cristãos, Arte, Educação Física'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: SchoolClass) => {
    setEditingClass(c);
    setFormData({
      name: c.name,
      gradeLevel: c.gradeLevel,
      shift: c.shift,
      room: c.room,
      year: c.year,
      headTeacherId: c.headTeacherId,
      maxCapacity: c.maxCapacity,
      subjects: c.subjects.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = staff.find(s => s.id === formData.headTeacherId);
    const teacherName = teacher ? teacher.name : 'Professor a definir';
    const subjectsList = formData.subjects.split(',').map(s => s.trim()).filter(Boolean);

    if (editingClass) {
      updateClass({
        ...editingClass,
        name: formData.name,
        gradeLevel: formData.gradeLevel,
        shift: formData.shift,
        room: formData.room,
        year: formData.year,
        headTeacherId: formData.headTeacherId,
        headTeacherName: teacherName,
        maxCapacity: Number(formData.maxCapacity),
        subjects: subjectsList
      });
    } else {
      addClass({
        name: formData.name,
        gradeLevel: formData.gradeLevel,
        shift: formData.shift,
        room: formData.room,
        year: formData.year,
        headTeacherId: formData.headTeacherId,
        headTeacherName: teacherName,
        maxCapacity: Number(formData.maxCapacity),
        currentStudentsCount: 0,
        subjects: subjectsList
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500">Filtrar por Nível:</span>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedGradeFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedGradeFilter === lvl 
                    ? 'bg-[#0E4B47] text-[#F6E5B8]' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lvl === 'ALL' ? 'Todos os Níveis' : lvl}
              </button>
            ))}
          </div>
        </div>

        <button
          id="add-class-btn"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Nova Turma
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClasses.map((c) => {
          const classStudents = students.filter(s => s.classId === c.id);
          const studentCount = classStudents.length;
          const capacityPercent = Math.min(Math.round((studentCount / c.maxCapacity) * 100), 100);

          return (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-gray-200/90 shadow-xs hover:border-[#0E4B47] transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D23] bg-[#FAF3DC] px-2 py-0.5 rounded-md">
                      {c.gradeLevel}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 mt-1.5">
                      {c.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1 text-gray-400 hover:text-blue-600 rounded-md hover:bg-gray-100"
                    title="Editar Turma"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Info tags */}
                <div className="mt-4 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0E4B47]" />
                    <span>Regente: <strong>{c.headTeacherName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Turno: <strong>{c.shift}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Local: <strong>{c.room}</strong></span>
                  </div>
                </div>

                {/* Capacity progress */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600">Matrículas Ativas</span>
                    <span className="text-[#0D4B46] font-bold">
                      {studentCount} / {c.maxCapacity} alunos ({capacityPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        capacityPercent >= 90 ? 'bg-amber-500' : 'bg-[#0E4B47]'
                      }`}
                      style={{ width: `${capacityPercent}%` }}
                    />
                  </div>
                </div>

                {/* Subjects pill list */}
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-gray-500 block mb-1">
                    Disciplinas ({c.subjects.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                    {c.subjects.map((subj, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#F0F5F4] text-[#0D4B46] font-medium border border-[#D5E5E3]"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action buttons */}
              <div className="mt-5 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                <button
                  id={`btn-att-${c.id}`}
                  onClick={() => onGoToAttendance(c.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#E8F3F1] text-[#0E4B47] font-bold hover:bg-[#d6eae7] transition-colors"
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>Diário & Chamada</span>
                </button>
                <button
                  id={`btn-grades-${c.id}`}
                  onClick={() => onGoToGrades(c.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#FAF3DC] text-[#6D4F11] font-bold hover:bg-[#f3e9c9] transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Notas & Boletins</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="p-5 bg-[#093633] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F6E5B8]" />
                <h3 className="font-bold text-base text-white">
                  {editingClass ? 'Editar Turma' : 'Cadastrar Nova Turma'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-emerald-200 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Nome da Turma *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 3º Ano Fundamental I - Turma Ester"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Nível de Ensino *</label>
                  <select
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value as GradeLevel })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Educação Infantil">Educação Infantil</option>
                    <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                    <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                    <option value="Ensino Médio">Ensino Médio</option>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Sala / Bloco *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sala 203 - Bloco A"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Capacidade Máxima *</label>
                  <input
                    type="number"
                    required
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Professor(a) Regente / Titular *</label>
                <select
                  value={formData.headTeacherId}
                  onChange={(e) => setFormData({ ...formData, headTeacherId: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                >
                  {staff.map(st => (
                    <option key={st.id} value={st.id}>{st.name} ({st.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Disciplinas da Grade Curricular (separadas por vírgula)</label>
                <textarea
                  rows={3}
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  placeholder="Ex: Língua Portuguesa, Matemática, História, Princípios Cristãos, Artes..."
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold text-xs hover:bg-[#0a3834] transition-colors shadow-xs"
                >
                  {editingClass ? 'Salvar Turma' : 'Criar Turma'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
