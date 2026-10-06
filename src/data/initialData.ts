import {
  Student,
  Staff,
  SchoolClass,
  DailyAttendance,
  StudentReportCard,
  ClockRecord,
  PayrollItem,
  AccountPayable,
  TuitionInvoice,
  SchoolNotice,
  SchoolEvent
} from '../types';

export const INITIAL_CLASSES: SchoolClass[] = [
  {
    id: 'class-1',
    name: 'Maternal II - Turma Oliveiras',
    gradeLevel: 'Educação Infantil',
    shift: 'Vespertino',
    room: 'Sala 101 - Bloco Infantil',
    year: 2026,
    headTeacherId: 'staff-4',
    headTeacherName: 'Profª. Débora Silveira',
    maxCapacity: 15,
    currentStudentsCount: 12,
    subjects: ['Estimulação Psicomotora', 'Linguagem e Expressão', 'Princípios Bíblicos na Infância', 'Música e Artes']
  },
  {
    id: 'class-2',
    name: '1º Ano Fundamental I - Turma Caleb',
    gradeLevel: 'Ensino Fundamental I',
    shift: 'Matutino',
    room: 'Sala 201 - Bloco A',
    year: 2026,
    headTeacherId: 'staff-3',
    headTeacherName: 'Profª. Priscila Mendes',
    maxCapacity: 25,
    currentStudentsCount: 22,
    subjects: ['Alfabetização & Língua Portuguesa', 'Matemática Inicial', 'Ciências da Criação', 'História e Sociedade', 'Princípios Cristãos', 'Arte', 'Educação Física']
  },
  {
    id: 'class-3',
    name: '5º Ano Fundamental I - Turma Josué',
    gradeLevel: 'Ensino Fundamental I',
    shift: 'Matutino',
    room: 'Sala 204 - Bloco A',
    year: 2026,
    headTeacherId: 'staff-5',
    headTeacherName: 'Prof. Marcos Vinícius Neves',
    maxCapacity: 28,
    currentStudentsCount: 26,
    subjects: ['Língua Portuguesa', 'Matemática', 'Ciências Naturais', 'História', 'Geografia', 'Inglês', 'Princípios Cristãos & Ética', 'Educação Física']
  },
  {
    id: 'class-4',
    name: '9º Ano Fundamental II - Turma Neemias',
    gradeLevel: 'Ensino Fundamental II',
    shift: 'Matutino',
    room: 'Sala 302 - Bloco B',
    year: 2026,
    headTeacherId: 'staff-6',
    headTeacherName: 'Profª. Raquel Albuquerque',
    maxCapacity: 30,
    currentStudentsCount: 28,
    subjects: ['Língua Portuguesa & Redação', 'Matemática & Álgebra', 'Física & Química Básica', 'História', 'Geografia', 'Língua Inglesa', 'Cosmovisão Cristã', 'Educação Física']
  },
  {
    id: 'class-5',
    name: '1º Ano Ensino Médio - Turma Daniel',
    gradeLevel: 'Ensino Médio',
    shift: 'Matutino',
    room: 'Sala 401 - Bloco C',
    year: 2026,
    headTeacherId: 'staff-7',
    headTeacherName: 'Prof. Lucas Guimarães',
    maxCapacity: 32,
    currentStudentsCount: 30,
    subjects: ['Língua Portuguesa & Literatura', 'Matemática Avançada', 'Física', 'Química', 'Biologia', 'Filosofia Cristã & Sociologia', 'História Geral', 'Geografia', 'Inglês Instrumental']
  }
];

