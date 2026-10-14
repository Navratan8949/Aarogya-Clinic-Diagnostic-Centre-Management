import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import DemoBanner from './DemoBanner.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import ToastContainer from '../common/ToastContainer.jsx';
import PatientRegistrationModal from '../patients/PatientRegistrationModal.jsx';
import BookAppointmentModal from '../appointments/BookAppointmentModal.jsx';
import CreateLabOrderModal from '../laboratory/CreateLabOrderModal.jsx';
import CreateInvoiceModal from '../billing/CreateInvoiceModal.jsx';
import LabReportModal from '../laboratory/LabReportModal.jsx';

export default function AppLayout({ children }) {
  const {
    currentRole,
    selectedReportId,
    setSelectedReportId
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeQuickAction, setActiveQuickAction] = useState(null);

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col antialiased">
      {/* Persistent Demo Mode Banner & Fast Role Switcher */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <Topbar
            onMenuClick={() => setIsSidebarOpen(true)}
            onOpenQuickAction={(action) => setActiveQuickAction(action)}
          />

          <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
            <div className="w-full">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Quick Action Modal Triggers */}
      <PatientRegistrationModal
        isOpen={activeQuickAction === 'register_patient'}
        onClose={() => setActiveQuickAction(null)}
      />

      <BookAppointmentModal
        isOpen={activeQuickAction === 'book_appointment'}
        onClose={() => setActiveQuickAction(null)}
      />

      <CreateLabOrderModal
        isOpen={activeQuickAction === 'create_lab_order'}
        onClose={() => setActiveQuickAction(null)}
      />

      <CreateInvoiceModal
        isOpen={activeQuickAction === 'create_invoice'}
        onClose={() => setActiveQuickAction(null)}
      />

      {/* Global Lab Report Preview Modal */}
      {selectedReportId && (
        <LabReportModal
          isOpen={!!selectedReportId}
          onClose={() => setSelectedReportId(null)}
          reportId={selectedReportId}
        />
      )}
    </div>
  );
}
