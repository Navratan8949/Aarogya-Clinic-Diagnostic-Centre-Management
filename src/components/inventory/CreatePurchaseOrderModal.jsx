import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function CreatePurchaseOrderModal({ isOpen, onClose }) {
  const { suppliers, inventory, createPurchaseOrder } = useApp();

  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '');
  const [expectedDate, setExpectedDate] = useState('2026-10-18');
  const [items, setItems] = useState([
    { itemName: inventory[0]?.name || 'EDTA Vacutainer Tubes', qty: 10, unitCost: 650, totalCost: 6500 }
  ]);
  const [notes, setNotes] = useState('Standard batch delivery with COA (Certificate of Analysis)');

  const selectedSupplier = suppliers.find(s => s.id === supplierId);

  const addItemRow = () => {
    setItems(prev => [
      ...prev,
      { itemName: inventory[1]?.name || 'SST Gel Clot Tubes', qty: 5, unitCost: 720, totalCost: 3600 }
    ]);
  };

  const removeItemRow = (idx) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, field, val) => {
    setItems(prev => prev.map((item, i) => {
      if (i !== idx) return item;
      const updated = { ...item, [field]: val };
      if (field === 'qty' || field === 'unitCost') {
        updated.totalCost = (Number(updated.qty) || 0) * (Number(updated.unitCost) || 0);
      }
      return updated;
    }));
  };

  const totalAmount = items.reduce((sum, it) => sum + (it.totalCost || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) {
      alert("Please add at least one line item");
      return;
    }

    createPurchaseOrder({
      supplierId,
      supplierName: selectedSupplier?.name || 'Supplier',
      expectedDate,
      items,
      totalAmount,
      notes
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Purchase Order (PO)"
      subtitle="Issue procurement requisition for diagnostic reagents & clinic consumables"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Select Supplier *</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
            >
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Expected Delivery Date *</label>
            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
            />
          </div>
        </div>

        {/* PO Line Items */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-slate-700">Order Items & Quantities *</label>
            <button
              type="button"
              onClick={addItemRow}
              className="text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Item Line
            </button>
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  type="text"
                  placeholder="Item name"
                  value={it.itemName}
                  onChange={(e) => updateItem(idx, 'itemName', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={it.qty}
                  onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                  className="w-16 px-2 py-1.5 bg-white rounded border border-slate-200 text-center outline-hidden"
                />
                <input
                  type="number"
                  placeholder="Unit Cost ₹"
                  min="0"
                  value={it.unitCost}
                  onChange={(e) => updateItem(idx, 'unitCost', e.target.value)}
                  className="w-24 px-2 py-1.5 bg-white rounded border border-slate-200 text-right outline-hidden"
                />
                <span className="w-24 font-bold text-slate-800 text-right">
                  {formatCurrency(it.totalCost)}
                </span>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemRow(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Special Delivery Instructions / Terms</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-hidden text-xs"
          />
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-bold text-sm">
          <span className="text-slate-700">Total Purchase Order Value:</span>
          <span className="text-teal-900 font-extrabold text-base">{formatCurrency(totalAmount)}</span>
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
            className="px-5 py-2 font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
          >
            Issue Purchase Order
          </button>
        </div>
      </form>
    </Modal>
  );
}