export const INITIAL_STAFF: Staff[] = [
  {
    id: 'staff-1',
    name: 'Dra. Eunice Veredas de Carvalho',
    role: 'Diretora Geral',
    department: 'Diretoria',
    cpf: '321.654.987-11',
    rg: 'MG-12.456.789',
    email: 'diretoria@colegiocristaoveredas.com.br',
    phone: '(31) 98722-1000',
    qualification: 'Doutorado em Educação / Especialista em Gestão Escolar Cristã',
    admissionDate: '2016-02-01',
    salary: 11500,
    weeklyHours: 40,
    status: 'Ativo',
    bankInfo: {
      bank: 'Banco do Brasil',
      agency: '1420-5',
      account: '34521-8',
      pixKey: 'diretoria@colegiocristaoveredas.com.br'
    }
  },
  {
    id: 'staff-2',
    name: 'Sarah Lima de Oliveira',
    role: 'Coordenadora Pedagógica',
    department: 'Pedagógico',
    cpf: '456.789.123-22',
    email: 'coordenacao@colegiocristaoveredas.com.br',
    phone: '(31) 98844-2233',
    qualification: 'Mestrado em Psicopedagogia e Neuroaprendizagem',
    admissionDate: '2018-01-15',
    salary: 6800,
    weeklyHours: 40,
    status: 'Ativo',
    bankInfo: {
      bank: 'Itaú Unibanco',
      agency: '0543',
      account: '22190-4',
      pixKey: '45678912322'
    }
  },
  {
    id: 'staff-3',
    name: 'Profª. Priscila Mendes Rocha',
    role: 'Professor(a)',
    department: 'Pedagógico',
    cpf: '789.123.456-33',
    email: 'priscila.mendes@colegiocristaoveredas.com.br',
    phone: '(31) 99122-3344',
    qualification: 'Licenciatura Plena em Pedagogia e Letras',
    admissionDate: '2020-02-10',
    salary: 4200,
    weeklyHours: 30,
    status: 'Ativo',
    subjectsTaught: ['Alfabetização & Língua Portuguesa', 'Princípios Bíblicos'],
    bankInfo: {
      bank: 'Nubank',
      agency: '0001',
      account: '8765432-1',
      pixKey: 'priscila.mendes@gmail.com'
    }
  },
  {
    id: 'staff-4',
    name: 'Profª. Débora Silveira Campos',
    role: 'Professor(a)',
    department: 'Pedagógico',
    cpf: '159.357.246-44',
    email: 'debora.campos@colegiocristaoveredas.com.br',
    phone: '(31) 99233-4455',
    qualification: 'Pedagogia com foco em Primeira Infância',
    admissionDate: '2021-03-01',
    salary: 3900,
    weeklyHours: 30,
    status: 'Ativo',
    subjectsTaught: ['Educação Infantil Maternal', 'Música e Psicomotricidade'],
    bankInfo: {
      bank: 'Bradesco',
      agency: '2311',
      account: '10988-2',
      pixKey: '15935724644'
    }
  },
  {
    id: 'staff-5',
    name: 'Prof. Marcos Vinícius Neves',
    role: 'Professor(a)',
    department: 'Pedagógico',
    cpf: '246.810.135-55',
    email: 'marcos.neves@colegiocristaoveredas.com.br',
    phone: '(31) 99344-5566',
    qualification: 'Licenciatura em Matemática e Física',
    admissionDate: '2019-08-01',
    salary: 4600,
    weeklyHours: 32,
    status: 'Ativo',
    subjectsTaught: ['Matemática', 'Geometria'],
    bankInfo: {
      bank: 'Santander',
      agency: '4321',
      account: '45091-7',
      pixKey: 'marcos.v.neves@gmail.com'
    }
  },
  {
    id: 'staff-6',
    name: 'Profª. Raquel Albuquerque',
    role: 'Professor(a)',
    department: 'Pedagógico',
    cpf: '369.258.147-66',
    email: 'raquel.albuquerque@colegiocristaoveredas.com.br',
    phone: '(31) 99455-6677',
    qualification: 'Graduação e Mestrado em Letras e Literatura / Teologia Bíblica',
    admissionDate: '2019-02-01',
    salary: 4750,
    weeklyHours: 30,
    status: 'Ativo',
    subjectsTaught: ['Língua Portuguesa & Redação', 'Cosmovisão Cristã'],
    bankInfo: {
      bank: 'Banco Inter',
      agency: '0001',
      account: '6543219-0',
      pixKey: '36925814766'
    }
  },
  {
    id: 'staff-7',
    name: 'Mariana Duarte Souza',
    role: 'Secretária Escolar',
    department: 'Secretaria',
    cpf: '582.741.963-77',
    email: 'secretaria@colegiocristaoveredas.com.br',
    phone: '(31) 99566-7788',
    qualification: 'Tecnólogo em Secretariado Escolar e Processos Gerenciais',
    admissionDate: '2017-06-15',
    salary: 3600,
    weeklyHours: 44,
    status: 'Ativo',
    bankInfo: {
      bank: 'Caixa Econômica',
      agency: '0890',
      account: '0012398-4',
      pixKey: 'secretaria@colegiocristaoveredas.com.br'
    }
  },
  {
    id: 'staff-8',
    name: 'Carlos Eduardo Barreto',
    role: 'Analista Financeiro / RH',
    department: 'Financeiro/RH',
    cpf: '741.852.963-88',
    email: 'financeiro@colegiocristaoveredas.com.br',
    phone: '(31) 99677-8899',
    qualification: 'Bacharel em Ciências Contábeis e Controladoria',
    admissionDate: '2021-01-10',
    salary: 4800,
    weeklyHours: 40,
    status: 'Ativo',
    bankInfo: {
      bank: 'Itaú Unibanco',
      agency: '3201',
      account: '55412-3',
      pixKey: 'carlos.barreto.contabil@gmail.com'
    }
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stud-1',
    name: 'Samuel Henrique Silva Ramos',
    ra: 'VRD-2026-0104',
    birthDate: '2015-04-12',
    gender: 'M',
    cpf: '123.456.789-01',
    rg: 'MG-21.908.112',
    classId: 'class-3',
    className: '5º Ano Fundamental I - Turma Josué',
    shift: 'Matutino',
    status: 'Ativo',
    enrollmentDate: '2022-01-10',
    bloodType: 'O+',
    allergies: 'Leve alergia a frutos do mar',
    medicalNotes: 'Usa óculos para leitura.',
    guardians: [
      {
        id: 'guard-1',
        name: 'Roberto Ramos de Oliveira',
        relationship: 'Pai',
        cpf: '888.777.666-55',
        profession: 'Engenheiro Civil',
        phone: '(31) 98711-2233',
        email: 'roberto.ramos@gmail.com',
        address: 'Rua das Palmeiras, 142, Bairro Jardim Imperial, Belo Horizonte - MG',
        isFinancialResponsible: true,
        isEmergencyContact: true
      },
      {
        id: 'guard-2',
        name: 'Cláudia Silva Ramos',
        relationship: 'Mãe',
        cpf: '777.666.555-44',
        profession: 'Arquiteta',
        phone: '(31) 98711-2244',
        email: 'claudia.ramos@gmail.com',
        address: 'Rua das Palmeiras, 142, Bairro Jardim Imperial, Belo Horizonte - MG',
        isFinancialResponsible: false,
        isEmergencyContact: true
      }
    ]
  },
  {
    id: 'stud-2',
    name: 'Ester Ferreira Guimarães',
    ra: 'VRD-2026-0089',
    birthDate: '2015-08-25',
    gender: 'F',
    cpf: '234.567.890-12',
    classId: 'class-3',
    className: '5º Ano Fundamental I - Turma Josué',
    shift: 'Matutino',
    status: 'Ativo',
    enrollmentDate: '2021-02-01',
    bloodType: 'A+',
    allergies: 'Intolerância severa à lactose',
    medicalNotes: 'Necessita de lanche diferenciado (sem lactose)',
    guardians: [
      {
        id: 'guard-3',
        name: 'Pastor Daniel Guimarães Filho',
        relationship: 'Pai',
        cpf: '654.321.987-00',
        profession: 'Ministro Religioso / Professor de Teologia',
        phone: '(31) 99188-4455',
        email: 'pastordaniel@igrejaveredas.com.br',
        address: 'Av. das Acácias, 890, Apto 302, Bairro Floresta, BH - MG',
        isFinancialResponsible: true,
        isEmergencyContact: true
      }
    ]
  },
  {
    id: 'stud-3',
    name: 'Lucas Benjamim Cardoso',
    ra: 'VRD-2026-0215',
    birthDate: '2019-11-03',
    gender: 'M',
    cpf: '345.678.901-23',
    classId: 'class-2',
    className: '1º Ano Fundamental I - Turma Caleb',
    shift: 'Matutino',
    status: 'Ativo',
    enrollmentDate: '2024-01-15',
    bloodType: 'B+',
    guardians: [
      {
        id: 'guard-4',
        name: 'Juliana Cardoso dos Santos',
        relationship: 'Mãe',
        cpf: '555.444.333-22',
        profession: 'Cirurgiã Dentista',
        phone: '(31) 98455-9988',
        email: 'juliana.odonto@gmail.com',
        address: 'Rua Paraíba, 450, Bairro Funcionários, Belo Horizonte - MG',
        isFinancialResponsible: true,
        isEmergencyContact: true
      }
    ]
  },
  {
    id: 'stud-4',
    name: 'Ana Beatriz Vasconcelos',
    ra: 'VRD-2026-0310',
    birthDate: '2022-03-18',
    gender: 'F',
    cpf: '456.789.012-34',
    classId: 'class-1',
    className: 'Maternal II - Turma Oliveiras',
    shift: 'Vespertino',
    status: 'Ativo',
    enrollmentDate: '2025-01-20',
    bloodType: 'O-',
    allergies: 'Alérgica a picada de abelhas/insetos',
    medicalNotes: 'Possui caneta anti-histamínica autorizada na enfermaria.',
    guardians: [
      {
        id: 'guard-5',
        name: 'Felipe Vasconcelos Neto',
        relationship: 'Pai',
        cpf: '444.333.222-11',
        profession: 'Analista de Sistemas',
        phone: '(31) 98322-1100',
        email: 'felipe.vasconcelos@tech.com',
        address: 'Rua Platina, 780, Bairro Prado, Belo Horizonte - MG',
        isFinancialResponsible: true,
        isEmergencyContact: true
      }
    ]
  },
  {
    id: 'stud-5',
    name: 'Mateus Oliveira Fontes',
    ra: 'VRD-2026-0044',
    birthDate: '2011-06-14',
    gender: 'M',
    cpf: '567.890.123-45',
    classId: 'class-4',
    className: '9º Ano Fundamental II - Turma Neemias',
    shift: 'Matutino',
    status: 'Ativo',
    enrollmentDate: '2020-01-10',
    bloodType: 'AB+',
    medicalNotes: 'Pratica basquete pela seleção escolar.',
    guardians: [
      {
        id: 'guard-6',
        name: 'Mônica Oliveira Fontes',
        relationship: 'Mãe',
        cpf: '333.222.111-99',
        profession: 'Advogada Tributarista',
        phone: '(31) 99822-7711',
        email: 'monica.fontes@advocacia.com.br',
        address: 'Rua São Paulo, 1200, Bairro Lourdes, Belo Horizonte - MG',
        isFinancialResponsible: true,
        isEmergencyContact: true
      }
    ]
  },
  {
    id: 'stud-6',
    name: 'Rebeca Alencar Prado',
    ra: 'VRD-2026-0012',
    birthDate: '2010-02-28',
    gender: 'F',
    cpf: '678.901.234-56',
    classId: 'class-5',
    className: '1º Ano Ensino Médio - Turma Daniel',
    shift: 'Matutino',
    status: 'Ativo',
    enrollmentDate: '2019-02-05',
    bloodType: 'A-',
    guardians: [
      {
        id: 'guard-7',
        name: 'André Alencar Prado',
        relationship: 'Pai',
        cpf: '222.111.000-88',
        profession: 'Médico Cardiologista',
        phone: '(31) 99733-6622',
        email: 'andre.alencar@cardio.com.br',
        address: 'Alameda da Serra, 500, Vila da Serra, Nova Lima - MG',
        isFinancialResponsible: true,
        isEmergencyContact: true
      }
    ]
  }
];

