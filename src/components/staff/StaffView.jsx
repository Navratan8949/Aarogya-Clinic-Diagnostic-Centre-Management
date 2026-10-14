import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { UserCog, UserCheck, Calendar, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function StaffView() {
  const {
    staff,
    doctors
  } = useApp();

  const [attendanceRecords, setAttendanceRecords] = useState({
    'STF-01': 'Present (08:02 AM)',
    'STF-02': 'Present (07:28 AM)',
    'STF-03': 'Present (08:55 AM)',
    'STF-04': 'Present (09:20 AM)',
    'STF-05': 'Present (08:50 AM)'
  });

  const toggleAttendance = (id) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [id]: prev[id]?.startsWith('Present') ? 'Clocked Out' : 'Present (Just now)'
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <UserCog className="w-5 h-5 text-teal-700" />
          <span>Clinical & Support Staff Administration</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Doctor consultation rosters, laboratory technologists, and daily attendance logging
        </p>
      </div>

      {/* Doctor Schedules Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Consultant Doctor Rosters ({doctors.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                  <p className="text-teal-800 font-semibold">{doc.specialty}</p>
                  <p className="text-slate-500 text-[11px]">{doc.qualification} • Reg: {doc.regNo}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold text-[10px]">
                  {doc.roomNo}
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-slate-600">
                <p>• <strong>Timings:</strong> {doc.workingHours}</p>
                <p>• <strong>Days:</strong> {doc.availableDays.join(', ')}</p>
                <p>• <strong>Consultation Fee:</strong> {formatCurrency(doc.consultationFee)} (Follow-up: {formatCurrency(doc.followupFee)})</p>
                <p>• <strong>Slot Duration:</strong> {doc.slotDurationMinutes} mins</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff & Daily Attendance */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Staff Attendance Roster
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Shift Timings</th>
                <th className="py-3 px-4">Attendance Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staff.map(stf => (
                <tr key={stf.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {stf.name}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {stf.role}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {stf.department}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {stf.shift}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                      {attendanceRecords[stf.id] || "Present"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleAttendance(stf.id)}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded border border-slate-200"
                    >
                      Toggle Clock
                    </button>
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
