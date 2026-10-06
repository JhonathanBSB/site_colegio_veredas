import React, { useState, useEffect } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { StaffView } from './components/StaffView';
import { ClassesView } from './components/ClassesView';
import { AcademicView } from './components/AcademicView';
import { HRView } from './components/HRView';
import { FinanceView } from './components/FinanceView';
import { AccountsPayableView } from './components/AccountsPayableView';
import { NoticesView } from './components/NoticesView';
import { PrintModal } from './components/PrintModal';
import { LandingPageView } from './components/LandingPageView';
import { ParentPortalView } from './components/ParentPortalView';
import { AuthModal } from './components/AuthModal';
import { StudentReportCard, TuitionInvoice, PayrollItem, AppMode, AuthUser } from './types';

function MainLayout({
  currentUser,
  onLogout,
  onGoToLanding,
  onPrintReportCard,
  onPrintInvoice,
  onPrintPayroll
}: {
  currentUser: AuthUser | null;
  onLogout: () => void;
  onGoToLanding: () => void;
  onPrintReportCard: (card: StudentReportCard) => void;
  onPrintInvoice: (invoice: TuitionInvoice) => void;
  onPrintPayroll: (payrollItem: PayrollItem) => void;
}) {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Deep-linking triggers
  const [selectedAcademicClassId, setSelectedAcademicClassId] = useState<string | undefined>(undefined);
  const [isOpenStudentModal, setIsOpenStudentModal] = useState(false);
  const [isOpenStaffModal, setIsOpenStaffModal] = useState(false);

  const handleGoToAttendance = (classId: string) => {
    setSelectedAcademicClassId(classId);
    setCurrentTab('academic');
  };

  const handleGoToGrades = (classId: string) => {
    setSelectedAcademicClassId(classId);
    setCurrentTab('academic');
  };

  const handleOpenNewStudent = () => {
    setCurrentTab('students');
    setIsOpenStudentModal(true);
  };

  const handleOpenNewStaff = () => {
    setCurrentTab('staff');
    setIsOpenStaffModal(true);
  };

  const handleOpenBilling = () => {
    setCurrentTab('finance');
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-gray-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
        onGoToLanding={onGoToLanding}
        onLogout={onLogout}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-72">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onOpenMobile={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
          currentUser={currentUser}
          onLogout={onLogout}
          onGoToLanding={onGoToLanding}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardView
                onNavigateTab={(tab) => setCurrentTab(tab as NavTab)}
                onOpenNewStudent={handleOpenNewStudent}
                onOpenNewStaff={handleOpenNewStaff}
                onOpenBilling={handleOpenBilling}
              />
            )}

            {currentTab === 'students' && (
              <StudentsView
                isOpenNewModalInitially={isOpenStudentModal}
                onCloseInitialModal={() => setIsOpenStudentModal(false)}
              />
            )}

            {currentTab === 'staff' && (
              <StaffView
                isOpenNewModalInitially={isOpenStaffModal}
                onCloseInitialModal={() => setIsOpenStaffModal(false)}
              />
            )}

            {currentTab === 'classes' && (
              <ClassesView
                onGoToAttendance={handleGoToAttendance}
                onGoToGrades={handleGoToGrades}
              />
            )}

            {currentTab === 'academic' && (
              <AcademicView
                initialClassId={selectedAcademicClassId}
                onPrintReportCard={onPrintReportCard}
              />
            )}

            {currentTab === 'hr' && (
              <HRView onPrintPayroll={onPrintPayroll} />
            )}

            {currentTab === 'finance' && (
              <FinanceView onPrintInvoice={onPrintInvoice} />
            )}

            {currentTab === 'accounts_payable' && (
              <AccountsPayableView />
            )}

            {currentTab === 'notices' && (
              <NoticesView />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const [appMode, setAppMode] = useState<AppMode>(() => {
    const savedMode = localStorage.getItem('veredas_app_mode');
    return (savedMode as AppMode) || 'landing';
  });

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('veredas_auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<'guardian' | 'admin'>('guardian');

  // Print modal state shared across parent portal and administrative system
  const [printModalState, setPrintModalState] = useState<{
    isOpen: boolean;
    type: 'reportCard' | 'invoice' | 'payroll';
    data: StudentReportCard | TuitionInvoice | PayrollItem | null;
  }>({
    isOpen: false,
    type: 'reportCard',
    data: null
  });

  useEffect(() => {
    localStorage.setItem('veredas_app_mode', appMode);
  }, [appMode]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('veredas_auth_user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('veredas_auth_user');
    }
  }, [authUser]);

  const handleOpenAuth = (role: 'guardian' | 'admin') => {
    // If user already authenticated with matching role, navigate directly
    if (authUser) {
      if (role === 'guardian' && authUser.role === 'guardian') {
        setAppMode('parent');
        return;
      }
      if (role === 'admin' && authUser.role === 'admin') {
        setAppMode('admin');
        return;
      }
    }
    setAuthDefaultRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    if (user.role === 'guardian') {
      setAppMode('parent');
    } else {
      setAppMode('admin');
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    setAppMode('landing');
  };

  const handlePrintReportCard = (card: StudentReportCard) => {
    setPrintModalState({
      isOpen: true,
      type: 'reportCard',
      data: card
    });
  };

  const handlePrintInvoice = (invoice: TuitionInvoice) => {
    setPrintModalState({
      isOpen: true,
      type: 'invoice',
      data: invoice
    });
  };

  const handlePrintPayroll = (payrollItem: PayrollItem) => {
    setPrintModalState({
      isOpen: true,
      type: 'payroll',
      data: payrollItem
    });
  };

  return (
    <>
      {/* 1. Public Landing Page */}
      {appMode === 'landing' && (
        <LandingPageView onOpenAuth={handleOpenAuth} />
      )}

      {/* 2. Parent / Guardian Portal */}
      {appMode === 'parent' && (
        authUser && authUser.role === 'guardian' ? (
          <ParentPortalView
            user={authUser}
            onLogout={handleLogout}
            onGoToLanding={() => setAppMode('landing')}
            onPrintReportCard={handlePrintReportCard}
            onPrintInvoice={handlePrintInvoice}
          />
        ) : (
          // If accessing without auth, show landing with modal open
          <LandingPageView onOpenAuth={handleOpenAuth} />
        )
      )}

      {/* 3. Administrative System */}
      {appMode === 'admin' && (
        authUser && authUser.role === 'admin' ? (
          <MainLayout
            currentUser={authUser}
            onLogout={handleLogout}
            onGoToLanding={() => setAppMode('landing')}
            onPrintReportCard={handlePrintReportCard}
            onPrintInvoice={handlePrintInvoice}
            onPrintPayroll={handlePrintPayroll}
          />
        ) : (
          // If accessing without auth, show landing with modal open
          <LandingPageView onOpenAuth={handleOpenAuth} />
        )
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultRole={authDefaultRole}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Printable Documents & Receipts Modal */}
      {printModalState.isOpen && (
        <PrintModal
          type={printModalState.type}
          data={printModalState.data}
          onClose={() => setPrintModalState({ ...printModalState, isOpen: false })}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
