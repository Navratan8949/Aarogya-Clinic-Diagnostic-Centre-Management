import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { Printer, Pill, Download, CheckCircle, FileText } from 'lucide-react';

export default function PrescriptionPrintModal({ isOpen, onClose, visit }) {
  const { facility } = useApp();

  if (!visit) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Medical Prescription Slip (e-Rx)"
      subtitle={`Visit #${visit.id} • Patient: ${visit.patientName}`}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] text-slate-400 font-mono">
            Generated via AarogyaDesk EMR
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-teal-900 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Prescription</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      }
    >
      <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-5 printable-card text-xs">
        {/* Clinic & Doctor Header */}
        <div className="border-b-2 border-teal-800 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-base font-extrabold text-teal-900">{facility.name}</h2>
            <p className="text-[11px] font-semibold text-slate-600">{facility.tagline}</p>
            <p className="text-[10px] text-slate-500">{facility.address}</p>
            <p className="text-[10px] text-slate-500">Phone: {facility.phone} • Reg: {facility.regNo}</p>
          </div>

          <div className="text-right">
            <h3 className="font-bold text-slate-900 text-sm">{visit.doctorName}</h3>
            <p className="text-[11px] text-teal-800 font-medium">Consultant Physician</p>
            <p className="text-[10px] text-slate-500">Reg. No: RMC-38491</p>
            <p className="text-[10px] text-slate-400">Date: {visit.date} {visit.time}</p>
          </div>
        </div>

        {/* Patient Details Bar */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div>
            <span className="text-slate-500 block">Patient Name:</span>
            <strong className="text-slate-900 text-xs">{visit.patientName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Patient ID:</span>
            <strong className="text-slate-900">{visit.patientId}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Visit ID:</span>
            <strong className="font-mono text-slate-900">{visit.id}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Vitals Summary:</span>
            <strong className="text-slate-900">
              {visit.vitals ? `BP: ${visit.vitals.bpSystolic}/${visit.vitals.bpDiastolic} | Pulse: ${visit.vitals.pulse} | BMI: ${visit.vitals.bmi || '—'}` : 'Vitals logged'}
            </strong>
          </div>
        </div>

        {/* Diagnosis & Complaints */}
        <div className="space-y-1.5 text-xs">
          <p>
            <strong className="text-slate-900">Chief Complaints: </strong>
            <span className="text-slate-700">{visit.chiefComplaint || 'Clinical evaluation'}</span>
          </p>
          {visit.diagnosisRecords?.length > 0 && (
            <p>
              <strong className="text-slate-900">Provisional Diagnosis: </strong>
              <span className="text-slate-800 font-medium">
                {visit.diagnosisRecords.map(d => `${d.name} (${d.code})`).join('; ')}
              </span>
            </p>
          )}
        </div>

        {/* Rx Medication Block */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-black text-teal-800 italic">Rx</span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Medication & Administration Orders
            </span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50 text-[11px]">
                <th className="py-2 px-2.5">#</th>
                <th className="py-2 px-2.5">Medicine & Strength</th>
                <th className="py-2 px-2.5">Dosage Frequency</th>
                <th className="py-2 px-2.5">Duration</th>
                <th className="py-2 px-2.5">Instructions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(visit.prescriptions || []).map((px, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-2.5 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="py-2.5 px-2.5 font-bold text-slate-900">
                    {px.medicine} <span className="font-normal text-slate-600">({px.strength})</span>
                  </td>
                  <td className="py-2.5 px-2.5 font-semibold text-teal-800">{px.frequency}</td>
                  <td className="py-2.5 px-2.5 text-slate-700">{px.duration}</td>
                  <td className="py-2.5 px-2.5 text-slate-600 italic">{px.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* General Advice & Follow-up */}
        <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block mb-1">Dietary & Lifestyle Advice:</strong>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Low GI diet, avoid processed sugars. Adequate hydration (2.5L daily). 35 mins brisk walk.
            </p>
          </div>

          <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100">
            <strong className="text-teal-900 block mb-1">Recommended Follow-up:</strong>
            <p className="text-teal-800 text-[11px]">
              Date: <strong>{visit.followupDate || 'After 30 days'}</strong>
            </p>
            <p className="text-teal-700 text-[10px] mt-0.5">
              {visit.followupNotes || 'Please bring fasting blood sugar test report on review.'}
            </p>
          </div>
        </div>

        {/* Signatures & Footer */}
        <div className="pt-8 flex items-end justify-between border-t border-slate-200 text-xs">
          <div className="text-[10px] text-slate-400 max-w-xs">
            <p className="font-bold text-rose-700 uppercase">
              DEMONSTRATION MEDICAL RECORD — NOT FOR CLINICAL USE
            </p>
            <p className="mt-0.5">Please consult a registered physician for medical evaluation.</p>
          </div>

          <div className="text-right space-y-1">
            <div className="h-8 flex items-center justify-end">
              <span className="font-serif italic text-teal-900 text-base font-bold border-b border-teal-800 px-6">
                Dr. Ananya Sharma
              </span>
            </div>
            <p className="font-bold text-slate-900 text-xs">{visit.doctorName}</p>
            <p className="text-[10px] text-slate-500">MBBS, MD (Medicine) • Reg: RMC-38491</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
