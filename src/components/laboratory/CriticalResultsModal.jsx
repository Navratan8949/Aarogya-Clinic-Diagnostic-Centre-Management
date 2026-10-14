import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { AlertOctagon, PhoneCall, CheckCircle2, ShieldAlert, Award, Plus, FileText } from 'lucide-react';

export default function CriticalResultsModal({ isOpen, onClose }) {
  const {
    criticalResults,
    labQC,
    acknowledgeCriticalResult,
    closeCriticalResult,
    recordLabQC,
    currentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState('critical'); // 'critical' | 'qc'
  const [selectedCritId, setSelectedCritId] = useState(criticalResults[0]?.id);

  // Escalation log form
  const [contactDoctor, setContactDoctor] = useState('Dr. Ananya Sharma');
  const [contactMethod, setContactMethod] = useState('Direct Intercom (Room 102)');
  const [contactNote, setContactNote] = useState('Informed doctor of critical value. Verified test repeat on analyzer.');
  const [closureNote, setClosureNote] = useState('');

  // QC form
  const [isQCModalOpen, setIsQCModalOpen] = useState(false);
  const [qcAnalyzer, setQcAnalyzer] = useState('Sysmex KX-21 Automated Cell Counter');
  const [qcLevel, setQcLevel] = useState('Normal Control (Level 2)');
  const [qcStatus, setQcStatus] = useState('Passed (100% In Range)');

  const selectedCrit = criticalResults.find(c => c.id === selectedCritId) || criticalResults[0];

  const handleAcknowledge = (e) => {
    e.preventDefault();
    if (selectedCrit) {
      acknowledgeCriticalResult(selectedCrit.id, contactDoctor, contactMethod, contactNote);
    }
  };

  const handleCloseCase = () => {
    if (selectedCrit && closureNote.trim()) {
      closeCriticalResult(selectedCrit.id, closureNote);
      setClosureNote('');
    } else {
      alert("Please provide a clinical closure note before resolving.");
    }
  };

  const handleSaveQC = (e) => {
    e.preventDefault();
    recordLabQC({
      analyzer: qcAnalyzer,
      controlLevel: qcLevel,
      lotNumber: `QC-LOT-${Date.now().toString().slice(-4)}`,
      overallStatus: qcStatus,
      parametersTested: [
        { parameter: "WBC", target: "7.5", observed: "7.4", unit: "10^3/uL", status: "In Range" },
        { parameter: "HGB", target: "13.5", observed: "13.5", unit: "g/dL", status: "In Range" }
      ],
      reviewedBy: "Kavita Sharma (Lab Manager)"
    });
    setIsQCModalOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Laboratory Quality Assurance & Critical Value Escalation"
      subtitle="Panic value doctor notification logbook & daily analyzer calibration controls (NABL Compliance)"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4 text-xs">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 font-semibold">
          <button
            onClick={() => setActiveTab('critical')}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'critical'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Critical Value Alerts ({criticalResults.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('qc')}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'qc'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-teal-600" />
            <span>Daily Quality Control Controls ({labQC.length})</span>
          </button>
        </div>

        {/* TAB 1: CRITICAL VALUE NOTIFICATION LOG */}
        {activeTab === 'critical' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Col: List of Critical alerts */}
            <div className="lg:col-span-1 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Flagged Panic Investigations
              </span>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {criticalResults.map(cr => {
                  const isSelected = cr.id === selectedCrit?.id;
                  return (
                    <div
                      key={cr.id}
                      onClick={() => setSelectedCritId(cr.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-50/80 border-rose-400 shadow-xs ring-1 ring-rose-400'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-rose-900">{cr.id}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          cr.status.includes('Resolved') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {cr.status}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900">{cr.patientName}</p>
                      <p className="text-[11px] text-rose-700 font-semibold">{cr.parameter}: {cr.criticalValue}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">{cr.flaggedAt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 2 Cols: Details & Escalation Attempt Log */}
            <div className="lg:col-span-2 space-y-3">
              {selectedCrit && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{selectedCrit.testName}</h4>
                      <p className="text-slate-600">
                        Patient: <strong>{selectedCrit.patientName}</strong> ({selectedCrit.patientId}) • Order: {selectedCrit.orderId}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-rose-700 block">{selectedCrit.criticalValue}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{selectedCrit.threshold}</span>
                    </div>
                  </div>

                  {/* Previous Contact Logs */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                      Doctor Telephonic Escalation History:
                    </span>
                    {(selectedCrit.contactLogs || []).length === 0 ? (
                      <p className="text-slate-400 text-[11px] italic">No communication logged yet.</p>
                    ) : (
                      selectedCrit.contactLogs.map((log, idx) => (
                        <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] space-y-0.5">
                          <div className="flex justify-between font-semibold text-slate-800">
                            <span>To: {log.contactedPerson} ({log.method})</span>
                            <span className="text-slate-400 font-normal">{log.timestamp}</span>
                          </div>
                          <p className="text-slate-600">{log.note}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Contact Attempt Form */}
                  {selectedCrit.status !== 'Resolved & Closed' && (
                    <form onSubmit={handleAcknowledge} className="p-3 bg-white rounded-xl border border-rose-200 space-y-2">
                      <span className="font-bold text-rose-900 block text-[11px]">
                        Log New Doctor Notification Attempt:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Doctor Name"
                          value={contactDoctor}
                          onChange={(e) => setContactDoctor(e.target.value)}
                          className="px-2 py-1 rounded border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Method (Intercom / Mobile)"
                          value={contactMethod}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="px-2 py-1 rounded border border-slate-200 text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Communication note (e.g. Doctor alerted; re-checked on analyzer)"
                        value={contactNote}
                        onChange={(e) => setContactNote(e.target.value)}
                        className="w-full px-2 py-1 rounded border border-slate-200 text-xs"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 bg-rose-700 text-white font-semibold rounded text-xs hover:bg-rose-800"
                      >
                        Log Notification Call
                      </button>
                    </form>
                  )}

                  {/* Resolution Note if closing */}
                  {selectedCrit.status !== 'Resolved & Closed' ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                      <span className="font-bold text-emerald-900 block text-[11px]">
                        Close Critical Case (Clinical Resolution):
                      </span>
                      <input
                        type="text"
                        placeholder="Resolution summary (e.g. Patient emergency consult completed; therapy started)"
                        value={closureNote}
                        onChange={(e) => setClosureNote(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded border border-emerald-300 bg-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleCloseCase}
                        className="px-3 py-1 bg-emerald-700 text-white font-semibold rounded text-xs hover:bg-emerald-800"
                      >
                        Mark Case Resolved & Closed
                      </button>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 text-[11px]">
                      <strong>Closure Record: </strong> {selectedCrit.closureNote}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: QUALITY CONTROL (QC) */}
        {activeTab === 'qc' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                Daily Analyzer Calibration & Levey-Jennings Logs
              </span>
              <button
                type="button"
                onClick={() => setIsQCModalOpen(true)}
                className="px-3 py-1 bg-teal-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1 shadow-xs hover:bg-teal-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Analyzer Daily QC</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {labQC.map(qc => (
                <div key={qc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 text-sm">{qc.analyzer}</strong>
                      <p className="text-[11px] text-slate-500">
                        {qc.date} • Lot: {qc.lotNumber} • Level: {qc.controlLevel}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-emerald-800 bg-emerald-100 text-[10px]">
                      {qc.overallStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-200 text-[11px]">
                    {(qc.parametersTested || []).map((p, i) => (
                      <div key={i} className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-slate-500 block">{p.parameter}:</span>
                        <strong className="text-slate-900">{p.observed}</strong>
                        <span className="text-slate-400 ml-1">({p.target} target)</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add QC Modal */}
        {isQCModalOpen && (
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-3 text-xs">
            <h4 className="font-bold text-teal-900">Record Quality Control Run</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={qcAnalyzer}
                onChange={(e) => setQcAnalyzer(e.target.value)}
                className="px-2 py-1.5 bg-white border border-teal-200 rounded text-xs"
              >
                <option value="Sysmex KX-21 Automated Cell Counter">Sysmex KX-21 Automated Cell Counter</option>
                <option value="Erba Chem-7 Semi-Automated Chemistry">Erba Chem-7 Semi-Automated Chemistry</option>
                <option value="Bio-Rad D-10 HPLC HbA1c Analyzer">Bio-Rad D-10 HPLC HbA1c Analyzer</option>
              </select>
              <select
                value={qcLevel}
                onChange={(e) => setQcLevel(e.target.value)}
                className="px-2 py-1.5 bg-white border border-teal-200 rounded text-xs"
              >
                <option value="Normal Control (Level 2)">Normal Control (Level 2)</option>
                <option value="Pathological Control (Level 3)">Pathological Control (Level 3)</option>
                <option value="Low Control (Level 1)">Low Control (Level 1)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsQCModalOpen(false)}
                className="px-3 py-1 text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQC}
                className="px-3.5 py-1 bg-teal-800 text-white font-bold rounded"
              >
                Save Control
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
