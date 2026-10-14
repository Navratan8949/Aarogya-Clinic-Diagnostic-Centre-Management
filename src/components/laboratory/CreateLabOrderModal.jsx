import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { FlaskConical, Barcode, CheckSquare, Square, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function CreateLabOrderModal({ isOpen, onClose, preselectedPatientId }) {
  const {
    patients,
    doctors,
    testCatalogue,
    packages,
    createLabOrder
  } = useApp();

  const [patientId, setPatientId] = useState(preselectedPatientId || (patients[0]?.id || ''));
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [selectedTests, setSelectedTests] = useState(['TEST-CBC']);
  const [priority, setPriority] = useState('Routine');
  const [notes, setNotes] = useState('Fasting 8-10 hours maintained');
  const [generateInvoice, setGenerateInvoice] = useState(true);

  const selectedPatient = patients.find(p => p.id === patientId);
  const selectedDoctor = doctors.find(d => d.id === doctorId);

  const toggleTest = (id) => {
    setSelectedTests(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const applyPackage = (pkg) => {
    setSelectedTests(pkg.testsIncluded);
  };

  const totalAmount = selectedTests.reduce((sum, tId) => {
    const t = testCatalogue.find(item => item.id === tId);
    return sum + (t?.price || 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTests.length) {
      alert("Please select at least one diagnostic test");
      return;
    }

    createLabOrder({
      patientId,
      patientName: selectedPatient?.name || 'Patient',
      doctorId,
      doctorName: selectedDoctor?.name || 'Doctor',
      testIds: selectedTests,
      priority,
      notes,
      totalAmount,
      paidAmount: 0,
      balanceAmount: totalAmount,
      generateInvoice
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Diagnostic Lab Requisition"
      subtitle="Order pathology investigations, configure sample tubes, and register barcode specs"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Patient *</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden bg-white"
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.id}) — {p.phone}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Referring / Ordering Doctor *</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden bg-white"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.department})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Package Selector */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
            Popular Health Profiles / Packages
          </span>
          <div className="flex flex-wrap gap-2">
            {packages.map(pkg => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => applyPackage(pkg)}
                className="text-xs px-2.5 py-1 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-md text-slate-700 font-medium transition-colors"
              >
                {pkg.name} — <strong className="text-teal-700">{formatCurrency(pkg.packagePrice)}</strong>
              </button>
            ))}
          </div>
        </div>

        {/* Test Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Select Tests from Catalogue ({selectedTests.length} selected) *
            </label>
            <span className="text-xs font-bold text-teal-800">
              Est. Bill: {formatCurrency(totalAmount)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50/50 rounded-lg border border-slate-200">
            {testCatalogue.map(test => {
              const isChecked = selectedTests.includes(test.id);
              return (
                <div
                  key={test.id}
                  onClick={() => toggleTest(test.id)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-start gap-2.5 transition-colors ${
                    isChecked
                      ? 'bg-teal-50/80 border-teal-300 text-teal-900 font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-teal-700" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{test.name}</span>
                      <span className="font-semibold text-slate-900 shrink-0 ml-1">{formatCurrency(test.price)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">{test.tubeColor} • {test.tatHours}h TAT</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden bg-white"
            >
              <option value="Routine">Routine (Normal TAT)</option>
              <option value="Urgent">Urgent / STAT Priority</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Clinical / Sample Remarks</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Fasting 10 hrs, medication status"
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden"
            />
          </div>
        </div>

        <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 flex items-center gap-3">
          <input
            type="checkbox"
            id="genInv"
            checked={generateInvoice}
            onChange={(e) => setGenerateInvoice(e.target.checked)}
            className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
          />
          <label htmlFor="genInv" className="text-xs text-teal-900 font-medium cursor-pointer">
            Automatically generate Lab Invoice in Billing Counter for <strong>{formatCurrency(totalAmount)}</strong>
          </label>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
          >
            Generate Order & Barcodes
          </button>
        </div>
      </form>
    </Modal>
  );
}
