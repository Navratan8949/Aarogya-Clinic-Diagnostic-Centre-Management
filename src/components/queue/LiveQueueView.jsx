import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Clock, UserCheck, Bell, ChevronRight, CheckCircle2, User, Volume2, AlertCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';

export default function LiveQueueView({ onStartConsultation }) {
  const {
    appointments,
    doctors,
    checkInPatient,
    updateAppointmentStatus,
    currentRole
  } = useApp();

  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('ALL');
  const [calledToken, setCalledToken] = useState(null);

  const activeQueue = appointments.filter(a => {
    if (a.date !== '2026-10-10') return false;
    if (selectedDoctorFilter !== 'ALL' && a.doctorId !== selectedDoctorFilter) return false;
    return true;
  });

  const currentlyInConsult = appointments.find(a => a.status === 'In Consultation');

  const handleCallPatient = (apt) => {
    setCalledToken(apt.tokenNumber);
    updateAppointmentStatus(apt.id, 'Called');
    setTimeout(() => {
      setCalledToken(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* OPD Queue Header & Calling Billboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Calling Screen */}
        <div className="lg:col-span-2 bg-[#142B4A] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">
                Live OPD Token Display
              </span>
            </div>
            <span className="text-xs text-slate-300 font-mono">
              Tonk Road Main OPD • Jaipur
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/15">
              <span className="text-[11px] text-teal-200 block font-semibold mb-1 uppercase tracking-wide">
                Now Serving in OPD
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span>{currentlyInConsult ? currentlyInConsult.tokenNumber : "T-01"}</span>
                <span className="text-sm font-normal text-teal-200 truncate">
                  {currentlyInConsult ? currentlyInConsult.patientName : "Ramesh Kumar"}
                </span>
              </div>
              <p className="text-xs text-teal-200/80 mt-1">
                Room 102 • Dr. Ananya Sharma
              </p>
            </div>

            <div className="p-4 bg-teal-500/20 backdrop-blur-xs rounded-xl border border-teal-400/30">
              <span className="text-[11px] text-teal-300 block font-semibold mb-1 uppercase tracking-wide">
                Next in Queue
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span>T-02</span>
                <span className="text-sm font-normal text-teal-200 truncate">Priya Sharma</span>
              </div>
              <p className="text-xs text-teal-200/80 mt-1">
                Checked in at 10:05 AM • Est. Wait 5 mins
              </p>
            </div>
          </div>

          {calledToken && (
            <div className="mt-3 p-3 bg-teal-500 text-slate-950 font-bold rounded-lg flex items-center gap-2 animate-bounce text-xs">
              <Volume2 className="w-4 h-4" />
              <span>Token {calledToken} Called to Consultation Room!</span>
            </div>
          )}
        </div>

        {/* Quick OPD Queue Metrics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Queue Health & Flow
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Total Tokens Generated Today:</span>
              <span className="font-bold text-slate-900">{appointments.length}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-amber-50 rounded-lg text-amber-900">
              <span>Waiting in OPD Waiting Area:</span>
              <span className="font-bold">{activeQueue.filter(a => a.status === 'Waiting' || a.status === 'Checked In').length}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-teal-50 rounded-lg text-teal-900">
              <span>Average Consultation Duration:</span>
              <span className="font-bold">14 mins</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Tokens auto-recalculate waiting times based on doctor consultation pace.
          </p>
        </div>
      </div>

      {/* Queue Filter by Doctor */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600">Filter by Doctor:</span>
          <select
            value={selectedDoctorFilter}
            onChange={(e) => setSelectedDoctorFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium outline-hidden"
          >
            <option value="ALL">All Doctors & OPD Rooms</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {activeQueue.length} patient appointments
        </span>
      </div>

      {/* Patient Queue Cards Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Patient Name & ID</th>
                <th className="py-3 px-4">Assigned Doctor</th>
                <th className="py-3 px-4">Scheduled Slot</th>
                <th className="py-3 px-4">Check-In Time</th>
                <th className="py-3 px-4">Queue Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeQueue.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-sm text-teal-900 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                      {apt.tokenNumber}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                    <span className="text-[11px] text-slate-500">{apt.patientId} • {apt.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{apt.doctorName}</span>
                    <span className="text-[10px] text-slate-400">OPD Room</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {apt.timeSlot}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {apt.checkedInTime || (
                      <button
                        onClick={() => checkInPatient(apt.id)}
                        className="text-xs font-semibold text-teal-700 hover:underline"
                      >
                        Check-in Now
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={apt.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {apt.status === 'Checked In' && (
                      <button
                        onClick={() => handleCallPatient(apt)}
                        className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition-colors"
                      >
                        Call Token
                      </button>
                    )}

                    {(apt.status === 'Called' || apt.status === 'Checked In') && (
                      <button
                        onClick={() => {
                          updateAppointmentStatus(apt.id, 'In Consultation');
                          if (onStartConsultation) onStartConsultation();
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors"
                      >
                        Start Consult
                      </button>
                    )}

                    {apt.status === 'In Consultation' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded transition-colors"
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
