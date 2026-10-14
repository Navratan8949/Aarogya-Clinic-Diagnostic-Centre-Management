import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Package,
  Plus,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Search,
  CheckCircle2
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';
import Modal from '../common/Modal.jsx';
import CreatePurchaseOrderModal from './CreatePurchaseOrderModal.jsx';
import { formatCurrency } from '../../lib/formatters.js';

export default function InventoryView() {
  const {
    inventory,
    suppliers,
    purchaseOrders,
    recordStockReceipt,
    issueStock,
    currentRole
  } = useApp();

  const [activeTab, setActiveTab] = useState('stock'); // 'stock' | 'suppliers' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);

  // Form states
  const [receiptData, setReceiptData] = useState({
    itemId: inventory[0]?.id || '',
    quantity: 10,
    batchNo: '',
    expiryDate: '2027-12-31'
  });

  const [issueData, setIssueData] = useState({
    itemId: inventory[0]?.id || '',
    quantity: 2,
    department: 'Hematology Lab'
  });

  const filteredItems = inventory.filter(item => {
    if (filterCategory !== 'ALL' && item.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.batchNo.toLowerCase().includes(q) ||
        item.storageLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    recordStockReceipt(receiptData);
    setReceiptModalOpen(false);
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    issueStock(issueData);
    setIssueModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-teal-700" />
            <span>Inventory, Lab Reagents & Consumables</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Phlebotomy vacutainers, cold-chain biochemistry kits, batch tracking, and expiry alerts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPOModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-teal-600" />
            <span>Create Purchase Order</span>
          </button>
          <button
            onClick={() => setIssueModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
            <span>Issue Stock</span>
          </button>
          <button
            onClick={() => setReceiptModalOpen(true)}
            className="px-4 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ArrowDownRight className="w-4 h-4 text-emerald-300" />
            <span>Goods Inward / Receipt</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('stock')}
          className={`px-4 py-2.5 border-b-2 transition-colors ${
            activeTab === 'stock'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Active Stock Master ({inventory.length} Items)
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Purchase Orders ({purchaseOrders?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2.5 border-b-2 transition-colors ${
            activeTab === 'suppliers'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Procurement Suppliers ({suppliers.length})
        </button>
      </div>

      {activeTab === 'stock' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search inventory item, batch number, rack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-hidden text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600">Category:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium outline-hidden"
              >
                <option value="ALL">All Categories</option>
                <option value="Sample Collection Supplies">Sample Collection Supplies</option>
                <option value="Lab Reagents">Lab Reagents</option>
                <option value="Medical Consumables">Medical Consumables</option>
              </select>
            </div>
          </div>

          {/* Inventory Items Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Item Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Batch #</th>
                    <th className="py-3 px-4">Expiry Date</th>
                    <th className="py-3 px-4">Storage Location</th>
                    <th className="py-3 px-4 text-center">Current Stock</th>
                    <th className="py-3 px-4 text-center">Min Threshold</th>
                    <th className="py-3 px-4">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                        <span className="text-[11px] text-slate-500">{item.supplier} • {item.unit}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-800">
                        {item.batchNo}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          item.status === 'Expiring Soon' ? 'text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded' : 'text-slate-700'
                        }`}>
                          {item.expiryDate}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {item.storageLocation}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-sm text-slate-900">
                        {item.currentStock}
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-slate-500">
                        {item.minStock}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map(sup => (
            <div key={sup.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{sup.name}</h4>
                  <p className="text-[11px] text-slate-500">{sup.city} • GSTIN: {sup.gstin}</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  {sup.status}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                <p>• <strong>Contact:</strong> {sup.contactPerson} ({sup.phone})</p>
                <p>• <strong>Supplies:</strong> {sup.category}</p>
                <p>• <strong>Terms:</strong> {sup.paymentTerms}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Outstanding Payable:</span>
                <span className="font-bold text-rose-700">{formatCurrency(sup.outstandingPayable)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: PURCHASE ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">PO Number</th>
                  <th className="py-3 px-4">Supplier Name</th>
                  <th className="py-3 px-4">Order Date</th>
                  <th className="py-3 px-4">Expected Date</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4 text-right">Total Order Value</th>
                  <th className="py-3 px-4">Order Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(purchaseOrders || []).map(po => (
                  <tr key={po.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono font-bold text-teal-900">
                      {po.poNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {po.supplierName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {po.orderDate}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {po.expectedDate}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div className="max-w-xs truncate">
                        {(po.items || []).map(it => `${it.itemName} (${it.qty})`).join(', ')}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {formatCurrency(po.totalAmount)}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={po.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Purchase Order Modal */}
      <CreatePurchaseOrderModal
        isOpen={isPOModalOpen}
        onClose={() => setIsPOModalOpen(false)}
      />

      {/* Goods Inward Receipt Modal */}
      <Modal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        title="Stock Inward / Goods Receipt"
        subtitle="Replenish diagnostic inventory and register new batch and expiry dates"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleReceiptSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Select Item *</label>
            <select
              value={receiptData.itemId}
              onChange={(e) => setReceiptData(prev => ({ ...prev, itemId: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
            >
              {inventory.map(item => (
                <option key={item.id} value={item.id}>{item.name} ({item.unit})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Quantity Inward *</label>
              <input
                type="number"
                min="1"
                value={receiptData.quantity}
                onChange={(e) => setReceiptData(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Batch Number</label>
              <input
                type="text"
                placeholder="e.g. BD-2026-X99"
                value={receiptData.batchNo}
                onChange={(e) => setReceiptData(prev => ({ ...prev, batchNo: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Expiry Date</label>
            <input
              type="date"
              value={receiptData.expiryDate}
              onChange={(e) => setReceiptData(prev => ({ ...prev, expiryDate: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setReceiptModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
            >
              Update Inward Stock
            </button>
          </div>
        </form>
      </Modal>

      {/* Stock Issue Modal */}
      <Modal
        isOpen={issueModalOpen}
        onClose={() => setIssueModalOpen(false)}
        title="Issue Stock to Clinical Section"
        subtitle="Deduct inventory units for everyday OPD and laboratory test consumption"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleIssueSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Select Item *</label>
            <select
              value={issueData.itemId}
              onChange={(e) => setIssueData(prev => ({ ...prev, itemId: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
            >
              {inventory.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} (Stock: {item.currentStock})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Quantity Issued *</label>
              <input
                type="number"
                min="1"
                value={issueData.quantity}
                onChange={(e) => setIssueData(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-hidden text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Destination Section</label>
              <select
                value={issueData.department}
                onChange={(e) => setIssueData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs"
              >
                <option value="Hematology Lab">Hematology Lab</option>
                <option value="Biochemistry Lab">Biochemistry Lab</option>
                <option value="Phlebotomy Counter">Phlebotomy Counter</option>
                <option value="OPD Consultation Rooms">OPD Rooms</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIssueModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs"
            >
              Confirm Issue
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