export const INITIAL_REPORT_CARDS: StudentReportCard[] = [
  {
    studentId: 'stud-1',
    studentName: 'Samuel Henrique Silva Ramos',
    ra: 'VRD-2026-0104',
    classId: 'class-3',
    className: '5º Ano Fundamental I - Turma Josué',
    year: 2026,
    overallAttendancePercentage: 96,
    grades: [
      { subject: 'Língua Portuguesa', b1: 8.8, b2: 9.2, b3: 8.5, b4: null, average: 8.8, status: 'Aprovado' },
      { subject: 'Matemática', b1: 9.5, b2: 9.0, b3: 9.5, b4: null, average: 9.3, status: 'Aprovado' },
      { subject: 'Ciências Naturais', b1: 9.0, b2: 8.5, b3: 9.0, b4: null, average: 8.8, status: 'Aprovado' },
      { subject: 'História', b1: 8.5, b2: 8.0, b3: 8.7, b4: null, average: 8.4, status: 'Aprovado' },
      { subject: 'Geografia', b1: 9.0, b2: 9.0, b3: 9.2, b4: null, average: 9.1, status: 'Aprovado' },
      { subject: 'Inglês', b1: 9.5, b2: 9.8, b3: 9.5, b4: null, average: 9.6, status: 'Aprovado' },
      { subject: 'Princípios Cristãos & Ética', b1: 10.0, b2: 9.8, b3: 10.0, b4: null, average: 9.9, status: 'Aprovado' },
      { subject: 'Educação Física', b1: 9.5, b2: 9.5, b3: 9.5, b4: null, average: 9.5, status: 'Aprovado' }
    ]
  },
  {
    studentId: 'stud-2',
    studentName: 'Ester Ferreira Guimarães',
    ra: 'VRD-2026-0089',
    classId: 'class-3',
    className: '5º Ano Fundamental I - Turma Josué',
    year: 2026,
    overallAttendancePercentage: 98,
    grades: [
      { subject: 'Língua Portuguesa', b1: 9.5, b2: 9.8, b3: 9.6, b4: null, average: 9.6, status: 'Aprovado' },
      { subject: 'Matemática', b1: 8.8, b2: 8.5, b3: 9.0, b4: null, average: 8.8, status: 'Aprovado' },
      { subject: 'Ciências Naturais', b1: 9.5, b2: 9.2, b3: 9.4, b4: null, average: 9.4, status: 'Aprovado' },
      { subject: 'História', b1: 9.0, b2: 9.5, b3: 9.3, b4: null, average: 9.3, status: 'Aprovado' },
      { subject: 'Geografia', b1: 8.5, b2: 9.0, b3: 8.8, b4: null, average: 8.8, status: 'Aprovado' },
      { subject: 'Inglês', b1: 10.0, b2: 9.8, b3: 10.0, b4: null, average: 9.9, status: 'Aprovado' },
      { subject: 'Princípios Cristãos & Ética', b1: 10.0, b2: 10.0, b3: 10.0, b4: null, average: 10.0, status: 'Aprovado' },
      { subject: 'Educação Física', b1: 9.0, b2: 9.2, b3: 9.0, b4: null, average: 9.1, status: 'Aprovado' }
    ]
  }
];

