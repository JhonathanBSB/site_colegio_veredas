import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Award, 
  Users, 
  Send,
  ArrowUpRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { VeredasLogo } from './VeredasLogo';
import { useSchool } from '../context/SchoolContext';

interface LandingPageViewProps {
  onOpenAuth: (role: 'guardian' | 'admin') => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onOpenAuth }) => {
  const { notices, events } = useSchool();

  // Contact / Visit Request Form State
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    studentName: '',
    gradeLevel: 'Educação Infantil',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        parentName: '',
        phone: '',
        email: '',
        studentName: '',
        gradeLevel: 'Educação Infantil',
        message: ''
      });
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-[#0D4B46] selection:text-white">
      {/* Top Banner Notice */}
      <div className="bg-[#072927] text-emerald-100 px-4 py-2 text-xs text-center border-b border-[#0e4b47] flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#D1BA78] animate-pulse" />
        <span className="font-semibold text-[#F6E5B8]">Matrículas Abertas para o Ano Letivo 2026:</span>
        <span className="hidden sm:inline">Vagas limitadas da Educação Infantil ao Ensino Médio.</span>
        <button 
          onClick={() => scrollToSection('contato')}
          className="text-[#FAF3DC] underline hover:text-white ml-2 font-bold cursor-pointer"
        >
          Agende sua visita institucional &rarr;
        </button>
      </div>

      {/* Institutional Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Official Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-3"
          >
            <VeredasLogo size={52} showText={true} variant="dark" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            <button 
              onClick={() => scrollToSection('sobre')}
              className="hover:text-[#0D4B46] transition-colors cursor-pointer"
            >
              Sobre o Colégio
            </button>
            <button 
              onClick={() => scrollToSection('niveis')}
              className="hover:text-[#0D4B46] transition-colors cursor-pointer"
            >
              Níveis de Ensino
            </button>
            <button 
              onClick={() => scrollToSection('pedagogico')}
              className="hover:text-[#0D4B46] transition-colors cursor-pointer"
            >
              Proposta & Valores
            </button>
            <button 
              onClick={() => scrollToSection('comunicados')}
              className="hover:text-[#0D4B46] transition-colors cursor-pointer"
            >
              Comunicados & Eventos
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="hover:text-[#0D4B46] transition-colors cursor-pointer"
            >
              Fale Conosco
            </button>
          </nav>

          {/* Action Login Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              id="btn-nav-portal-pais"
              onClick={() => onOpenAuth('guardian')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-[#0D4B46] hover:bg-[#093633] text-[#FAF3DC] text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#F6E5B8]" />
              <span>Portal dos Pais</span>
            </button>

            <button
              id="btn-nav-portal-admin"
              onClick={() => onOpenAuth('admin')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-gray-200"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D4B46]" />
              <span>Gestão</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-radial from-[#0e4b47] via-[#093633] to-[#062422] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-[#166059]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 rounded-full bg-[#D1BA78]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3DC]/15 border border-[#FAF3DC]/30 text-[#F6E5B8] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#F6E5B8]" />
                <span>Tradição, Sabedoria e Fé Cristã</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-crest">
                Educação de Alta Performance com{' '}
                <span className="text-[#F6E5B8] underline decoration-[#D1BA78]/60 decoration-wavy">
                  Cosmovisão Bíblica
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Guiando cada educando por veredas de sabedoria, rigor acadêmico e formação moral sólida — 
                da Primeira Infância à preparação para as melhores universidades do país.
              </p>

              {/* Biblical Anchor Quote */}
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs max-w-xl mx-auto lg:mx-0">
                <p className="text-sm sm:text-base italic text-[#FAF3DC] font-medium leading-snug">
                  "Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele."
                </p>
                <span className="text-xs text-emerald-200 block text-right mt-1 font-bold">
                  — Provérbios 22:6
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenAuth('guardian')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FAF3DC] hover:bg-white text-[#0D4B46] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <GraduationCap className="w-5 h-5 text-[#0D4B46]" />
                  <span>Acessar Portal dos Pais</span>
                  <ChevronRight className="w-4 h-4 text-[#0D4B46]" />
                </button>

                <button
                  onClick={() => scrollToSection('contato')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-semibold text-sm sm:text-base border border-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Agendar Visita com a Coordenação</span>
                </button>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#FAF3DC] flex items-center justify-center text-[#0D4B46]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Pilares de Excelência</h3>
                      <p className="text-[11px] text-emerald-200">Reconhecimento Educacional em MG</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF3DC]/20 text-[#F6E5B8]">
                    Desde 2014
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F6E5B8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Metodologia Bernoulli & Robótica</h4>
                      <p className="text-[11px] text-emerald-100/80">
                        Material didático líder no ENEM aliado a laboratórios modernos e oficinas práticas.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F6E5B8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Cosmovisão Cristã em Todas as Disciplinas</h4>
                      <p className="text-[11px] text-emerald-100/80">
                        Ciência, História e Sociedade analisadas sob a ótica da Verdade Bíblica e da integridade.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F6E5B8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Parceria Ativa Família & Escola</h4>
                      <p className="text-[11px] text-emerald-100/80">
                        Acompanhamento pastoral, plantões pedagógicos individualizados e transparência total.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct quick portal banner inside card */}
                <div className="pt-2">
                  <div className="p-3 rounded-xl bg-[#072a27]/90 border border-[#D1BA78]/40 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#F6E5B8] font-semibold">Já faz parte da família Veredas?</span>
                      <p className="text-xs text-white font-bold">Consulte boletins, presenças e mensalidades</p>
                    </div>
                    <button
                      onClick={() => onOpenAuth('guardian')}
                      className="px-3 py-1.5 rounded-lg bg-[#D1BA78] hover:bg-[#FAF3DC] text-[#0D4B46] text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      Acessar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Statistics Strip */}
      <section className="bg-[#FAF3DC] border-y border-[#E9DCB5] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46]">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">Aprovação em Universidades</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46]">4 Níveis</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">Infantil ao Ensino Médio</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46]">12+ Anos</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">Formando Gerações com Princípios</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46]">Top 5%</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">Desempenho no ENEM Regional</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D4B46]/10 text-[#0D4B46] text-xs font-bold uppercase tracking-wider">
              <span>Nossa Identidade & Vocação</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46] font-crest tracking-tight">
              Uma escola confessional cristã comprometida com a sabedoria e a verdade
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              O <strong>Colégio Cristão Veredas</strong> nasceu com o firme propósito de unir a mais 
              alta qualidade pedagógica ao ensino de valores cristãos inegociáveis. Acreditamos que a 
              verdadeira educação não apenas transmite conteúdos científicos, mas molda o coração e 
              o caráter da criança para toda a vida.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Nosso corpo docente é formado por educadores vocacionados, que além de pós-graduados e 
              especialistas em suas respectivas áreas do conhecimento, oram diariamente por seus alunos 
              e os tratam com respeito, disciplina afetuosa e zelo individual.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="font-bold text-sm text-[#0D4B46] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#D1BA78]" />
                  <span>Nossa Missão</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Formar líderes servos, intelectualmente competentes e moralmente íntegros, que impactem a sociedade.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="font-bold text-sm text-[#0D4B46] flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#D1BA78]" />
                  <span>Nossa Visão</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Ser referência estadual em educação básica de excelência, integrando fé, ciência e família.
                </p>
              </div>
            </div>
          </div>

          {/* Graphical Feature Box */}
          <div className="bg-[#093633] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden border border-[#0D4B46]">
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <VeredasLogo size={240} showText={false} variant="light" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#F6E5B8]">
              Educação por Princípios
            </span>
            <h3 className="text-2xl font-bold font-crest leading-snug">
              Os 4 Pilares da Vereda do Justo
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DC]/15 flex items-center justify-center font-bold text-[#F6E5B8] text-xs shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white">Soberania & Verdade Revelada</h4>
                  <p className="text-xs text-emerald-100/80">Deus como Criador e sustentador de todas as ciências, artes e leis naturais.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DC]/15 flex items-center justify-center font-bold text-[#F6E5B8] text-xs shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white">Caráter & Autogoverno</h4>
                  <p className="text-xs text-emerald-100/80">Desenvolvimento da responsabilidade pessoal, honestidade e perseverança nos estudos.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DC]/15 flex items-center justify-center font-bold text-[#F6E5B8] text-xs shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white">Rigor & Curiosidade Científica</h4>
                  <p className="text-xs text-emerald-100/80">Estudo diligente, raciocínio lógico formal e incentivo diário à leitura e à escrita.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DC]/15 flex items-center justify-center font-bold text-[#F6E5B8] text-xs shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-white">Mordomia & Amor ao Próximo</h4>
                  <p className="text-xs text-emerald-100/80">Cuidado com o ambiente escolar, empatia cristã e serviço dedicado à comunidade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Levels of Education */}
      <section id="niveis" className="py-16 bg-gray-50 border-y border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D4B46]">
              Jornada Pedagógica Completa
            </span>
            <h2 className="text-3xl font-extrabold text-[#0D4B46] font-crest">
              Nossos Níveis de Ensino
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Cada fase do crescimento infantil e juvenil recebe atenção especializada, respeitando 
              o desenvolvimento cognitivo e emocional dos estudantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Educação Infantil */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">
                  🌱
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">Maternal ao 2º Período</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">Educação Infantil</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ambiente acolhedor e seguro onde os pequenos desenvolvem a linguagem, a coordenação psicomotora, 
                  princípios de convivência bíblica e o encanto pelas primeiras descobertas.
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Iniciação musical e artes</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Histórias bíblicas dramatizadas</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Turno vespertino e integral</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#0D4B46]">Turmas reduzidas</span>
              </div>
            </div>

            {/* Ensino Fundamental I */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
                  📚
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">1º ao 5º Ano</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">Fundamental I</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Foco na alfabetização plena, matemática reflexiva e formação de hábitos de estudo consistentes. 
                  Início do programa bilíngue com abordagem contextualizada.
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sistema Bernoulli inicial</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Oficinas de redação e oratória</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Feira cultural anual</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#0D4B46]">Turno Matutino</span>
              </div>
            </div>

            {/* Ensino Fundamental II */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xl">
                  🔬
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide">6º ao 9º Ano</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">Fundamental II</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Aprofundamento científico e transição crítica. O aluno aprende a articular ideias com lógica, 
                  debater temas contemporâneos à luz dos princípios cristãos e utilizar laboratórios.
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Física e Química introdutória</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Olimpíadas de Matemática</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cosmovisão Cristã & Ética</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#0D4B46]">Turno Matutino</span>
              </div>
            </div>

            {/* Ensino Médio */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xl">
                  🎓
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wide">1ª a 3ª Série</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">Ensino Médio</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Foco na excelência para o ENEM e vestibulares mais concorridos (UFMG, USP, federais). 
                  Acompanhamento de carreira e fortalecimento da maturidade emocional e espiritual.
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Simulados Bernoulli periódicos</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Redação com correção nota 1000</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mentoria vocacional cristã</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <span className="text-xs font-bold text-[#0D4B46]">Turno Matutino</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notices & Events Live Section */}
      <section id="comunicados" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D4B46]">
              Vida Comunitária & Escolares
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46] font-crest mt-1">
              Últimos Comunicados & Próximos Eventos
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Fique por dentro das datas especiais, reuniões e circulares da nossa direção.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth('guardian')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D4B46] hover:underline cursor-pointer"
          >
            <span>Ver todos no Portal dos Pais</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Notices List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D4B46]" />
              Mural de Comunicados Oficiais
            </h3>

            {notices.slice(0, 3).map((notice) => (
              <div 
                key={notice.id}
                className="p-5 rounded-xl bg-white border border-gray-200/90 shadow-xs hover:border-[#0D4B46]/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    notice.category === 'Espiritual' ? 'bg-amber-100 text-amber-800' :
                    notice.category === 'Pedagógico' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {notice.publishDate}
                  </span>
                </div>

                <h4 className="text-base font-bold text-gray-900 mb-1.5">
                  {notice.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {notice.content}
                </p>

                {notice.verse && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#FAF3DC]/60 border border-[#E9DCB5] text-[11px] text-[#8C6D23] italic">
                    {notice.verse}
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                  Publicado por: {notice.author}
                </div>
              </div>
            ))}
          </div>

          {/* Calendar & Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D1BA78]" />
              Agenda Escolar & Cultos
            </h3>

            <div className="space-y-3">
              {events.slice(0, 4).map((ev) => (
                <div 
                  key={ev.id}
                  className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs flex items-start gap-3.5"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#F0F6F5] text-[#0D4B46] border border-[#D5E5E3] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold text-[#0D4B46]/70">
                      {new Date(ev.date).toLocaleDateString('pt-BR', { month: 'short' })}
                    </span>
                    <span className="text-base font-extrabold leading-none">
                      {ev.date.split('-')[2]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#D1BA78] uppercase tracking-wide">
                      {ev.type}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                      {ev.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                      {ev.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Visit Schedule Section */}
      <section id="contato" className="py-20 bg-[#F0F6F5] border-t border-[#D5E5E3] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0D4B46]">
                Atendimento & Visitas
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D4B46] font-crest">
                Venha conhecer o campus do Colégio Cristão Veredas
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Nossa equipe de coordenação e admissões terá grande prazer em apresentar as 
                instalações da escola, a grade curricular e a proposta pedagógica à sua família.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200">
                  <MapPin className="w-5 h-5 text-[#0D4B46] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Endereço do Campus</div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      Alameda das Acácias, 1050 — Bairro Jardim Floresta<br />
                      Belo Horizonte - MG • CEP: 31270-000
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200">
                  <Phone className="w-5 h-5 text-[#0D4B46] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Telefones & WhatsApp</div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      (31) 3456-7890 (Secretaria Geral)<br />
                      (31) 98722-1000 (Atendimento / Matrículas WhatsApp)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200">
                  <Mail className="w-5 h-5 text-[#0D4B46] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Canais de E-mail</div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      atendimento@colegiocristaoveredas.com.br<br />
                      secretaria@colegiocristaoveredas.com.br
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white border border-gray-200">
                  <Clock className="w-5 h-5 text-[#0D4B46] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Horário de Funcionamento</div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      Segunda a Sexta: 07:00 às 18:00<br />
                      Plantão aos Sábados (sob agendamento): 08:30 às 12:00
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-[#0D4B46] font-crest mb-1">
                  Agende sua Visita Institucional
                </h3>
                <p className="text-xs text-gray-600 mb-6">
                  Preencha o formulário abaixo e nossa secretaria entrará em contato em até 24 horas úteis.
                </p>

                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-[#F0F6F5] border border-[#0D4B46]/30 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#0D4B46] text-[#FAF3DC] flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-[#0D4B46]">Solicitação Recebida com Sucesso!</h4>
                    <p className="text-xs text-gray-700 max-w-md mx-auto leading-relaxed">
                      Louvamos a Deus pelo seu interesse na Família Veredas. Nossa equipe de admissões entrará em contato pelo WhatsApp informado para confirmar o dia e horário da visita.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitContact} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Nome do Pai / Responsável *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="Ex: Carlos Eduardo Silva"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          WhatsApp / Telefone para Contato *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(31) 99999-8888"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="responsavel@email.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Nome do(a) Aluno(a)
                        </label>
                        <input
                          type="text"
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          placeholder="Ex: Gabriel Silva"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Série ou Nível de Interesse
                      </label>
                      <select
                        value={formData.gradeLevel}
                        onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] outline-hidden bg-white"
                      >
                        <option value="Educação Infantil">Educação Infantil (Maternal ao 2º Período)</option>
                        <option value="Fundamental I">Ensino Fundamental I (1º ao 5º Ano)</option>
                        <option value="Fundamental II">Ensino Fundamental II (6º ao 9º Ano)</option>
                        <option value="Ensino Médio">Ensino Médio (1ª a 3ª Série)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Mensagem ou Dúvidas
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Gostaria de conhecer o campus e tirar dúvidas sobre turnos e valores..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#0D4B46]/30 focus:border-[#0D4B46] outline-hidden resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-[#0D4B46] hover:bg-[#093633] text-[#FAF3DC] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#D1BA78]" />
                      <span>Enviar Solicitação de Visita</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-[#072927] text-white border-t border-[#0e4b47] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <VeredasLogo size={48} showText={true} variant="light" />
              <p className="text-xs text-emerald-100/80 max-w-md leading-relaxed mt-2">
                Instituição Confessional Cristã de Educação Básica credenciada junto à Secretaria Estadual 
                de Educação de Minas Gerais. Formando mente e coração com excelência e temor ao Senhor.
              </p>
              <div className="pt-2 text-xs text-[#FAF3DC] italic">
                "O temor do Senhor é o princípio da sabedoria." — Provérbios 9:10
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#F6E5B8] uppercase tracking-wider mb-3">
                Acesso Restrito
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/80">
                <li>
                  <button 
                    onClick={() => onOpenAuth('guardian')}
                    className="hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#F6E5B8]" />
                    <span>Portal dos Pais & Responsáveis</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenAuth('admin')}
                    className="hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Sistema de Gestão (Colaborador)</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#F6E5B8] uppercase tracking-wider mb-3">
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/80">
                <li>
                  <button onClick={() => scrollToSection('sobre')} className="hover:text-white cursor-pointer">
                    Sobre o Colégio
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('niveis')} className="hover:text-white cursor-pointer">
                    Níveis de Ensino
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('comunicados')} className="hover:text-white cursor-pointer">
                    Mural de Comunicados
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contato')} className="hover:text-white cursor-pointer">
                    Agendamento de Visitas
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#0e4b47] flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-200/60 gap-3">
            <div>
              © {new Date().getFullYear()} Colégio Cristão Veredas. Todos os direitos reservados.
            </div>
            <div>
              Educação que transforma gerações através da verdade eterna.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
