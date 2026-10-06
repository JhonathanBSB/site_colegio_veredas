import React, { useState } from 'react';
import {
  ClipboardCheck,
  GraduationCap,
  Calendar,
  CheckCircle,
  Save,
  Printer,
  BookOpen,
  UserCheck,
  UserX,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { DailyAttendance, StudentReportCard, AttendanceEntry, SubjectGrades } from '../types';

interface AcademicViewProps {
  initialClassId?: string;
  onPrintReportCard: (reportCard: StudentReportCard) => void;
}

export const AcademicView: React.FC<AcademicViewProps> = ({
  initialClassId,
  onPrintReportCard
}) => {
  const { classes, students, attendances, reportCards, saveAttendance, saveReportCard } = useSchool();

  const [activeTab, setActiveTab] = useState<'attendance' | 'grades'>('attendance');

  // Attendance state
  const [selectedAttendanceClassId, setSelectedAttendanceClassId] = useState(
    initialClassId || classes[1]?.id || classes[0]?.id || ''
  );
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceSubject, setAttendanceSubject] = useState('');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  const currentAttendanceClass = classes.find(c => c.id === selectedAttendanceClassId);
  const classStudents = students.filter(s => s.classId === selectedAttendanceClassId);

  // Local attendance entries map
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'P' | 'F' | 'FJ'>>({});

  // Grades state
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const currentReportCard = reportCards.find(r => r.studentId === selectedStudentId) || {
    studentId: selectedStudent?.id || '',
    studentName: selectedStudent?.name || '',
    ra: selectedStudent?.ra || '',
    classId: selectedStudent?.classId || '',
    className: selectedStudent?.className || '',
    year: 2026,
    overallAttendancePercentage: 96,
    grades: (currentAttendanceClass?.subjects || ['Língua Portuguesa', 'Matemática', 'Ciências', 'Princípios Cristãos']).map(sub => ({
      subject: sub,
      b1: 8.0,
      b2: 8.5,
      b3: 9.0,
      b4: null,
      average: 8.5,
      status: 'Aprovado' as const
    }))
  };

  const [editableGrades, setEditableGrades] = useState<SubjectGrades[]>(currentReportCard.grades);

  // Update subject list when class changes
  React.useEffect(() => {
    if (currentAttendanceClass && currentAttendanceClass.subjects.length > 0) {
      setAttendanceSubject(currentAttendanceClass.subjects[0]);
    }
  }, [selectedAttendanceClassId]);

  // Sync attendance entries when class or date changes
  React.useEffect(() => {
    const existing = attendances.find(
      a => a.classId === selectedAttendanceClassId && a.date === attendanceDate && a.subject === attendanceSubject
    );

    const newMap: Record<string, 'P' | 'F' | 'FJ'> = {};
    classStudents.forEach(st => {
      const entry = existing?.entries.find(e => e.studentId === st.id);
      newMap[st.id] = entry ? entry.status : 'P';
    });
    setAttendanceMap(newMap);
  }, [selectedAttendanceClassId, attendanceDate, attendanceSubject]);

  // Sync report card when student selection changes
  React.useEffect(() => {
    if (currentReportCard) {
      setEditableGrades(currentReportCard.grades);
    }
  }, [selectedStudentId, reportCards]);

  const handleSetAllStatus = (status: 'P' | 'F') => {
    const updated: Record<string, 'P' | 'F' | 'FJ'> = {};
    classStudents.forEach(st => {
      updated[st.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSaveAttendance = () => {
    const entries: AttendanceEntry[] = classStudents.map(st => ({
      studentId: st.id,
      studentName: st.name,
      status: attendanceMap[st.id] || 'P'
    }));

    const attendanceRecord: DailyAttendance = {
      id: `att-${Date.now()}`,
      classId: selectedAttendanceClassId,
      date: attendanceDate,
      subject: attendanceSubject,
      teacherName: currentAttendanceClass?.headTeacherName || 'Professor Responsável',
      entries
    };

    saveAttendance(attendanceRecord);
    setSavedSuccessMsg('Chamada registrada com sucesso no Diário Oficial!');
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  const handleGradeChange = (index: number, bimester: 'b1' | 'b2' | 'b3' | 'b4', val: string) => {
    const num = val === '' ? null : Math.max(0, Math.min(10, parseFloat(val)));
    const updated = [...editableGrades];
    updated[index] = {
      ...updated[index],
      [bimester]: num
    };

    // Recalculate average
    const validScores = [updated[index].b1, updated[index].b2, updated[index].b3, updated[index].b4].filter(
      (v): v is number => v !== null && !isNaN(v)
    );
    const avg = validScores.length > 0 
      ? Math.round((validScores.reduce((a, b) => a + b, 0) / validScores.length) * 10) / 10 
      : 0;
    
    updated[index].average = avg;
    updated[index].status = avg >= 7.0 ? 'Aprovado' : avg >= 5.0 ? 'Recuperação' : 'Reprovado';

    setEditableGrades(updated);
  };

  const handleSaveGrades = () => {
    if (!selectedStudent) return;
    const updatedCard: StudentReportCard = {
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      ra: selectedStudent.ra,
      classId: selectedStudent.classId,
      className: selectedStudent.className,
      year: 2026,
      overallAttendancePercentage: currentReportCard.overallAttendancePercentage || 96,
      grades: editableGrades
    };

    saveReportCard(updatedCard);
    setSavedSuccessMsg('Notas atualizadas e boletim consolidado com sucesso!');
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex bg-white p-1 rounded-xl border border-gray-200/90 shadow-xs max-w-md">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'attendance'
              ? 'bg-[#0E4B47] text-[#FDF4D4] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Diário de Presença / Frequência</span>
        </button>
        <button
          onClick={() => setActiveTab('grades')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'grades'
              ? 'bg-[#0E4B47] text-[#FDF4D4] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Lançamento de Notas & Boletim</span>
        </button>
      </div>

      {savedSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* VIEW 1: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Turma</label>
              <select
                value={selectedAttendanceClassId}
                onChange={(e) => setSelectedAttendanceClassId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#0E4B47]"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.shift})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Disciplina</label>
              <select
                value={attendanceSubject}
                onChange={(e) => setAttendanceSubject(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#0E4B47]"
              >
                {currentAttendanceClass?.subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Data da Aula</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#0E4B47]"
              />
            </div>
          </div>

          {/* Action row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Ações em massa:</span>
              <button
                type="button"
                onClick={() => handleSetAllStatus('P')}
                className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold hover:bg-emerald-100"
              >
                Todos Presentes
              </button>
              <button
                type="button"
                onClick={() => handleSetAllStatus('F')}
                className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-xs font-semibold hover:bg-rose-100"
              >
                Limpar Presenças
              </button>
            </div>

            <button
              id="save-attendance-btn"
              onClick={handleSaveAttendance}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-bold text-xs shadow-xs"
            >
              <Save className="w-4 h-4" />
              Salvar Diário de Frequência
            </button>
          </div>

          {/* Student attendance list */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 text-[11px] font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Aluno / RA</th>
                  <th className="py-3 px-4 text-center">Presença [P]</th>
                  <th className="py-3 px-4 text-center">Falta [F]</th>
                  <th className="py-3 px-4 text-center">Falta Justificada [FJ]</th>
                  <th className="py-3 px-4 text-right">Status do Dia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      Nenhum aluno matriculado nesta turma ainda.
                    </td>
                  </tr>
                ) : (
                  classStudents.map(st => {
                    const status = attendanceMap[st.id] || 'P';
                    return (
                      <tr key={st.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-900">{st.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono">RA: {st.ra}</div>
                        </td>

                        {/* Presença */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'P' })}
                            className={`w-9 h-8 rounded-lg font-bold transition-colors ${
                              status === 'P'
                                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            P
                          </button>
                        </td>

                        {/* Falta */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'F' })}
                            className={`w-9 h-8 rounded-lg font-bold transition-colors ${
                              status === 'F'
                                ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            F
                          </button>
                        </td>

                        {/* Falta Justificada */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'FJ' })}
                            className={`px-2.5 h-8 rounded-lg font-bold text-[11px] transition-colors ${
                              status === 'FJ'
                                ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            FJ
                          </button>
                        </td>

                        {/* Label */}
                        <td className="py-3 px-4 text-right">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            status === 'P' ? 'bg-emerald-100 text-emerald-800' :
                            status === 'F' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {status === 'P' ? 'Presente' : status === 'F' ? 'Falta' : 'Falta Justificada'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: GRADES & REPORT CARD */}
      {activeTab === 'grades' && (
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 space-y-6">
          {/* Header student select */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Selecionar Aluno para Boletim</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#0E4B47] min-w-[280px]"
              >
                {students.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.className})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPrintReportCard(currentReportCard)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF3DC] text-[#6D4F11] font-bold text-xs border border-[#D1BA78] hover:bg-[#faeece] transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4 text-[#8C6D23]" />
                Imprimir Boletim Escolar Oficial
              </button>
              <button
                id="save-grades-btn"
                onClick={handleSaveGrades}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold text-xs hover:bg-[#0a3834] transition-colors shadow-xs"
              >
                <Save className="w-4 h-4" />
                Salvar Notas
              </button>
            </div>
          </div>

          {/* Student header card */}
          {selectedStudent && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#093532] to-[#0E4B47] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base text-white">{selectedStudent.name}</h3>
                <p className="text-xs text-emerald-200">
                  RA: {selectedStudent.ra} • {selectedStudent.className} • Ano Letivo 2026
                </p>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  <span className="text-emerald-200 block text-[10px]">Frequência Anual</span>
                  <span className="text-sm font-bold text-[#F6E5B8]">
                    {currentReportCard.overallAttendancePercentage}%
                  </span>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  <span className="text-emerald-200 block text-[10px]">Critério de Aprovação</span>
                  <span className="text-sm font-bold text-white">Média ≥ 7.0</span>
                </div>
              </div>
            </div>
          )}

          {/* Editable Grades Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF6EC] text-[#0D4B46] border-b border-[#EAD08C]/60 text-[11px] font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Componente Curricular</th>
                  <th className="py-3 px-3 text-center">1º Bim</th>
                  <th className="py-3 px-3 text-center">2º Bim</th>
                  <th className="py-3 px-3 text-center">3º Bim</th>
                  <th className="py-3 px-3 text-center">4º Bim</th>
                  <th className="py-3 px-3 text-center">Média</th>
                  <th className="py-3 px-4 text-right">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {editableGrades.map((grade, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-800">
                      {grade.subject}
                    </td>

                    {/* B1 */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={grade.b1 ?? ''}
                        onChange={(e) => handleGradeChange(idx, 'b1', e.target.value)}
                        className="w-14 text-center p-1 rounded-md border border-gray-300 font-semibold focus:border-[#0E4B47] focus:outline-hidden"
                      />
                    </td>

                    {/* B2 */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={grade.b2 ?? ''}
                        onChange={(e) => handleGradeChange(idx, 'b2', e.target.value)}
                        className="w-14 text-center p-1 rounded-md border border-gray-300 font-semibold focus:border-[#0E4B47] focus:outline-hidden"
                      />
                    </td>

                    {/* B3 */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={grade.b3 ?? ''}
                        onChange={(e) => handleGradeChange(idx, 'b3', e.target.value)}
                        className="w-14 text-center p-1 rounded-md border border-gray-300 font-semibold focus:border-[#0E4B47] focus:outline-hidden"
                      />
                    </td>

                    {/* B4 */}
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="—"
                        value={grade.b4 ?? ''}
                        onChange={(e) => handleGradeChange(idx, 'b4', e.target.value)}
                        className="w-14 text-center p-1 rounded-md border border-gray-300 font-semibold focus:border-[#0E4B47] focus:outline-hidden"
                      />
                    </td>

                    {/* Média */}
                    <td className="py-3 px-3 text-center font-extrabold text-sm">
                      <span className={
                        (grade.average || 0) >= 7.0 ? 'text-emerald-700' :
                        (grade.average || 0) >= 5.0 ? 'text-amber-700' : 'text-rose-700'
                      }>
                        {grade.average !== undefined ? grade.average.toFixed(1) : '—'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-right">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        grade.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-800' :
                        grade.status === 'Recuperação' ? 'bg-amber-100 text-amber-800' :
                        grade.status === 'Reprovado' ? 'bg-rose-100 text-rose-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {grade.status || 'Em Curso'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