export const INITIAL_ATTENDANCE: DailyAttendance[] = [
  {
    id: 'att-1',
    classId: 'class-3',
    date: '2026-09-15',
    subject: 'Matemática',
    teacherName: 'Prof. Marcos Vinícius Neves',
    entries: [
      { studentId: 'stud-1', studentName: 'Samuel Henrique Silva Ramos', status: 'P' },
      { studentId: 'stud-2', studentName: 'Ester Ferreira Guimarães', status: 'P' }
    ]
  },
  {
    id: 'att-2',
    classId: 'class-2',
    date: '2026-09-15',
    subject: 'Alfabetização & Língua Portuguesa',
    teacherName: 'Profª. Priscila Mendes Rocha',
    entries: [
      { studentId: 'stud-3', studentName: 'Lucas Benjamim Cardoso', status: 'P' }
    ]
  }
];

export const INITIAL_CLOCK_RECORDS: ClockRecord[] = [
  {
    id: 'clock-1',
    staffId: 'staff-3',
    staffName: 'Profª. Priscila Mendes Rocha',
    date: '2026-09-15',
    entry1: '07:02',
    exit1: '11:35',
    entry2: '13:00',
    exit2: '15:30',
    totalWorkedMinutes: 423,
    expectedMinutes: 360,
    extraMinutes: 63,
    delayMinutes: 0,
    status: 'Hora Extra'
  },
  {
    id: 'clock-2',
    staffId: 'staff-5',
    staffName: 'Prof. Marcos Vinícius Neves',
    date: '2026-09-15',
    entry1: '06:58',
    exit1: '12:00',
    entry2: '13:30',
    exit2: '16:30',
    totalWorkedMinutes: 482,
    expectedMinutes: 480,
    extraMinutes: 2,
    delayMinutes: 0,
    status: 'Normal'
  },
  {
    id: 'clock-3',
    staffId: 'staff-7',
    staffName: 'Mariana Duarte Souza (Secretaria)',
    date: '2026-09-15',
    entry1: '07:55',
    exit1: '12:05',
    entry2: '13:15',
    exit2: '17:10',
    totalWorkedMinutes: 485,
    expectedMinutes: 480,
    extraMinutes: 5,
    delayMinutes: 0,
    status: 'Normal'
  },
  {
    id: 'clock-4',
    staffId: 'staff-8',
    staffName: 'Carlos Eduardo Barreto (RH/Fin)',
    date: '2026-09-15',
    entry1: '08:12',
    exit1: '12:00',
    entry2: '13:00',
    exit2: '17:00',
    totalWorkedMinutes: 468,
    expectedMinutes: 480,
    extraMinutes: 0,
    delayMinutes: 12,
    status: 'Atraso'
  }
];

