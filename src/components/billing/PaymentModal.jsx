import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { CreditCard, Banknote, QrCode, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function PaymentModal({ isOpen, onClose, invoice }) {
  const { recordPayment, currentRole } = useApp();

  const [amount, setAmount] = useState(invoice?.balanceDue || 0);
  const [method, setMethod] = useState('UPI (Google Pay / PhonePe)');
  const [reference, setReference] = useState(`UPI/${Date.now().toString().slice(-8)}`);

  if (!invoice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payAmt = Number(amount);
    if (!payAmt || payAmt <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }
    if (payAmt > invoice.balanceDue) {
      if (!confirm(`Entered amount (${formatCurrency(payAmt)}) exceeds balance due (${formatCurrency(invoice.balanceDue)}). Record as advance credit?`)) {
        return;
      }
    }

    recordPayment(invoice.id, {
      amount: payAmt,
      method,
      reference: reference.trim(),
      cashier: currentRole.user
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Payment & Issue Receipt"
      subtitle={`Invoice #${invoice.invoiceNo} • Patient: ${invoice.patientName}`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Invoice Summary */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Invoice Total:</span>
            <span className="font-semibold text-slate-900">{formatCurrency(invoice.totalAmount)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Already Paid:</span>
            <span className="font-semibold text-emerald-700">{formatCurrency(invoice.paidAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
            <span>Balance Due:</span>
            <span className="text-rose-700">{formatCurrency(invoice.balanceDue)}</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Payment Amount (₹) *</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max={invoice.balanceDue}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-base font-bold text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden"
            />
            <button
              type="button"
              onClick={() => setAmount(invoice.balanceDue)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-teal-700 hover:underline font-semibold"
            >
              Pay Full
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Payment Mode *</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden bg-white"
          >
            <option value="UPI (Google Pay / PhonePe)">UPI (Google Pay / PhonePe / Paytm)</option>
            <option value="Cash">Cash (Counter)</option>
            <option value="Debit / Credit Card">Debit / Credit Card (POS Terminal)</option>
            <option value="NetBanking (NEFT / IMPS)">NetBanking (NEFT / IMPS)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Transaction / Receipt Reference</label>
          <input
            type="text"
            placeholder="e.g. UTR / Auth Code / CSH-REC-01"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden"
          />
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
            Confirm & Generate Receipt
          </button>
        </div>
      </form>
    </Modal>
  );
}
