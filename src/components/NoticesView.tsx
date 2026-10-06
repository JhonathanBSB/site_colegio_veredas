import React, { useState } from 'react';
import {
  BellRing,
  Calendar,
  Sparkles,
  Plus,
  Pin,
  Clock,
  MapPin,
  X,
  Trash2,
  Users
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { SchoolNotice, SchoolEvent } from '../types';

export const NoticesView: React.FC = () => {
  const { notices, events, addNotice, deleteNotice, addEvent } = useSchool();

  const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Form states
  const [noticeFormData, setNoticeFormData] = useState({
    title: '',
    content: '',
    verse: '',
    category: 'Geral' as SchoolNotice['category'],
    targetAudience: 'Todos' as SchoolNotice['targetAudience'],
    author: 'Dra. Eunice Veredas (Diretoria)',
    pinned: false
  });

  const [eventFormData, setEventFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    location: 'Auditório Principal Veredas',
    type: 'Culto / Espiritual' as SchoolEvent['type'],
    description: ''
  });

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice({
      ...noticeFormData,
      publishDate: new Date().toISOString().split('T')[0]
    });
    setIsNoticeModalOpen(false);
    setNoticeFormData({
      title: '',
      content: '',
      verse: '',
      category: 'Geral',
      targetAudience: 'Todos',
      author: 'Dra. Eunice Veredas (Diretoria)',
      pinned: false
    });
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(eventFormData);
    setIsEventModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Switcher & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/90 shadow-xs">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-xs font-bold transition-all ${
              activeTab === 'notices'
                ? 'bg-white text-[#0D4B46] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BellRing className="w-3.5 h-3.5 text-[#0D4B46]" />
            <span>Mural de Comunicados ({notices.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-white text-[#0D4B46] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#0D4B46]" />
            <span>Agenda & Eventos Escolares ({events.length})</span>
          </button>
        </div>

        {activeTab === 'notices' ? (
          <button
            id="btn-add-notice"
            onClick={() => setIsNoticeModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Publicar Novo Comunicado
          </button>
        ) : (
          <button
            id="btn-add-event"
            onClick={() => setIsEventModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E4B47] hover:bg-[#0a3834] text-[#FDF4D4] font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Adicionar Evento à Agenda
          </button>
        )}
      </div>

      {/* VIEW 1: NOTICES */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                n.pinned ? 'border-[#D1BA78] bg-[#FAF8F2]' : 'border-gray-200/90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      n.category === 'Espiritual' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                      n.category === 'Pedagógico' ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                      n.category === 'Urgente' ? 'bg-rose-100 text-rose-900 border border-rose-200' :
                      'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}>
                      {n.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      Público: {n.targetAudience}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {n.pinned && (
                      <Pin className="w-3.5 h-3.5 text-[#8C6D23] fill-[#8C6D23]" title="Fixado pela Diretoria" />
                    )}
                    <button
                      onClick={() => deleteNotice(n.id)}
                      className="p-1 text-gray-400 hover:text-rose-600 rounded-md"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-gray-900 mt-3 leading-snug">
                  {n.title}
                </h3>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                  {n.content}
                </p>

                {n.verse && (
                  <div className="mt-3 p-3 rounded-lg bg-[#FAF3DC]/60 border border-[#D1BA78]/50 text-[#6D4F11] text-xs italic">
                    <div className="flex items-center gap-1 font-bold not-italic text-[10px] uppercase text-[#8C6D23] mb-1">
                      <Sparkles className="w-3 h-3 text-[#8C6D23]" />
                      Edificação Bíblica
                    </div>
                    "{n.verse}"
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
                <span>Por: <strong>{n.author}</strong></span>
                <span>{new Date(n.publishDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: EVENTS */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-[#0E4B47] transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#0D4B46] bg-[#E8F3F1] px-2.5 py-1 rounded-md">
                    {new Date(ev.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {ev.type}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-gray-900 leading-snug mt-2">
                  {ev.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {ev.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Horário: <strong>{ev.time}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Local: <strong>{ev.location}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#0D4B46] flex items-center gap-2">
                <BellRing className="w-5 h-5 text-[#8C6D23]" />
                Publicar Comunicado Escolar
              </h3>
              <button onClick={() => setIsNoticeModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Título do Comunicado *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Culto em Ação de Graças pela Primavera"
                  value={noticeFormData.title}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Categoria *</label>
                  <select
                    value={noticeFormData.category}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, category: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Geral">Geral</option>
                    <option value="Espiritual">Espiritual</option>
                    <option value="Pedagógico">Pedagógico</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Público Alvo *</label>
                  <select
                    value={noticeFormData.targetAudience}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, targetAudience: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Pais e Alunos">Pais e Alunos</option>
                    <option value="Professores">Professores</option>
                    <option value="Coordenação">Coordenação</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Conteúdo do Comunicado *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escreva aqui a circular ou comunicado oficial..."
                  value={noticeFormData.content}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, content: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Versículo Bíblico Inspirador (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Provérbios 3:5-6 ou Salmos 23:1"
                  value={noticeFormData.verse}
                  onChange={(e) => setNoticeFormData({ ...noticeFormData, verse: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={noticeFormData.pinned}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, pinned: e.target.checked })}
                    className="rounded-sm text-[#0E4B47] focus:ring-[#0E4B47]"
                  />
                  <span>Fixar no topo do mural institucional</span>
                </label>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold hover:bg-[#0a3834]"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#0D4B46] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#8C6D23]" />
                Adicionar Evento à Agenda
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Título do Evento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Culto da Família Veredas"
                  value={eventFormData.title}
                  onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Data *</label>
                  <input
                    type="date"
                    required
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Horário *</label>
                  <input
                    type="text"
                    required
                    placeholder="19:00"
                    value={eventFormData.time}
                    onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Tipo *</label>
                  <select
                    value={eventFormData.type}
                    onChange={(e) => setEventFormData({ ...eventFormData, type: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  >
                    <option value="Culto / Espiritual">Culto / Espiritual</option>
                    <option value="Acadêmico">Acadêmico</option>
                    <option value="Reunião de Pais">Reunião de Pais</option>
                    <option value="Festivo / Comemorativo">Festivo / Comemorativo</option>
                    <option value="Recesso">Recesso Escolar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Local *</label>
                  <input
                    type="text"
                    required
                    placeholder="Auditório / Quadra"
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Descrição</label>
                <textarea
                  rows={3}
                  value={eventFormData.description}
                  onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-hidden focus:border-[#0E4B47]"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0E4B47] text-[#FDF4D4] font-bold hover:bg-[#0a3834]"
                >
                  Agendar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