export const INITIAL_PAYROLL: PayrollItem[] = [
  {
    id: 'pay-1',
    staffId: 'staff-1',
    staffName: 'Dra. Eunice Veredas de Carvalho',
    role: 'Diretora Geral',
    month: '09/2026',
    baseSalary: 11500,
    bonusAmount: 850,
    bonusDetails: 'Gratificação de Gestão Institucional',
    inssDeduction: 908.85,
    otherDeductions: 1240.50,
    deductionDetails: 'IRRF s/ Salário',
    netSalary: 10200.65,
    paymentStatus: 'Pendente'
  },
  {
    id: 'pay-2',
    staffId: 'staff-2',
    staffName: 'Sarah Lima de Oliveira',
    role: 'Coordenadora Pedagógica',
    month: '09/2026',
    baseSalary: 6800,
    bonusAmount: 400,
    bonusDetails: 'Auxílio Especialização',
    inssDeduction: 680.00,
    otherDeductions: 450.00,
    deductionDetails: 'IRRF e Plano de Saúde Odonto',
    netSalary: 6070.00,
    paymentStatus: 'Pendente'
  },
  {
    id: 'pay-3',
    staffId: 'staff-3',
    staffName: 'Profª. Priscila Mendes Rocha',
    role: 'Professor(a) Fundamental I',
    month: '09/2026',
    baseSalary: 4200,
    bonusAmount: 320,
    bonusDetails: 'Adicional de Coordenação de Projeto Bíblico',
    inssDeduction: 420.00,
    otherDeductions: 180.00,
    deductionDetails: 'Vale Transporte / Coparticipação Saúde',
    netSalary: 3920.00,
    paymentStatus: 'Pago',
    paymentDate: '2026-09-05'
  },
  {
    id: 'pay-4',
    staffId: 'staff-5',
    staffName: 'Prof. Marcos Vinícius Neves',
    role: 'Professor(a) Matemática',
    month: '09/2026',
    baseSalary: 4600,
    bonusAmount: 250,
    bonusDetails: 'Aulas de Reforço Olímpico',
    inssDeduction: 480.00,
    otherDeductions: 210.00,
    deductionDetails: 'Vale Transporte',
    netSalary: 4160.00,
    paymentStatus: 'Pago',
    paymentDate: '2026-09-05'
  },
  {
    id: 'pay-5',
    staffId: 'staff-7',
    staffName: 'Mariana Duarte Souza',
    role: 'Secretária Escolar',
    month: '09/2026',
    baseSalary: 3600,
    bonusAmount: 180,
    bonusDetails: 'Assiduidade Perfeita',
    inssDeduction: 324.00,
    otherDeductions: 140.00,
    deductionDetails: 'Coparticipação Odonto',
    netSalary: 3316.00,
    paymentStatus: 'Pago',
    paymentDate: '2026-09-05'
  }
];

