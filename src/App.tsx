import React, { useState, useEffect } from 'react';
import { SchoolProvider } from './context/SchoolContext';
import { LandingPageView } from './components/LandingPageView';

function AppContent() {
  const [appMode, setAppMode] = useState<AppMode>(() => {
    const savedMode = localStorage.getItem('veredas_app_mode');
    return (savedMode as AppMode) || 'landing';
  });

  return (
    <>
      {/* 1. Public Landing Page */}
      {appMode === 'landing' && (
        <LandingPageView  />
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
