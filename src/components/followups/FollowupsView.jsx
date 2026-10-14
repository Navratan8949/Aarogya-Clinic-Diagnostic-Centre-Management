import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { Calendar, MessageSquare, Send, CheckCircle2, Clock, Phone } from 'lucide-react';
import Modal from '../common/Modal.jsx';

export default function FollowupsView() {
  const {
    followups,
    sendSimulatedReminder,
    facility
  } = useApp();

  const [activeModalFollowup, setActiveModalFollowup] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState('WhatsApp');

  const simulatedMessage = activeModalFollowup ? 
    `Namaste ${activeModalFollowup.patientName} ji,\n\nThis is a friendly clinical follow-up reminder from ${facility.name}, Jaipur.\n\nYour recommended review appointment with ${activeModalFollowup.doctorName} is due on ${activeModalFollowup.recommendedDate}.\nPurpose: ${activeModalFollowup.reason}.\n\nFor queries or appointment rescheduling, please call us at ${facility.phone}.\n(Simulated Demonstration Notification)` 
    : '';

  const handleDispatch = () => {
    if (activeModalFollowup) {
      sendSimulatedReminder(activeModalFollowup.id, selectedChannel);
      setActiveModalFollowup(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-700" />
          <span>Patient Clinical Follow-ups & Automated Reminders</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Proactive chronic care monitoring, post-consultation reviews, and simulated messaging
        </p>
      </div>

      {/* Follow-up Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Consultant Doctor</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Clinical Reason</th>
                <th className="py-3 px-4">Follow-up Status</th>
                <th className="py-3 px-4">Reminder Log</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {followups.map(fol => (
                <tr key={fol.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{fol.patientName}</span>
                    <span className="text-[11px] text-slate-500">{fol.phone}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    {fol.doctorName}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {fol.recommendedDate}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs">
                    {fol.reason}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                      fol.status === 'Due Today'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-50 text-teal-800'
                    }`}>
                      {fol.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    <div>{fol.reminderStatus}</div>
                    {fol.lastContactDate && (
                      <span className="text-[10px] text-slate-400">At {fol.lastContactDate}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setActiveModalFollowup(fol)}
                      className="px-3 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded flex items-center gap-1.5 ml-auto transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send Reminder</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Message Modal */}
      <Modal
        isOpen={!!activeModalFollowup}
        onClose={() => setActiveModalFollowup(null)}
        title="Simulated Patient Reminder Dispatch"
        subtitle="Test automated WhatsApp or SMS clinical reminder templates (Safe Demo Mode)"
        maxWidth="max-w-md"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              onClick={() => setActiveModalFollowup(null)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleDispatch}
              className="px-4 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simulate Notification Dispatch</span>
            </button>
          </div>
        }
      >
        {activeModalFollowup && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <label className="font-semibold text-slate-700">Dispatch Channel:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedChannel('WhatsApp')}
                  className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                    selectedChannel === 'WhatsApp'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedChannel('SMS')}
                  className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors ${
                    selectedChannel === 'SMS'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  SMS
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                {selectedChannel} Template Message Preview
              </span>
              <pre className="text-xs whitespace-pre-wrap font-sans text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-emerald-100 shadow-2xs">
                {simulatedMessage}
              </pre>
            </div>

            <p className="text-[10px] text-slate-500 italic">
              Notice: No actual SMS or WhatsApp API credits are utilized. A demonstration dispatch timestamp will be recorded locally.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
