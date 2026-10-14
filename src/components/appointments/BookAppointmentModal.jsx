import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { AlertCircle, Calendar, Clock, User, AlertTriangle } from 'lucide-react';

export default function BookAppointmentModal({ isOpen, onClose, preselectedPatientId }) {
  const {
    patients,
    doctors,
    bookAppointment
  } = useApp();

  const [patientId, setPatientId] = useState(preselectedPatientId || (patients[0]?.id || ''));
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [date, setDate] = useState('2026-10-10');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 10:15 AM');
  const [type, setType] = useState('New Consultation');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [conflictWarning, setConflictWarning] = useState('');

  const selectedDoc = doctors.find(d => d.id === doctorId);
  const selectedPat = patients.find(p => p.id === patientId);

  const availableSlots = [
    '09:00 AM - 09:15 AM',
    '09:15 AM - 09:30 AM',
    '09:30 AM - 09:45 AM',
    '10:00 AM - 10:15 AM',
    '10:15 AM - 10:30 AM',
    '10:30 AM - 10:45 AM',
    '11:00 AM - 11:15 AM',
    '11:15 AM - 11:30 AM',
    '11:30 AM - 11:45 AM',
    '12:00 PM - 12:15 PM',
    '05:00 PM - 05:15 PM',
    '05:30 PM - 05:45 PM',
    '06:00 PM - 06:15 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setConflictWarning('');

    if (!patientId) {
      setConflictWarning('Please select a patient');
      return;
    }
    if (!doctorId) {
      setConflictWarning('Please select a doctor');
      return;
    }

    const res = bookAppointment({
      patientId,
      patientName: selectedPat?.name || 'Patient',
      doctorId,
      doctorName: selectedDoc?.name || 'Doctor',
      date,
      timeSlot,
      type,
      reason: reason.trim() || 'General Consultation',
      notes: notes.trim(),
      fee: type.includes('Follow-up') ? (selectedDoc?.followupFee || 300) : (selectedDoc?.consultationFee || 600)
    });

    if (res.conflict) {
      setConflictWarning(res.message);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Doctor Appointment"
      subtitle="Schedule OPD consultation slot with automatic doctor conflict checking"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {conflictWarning && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Schedule Conflict Detected</p>
              <p className="mt-0.5 leading-relaxed">{conflictWarning}</p>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Select Patient *</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id}) — {p.phone} ({p.age}y, {p.gender})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Select Doctor *</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
          >
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialty} ({d.department})
              </option>
            ))}
          </select>
          {selectedDoc && (
            <div className="p-2.5 bg-teal-50/50 rounded-lg border border-teal-100 text-[11px] text-teal-800 flex items-center justify-between">
              <span>Fee: ₹{selectedDoc.consultationFee} (New) / ₹{selectedDoc.followupFee} (Follow-up)</span>
              <span>Room: {selectedDoc.roomNo}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Time Slot *</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
            >
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Appointment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
            >
              <option value="New Consultation">New Consultation</option>
              <option value="Follow-up Consultation">Follow-up Consultation</option>
              <option value="Review">Report Review</option>
              <option value="Diagnostic Visit">Diagnostic Visit</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Chief Reason / Symptoms</label>
            <input
              type="text"
              placeholder="e.g. Fever, blood sugar review, knee pain"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Special Notes / Reception Instructions</label>
          <input
            type="text"
            placeholder="e.g. Wheelchair requested, bringing past reports"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors"
          >
            Confirm & Assign Slot
          </button>
        </div>
      </form>
    </Modal>
  );
}
