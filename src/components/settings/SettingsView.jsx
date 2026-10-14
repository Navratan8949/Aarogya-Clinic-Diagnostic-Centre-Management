import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Settings, Building2, Shield, RotateCcw, AlertTriangle, Check, Layers } from 'lucide-react';
import Modal from '../common/Modal.jsx';

export default function SettingsView() {
  const {
    facility,
    branches,
    resetDemoData
  } = useApp();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner */}
      <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-700" />
            <span>Facility Configuration & Integration Framework</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional profile, operational branches, ABHA/ABDM placeholders, and demo data manager
          </p>
        </div>

        <button
          onClick={() => setIsResetConfirmOpen(true)}
          className="px-3.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Facility Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-700" />
          <span>Healthcare Facility Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 block">Facility Name:</span>
            <strong className="text-slate-900 text-sm">{facility.name}</strong>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 block">Accreditation / Scope:</span>
            <strong className="text-slate-900">{facility.nablAccreditation}</strong>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 block">State Registration No (RMC/DHS):</span>
            <strong className="text-slate-900 font-mono">{facility.regNo}</strong>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-slate-500 block">Goods and Services Tax (GSTIN):</span>
            <strong className="text-slate-900 font-mono">{facility.gstin}</strong>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
          <p><strong>Primary Address:</strong> {facility.address}</p>
          <p className="mt-1"><strong>Helpline & Contact:</strong> {facility.phone} • Email: {facility.email}</p>
          <p className="mt-1"><strong>Operating Hours:</strong> {facility.workingHours}</p>
        </div>
      </div>

      {/* Multi-Branch Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Configured Facility Branches ({branches.length})</span>
        </h3>

        <div className="space-y-2">
          {branches.map(b => (
            <div key={b.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900">{b.name}</strong>
                <p className="text-[11px] text-slate-500">{b.city} • Branch Code: {b.code}</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded">
                Active Branch
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Ecosystem Integration Roadmap */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          <span>Standards & Future Ecosystem Integrations (Architectural Roadmap)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">ABDM / M1-M2-M3 Health Data Exchange</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Ready for National Health Authority (NHA) Ayushman Bharat Digital Mission sandbox certification for consent-driven longitudinal health records exchange (FHIR R4 profiles).
            </p>
            <span className="inline-block text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
              Milestone Spec M1/M2/M3
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">Laboratory Analyzer Bidirectional Interfacing</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Support for RS232 / TCP-IP bidirectional ASTM and HL7 protocols to directly ingest automated results from Sysmex, Transasia, and Beckman Coulter analyzers.
            </p>
            <span className="inline-block text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
              ASTM 1394 / HL7 LIMS
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">Digital Personal Data Protection Act (DPDPA 2023)</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Architecture incorporates strict purpose limitation, role-separated privilege tiers, and automated consent logs for clinical and billing access.
            </p>
            <span className="inline-block text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
              Privacy Framework Ready
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block">Payment Gateways & WhatsApp Cloud API</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Ready for pluggable Razorpay / PayU dynamic UPI QR payment generation and official Meta WhatsApp Cloud API clinical report PDF dispatch.
            </p>
            <span className="inline-block text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
              Multi-Channel APIs
            </span>
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      <Modal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        title="Reset All Demo Data?"
        subtitle="This action restores initial test patient, doctor, and lab records."
        maxWidth="max-w-md"
        footer={
          <>
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetDemoData();
                setIsResetConfirmOpen(false);
              }}
              className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
            >
              Reset Everything
            </button>
          </>
        }
      >
        <p className="text-xs text-slate-600 leading-relaxed">
          All changes made in your local session will be erased. The system will revert to the initial pre-loaded clinic dataset.
        </p>
      </Modal>
    </div>
  );
}
