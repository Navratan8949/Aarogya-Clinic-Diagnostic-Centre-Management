import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { AlertCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function RefundModal({ isOpen, onClose, invoice }) {
  const { processRefund, currentRole } = useApp();

  const [refundAmount, setRefundAmount] = useState(invoice?.paidAmount || 0);
  const [refundReason, setRefundReason] = useState('Cancelled investigation / Patient service cancellation');
  const [refundMethod, setRefundMethod] = useState('UPI Reversal');

  if (!invoice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = Number(refundAmount);
    if (!amt || amt <= 0) {
      alert("Please enter a valid refund amount");
      return;
    }

    if (amt > invoice.paidAmount) {
      alert(`Refund cannot exceed collected amount (${formatCurrency(invoice.paidAmount)})`);
      return;
    }

    processRefund(invoice.id, {
      invoiceNo: invoice.invoiceNo,
      patientId: invoice.patientId,
      patientName: invoice.patientName,
      amount: amt,
      originalAmount: invoice.totalAmount,
      reason: refundReason.trim(),
      paymentMethod: refundMethod
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Issue Refund & Credit Note"
      subtitle={`Invoice #${invoice.invoiceNo} • Patient: ${invoice.patientName}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Invoice Summary */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Total Invoiced:</span>
            <strong className="text-slate-900">{formatCurrency(invoice.totalAmount)}</strong>
          </div>
          <div className="flex justify-between text-emerald-800">
            <span>Paid Amount (Eligible for Refund):</span>
            <strong className="text-emerald-700">{formatCurrency(invoice.paidAmount)}</strong>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Refund Amount (₹) *</label>
          <input
            type="number"
            min="1"
            max={invoice.paidAmount}
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            className="w-full text-base font-bold text-rose-700 px-3 py-2 rounded-lg border border-slate-200 outline-hidden"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Refund Channel *</label>
          <select
            value={refundMethod}
            onChange={(e) => setRefundMethod(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
          >
            <option value="UPI Reversal">UPI Reversal (Google Pay / PhonePe)</option>
            <option value="Cash Return">Cash (Petty Drawer Return)</option>
            <option value="Bank NEFT Transfer">Bank NEFT Transfer</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Justification / Reason *</label>
          <input
            type="text"
            required
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
          >
            Approve & Issue Credit Note
          </button>
        </div>
      </form>
    </Modal>
  );
}
