import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { DollarSign, Plus, ArrowUpRight, ArrowDownRight, FileText, PieChart } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import { formatCurrency } from '../../lib/formatters.js';

export default function FinanceView() {
  const {
    expenses,
    stats,
    addExpense
  } = useApp();

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    category: 'Lab Consumables & Reagents',
    payee: '',
    description: '',
    amount: '',
    paymentMethod: 'Bank Transfer (NEFT)'
  });

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.payee || !expenseForm.amount) {
      alert("Please fill all required expense fields");
      return;
    }

    addExpense({
      ...expenseForm,
      reference: `EXP-TXN-${Date.now().toString().slice(-6)}`
    });

    setIsExpenseModalOpen(false);
  };

  const netOperatingSurplus = stats.totalCollections - stats.totalExpenses;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-teal-700" />
            <span>Financial Operations & Operating Expenses</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operating revenue, collections realization, supplier bills, and clinic petty expenses
          </p>
        </div>

        <button
          onClick={() => setIsExpenseModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Log Clinic Expense</span>
        </button>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Total Realized Inflow</span>
          <h3 className="text-2xl font-bold text-emerald-700 mt-1">{formatCurrency(stats.totalCollections)}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Cash, UPI, and bank collections received</p>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Operating Outflow (Expenses)</span>
          <h3 className="text-2xl font-bold text-rose-700 mt-1">{formatCurrency(stats.totalExpenses)}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Reagents, power, biomedical waste & maintenance</p>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold uppercase">Net Operating Cash Surplus</span>
          <h3 className={`text-2xl font-bold mt-1 ${netOperatingSurplus >= 0 ? 'text-teal-900' : 'text-rose-700'}`}>
            {formatCurrency(netOperatingSurplus)}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Operating margin (fictional demonstration audit)</p>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Recorded Operational Expenses ({expenses.length})
          </h3>
          <span className="text-xs text-slate-500">Excludes non-capital supplier credit</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Expense ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payee / Vendor</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    {exp.id}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {exp.date}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium text-[11px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {exp.payee}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {exp.description}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {exp.paymentMethod}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {formatCurrency(exp.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        title="Log Operational Clinic Expense"
        subtitle="Record vendor payment, reagent replenishment, or facility maintenance"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleExpenseSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Expense Category *</label>
            <select
              value={expenseForm.category}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
            >
              <option value="Lab Consumables & Reagents">Lab Consumables & Reagents</option>
              <option value="Biomedical Waste Disposal">Biomedical Waste Disposal</option>
              <option value="Electricity & Air Conditioning">Electricity & Air Conditioning</option>
              <option value="Stationery & Barcode Labels">Stationery & Barcode Labels</option>
              <option value="Staff Travel & Delivery">Staff Travel & Delivery</option>
              <option value="Equipment AMC / Calibration">Equipment AMC / Calibration</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Vendor / Payee Name *</label>
            <input
              type="text"
              placeholder="e.g. Transasia Bio-Medicals, JVVNL"
              value={expenseForm.payee}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, payee: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Description / Bill Notes</label>
            <input
              type="text"
              placeholder="e.g. Monthly bio-waste clearance"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Amount (₹) *</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 3500"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Payment Mode</label>
              <select
                value={expenseForm.paymentMethod}
                onChange={(e) => setExpenseForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
              >
                <option value="Bank Transfer (NEFT)">Bank Transfer (NEFT)</option>
                <option value="Cash">Cash (Petty Drawer)</option>
                <option value="Cheque">Cheque</option>
                <option value="NetBanking">NetBanking</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsExpenseModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
            >
              Save Expense Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