export const INITIAL_ACCOUNTS_PAYABLE: AccountPayable[] = [
  {
    id: 'ap-1',
    description: 'Sistema Bernoulli de Ensino - Apostilas e Plataforma 2º Semestre',
    category: 'Material Pedagógico / Bíblico',
    supplier: 'Bernoulli Sistema de Ensino S.A.',
    amount: 14850.00,
    dueDate: '2026-09-20',
    status: 'Pendente',
    invoiceNumber: 'NF-892144'
  },
  {
    id: 'ap-2',
    description: 'Energia Elétrica - Campus Principal e Quadra Poliesportiva',
    category: 'Energia, Água & Conectividade',
    supplier: 'CEMIG Distribuição S.A.',
    amount: 3420.75,
    dueDate: '2026-09-18',
    status: 'Pendente',
    invoiceNumber: 'FAT-783912'
  },
  {
    id: 'ap-3',
    description: 'Fornecimento de Água e Saneamento',
    category: 'Energia, Água & Conectividade',
    supplier: 'COPASA Serviços de Água e Esgoto',
    amount: 1180.40,
    dueDate: '2026-09-10',
    paymentDate: '2026-09-08',
    status: 'Pago',
    invoiceNumber: 'FAT-445190'
  },
  {
    id: 'ap-4',
    description: 'Manutenção Preventiva de Ar-Condicionados e Bebedouros Centrais',
    category: 'Manutenção & Infraestrutura',
    supplier: 'ClimaFrio Serviços Técnicos Ltda',
    amount: 2200.00,
    dueDate: '2026-09-25',
    status: 'Pendente',
    invoiceNumber: 'NF-3419'
  },
  {
    id: 'ap-5',
    description: 'Licenças de Software Educacional e Gestão em Nuvem',
    category: 'Tecnologia & Softwares',
    supplier: 'Google Workspace for Education / Microsoft 365',
    amount: 1890.00,
    dueDate: '2026-09-05',
    paymentDate: '2026-09-05',
    status: 'Pago',
    invoiceNumber: 'INV-US-99128'
  },
  {
    id: 'ap-6',
    description: 'Kits da Sociedade Bíblica do Brasil (Bíblias Infantis & Juvenis)',
    category: 'Material Pedagógico / Bíblico',
    supplier: 'Sociedade Bíblica do Brasil (SBB)',
    amount: 3120.00,
    dueDate: '2026-09-12',
    paymentDate: '2026-09-11',
    status: 'Pago',
    invoiceNumber: 'NF-10293'
  }
];

