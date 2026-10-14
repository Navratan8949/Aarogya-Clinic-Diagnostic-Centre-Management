import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Calendar, Plus, Clock, User, Filter, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge.jsx';
import { formatCurrency } from '../../lib/formatters.js';

export default function AppointmentsView({ onBookAppointmentClick }) {
  const {
    appointments,
    doctors,
    checkInPatient,
    updateAppointmentStatus
  } = useApp();

  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

  const filteredAppointments = appointments.filter(a => {
    if (selectedDoctorFilter !== 'ALL' && a.doctorId !== selectedDoctorFilter) return false;
    if (selectedStatusFilter !== 'ALL' && a.status !== selectedStatusFilter) return false;
    return true;
  });

  const timeSlotsList = [
    '09:00 AM - 09:15 AM',
    '09:30 AM - 09:45 AM',
    '10:00 AM - 10:15 AM',
    '10:15 AM - 10:30 AM',
    '10:30 AM - 10:45 AM',
    '11:00 AM - 11:15 AM',
    '11:30 AM - 11:45 AM',
    '12:00 PM - 12:15 PM',
    '05:00 PM - 05:15 PM',
    '06:00 PM - 06:15 PM'
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <span>Doctor Appointments & Rostering</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Outpatient booking calendar, time slot conflict validation, and reception check-in
          </p>
        </div>

        <button
          onClick={onBookAppointmentClick}
          className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Doctor:</span>
            <select
              value={selectedDoctorFilter}
              onChange={(e) => setSelectedDoctorFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-hidden"
            >
              <option value="ALL">All Doctors</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-hidden"
            >
              <option value="ALL">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Checked In">Checked In</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                viewMode === 'list' ? 'bg-white text-teal-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                viewMode === 'calendar' ? 'bg-white text-teal-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Slot Grid Calendar
            </button>
          </div>
          <span className="text-slate-500 font-medium">
            {filteredAppointments.length} Booked
          </span>
        </div>
      </div>

      {/* VIEW 1: TABLE VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Token & ID</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Doctor & Room</th>
                <th className="py-3 px-4">Slot Time</th>
                <th className="py-3 px-4">Visit Reason</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-sm text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 block w-fit mb-0.5">
                      {apt.tokenNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{apt.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                    <span className="text-[11px] text-slate-500">{apt.patientId} • {apt.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block">{apt.doctorName}</span>
                    <span className="text-[10px] text-slate-400">Consultation OPD</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    <div>{apt.date}</div>
                    <div className="text-[11px] text-slate-500">{apt.timeSlot}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {apt.reason}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {formatCurrency(apt.fee)}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={apt.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {apt.status === 'Scheduled' && (
                      <button
                        onClick={() => checkInPatient(apt.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded transition-colors"
                      >
                        Check-in
                      </button>
                    )}
                    {apt.status === 'Scheduled' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                        className="px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* VIEW 2: DOCTOR SLOT GRID CALENDAR */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Doctor OPD Appointment Schedule Matrix</h3>
              <p className="text-[11px] text-slate-500">Day View • 10 Oct 2026 • Jaipur Main Branch</p>
            </div>
            <button
              onClick={onBookAppointmentClick}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Into Slot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctors.map(doc => {
              const docApts = appointments.filter(a => a.doctorId === doc.id);

              return (
                <div key={doc.id} className="bg-slate-50/70 rounded-xl border border-slate-200 p-3.5 space-y-3">
                  <div className="border-b border-slate-200 pb-2">
                    <strong className="text-slate-900 block text-xs">{doc.name}</strong>
                    <span className="text-[11px] text-teal-800 font-medium block">{doc.specialty}</span>
                    <span className="text-[10px] text-slate-400">{doc.roomNo}</span>
                  </div>

                  <div className="space-y-2">
                    {timeSlotsList.map(slot => {
                      const booked = docApts.find(a => a.timeSlot === slot);

                      return (
                        <div
                          key={slot}
                          className={`p-2 rounded-lg border text-xs transition-colors ${
                            booked
                              ? 'bg-teal-50 border-teal-300 text-teal-900'
                              : 'bg-white border-slate-200/80 text-slate-500 hover:border-teal-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-mono text-[10px] font-bold text-slate-700">
                              {slot.split(' - ')[0]}
                            </span>
                            {booked ? (
                              <StatusBadge status={booked.status} size="sm" />
                            ) : (
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                                Available
                              </span>
                            )}
                          </div>

                          {booked ? (
                            <div className="mt-1">
                              <span className="font-bold text-slate-900 block text-[11px] truncate">{booked.patientName}</span>
                              <span className="text-[10px] text-slate-500 font-mono">Token: {booked.tokenNumber}</span>
                            </div>
                          ) : (
                            <button
                              onClick={onBookAppointmentClick}
                              className="w-full text-left text-[11px] text-slate-400 hover:text-teal-700 italic mt-0.5"
                            >
                              + Click to reserve
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
