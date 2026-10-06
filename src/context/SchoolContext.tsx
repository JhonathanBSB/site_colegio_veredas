import React, { createContext, useContext, useState, useEffect } from 'react';
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
import {
  INITIAL_CLASSES,
  INITIAL_STAFF,
  INITIAL_STUDENTS,
  INITIAL_REPORT_CARDS,
  INITIAL_ATTENDANCE,
  INITIAL_CLOCK_RECORDS,
  INITIAL_PAYROLL,
  INITIAL_ACCOUNTS_PAYABLE,
  INITIAL_TUITION_INVOICES,
  INITIAL_NOTICES,
  INITIAL_EVENTS
} from '../data/initialData';

interface SchoolContextType {
  students: Student[];
  staff: Staff[];
  classes: SchoolClass[];
  attendances: DailyAttendance[];
  reportCards: StudentReportCard[];
  clockRecords: ClockRecord[];
  payroll: PayrollItem[];
  accountsPayable: AccountPayable[];
  tuitionInvoices: TuitionInvoice[];
  notices: SchoolNotice[];
  events: SchoolEvent[];

  // Student actions
  addStudent: (student: Omit<Student, 'id' | 'ra'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;

  // Staff actions
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (staff: Staff) => void;
  deleteStaff: (id: string) => void;

  // Class actions
  addClass: (schoolClass: Omit<SchoolClass, 'id'>) => void;
  updateClass: (schoolClass: SchoolClass) => void;

  // Attendance actions
  saveAttendance: (attendance: DailyAttendance) => void;

  // Grade actions
  saveReportCard: (reportCard: StudentReportCard) => void;

  // Clock actions
  addClockRecord: (record: Omit<ClockRecord, 'id'>) => void;

  // Payroll actions
  updatePayrollStatus: (id: string, status: 'Pendente' | 'Processado' | 'Pago') => void;
  generateMonthlyPayroll: (monthYear: string) => void;

  // Finance actions
  addAccountPayable: (account: Omit<AccountPayable, 'id'>) => void;
  payAccountPayable: (id: string) => void;
  markInvoicePaid: (id: string, paymentMethod?: 'PIX' | 'Boleto Bancário' | 'Cartão') => void;
  generateTuitionForMonth: (monthReference: string, dueDate: string) => void;

  // Notices & Events
  addNotice: (notice: Omit<SchoolNotice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  addEvent: (event: Omit<SchoolEvent, 'id'>) => void;

  // System actions
  resetToDefaults: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const STORAGE_PREFIX = 'veredas_school_';

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [staff, setStaff] = useState<Staff[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'staff');
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [classes, setClasses] = useState<SchoolClass[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [attendances, setAttendances] = useState<DailyAttendance[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'attendances');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [reportCards, setReportCards] = useState<StudentReportCard[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'reportCards');
    return saved ? JSON.parse(saved) : INITIAL_REPORT_CARDS;
  });

  const [clockRecords, setClockRecords] = useState<ClockRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'clockRecords');
    return saved ? JSON.parse(saved) : INITIAL_CLOCK_RECORDS;
  });

  const [payroll, setPayroll] = useState<PayrollItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'payroll');
    return saved ? JSON.parse(saved) : INITIAL_PAYROLL;
  });

  const [accountsPayable, setAccountsPayable] = useState<AccountPayable[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'accountsPayable');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS_PAYABLE;
  });

  const [tuitionInvoices, setTuitionInvoices] = useState<TuitionInvoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'tuitionInvoices');
    return saved ? JSON.parse(saved) : INITIAL_TUITION_INVOICES;
  });

  const [notices, setNotices] = useState<SchoolNotice[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [events, setEvents] = useState<SchoolEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'attendances', JSON.stringify(attendances));
  }, [attendances]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'reportCards', JSON.stringify(reportCards));
  }, [reportCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'clockRecords', JSON.stringify(clockRecords));
  }, [clockRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'payroll', JSON.stringify(payroll));
  }, [payroll]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'accountsPayable', JSON.stringify(accountsPayable));
  }, [accountsPayable]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'tuitionInvoices', JSON.stringify(tuitionInvoices));
  }, [tuitionInvoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'events', JSON.stringify(events));
  }, [events]);

  // Actions
  const addStudent = (studentData: Omit<Student, 'id' | 'ra'>) => {
    const count = students.length + 1;
    const ra = `VRD-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
    const newStudent: Student = {
      ...studentData,
      id: `stud-${Date.now()}`,
      ra
    };
    setStudents(prev => [newStudent, ...prev]);

    // Create default report card
    const targetClass = classes.find(c => c.id === studentData.classId);
    const subjects = targetClass?.subjects || ['Língua Portuguesa', 'Matemática', 'Ciências', 'Princípios Cristãos'];
    const newReport: StudentReportCard = {
      studentId: newStudent.id,
      studentName: newStudent.name,
      ra: newStudent.ra,
      classId: newStudent.classId,
      className: newStudent.className,
      year: new Date().getFullYear(),
      overallAttendancePercentage: 100,
      grades: subjects.map(s => ({
        subject: s,
        b1: null,
        b2: null,
        b3: null,
        b4: null,
        status: 'Em Curso'
      }))
    };
    setReportCards(prev => [newReport, ...prev]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addStaff = (staffData: Omit<Staff, 'id'>) => {
    const newStaff: Staff = {
      ...staffData,
      id: `staff-${Date.now()}`
    };
    setStaff(prev => [newStaff, ...prev]);
  };

  const updateStaff = (updatedStaff: Staff) => {
    setStaff(prev => prev.map(s => s.id === updatedStaff.id ? updatedStaff : s));
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  const addClass = (classData: Omit<SchoolClass, 'id'>) => {
    const newClass: SchoolClass = {
      ...classData,
      id: `class-${Date.now()}`
    };
    setClasses(prev => [...prev, newClass]);
  };

  const updateClass = (updatedClass: SchoolClass) => {
    setClasses(prev => prev.map(c => c.id === updatedClass.id ? updatedClass : c));
  };

  const saveAttendance = (newAttendance: DailyAttendance) => {
    setAttendances(prev => {
      const filtered = prev.filter(a => !(a.classId === newAttendance.classId && a.date === newAttendance.date && a.subject === newAttendance.subject));
      return [newAttendance, ...filtered];
    });
  };

  const saveReportCard = (card: StudentReportCard) => {
    setReportCards(prev => {
      const idx = prev.findIndex(r => r.studentId === card.studentId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = card;
        return copy;
      }
      return [card, ...prev];
    });
  };

  const addClockRecord = (recordData: Omit<ClockRecord, 'id'>) => {
    const newRecord: ClockRecord = {
      ...recordData,
      id: `clock-${Date.now()}`
    };
    setClockRecords(prev => [newRecord, ...prev]);
  };

  const updatePayrollStatus = (id: string, status: 'Pendente' | 'Processado' | 'Pago') => {
    setPayroll(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          paymentStatus: status,
          paymentDate: status === 'Pago' ? new Date().toISOString().split('T')[0] : p.paymentDate
        };
      }
      return p;
    }));
  };

  const generateMonthlyPayroll = (monthYear: string) => {
    const newPayrollItems: PayrollItem[] = staff.map(st => {
      const inss = Math.round(st.salary * 0.09 * 100) / 100;
      const other = Math.round(st.salary * 0.05 * 100) / 100;
      const bonus = 150;
      const net = Math.round((st.salary + bonus - inss - other) * 100) / 100;
      return {
        id: `pay-${st.id}-${monthYear.replace('/', '-')}`,
        staffId: st.id,
        staffName: st.name,
        role: st.role,
        month: monthYear,
        baseSalary: st.salary,
        bonusAmount: bonus,
        bonusDetails: 'Auxílio Assiduidade Veredas',
        inssDeduction: inss,
        otherDeductions: other,
        deductionDetails: 'INSS e Benefícios',
        netSalary: net,
        paymentStatus: 'Pendente'
      };
    });
    setPayroll(newPayrollItems);
  };

  const addAccountPayable = (accountData: Omit<AccountPayable, 'id'>) => {
    const newAccount: AccountPayable = {
      ...accountData,
      id: `ap-${Date.now()}`
    };
    setAccountsPayable(prev => [newAccount, ...prev]);
  };

  const payAccountPayable = (id: string) => {
    setAccountsPayable(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'Pago',
          paymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return a;
    }));
  };

  const markInvoicePaid = (id: string, method: 'PIX' | 'Boleto Bancário' | 'Cartão' = 'PIX') => {
    setTuitionInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: 'Pago',
          paidAmount: inv.netAmountDue,
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod: method
        };
      }
      return inv;
    }));
  };

  const generateTuitionForMonth = (monthReference: string, dueDate: string) => {
    const newInvoices: TuitionInvoice[] = students.map((st, idx) => {
      const base = 1350;
      const disc = 67.50;
      const net = base - disc;
      const guardian = st.guardians.find(g => g.isFinancialResponsible) || st.guardians[0];
      return {
        id: `inv-${st.id}-${Date.now()}`,
        code: `BOL-${new Date().getFullYear()}${String(idx + 1).padStart(2, '0')}`,
        studentId: st.id,
        studentName: st.name,
        guardianName: guardian ? guardian.name : 'Responsável Financeiro',
        guardianCpf: guardian ? guardian.cpf : '000.000.000-00',
        className: st.className,
        monthReference,
        baseAmount: base,
        discountUntilDue: disc,
        netAmountDue: net,
        dueDate,
        status: 'Pendente',
        barcode: `23791.82736 90123.456789 12345.${String(Date.now()).slice(-6)} 4 98320000128250`,
        pixQrCodePayload: `00020126580014br.gov.bcb.pix0136financeiro@colegiocristaoveredas.com.br5204000053039865407${net.toFixed(2)}5802BR5924Colegio Cristao Veredas6014Belo Horizonte62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`
      };
    });
    setTuitionInvoices(prev => [...newInvoices, ...prev]);
  };

  const addNotice = (noticeData: Omit<SchoolNotice, 'id'>) => {
    const newNotice: SchoolNotice = {
      ...noticeData,
      id: `not-${Date.now()}`
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const addEvent = (eventData: Omit<SchoolEvent, 'id'>) => {
    const newEvent: SchoolEvent = {
      ...eventData,
      id: `ev-${Date.now()}`
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const resetToDefaults = () => {
    setStudents(INITIAL_STUDENTS);
    setStaff(INITIAL_STAFF);
    setClasses(INITIAL_CLASSES);
    setAttendances(INITIAL_ATTENDANCE);
    setReportCards(INITIAL_REPORT_CARDS);
    setClockRecords(INITIAL_CLOCK_RECORDS);
    setPayroll(INITIAL_PAYROLL);
    setAccountsPayable(INITIAL_ACCOUNTS_PAYABLE);
    setTuitionInvoices(INITIAL_TUITION_INVOICES);
    setNotices(INITIAL_NOTICES);
    setEvents(INITIAL_EVENTS);
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  };

  return (
    <SchoolContext.Provider
      value={{
        students,
        staff,
        classes,
        attendances,
        reportCards,
        clockRecords,
        payroll,
        accountsPayable,
        tuitionInvoices,
        notices,
        events,
        addStudent,
        updateStudent,
        deleteStudent,
        addStaff,
        updateStaff,
        deleteStaff,
        addClass,
        updateClass,
        saveAttendance,
        saveReportCard,
        addClockRecord,
        updatePayrollStatus,
        generateMonthlyPayroll,
        addAccountPayable,
        payAccountPayable,
        markInvoicePaid,
        generateTuitionForMonth,
        addNotice,
        deleteNotice,
        addEvent,
        resetToDefaults
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