export const INITIAL_TUITION_INVOICES: TuitionInvoice[] = [
  {
    id: 'inv-1',
    code: 'BOL-202609-01',
    studentId: 'stud-1',
    studentName: 'Samuel Henrique Silva Ramos',
    guardianName: 'Roberto Ramos de Oliveira',
    guardianCpf: '888.777.666-55',
    className: '5º Ano Fundamental I - Turma Josué',
    monthReference: 'Setembro / 2026',
    baseAmount: 1350.00,
    discountUntilDue: 67.50, // 5% pontualidade
    netAmountDue: 1282.50,
    dueDate: '2026-09-10',
    paidAmount: 1282.50,
    paidDate: '2026-09-06',
    paymentMethod: 'PIX',
    status: 'Pago',
    barcode: '23791.82736 90123.456789 12345.678901 8 98320000128250',
    pixQrCodePayload: '00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br52040000530398654071282.505802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***6304E8F2'
  },
  {
    id: 'inv-2',
    code: 'BOL-202609-02',
    studentId: 'stud-2',
    studentName: 'Ester Ferreira Guimarães',
    guardianName: 'Pastor Daniel Guimarães Filho',
    guardianCpf: '654.321.987-00',
    className: '5º Ano Fundamental I - Turma Josué',
    monthReference: 'Setembro / 2026',
    baseAmount: 1350.00,
    discountUntilDue: 67.50,
    netAmountDue: 1282.50,
    dueDate: '2026-09-10',
    paidAmount: 1282.50,
    paidDate: '2026-09-09',
    paymentMethod: 'Boleto Bancário',
    status: 'Pago',
    barcode: '23791.82736 90123.456789 12345.678902 4 98320000128250',
    pixQrCodePayload: '00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br52040000530398654071282.505802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***6304A1B2'
  },
  {
    id: 'inv-3',
    code: 'BOL-202609-03',
    studentId: 'stud-3',
    studentName: 'Lucas Benjamim Cardoso',
    guardianName: 'Juliana Cardoso dos Santos',
    guardianCpf: '555.444.333-22',
    className: '1º Ano Fundamental I - Turma Caleb',
    monthReference: 'Setembro / 2026',
    baseAmount: 1280.00,
    discountUntilDue: 64.00,
    netAmountDue: 1216.00,
    dueDate: '2026-09-20',
    status: 'Pendente',
    barcode: '23791.82736 90123.456789 12345.678903 1 98420000121600',
    pixQrCodePayload: '00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br52040000530398654071216.005802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***63049F31'
  },
  {
    id: 'inv-4',
    code: 'BOL-202609-04',
    studentId: 'stud-4',
    studentName: 'Ana Beatriz Vasconcelos',
    guardianName: 'Felipe Vasconcelos Neto',
    guardianCpf: '444.333.222-11',
    className: 'Maternal II - Turma Oliveiras',
    monthReference: 'Setembro / 2026',
    baseAmount: 1450.00,
    discountUntilDue: 72.50,
    netAmountDue: 1377.50,
    dueDate: '2026-09-20',
    status: 'Pendente',
    barcode: '23791.82736 90123.456789 12345.678904 9 98420000137750',
    pixQrCodePayload: '00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br52040000530398654071377.505802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***63045E12'
  },
  {
    id: 'inv-5',
    code: 'BOL-202609-05',
    studentId: 'stud-5',
    studentName: 'Mateus Oliveira Fontes',
    guardianName: 'Mônica Oliveira Fontes',
    guardianCpf: '333.222.111-99',
    className: '9º Ano Fundamental II - Turma Neemias',
    monthReference: 'Setembro / 2026',
    baseAmount: 1520.00,
    discountUntilDue: 76.00,
    netAmountDue: 1444.00,
    dueDate: '2026-09-10',
    status: 'Atrasado',
    barcode: '23791.82736 90123.456789 12345.678905 6 98320000144400',
    pixQrCodePayload: '00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br52040000530398654071444.005802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***6304D401'
  },
  {
    id: 'inv-6',
    code: 'BOL-202609-06',
    studentId: 'stud-6',
    studentName: 'Rebeca Alencar Prado',
    guardianName: 'André Alencar Prado',
    guardianCpf: '222.111.000-88',
    className: '1º Ano Ensino Médio - Turma Daniel',
    monthReference: 'Setembro / 2026',
    baseAmount: 1680.00,
    discountUntilDue: 84.00,
    netAmountDue: 1596.00,
    dueDate: '2026-09-10',
    paidAmount: 1596.00,
    paidDate: '2026-09-05',
    paymentMethod: 'PIX',
    status: 'Pago',
    barcode: '23791.82736 90123.456789 12345.678906 3 98320000159600',
    pixQrCodePayload: '00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br52040000530398654071596.005802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***6304C210'
  }
];

