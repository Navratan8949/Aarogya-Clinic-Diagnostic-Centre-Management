import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { User, Calendar, FileText, Pill, Receipt, Download, Clock } from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';
import { formatCurrency } from '../../lib/formatters.js';

export default function PatientPortalView({ onOpenReport }) {
  const {
    patients,
    appointments,
    reports,
    visits,
    invoices
  } = useApp();

  // Selected portal patient (defaults to Ramesh Kumar, can switch to Priya Sharma)
  const [activePortalPatientId, setActivePortalPatientId] = useState('PAT-1001');

  const patient = patients.find(p => p.id === activePortalPatientId) || patients[0];

  const myAppointments = appointments.filter(a => a.patientId === patient?.id);
  const myReports = reports.filter(r => r.patientId === patient?.id && r.status === 'Released');
  const myVisits = visits.filter(v => v.patientId === patient?.id);
  const myInvoices = invoices.filter(inv => inv.patientId === patient?.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Patient Portal Header & Switcher */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase bg-teal-500/30 text-teal-200 px-2.5 py-0.5 rounded-full border border-teal-400/30">
            Patient Self-Service Portal
          </span>
          <h2 className="text-xl font-extrabold mt-1">Namaste, {patient?.name}</h2>
          <p className="text-xs text-teal-200/90 mt-0.5">
            Patient ID: {patient?.id} • Mobile: {patient?.phone} • Blood Group: {patient?.bloodGroup}
          </p>
        </div>

        {/* Demo Patient Selector */}
        <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20 text-xs">
          <span className="text-[10px] text-teal-200 block mb-1">Switch Demo Patient View:</span>
          <select
            value={activePortalPatientId}
            onChange={(e) => setActivePortalPatientId(e.target.value)}
            className="bg-teal-900 text-white text-xs px-2.5 py-1.5 rounded-lg border border-teal-700 outline-hidden font-medium"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Released Lab Reports */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-700" />
              <span>Verified Laboratory Reports</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{myReports.length} Available</span>
          </div>

          <div className="space-y-2.5">
            {myReports.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg">
                No released lab reports for this account yet. Draft tests undergoing analysis are kept strictly confidential until pathologist sign-off.
              </div>
            ) : (
              myReports.map(rep => (
                <div key={rep.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block font-mono">{rep.id}</span>
                    <span className="text-[11px] text-slate-500">{rep.reportedAt}</span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">✓ Pathologist Signed</span>
                  </div>
                  <button
                    onClick={() => onOpenReport(rep.id)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors"
                  >
                    View Report
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Doctor Appointments</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{myAppointments.length} Booked</span>
          </div>

          <div className="space-y-2.5">
            {myAppointments.map(apt => (
              <div key={apt.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-teal-900 bg-teal-100/80 px-2 py-0.5 rounded">
                    Token: {apt.tokenNumber}
                  </span>
                  <StatusBadge status={apt.status} size="sm" />
                </div>
                <p className="font-semibold text-slate-900">{apt.doctorName}</p>
                <p className="text-slate-500 text-[11px]">{apt.date} • {apt.timeSlot}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Medication Prescriptions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Pill className="w-4 h-4 text-emerald-600" />
          <span>Active Prescriptions & Dosage Instructions</span>
        </h3>

        <div className="space-y-2.5">
          {myVisits.flatMap(v => v.prescriptions || []).length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg">
              No digital prescriptions active at this moment.
            </div>
          ) : (
            myVisits.flatMap(v => v.prescriptions || []).map((px, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <strong className="text-slate-900 text-sm">{px.medicine} ({px.strength})</strong>
                  <p className="text-slate-600 mt-0.5 font-medium">
                    Dosage: {px.frequency} for {px.duration}
                  </p>
                </div>
                <span className="text-[11px] bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700 italic">
                  {px.instructions}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
