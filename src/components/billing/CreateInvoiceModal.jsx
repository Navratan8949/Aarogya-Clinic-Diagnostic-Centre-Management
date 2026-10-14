import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { Plus, Trash2, Receipt } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function CreateInvoiceModal({ isOpen, onClose }) {
  const {
    patients,
    createInvoice
  } = useApp();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [items, setItems] = useState([
    { description: 'OPD Specialist Consultation', type: 'Consultation', qty: 1, rate: 600, amount: 600 }
  ]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountReason, setDiscountReason] = useState('');

  const selectedPatient = patients.find(p => p.id === patientId);

  const addItem = () => {
    setItems(prev => [
      ...prev,
      { description: 'Diagnostic Test / Service', type: 'Lab Test', qty: 1, rate: 350, amount: 350 }
    ]);
  };

  const removeItem = (idx) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, field, value) => {
    setItems(prev => prev.map((item, i) => {
      if (i !== idx) return item;
      const updated = { ...item, [field]: value };
      if (field === 'qty' || field === 'rate') {
        updated.amount = (Number(updated.qty) || 0) * (Number(updated.rate) || 0);
      }
      return updated;
    }));
  };

  const subtotal = items.reduce((sum, it) => sum + (it.amount || 0), 0);
  const total = Math.max(0, subtotal - Number(discountAmount || 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) {
      alert("Please add at least one line item");
      return;
    }

    createInvoice({
      patientId,
      patientName: selectedPatient?.name || 'Patient',
      items,
      discountAmount: Number(discountAmount || 0),
      discountReason: discountReason.trim()
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Invoice"
      subtitle="Issue billing for doctor consultation, pathology procedures, or health packages"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Select Patient *</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden bg-white"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id}) — {p.phone}
              </option>
            ))}
          </select>
        </div>

        {/* Line items table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">Line Items & Services *</label>
            <button
              type="button"
              onClick={addItem}
              className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Service Line
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <input
                  type="text"
                  placeholder="Service description"
                  value={it.description}
                  onChange={(e) => updateItem(idx, 'description', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white rounded border border-slate-200 focus:border-teal-600 outline-hidden"
                />
                <select
                  value={it.type}
                  onChange={(e) => updateItem(idx, 'type', e.target.value)}
                  className="w-28 px-2 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Lab Test">Lab Test</option>
                  <option value="Package">Package</option>
                  <option value="Procedure">Procedure</option>
                </select>
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={it.qty}
                  onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                  className="w-14 px-2 py-1.5 bg-white rounded border border-slate-200 text-center outline-hidden"
                />
                <input
                  type="number"
                  placeholder="Rate ₹"
                  min="0"
                  value={it.rate}
                  onChange={(e) => updateItem(idx, 'rate', e.target.value)}
                  className="w-20 px-2 py-1.5 bg-white rounded border border-slate-200 text-right outline-hidden"
                />
                <span className="w-20 font-bold text-slate-800 text-right">
                  {formatCurrency(it.amount)}
                </span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Discounts & Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Special Discount (₹)</label>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Discount Justification</label>
              <input
                type="text"
                placeholder="e.g. Senior Citizen, Staff Referral"
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount:</span>
              <span className="text-rose-600 font-semibold">- {formatCurrency(discountAmount)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST / Taxes:</span>
              <span>₹0 (Healthcare exempt)</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
              <span>Net Payable:</span>
              <span className="text-teal-800 text-base">{formatCurrency(total)}</span>
            </div>
          </div>
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
            Issue Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
}
