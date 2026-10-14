import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { Users, RotateCcw, Building2, Check, ArrowLeft, ShieldAlert } from 'lucide-react';
import Modal from '../common/Modal.jsx';

export default function DemoBanner() {
  const navigate = useNavigate();
  const {
    currentRole,
    roles,
    switchRole,
    branches,
    currentBranch,
    setCurrentBranch,
    resetDemoData
  } = useApp();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  return (
    <>
      {/* Full-width persistent banner - perfectly aligned on all screen sizes */}
      <div className="w-full bg-slate-900 text-slate-200 text-xs px-4 lg:px-8 py-2 border-b border-slate-800 shrink-0 select-none">
        <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          {/* Left: Demo Mode Badge & Context */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-400/30 text-[11px] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span>PORTFOLIO DEMO MODE</span>
            </span>
            <span className="hidden xl:inline text-slate-400 text-[11px]">
              Fictional Indian Clinical & Lab Data — Safe Demonstration Environment
            </span>
          </div>

          {/* Right: Operational Controls & Switchers */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Landing Page link */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-800 shrink-0 cursor-pointer"
              title="Return to Public Landing Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-medium">Landing Page</span>
            </button>

            {/* Branch Switcher Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 shrink-0">
              <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <select
                value={currentBranch.id}
                onChange={(e) => {
                  const b = branches.find(item => item.id === e.target.value);
                  if (b) setCurrentBranch(b);
                }}
                className="bg-transparent text-slate-200 text-[11px] font-medium outline-hidden cursor-pointer shrink-0"
              >
                {branches.map(b => (
                  <option key={b.id} value={b.id} className="bg-slate-900 text-slate-200">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Role Quick Switch Button */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-1.5 bg-teal-600/30 hover:bg-teal-600/40 text-teal-300 px-2.5 py-1 rounded-md border border-teal-500/40 transition-colors font-medium text-[11px] shrink-0 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Role: <strong className="text-white font-semibold">{currentRole.name}</strong></span>
              <span className="text-[10px] bg-teal-500/30 px-1.5 py-0.2 rounded font-semibold ml-0.5">Switch</span>
            </button>

            {/* Reset Demo Data button */}
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-300 transition-colors px-2 py-1 text-[11px] rounded hover:bg-slate-800 shrink-0 cursor-pointer"
              title="Reset demonstration data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Switcher Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Select Demonstration Persona"
        subtitle="Experience AarogyaDesk through 10 distinct healthcare operational perspectives"
        maxWidth="max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-1">
          {roles.map(r => {
            const isSelected = r.id === currentRole.id;
            return (
              <div
                key={r.id}
                onClick={() => {
                  switchRole(r.id);
                  setIsRoleModalOpen(false);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 text-sm">{r.name}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-teal-800 mb-1.5">{r.user}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{r.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Reset Confirmation Dialog */}
      <Modal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        title="Reset Demo Records?"
        subtitle="This will restore all patients, appointments, visits, lab orders, and invoices to initial state."
        maxWidth="max-w-md"
        footer={
          <>
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetDemoData();
                setIsResetConfirmOpen(false);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs cursor-pointer"
            >
              Yes, Reset Data
            </button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          Any newly created test visits, invoices, or sample collections stored in your browser's localStorage will be cleared. The initial preloaded Jaipur clinic dataset will be reloaded.
        </p>
      </Modal>
    </>
  );
}
