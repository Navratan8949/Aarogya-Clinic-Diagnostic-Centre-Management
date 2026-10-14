import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Users,
  Search,
  UserPlus,
  Eye,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  Phone,
  ArrowRight,
  Receipt
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';
import Modal from '../common/Modal.jsx';
import { formatCurrency } from '../../lib/formatters.js';

export default function PatientDirectory({ onRegisterClick, onOpenReport }) {
  const {
    patients,
    visits,
    reports,
    invoices,
    appointments,
    selectedPatientId,
    setSelectedPatientId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeProfileTab, setActiveProfileTab] = useState('overview');

  const filteredPatients = patients.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  const activePatient = patients.find(p => p.id === selectedPatientId);

  // Data linked to selected patient
  const patientVisits = visits.filter(v => v.patientId === selectedPatientId);
  const patientReports = reports.filter(r => r.patientId === selectedPatientId);
  const patientInvoices = invoices.filter(inv => inv.patientId === selectedPatientId);
  const patientAppointments = appointments.filter(a => a.patientId === selectedPatientId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-700" />
            <span>Patient Registry & Health Records Directory</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Outpatient demographics, longitudinal clinical history, reports, and financial balances
          </p>
        </div>

        <button
          onClick={onRegisterClick}
          className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter directory by patient name, mobile number, or ID (e.g. Ramesh, 98291, PAT-1001)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs bg-transparent outline-hidden placeholder:text-slate-400"
        />
        {searchQuery && (
          <span className="text-xs text-slate-400 font-medium">
            {filteredPatients.length} result(s)
          </span>
        )}
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Age / Gender</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Allergies</th>
                <th className="py-3 px-4">Registration Date</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-900">
                    {p.id}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {p.name}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {p.age}y • {p.gender}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {p.phone}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[11px]">
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {p.allergies && p.allergies !== 'None reported' && p.allergies !== 'None' ? (
                      <span className="text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                        {p.allergies}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">None</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {p.registrationDate}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {p.outstandingBalance > 0 ? (
                      <span className="font-bold text-rose-700">{formatCurrency(p.outstandingBalance)}</span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Clear</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedPatientId(p.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Profile Modal */}
      {activePatient && (
        <Modal
          isOpen={!!activePatient}
          onClose={() => setSelectedPatientId(null)}
          title={`Patient EMR Profile: ${activePatient.name}`}
          subtitle={`ID: ${activePatient.id} • Registered: ${activePatient.registrationDate}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4 text-xs">
            {/* Quick Header Strip */}
            <div className="p-4 bg-teal-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold">{activePatient.name}</h3>
                <p className="text-xs text-teal-200">
                  {activePatient.age} Years • {activePatient.gender} • Blood Group: {activePatient.bloodGroup} • Phone: {activePatient.phone}
                </p>
                <p className="text-[11px] text-teal-300/80 mt-0.5">Address: {activePatient.address}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-teal-200 block uppercase">Outstanding Account Due</span>
                <span className="text-lg font-black text-white">
                  {formatCurrency(activePatient.outstandingBalance)}
                </span>
              </div>
            </div>

            {/* Profile Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setActiveProfileTab('overview')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeProfileTab === 'overview'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Clinical Overview
              </button>
              <button
                onClick={() => setActiveProfileTab('visits')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeProfileTab === 'visits'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Doctor Visits & Rx ({patientVisits.length})
              </button>
              <button
                onClick={() => setActiveProfileTab('reports')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeProfileTab === 'reports'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Lab Investigations ({patientReports.length})
              </button>
              <button
                onClick={() => setActiveProfileTab('invoices')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeProfileTab === 'invoices'
                    ? 'border-teal-700 text-teal-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Invoices & Receipts ({patientInvoices.length})
              </button>
            </div>

            {/* SUBTAB: OVERVIEW */}
            {activeProfileTab === 'overview' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                    <span className="font-bold block mb-1">Documented Drug Allergies:</span>
                    <p>{activePatient.allergies}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-800">
                    <span className="font-bold block mb-1">Chronic Medical History:</span>
                    <p>{activePatient.medicalHistory}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-500 block">Emergency Contact:</span>
                    <strong>{activePatient.emergencyContact}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Ayushman Bharat ABHA ID (Demo):</span>
                    <strong className="font-mono">{activePatient.abhaId}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB: VISITS */}
            {activeProfileTab === 'visits' && (
              <div className="space-y-3">
                {patientVisits.length === 0 ? (
                  <p className="text-center py-6 text-slate-500">No past doctor visits recorded.</p>
                ) : (
                  patientVisits.map(v => (
                    <div key={v.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">{v.doctorName}</strong>
                        <span className="text-slate-500 font-mono text-[11px]">{v.date} {v.time}</span>
                      </div>
                      <p className="text-slate-700"><strong>Chief Complaint:</strong> {v.chiefComplaint}</p>
                      {v.vitals && (
                        <p className="text-slate-600 text-[11px]">
                          <strong>Vitals:</strong> BP {v.vitals.bpSystolic}/{v.vitals.bpDiastolic} mmHg • Pulse {v.vitals.pulse} bpm • BMI {v.vitals.bmi} ({v.vitals.bmiCategory})
                        </p>
                      )}
                      {v.prescriptions?.length > 0 && (
                        <div className="pt-2 border-t border-slate-200">
                          <strong className="block text-slate-800 mb-1">Prescribed Medicines:</strong>
                          <div className="space-y-1">
                            {v.prescriptions.map((px, i) => (
                              <div key={i} className="text-[11px] text-slate-700">
                                • {px.medicine} ({px.strength}) — {px.frequency} for {px.duration} ({px.instructions})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SUBTAB: REPORTS */}
            {activeProfileTab === 'reports' && (
              <div className="space-y-3">
                {patientReports.length === 0 ? (
                  <p className="text-center py-6 text-slate-500">No released pathology reports for this patient yet.</p>
                ) : (
                  patientReports.map(rep => (
                    <div key={rep.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-mono">{rep.id}</strong>
                          <StatusBadge status={rep.status} size="sm" />
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          {rep.reportedAt} • Verified by {rep.verifiedBy || "Pending"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onOpenReport(rep.id);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200"
                      >
                        Open Lab Report
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SUBTAB: INVOICES */}
            {activeProfileTab === 'invoices' && (
              <div className="space-y-3">
                {patientInvoices.map(inv => (
                  <div key={inv.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 font-mono">{inv.invoiceNo}</strong>
                      <span className="text-slate-500 ml-2">({inv.date})</span>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Total: {formatCurrency(inv.totalAmount)} • Paid: {formatCurrency(inv.paidAmount)} • Due: {formatCurrency(inv.balanceDue)}
                      </p>
                    </div>
                    <StatusBadge status={inv.paymentStatus} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
