import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Receipt,
  Plus,
  CreditCard,
  Printer,
  DollarSign,
  Search,
  Banknote,
  FileSpreadsheet
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';
import Modal from '../common/Modal.jsx';
import PaymentModal from './PaymentModal.jsx';
import CreateInvoiceModal from './CreateInvoiceModal.jsx';
import RefundModal from './RefundModal.jsx';
import { formatCurrency } from '../../lib/formatters.js';
import { exportToCSV } from '../../lib/exportUtils.js';

export default function BillingView() {
  const {
    invoices,
    refunds,
    stats,
    facility
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);
  const [selectedInvoiceForRefund, setSelectedInvoiceForRefund] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCashSummaryOpen, setIsCashSummaryOpen] = useState(false);
  const [isRefundsListOpen, setIsRefundsListOpen] = useState(false);

  // Filtered invoices
  const filteredInvoices = invoices.filter(inv => {
    if (filterStatus !== 'ALL' && inv.paymentStatus !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = inv.patientName.toLowerCase().includes(q);
      const matchNo = inv.invoiceNo.toLowerCase().includes(q);
      return matchName || matchNo;
    }
    return true;
  });

  const handleExportCSV = () => {
    const exportData = filteredInvoices.map(inv => ({
      InvoiceNo: inv.invoiceNo,
      Date: inv.date,
      Patient: inv.patientName,
      TotalAmount: inv.totalAmount,
      PaidAmount: inv.paidAmount,
      BalanceDue: inv.balanceDue,
      PaymentStatus: inv.paymentStatus
    }));

    exportToCSV('AarogyaDesk_Invoices', exportData, [
      { key: 'InvoiceNo', label: 'Invoice #' },
      { key: 'Date', label: 'Date' },
      { key: 'Patient', label: 'Patient Name' },
      { key: 'TotalAmount', label: 'Total (INR)' },
      { key: 'PaidAmount', label: 'Paid (INR)' },
      { key: 'BalanceDue', label: 'Balance Due (INR)' },
      { key: 'PaymentStatus', label: 'Status' }
    ]);
  };

  // Calculate day-end physical cash breakdown
  let cashTotal = 0;
  let upiTotal = 0;
  let cardTotal = 0;

  invoices.forEach(inv => {
    (inv.payments || []).forEach(p => {
      const meth = (p.method || '').toLowerCase();
      if (meth.includes('cash')) cashTotal += p.amount;
      else if (meth.includes('upi')) upiTotal += p.amount;
      else cardTotal += p.amount;
    });
  });

  const openingCash = 5000;
  const cashExpenses = 1850;
  const closingPhysicalCash = openingCash + cashTotal - cashExpenses;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-teal-700" />
            <span>Billing Counter, Invoices & Collections</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            OPD consultations, diagnostic investigation bills, partial payments, and receipts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRefundsListOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Refunds & Credit Notes ({refunds?.length || 0})</span>
          </button>
          <button
            onClick={() => setIsCashSummaryOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Banknote className="w-3.5 h-3.5 text-slate-600" />
            <span>Daily Cash Summary</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Invoiced (Revenue)</span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(stats.totalRevenue)}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Gross billings across OPD and laboratory</p>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-emerald-700 font-semibold uppercase">Realized Collections</span>
          <h3 className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(stats.totalCollections)}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Cash, UPI, Card, and NetBanking payments received</p>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-rose-700 font-semibold uppercase">Outstanding Patient Balances</span>
          <h3 className="text-2xl font-bold text-rose-700 mt-1">{formatCurrency(stats.outstandingBalances)}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Pending dues across active patient accounts</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoice number or patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-hidden text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600">Payment Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium outline-hidden"
          >
            <option value="ALL">All Invoices</option>
            <option value="Paid">Paid in Full</option>
            <option value="Partial">Partially Paid</option>
            <option value="Unpaid">Unpaid / Due</option>
          </select>
        </div>
      </div>

      {/* Invoices Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Services / Line Items</th>
                <th className="py-3 px-4 text-right">Total Bill</th>
                <th className="py-3 px-4 text-right">Paid Amount</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-900">
                    {inv.invoiceNo}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {inv.date}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{inv.patientName}</span>
                    <span className="text-[11px] text-slate-400">{inv.patientId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-xs truncate text-slate-700">
                      {(inv.items || []).map(it => it.description).join(', ')}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {formatCurrency(inv.totalAmount)}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-emerald-700">
                    {formatCurrency(inv.paidAmount)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-rose-700">
                    {formatCurrency(inv.balanceDue)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={inv.paymentStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {inv.balanceDue > 0 && (
                      <button
                        onClick={() => setSelectedInvoiceForPayment(inv)}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors"
                      >
                        Record Pay
                      </button>
                    )}
                    {inv.paidAmount > 0 && (
                      <button
                        onClick={() => setSelectedInvoiceForRefund(inv)}
                        className="px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded border border-rose-200 transition-colors"
                      >
                        Refund
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoiceForPrint(inv)}
                      className="px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                      title="Print Invoice"
                    >
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedInvoiceForPayment && (
        <PaymentModal
          isOpen={!!selectedInvoiceForPayment}
          onClose={() => setSelectedInvoiceForPayment(null)}
          invoice={selectedInvoiceForPayment}
        />
      )}

      {/* Refund Modal */}
      {selectedInvoiceForRefund && (
        <RefundModal
          isOpen={!!selectedInvoiceForRefund}
          onClose={() => setSelectedInvoiceForRefund(null)}
          invoice={selectedInvoiceForRefund}
        />
      )}

      {/* Refunds & Credit Notes List Modal */}
      <Modal
        isOpen={isRefundsListOpen}
        onClose={() => setIsRefundsListOpen(false)}
        title="Refunds & Credit Notes Audit Register"
        subtitle="Separately tracked customer returns and payment reversals"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-3 text-xs">
          {(refunds || []).length === 0 ? (
            <p className="py-6 text-center text-slate-400">No refunds or credit notes recorded.</p>
          ) : (
            (refunds || []).map(ref => (
              <div key={ref.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 font-mono">{ref.id}</strong>
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold">
                      {ref.paymentMethod}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Invoice: {ref.invoiceNo} • Patient: {ref.patientName} • Date: {ref.date}
                  </p>
                  <p className="text-slate-500 text-[11px] italic mt-0.5">Reason: {ref.reason}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-rose-700 text-sm">{formatCurrency(ref.amount)}</span>
                  <span className="text-[10px] text-slate-400 block">By: {ref.processedBy}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Daily Cash Summary Modal */}
      <Modal
        isOpen={isCashSummaryOpen}
        onClose={() => setIsCashSummaryOpen(false)}
        title="Day-End Cash Register & Reconciliation"
        subtitle="Physical cash drawer audit vs UPI/Card electronic collections"
        maxWidth="max-w-lg"
        footer={
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Print Cashier Summary</span>
          </button>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Opening Cash Drawer Balance:</span>
              <strong className="text-slate-900">{formatCurrency(openingCash)}</strong>
            </div>
            <div className="flex justify-between text-emerald-800">
              <span>Cash Collections (Counter Receipts):</span>
              <strong>+ {formatCurrency(cashTotal)}</strong>
            </div>
            <div className="flex justify-between text-rose-800">
              <span>Petty Cash Expenses Paid Out:</span>
              <strong>- {formatCurrency(cashExpenses)}</strong>
            </div>
            <div className="pt-2 border-t border-slate-300 flex justify-between font-bold text-sm text-slate-900">
              <span>Expected Closing Physical Cash:</span>
              <span className="text-teal-800">{formatCurrency(closingPhysicalCash)}</span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2 text-blue-950">
            <span className="font-bold block uppercase text-[10px] text-blue-800">
              Non-Cash Digital Collections (Bank Account Direct)
            </span>
            <div className="flex justify-between">
              <span>UPI (Google Pay, PhonePe, Paytm):</span>
              <strong className="text-slate-900">{formatCurrency(upiTotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Card POS Terminals (HDFC Bank):</span>
              <strong className="text-slate-900">{formatCurrency(cardTotal)}</strong>
            </div>
            <div className="pt-1 border-t border-blue-200 flex justify-between font-bold">
              <span>Total Digital Receipts:</span>
              <span>{formatCurrency(upiTotal + cardTotal)}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 italic">
            Physical cash and digital collections are kept strictly segregated for accurate cashier handovers.
          </p>
        </div>
      </Modal>

      {/* Invoice Print Modal */}
      {selectedInvoiceForPrint && (
        <Modal
          isOpen={!!selectedInvoiceForPrint}
          onClose={() => setSelectedInvoiceForPrint(null)}
          title="Tax Invoice & Receipt"
          subtitle={`Invoice #${selectedInvoiceForPrint.invoiceNo}`}
          maxWidth="max-w-xl"
          footer={
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
          }
        >
          <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 printable-card text-xs">
            <div className="border-b-2 border-teal-800 pb-3 flex justify-between items-start">
              <div>
                <h2 className="text-base font-extrabold text-teal-900">{facility.name}</h2>
                <p className="text-[10px] text-slate-500">{facility.address}</p>
                <p className="text-[10px] text-slate-500">GSTIN: {facility.gstin}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm font-mono">{selectedInvoiceForPrint.invoiceNo}</span>
                <p className="text-[10px] text-slate-500">Date: {selectedInvoiceForPrint.date}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded text-[11px] grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block">Patient Name:</span>
                <strong className="text-slate-900">{selectedInvoiceForPrint.patientName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Patient ID:</span>
                <strong className="text-slate-900">{selectedInvoiceForPrint.patientId}</strong>
              </div>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 font-bold text-slate-600 bg-slate-50">
                  <th className="py-2 px-2">Service Description</th>
                  <th className="py-2 px-2 text-center">Qty</th>
                  <th className="py-2 px-2 text-right">Rate</th>
                  <th className="py-2 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(selectedInvoiceForPrint.items || []).map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2 font-medium text-slate-800">{it.description}</td>
                    <td className="py-2 px-2 text-center">{it.qty}</td>
                    <td className="py-2 px-2 text-right font-mono">{formatCurrency(it.rate)}</td>
                    <td className="py-2 px-2 text-right font-mono font-bold">{formatCurrency(it.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-slate-200 pt-3 space-y-1 text-right text-xs">
              <p className="text-slate-600">Subtotal: <strong className="font-mono text-slate-900">{formatCurrency(selectedInvoiceForPrint.subtotal)}</strong></p>
              {selectedInvoiceForPrint.discountAmount > 0 && (
                <p className="text-rose-700">Discount: <strong className="font-mono">- {formatCurrency(selectedInvoiceForPrint.discountAmount)}</strong></p>
              )}
              <p className="text-sm font-bold text-teal-900 pt-1 border-t border-slate-100">
                Total Bill: <span className="font-mono">{formatCurrency(selectedInvoiceForPrint.totalAmount)}</span>
              </p>
              <p className="text-xs font-semibold text-emerald-700">
                Amount Paid: <span className="font-mono">{formatCurrency(selectedInvoiceForPrint.paidAmount)}</span>
              </p>
              <p className="text-xs font-bold text-rose-700">
                Balance Due: <span className="font-mono">{formatCurrency(selectedInvoiceForPrint.balanceDue)}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
              Healthcare services exempt from GST. Thank you for choosing {facility.name}.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
