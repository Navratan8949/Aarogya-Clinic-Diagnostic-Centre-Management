import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  FlaskConical,
  TestTube2,
  Barcode,
  CheckCircle2,
  AlertOctagon,
  FileCheck2,
  Clock,
  Printer,
  Plus
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';
import Modal from '../common/Modal.jsx';
import CriticalResultsModal from './CriticalResultsModal.jsx';
import { formatCurrency } from '../../lib/formatters.js';

export default function LabDashboardView({ onOpenCreateOrder, onOpenReport, onOpenWorklist }) {
  const {
    labOrders,
    testCatalogue,
    criticalResults,
    collectSample,
    rejectSample,
    currentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'samples' | 'catalogue'
  const [rejectModalState, setRejectModalState] = useState({ isOpen: false, orderId: null, sampleId: null });
  const [rejectReason, setRejectReason] = useState('Hemolyzed sample - unsuitable for accurate colorimetry');
  const [barcodeSticker, setBarcodeSticker] = useState(null);
  const [isCriticalModalOpen, setIsCriticalModalOpen] = useState(false);

  // Flatten all samples
  const allSamples = labOrders.flatMap(order => 
    (order.samples || []).map(s => ({ ...s, orderId: order.id, patientName: order.patientName, priority: order.priority }))
  );

  const handleConfirmReject = () => {
    if (rejectModalState.orderId && rejectModalState.sampleId) {
      rejectSample(rejectModalState.orderId, rejectModalState.sampleId, rejectReason);
      setRejectModalState({ isOpen: false, orderId: null, sampleId: null });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-700" />
            <span>Pathology Laboratory & LIMS Workspace</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Specimen tracking, barcoded collection, analytical worklist, and pathologist report sign-off
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCriticalModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Critical Values & QC</span>
            {criticalResults?.some(c => !c.status.includes('Resolved')) && (
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            )}
          </button>
          <button
            onClick={onOpenWorklist}
            className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <TestTube2 className="w-3.5 h-3.5" />
            <span>Technician Worklist</span>
          </button>
          <button
            onClick={onOpenCreateOrder}
            className="px-4 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Lab Order</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Lab Requisitions & Orders ({labOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('samples')}
          className={`px-4 py-2.5 border-b-2 transition-colors ${
            activeTab === 'samples'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Sample Phlebotomy & Tracking ({allSamples.length})
        </button>
        <button
          onClick={() => setActiveTab('catalogue')}
          className={`px-4 py-2.5 border-b-2 transition-colors ${
            activeTab === 'catalogue'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Investigation Catalogue ({testCatalogue.length} Tests)
        </button>
      </div>

      {/* TAB 1: LAB ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Investigation Tests</th>
                  <th className="py-3 px-4">Order Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {labOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-teal-900 font-mono">
                      {order.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{order.patientName}</span>
                      <span className="text-[11px] text-slate-500">{order.patientId}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {order.doctorName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(order.testIds || []).map(tId => {
                          const tObj = testCatalogue.find(t => t.id === tId);
                          return (
                            <span key={tId} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                              {tObj?.name.split(' (')[0] || tId}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {order.orderDate} {order.orderTime}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {order.reportId ? (
                        <button
                          onClick={() => onOpenReport(order.reportId)}
                          className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded"
                        >
                          View Report
                        </button>
                      ) : (
                        <button
                          onClick={onOpenWorklist}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded"
                        >
                          Enter Results
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SPECIMEN SAMPLES & PHLEBOTOMY */}
      {activeTab === 'samples' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Barcode / Sample ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Investigation Test</th>
                  <th className="py-3 px-4">Vacutainer / Specimen</th>
                  <th className="py-3 px-4">Collection Status</th>
                  <th className="py-3 px-4">Collected At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allSamples.map(sample => (
                  <tr key={sample.sampleId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                          {sample.barcode}
                        </span>
                        <button
                          onClick={() => setBarcodeSticker(sample)}
                          className="p-1 text-slate-400 hover:text-slate-700"
                          title="Print Barcode Label"
                        >
                          <Barcode className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {sample.patientName}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      {sample.testName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-medium text-slate-600 block">{sample.tube}</span>
                      <span className="text-[10px] text-slate-400">{sample.sampleType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={sample.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {sample.collectedAt || "Awaiting Phlebotomy"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {sample.status === 'Awaiting Collection' && (
                        <button
                          onClick={() => collectSample(sample.orderId, sample.sampleId, currentRole.user)}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors"
                        >
                          Mark Collected
                        </button>
                      )}

                      {sample.status !== 'Rejected' && sample.status !== 'Completed' && (
                        <button
                          onClick={() => setRejectModalState({ isOpen: true, orderId: sample.orderId, sampleId: sample.sampleId })}
                          className="px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded border border-rose-200 transition-colors"
                        >
                          Reject Specimen
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TEST CATALOGUE */}
      {activeTab === 'catalogue' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testCatalogue.map(test => (
            <div key={test.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded uppercase">
                    {test.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{test.name}</h4>
                </div>
                <span className="font-extrabold text-base text-teal-900">{formatCurrency(test.price)}</span>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                <p>• <strong>Specimen:</strong> {test.sampleType}</p>
                <p>• <strong>Container:</strong> {test.tubeColor}</p>
                <p>• <strong>Method:</strong> {test.method}</p>
                <p>• <strong>TAT:</strong> {test.tatHours} Hours</p>
                <p>• <strong>Parameters:</strong> {test.parameters?.length || 1} clinical markers</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Barcode Sticker Preview Modal */}
      <Modal
        isOpen={!!barcodeSticker}
        onClose={() => setBarcodeSticker(null)}
        title="Phlebotomy Barcode Label"
        subtitle="Simulated 50mm x 25mm thermal label for specimen container"
        maxWidth="max-w-xs"
        footer={
          <button
            onClick={() => window.print()}
            className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Label</span>
          </button>
        }
      >
        {barcodeSticker && (
          <div className="p-4 bg-white border-2 border-dashed border-slate-300 rounded-lg text-center space-y-2">
            <p className="text-[10px] font-bold text-slate-800 tracking-wider uppercase">
              AAROGYA DIAGNOSTICS
            </p>
            {/* Visual Barcode Representation */}
            <div className="py-2 flex flex-col items-center justify-center">
              <div className="h-10 w-44 flex items-center justify-between px-1 bg-slate-900 text-white font-mono text-[9px] tracking-widest">
                || | |||| | ||||| ||| ||||
              </div>
              <span className="font-mono text-xs font-bold text-slate-900 mt-1">
                {barcodeSticker.barcode}
              </span>
            </div>
            <div className="text-left text-[10px] text-slate-700 space-y-0.5 border-t border-slate-200 pt-2 font-medium">
              <p><strong>Patient:</strong> {barcodeSticker.patientName}</p>
              <p><strong>Test:</strong> {barcodeSticker.testName}</p>
              <p><strong>Tube:</strong> {barcodeSticker.tube}</p>
              <p><strong>Date:</strong> 10-Oct-2026 10:20 AM</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Sample Rejection Modal */}
      <Modal
        isOpen={rejectModalState.isOpen}
        onClose={() => setRejectModalState({ isOpen: false, orderId: null, sampleId: null })}
        title="Reject Laboratory Specimen"
        subtitle="Record biological reason and generate automatic recollection request"
        maxWidth="max-w-md"
        footer={
          <>
            <button
              onClick={() => setRejectModalState({ isOpen: false, orderId: null, sampleId: null })}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReject}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
            >
              Confirm Rejection
            </button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p>
              Rejecting sample <strong>{rejectModalState.sampleId}</strong> will notify phlebotomy and flag this test for patient re-collection.
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Rejection Cause *</label>
            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
            >
              <option value="Hemolyzed sample - unsuitable for accurate colorimetry">Hemolyzed sample - unsuitable for colorimetry</option>
              <option value="Clotted EDTA sample - inaccurate platelet/CBC count">Clotted EDTA sample - inaccurate platelet count</option>
              <option value="Insufficient volume (QNS - Quantity Not Sufficient)">Insufficient volume (QNS)</option>
              <option value="Incorrect container / tube type used">Incorrect container / tube type used</option>
              <option value="Mislabeled or damaged collection tube">Mislabeled or damaged collection tube</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Critical Results & Quality Control Modal */}
      <CriticalResultsModal
        isOpen={isCriticalModalOpen}
        onClose={() => setIsCriticalModalOpen(false)}
      />
    </div>
  );
}
