import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { TestTube2, CheckCircle2, AlertTriangle, ArrowRight, Save } from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';

export default function LabWorklistView({ onSubmitted }) {
  const {
    labOrders,
    testCatalogue,
    enterLabResults,
    currentRole
  } = useApp();

  // Find orders that need results entered
  const pendingOrders = labOrders.filter(o => o.status === 'Sample Collected' || o.status === 'Processing');
  const [selectedOrderId, setSelectedOrderId] = useState(pendingOrders[0]?.id || labOrders[0]?.id);

  const selectedOrder = labOrders.find(o => o.id === selectedOrderId);

  // Initialize results state from the selected order's tests
  const orderTests = (selectedOrder?.testIds || []).map(tId => testCatalogue.find(t => t.id === tId)).filter(Boolean);

  const [parameterValues, setParameterValues] = useState(() => {
    const initial = {};
    orderTests.forEach(test => {
      (test.parameters || []).forEach(p => {
        initial[`${test.id}_${p.name}`] = {
          value: p.defaultValue,
          flag: 'Normal'
        };
      });
    });
    return initial;
  });

  const handleValueChange = (testId, paramName, val) => {
    setParameterValues(prev => ({
      ...prev,
      [`${testId}_${paramName}`]: {
        ...prev[`${testId}_${paramName}`],
        value: val
      }
    }));
  };

  const handleFlagChange = (testId, paramName, flag) => {
    setParameterValues(prev => ({
      ...prev,
      [`${testId}_${paramName}`]: {
        ...prev[`${testId}_${paramName}`],
        flag
      }
    }));
  };

  const handleSubmitResults = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    // Structure formatted testResults payload
    const structuredResults = orderTests.map(test => {
      const params = (test.parameters || []).map(p => {
        const current = parameterValues[`${test.id}_${p.name}`] || { value: p.defaultValue, flag: 'Normal' };
        return {
          name: p.name,
          value: String(current.value),
          unit: p.unit,
          refRange: p.refRange,
          flag: current.flag
        };
      });

      return {
        testName: test.name,
        category: test.category,
        method: test.method,
        parameters: params,
        clinicalRemarks: 'Analytical parameters verified on automated platform.'
      };
    });

    enterLabResults(selectedOrder.id, structuredResults);
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className="space-y-6">
      {/* Worklist Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TestTube2 className="w-5 h-5 text-teal-700" />
            <span>Technician Analytical Worklist & Result Entry</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as: <strong>{currentRole.user}</strong> ({currentRole.name}) • Pathology Section
          </p>
        </div>

        <button
          onClick={handleSubmitResults}
          disabled={!selectedOrder}
          className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Submit to Pathologist for Verification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Pending Worklist Orders */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Worklist Queue</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                {pendingOrders.length} Ready
              </span>
            </h3>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {labOrders.map(order => {
                const isSelected = order.id === selectedOrderId;

                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                      isSelected
                        ? 'bg-teal-50/90 border-teal-600 shadow-xs ring-1 ring-teal-600'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-slate-900">{order.id}</span>
                      <StatusBadge status={order.status} size="sm" />
                    </div>
                    <p className="font-semibold text-slate-800">{order.patientName}</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {(order.testIds || []).length} Investigation(s)
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 3 cols: Parameter Result Entry Table */}
        <div className="lg:col-span-3 space-y-4">
          {selectedOrder ? (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Specimen Order:</span>
                  <strong className="text-slate-900 font-mono text-sm">{selectedOrder.id}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Patient:</span>
                  <strong className="text-slate-900">{selectedOrder.patientName} ({selectedOrder.patientId})</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Ordering Clinician:</span>
                  <strong className="text-slate-900">{selectedOrder.doctorName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Priority:</span>
                  <span className="font-bold text-teal-800">{selectedOrder.priority}</span>
                </div>
              </div>

              {/* Parameter Table for each test */}
              {orderTests.map(test => (
                <div key={test.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{test.name}</h4>
                      <p className="text-[11px] text-slate-500">Method: {test.method} • Specimen: {test.sampleType}</p>
                    </div>
                    <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded">
                      {test.category}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[11px] text-slate-500 font-bold border-b border-slate-200">
                          <th className="py-2.5 px-3">Parameter</th>
                          <th className="py-2.5 px-3">Entered Result Value *</th>
                          <th className="py-2.5 px-3">Clinical Flag</th>
                          <th className="py-2.5 px-3">Unit</th>
                          <th className="py-2.5 px-3 text-right">Reference Range</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(test.parameters || []).map((param, pIdx) => {
                          const stateKey = `${test.id}_${param.name}`;
                          const currentVal = parameterValues[stateKey]?.value ?? param.defaultValue;
                          const currentFlag = parameterValues[stateKey]?.flag ?? 'Normal';

                          return (
                            <tr key={pIdx} className="hover:bg-slate-50/60">
                              <td className="py-2 px-3 font-medium text-slate-800">
                                {param.name}
                              </td>
                              <td className="py-2 px-3">
                                <input
                                  type="text"
                                  value={currentVal}
                                  onChange={(e) => handleValueChange(test.id, param.name, e.target.value)}
                                  className="w-32 px-2.5 py-1 text-xs font-bold text-slate-900 rounded border border-slate-200 focus:border-teal-600 outline-hidden bg-white"
                                />
                              </td>
                              <td className="py-2 px-3">
                                <select
                                  value={currentFlag}
                                  onChange={(e) => handleFlagChange(test.id, param.name, e.target.value)}
                                  className="px-2 py-1 text-[11px] font-semibold rounded border border-slate-200 outline-hidden bg-white"
                                >
                                  <option value="Normal">Normal</option>
                                  <option value="High">High (Abnormal)</option>
                                  <option value="Low">Low (Abnormal)</option>
                                </select>
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                                {param.unit || '—'}
                              </td>
                              <td className="py-2 px-3 text-right font-mono text-[11px] text-slate-600">
                                {param.refRange}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
              No laboratory order selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
