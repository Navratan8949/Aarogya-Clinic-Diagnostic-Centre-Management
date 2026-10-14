import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { Printer, Download, CheckCircle2, ShieldAlert, Award, FileText } from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';

export default function LabReportModal({ isOpen, onClose, reportId }) {
  const {
    reports,
    facility,
    currentRole,
    reviewAndApproveReport,
    releaseLabReport
  } = useApp();

  const [reviewNotes, setReviewNotes] = useState('Correlated clinically. Parameter values within acceptable analytical tolerances.');

  const report = reports.find(r => r.id === reportId);
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPathologist = currentRole.id === 'pathologist' || currentRole.id === 'super_admin';
  const isAwaitingReview = report.status === 'Awaiting Review';
  const isApproved = report.status === 'Approved';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Diagnostic Laboratory Report Preview"
      subtitle={`Report ID: ${report.id} • Order: ${report.orderId}`}
      maxWidth="max-w-4xl"
      footer={
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Report</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isPathologist && isAwaitingReview && (
              <button
                onClick={() => {
                  reviewAndApproveReport(report.id, currentRole.user, reviewNotes);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Verify & Sign as Pathologist</span>
              </button>
            )}

            {isApproved && (
              <button
                onClick={() => {
                  releaseLabReport(report.id);
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Release to Patient & Portal</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 print:space-y-4 printable-card text-xs">
        {/* Verification banner if awaiting review */}
        {isAwaitingReview && isPathologist && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Pathologist Verification Pending</span>
            </div>
            <p className="text-[11px] text-amber-700">
              Please review all entered parameter values, analytical reference intervals, and flags. Add your clinical review note below before authorizing.
            </p>
            <input
              type="text"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Clinical verification comments..."
              className="w-full text-xs px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-slate-800 outline-hidden"
            />
          </div>
        )}

        {/* Printable Letterhead */}
        <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-xs relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] rotate-[-25deg]">
            <span className="text-6xl font-black text-slate-900 tracking-widest text-center uppercase">
              DEMONSTRATION REPORT<br />NOT FOR CLINICAL USE
            </span>
          </div>

          {/* Letterhead Header */}
          <div className="border-b-2 border-teal-800 pb-4 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-lg font-extrabold text-teal-900 tracking-tight">
                  {facility.name}
                </h1>
                <p className="text-[11px] font-semibold text-slate-600">{facility.tagline}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{facility.address}</p>
                <p className="text-[10px] text-slate-500">
                  Tel: {facility.phone} • Email: {facility.email}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <span className="inline-block px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-800 rounded font-bold text-[10px]">
                  {facility.nablAccreditation}
                </span>
                <p className="text-[10px] text-slate-500 mt-1">CIN: {facility.regNo}</p>
                <p className="text-[10px] text-slate-500">GST: {facility.gstin}</p>
              </div>
            </div>
          </div>

          {/* Patient Demographic Table */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 mb-5 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4">
            <div>
              <span className="text-slate-500 block">Patient Name:</span>
              <strong className="text-slate-900 text-xs">{report.patientName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Age / Gender:</span>
              <strong className="text-slate-900">{report.patientAge} Years / {report.patientGender}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Patient ID:</span>
              <strong className="text-slate-900">{report.patientId}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Report ID:</span>
              <strong className="text-teal-800 font-mono">{report.id}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Referred By:</span>
              <strong className="text-slate-900">{report.doctorName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Reported At:</span>
              <strong className="text-slate-900">{report.reportedAt}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Status:</span>
              <StatusBadge status={report.status} size="sm" />
            </div>
            <div>
              <span className="text-slate-500 block">Sample Barcode:</span>
              <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                AAR-SMP-8801
              </span>
            </div>
          </div>

          {/* Diagnostic Investigation Results Table */}
          <div className="space-y-5">
            {(report.testResults || []).map((testGroup, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <div className="bg-teal-900 text-white px-3 py-1.5 rounded flex items-center justify-between text-xs font-bold">
                  <span>{testGroup.testName}</span>
                  <span className="text-[10px] text-teal-200 font-normal">Method: {testGroup.method}</span>
                </div>

                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 text-[11px] text-slate-600 font-bold bg-slate-100/60">
                      <th className="py-2 px-2.5">Investigation Parameter</th>
                      <th className="py-2 px-2.5 text-center">Observed Result</th>
                      <th className="py-2 px-2.5 text-center">Flag</th>
                      <th className="py-2 px-2.5 text-center">Unit</th>
                      <th className="py-2 px-2.5 text-right">Biological Reference Interval</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(testGroup.parameters || []).map((param, pIdx) => {
                      const isHigh = param.flag === 'High';
                      const isLow = param.flag === 'Low';
                      return (
                        <tr key={pIdx} className="hover:bg-slate-50/50">
                          <td className="py-2 px-2.5 font-medium text-slate-800">{param.name}</td>
                          <td className={`py-2 px-2.5 text-center font-bold ${
                            isHigh ? 'text-rose-700' : isLow ? 'text-amber-700' : 'text-slate-900'
                          }`}>
                            {param.value}
                          </td>
                          <td className="py-2 px-2.5 text-center">
                            {isHigh && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                                HIGH
                              </span>
                            )}
                            {isLow && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                LOW
                              </span>
                            )}
                            {!isHigh && !isLow && (
                              <span className="text-slate-400 text-[10px]">Normal</span>
                            )}
                          </td>
                          <td className="py-2 px-2.5 text-center text-slate-600 font-mono text-[11px]">{param.unit || '—'}</td>
                          <td className="py-2 px-2.5 text-right text-slate-600 font-mono text-[11px]">{param.refRange}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {testGroup.clinicalRemarks && (
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-700">
                    <strong className="text-slate-900">Clinical Remarks / Interpretation: </strong>
                    {testGroup.clinicalRemarks}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Signatures & Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
            <div className="space-y-1 text-slate-500 text-[10px] max-w-xs">
              <p className="font-bold text-slate-700">CONDITIONS OF REPORTING:</p>
              <p>• It is presumed that the specimen belongs to the patient named.</p>
              <p>• Results relate only to the items tested. Correlate with clinical findings.</p>
              <p className="text-rose-700 font-bold uppercase pt-1">
                {report.disclaimer}
              </p>
            </div>

            <div className="text-right space-y-1">
              <div className="h-10 flex items-center justify-end">
                <span className="font-serif italic text-teal-800 text-sm font-bold border-b border-teal-800 px-4">
                  {report.verifiedBy ? "Dr. Rajesh Khandelwal" : "— Verification Pending —"}
                </span>
              </div>
              <p className="font-bold text-slate-900">
                {report.verifiedBy || "Designated Pathologist"}
              </p>
              <p className="text-[10px] text-slate-500">
                MD (Pathology) • Reg. No: {report.pathologistRegNo || "RMC-18290"}
              </p>
              <p className="text-[10px] text-slate-400">Head of Pathology & Quality Manager</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
