import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import LandingPage from './components/landing/LandingPage.jsx';
import ClinicLoginView from './components/auth/ClinicLoginView.jsx';

// Core View Modules
import ExecutiveDashboard from './components/dashboard/ExecutiveDashboard.jsx';
import PatientDirectory from './components/patients/PatientDirectory.jsx';
import AppointmentsView from './components/appointments/AppointmentsView.jsx';
import LiveQueueView from './components/queue/LiveQueueView.jsx';
import ConsultationWorkspace from './components/consultations/ConsultationWorkspace.jsx';
import LabDashboardView from './components/laboratory/LabDashboardView.jsx';
import LabWorklistView from './components/laboratory/LabWorklistView.jsx';
import BillingView from './components/billing/BillingView.jsx';
import InventoryView from './components/inventory/InventoryView.jsx';
import StaffView from './components/staff/StaffView.jsx';
import FinanceView from './components/finance/FinanceView.jsx';
import FollowupsView from './components/followups/FollowupsView.jsx';
import ReportsView from './components/reports/ReportsView.jsx';
import PatientPortalView from './components/portal/PatientPortalView.jsx';
import SettingsView from './components/settings/SettingsView.jsx';

// Interactive Global Modals
import PatientRegistrationModal from './components/patients/PatientRegistrationModal.jsx';
import BookAppointmentModal from './components/appointments/BookAppointmentModal.jsx';
import CreateLabOrderModal from './components/laboratory/CreateLabOrderModal.jsx';
import CreateInvoiceModal from './components/billing/CreateInvoiceModal.jsx';
import LabReportModal from './components/laboratory/LabReportModal.jsx';

// Route 1: Public Landing Page Wrapper
function LandingPageWrapper() {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  return (
    <LandingPage
      onLaunchDemo={() => navigate(isAuthenticated ? '/admin' : '/login')}
    />
  );
}

// Route 2: Dedicated Light Theme Login View Wrapper
function LoginPageWrapper() {
  const navigate = useNavigate();

  return (
    <ClinicLoginView
      onLoginSuccess={() => navigate('/admin')}
      onBackToLanding={() => navigate('/')}
    />
  );
}

// Route 3: Hospital & Diagnostic Operations Console (Protected /admin route)
function AdminConsole() {
  const {
    isAuthenticated,
    currentView,
    setCurrentView,
    selectedReportId,
    setSelectedReportId,
    selectedPatientId,
    setSelectedPatientId
  } = useApp();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isLabOrderModalOpen, setIsLabOrderModalOpen] = useState(false);
  const [labOrderPreselectedPatient, setLabOrderPreselectedPatient] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // If view was 'landing', switch to 'dashboard' inside the operations console
  useEffect(() => {
    if (currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [currentView, setCurrentView]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleOpenLabOrder = (patientId) => {
    setLabOrderPreselectedPatient(patientId);
    setIsLabOrderModalOpen(true);
  };

  const handleOpenReport = (reportId) => {
    setSelectedReportId(reportId);
  };

  const activeView = (currentView === 'landing' || !currentView) ? 'dashboard' : currentView;

  return (
    <AppLayout>
      {activeView === 'dashboard' && (
        <ExecutiveDashboard
          onQuickAction={(action) => {
            if (action === 'register_patient') setIsRegisterModalOpen(true);
            else if (action === 'book_appointment') setIsBookModalOpen(true);
            else if (action === 'create_lab_order') setIsLabOrderModalOpen(true);
            else if (action === 'create_invoice') setIsInvoiceModalOpen(true);
          }}
          onOpenReport={handleOpenReport}
          onOpenPatient={(pId) => {
            setSelectedPatientId(pId);
            setCurrentView('patients');
          }}
        />
      )}

      {activeView === 'patients' && (
        <PatientDirectory
          onRegisterClick={() => setIsRegisterModalOpen(true)}
          onOpenReport={handleOpenReport}
        />
      )}

      {activeView === 'appointments' && (
        <AppointmentsView
          onBookAppointmentClick={() => setIsBookModalOpen(true)}
        />
      )}

      {activeView === 'queue' && (
        <LiveQueueView
          onStartConsultation={() => setCurrentView('consultations')}
        />
      )}

      {activeView === 'consultations' && (
        <ConsultationWorkspace
          onOpenLabOrderModal={handleOpenLabOrder}
        />
      )}

      {activeView === 'doctors' && (
        <StaffView />
      )}

      {activeView === 'laboratory' && (
        <LabDashboardView
          onOpenCreateOrder={() => setIsLabOrderModalOpen(true)}
          onOpenReport={handleOpenReport}
          onOpenWorklist={() => setCurrentView('worklist')}
        />
      )}

      {activeView === 'worklist' && (
        <LabWorklistView
          onSubmitted={() => setCurrentView('laboratory')}
        />
      )}

      {activeView === 'results-review' && (
        <LabDashboardView
          onOpenCreateOrder={() => setIsLabOrderModalOpen(true)}
          onOpenReport={handleOpenReport}
          onOpenWorklist={() => setCurrentView('worklist')}
        />
      )}

      {activeView === 'billing' && (
        <BillingView />
      )}

      {activeView === 'finance' && (
        <FinanceView />
      )}

      {activeView === 'inventory' && (
        <InventoryView />
      )}

      {activeView === 'staff' && (
        <StaffView />
      )}

      {activeView === 'followups' && (
        <FollowupsView />
      )}

      {activeView === 'reports' && (
        <ReportsView />
      )}

      {activeView === 'portal' && (
        <PatientPortalView
          onOpenReport={handleOpenReport}
        />
      )}

      {activeView === 'settings' && (
        <SettingsView />
      )}

      {/* Standalone Modals */}
      <PatientRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      <CreateLabOrderModal
        isOpen={isLabOrderModalOpen}
        onClose={() => {
          setIsLabOrderModalOpen(false);
          setLabOrderPreselectedPatient(null);
        }}
        preselectedPatientId={labOrderPreselectedPatient}
      />

      <CreateInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />

      {selectedReportId && (
        <LabReportModal
          isOpen={!!selectedReportId}
          onClose={() => setSelectedReportId(null)}
          reportId={selectedReportId}
        />
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/admin" element={<AdminConsole />} />
          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