export const INITIAL_NOTICES: SchoolNotice[] = [
  {
    id: 'not-1',
    title: 'Princípio do Mês: A Vereda do Justo e a Sabedoria',
    content: 'Iniciamos o mês de setembro refletindo no compromisso de trilhar caminhos de retidão, excelência acadêmica e temor ao Senhor. Lembramos aos professores e alunos o cultivo diário da gentileza e da verdade.',
    verse: 'Mas a vereda dos justos é como a luz da aurora, que vai brilhando mais e mais até ser dia perfeito. — Provérbios 4:18',
    category: 'Espiritual',
    targetAudience: 'Todos',
    publishDate: '2026-09-01',
    author: 'Dra. Eunice Veredas (Direção)',
    pinned: true
  },
  {
    id: 'not-2',
    title: 'Feira Cultural & Bíblica 2026 - Convocação dos Projetos',
    content: 'A Coordenação Pedagógica informa que as inscrições dos estandes temáticos da nossa tradicional Feira Cultural e Bíblica estão abertas até o dia 25/09. Tema deste ano: "Ciência, Fé e Sociedade: Transformando Vidas".',
    category: 'Pedagógico',
    targetAudience: 'Pais e Alunos',
    publishDate: '2026-09-10',
    author: 'Profª Sarah Lima (Coordenação)'
  },
  {
    id: 'not-3',
    title: 'Campanha de Vacinação e Atualização de Cartões de Saúde',
    content: 'Solicitamos a todos os pais e responsáveis que enviem cópia digitalizada do cartão vacinal atualizado até o final deste mês junto à Secretaria Escolar.',
    category: 'Geral',
    targetAudience: 'Pais e Alunos',
    publishDate: '2026-09-12',
    author: 'Mariana Duarte (Secretaria)'
  }
];

export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-1',
    title: 'Culto de Ação de Graças da Família Veredas',
    date: '2026-09-19',
    time: '19:00',
    location: 'Auditório Principal Veredas',
    type: 'Culto / Espiritual',
    description: 'Momento de louvor, oração pelas famílias e consagração dos nossos educandos e educadores.'
  },
  {
    id: 'ev-2',
    title: 'Plantão Pedagógico & Entrega de Resultados (3º Bimestre)',
    date: '2026-09-26',
    time: '08:00 às 12:30',
    location: 'Salas de Aula - Blocos A e B',
    type: 'Reunião de Pais',
    description: 'Atendimento individualizado com professores regentes e especialistas.'
  },
  {
    id: 'ev-3',
    title: 'Olimpíada Cristã de Matemática e Raciocínio Lógico',
    date: '2026-10-02',
    time: '09:00',
    location: 'Laboratório Multidisciplinar',
    type: 'Acadêmico',
    description: 'Competição saudável de raciocínio, lógica e resolução de desafios numéricos.'
  },
  {
    id: 'ev-4',
    title: 'Recesso Escolar - Semana da Criança e Dia do Professor',
    date: '2026-10-12',
    time: 'Período Integral',
    location: 'Campus Escolar',
    type: 'Recesso',
    description: 'Período de descanso pedagógico e celebração da data.'
  }
];
