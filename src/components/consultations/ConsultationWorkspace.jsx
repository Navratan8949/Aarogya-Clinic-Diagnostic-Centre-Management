import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import {
  Stethoscope,
  HeartPulse,
  Pill,
  FlaskConical,
  Calendar,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Activity,
  FileText,
  Printer
} from 'lucide-react';
import { calculateBMI, formatCurrency } from '../../lib/formatters.js';
import PrescriptionPrintModal from './PrescriptionPrintModal.jsx';

export default function ConsultationWorkspace({ onOpenLabOrderModal }) {
  const {
    appointments,
    doctors,
    patients,
    visits,
    saveVisit,
    currentRole
  } = useApp();

  // Find queue of patients for doctor
  const todayApts = appointments.filter(a => a.status === 'In Consultation' || a.status === 'Checked In' || a.status === 'Waiting');
  const [selectedAptId, setSelectedAptId] = useState(todayApts[0]?.id || appointments[0]?.id);

  const selectedApt = appointments.find(a => a.id === selectedAptId) || appointments[0];
  const patient = patients.find(p => p.id === selectedApt?.patientId) || patients[0];
  const doctor = doctors.find(d => d.id === selectedApt?.doctorId) || doctors[0];

  // Active visit form state
  const existingVisit = visits.find(v => v.appointmentId === selectedApt?.id);

  const [chiefComplaint, setChiefComplaint] = useState(existingVisit?.chiefComplaint || selectedApt?.reason || '');
  const [vitals, setVitals] = useState(existingVisit?.vitals || {
    bpSystolic: 126,
    bpDiastolic: 80,
    pulse: 74,
    temperature: 98.6,
    respRate: 16,
    spo2: 99,
    heightCm: 170,
    weightKg: 75
  });
  const [examinationNotes, setExaminationNotes] = useState(existingVisit?.examinationNotes || 'Chest clear bilaterally. Heart sounds normal. Abdomen soft, non-tender.');
  const [diagnoses, setDiagnoses] = useState(existingVisit?.diagnosisRecords || [
    { code: 'E11.9', name: 'Type 2 Diabetes Mellitus without complications', type: 'Primary' }
  ]);
  const [prescriptions, setPrescriptions] = useState(existingVisit?.prescriptions || [
    { medicine: 'Tab Metformin SR', strength: '1000 mg', dosage: '1 tab', frequency: '1-0-1 (After Meals)', duration: '30 days', instructions: 'Take with water after dinner' }
  ]);
  const [followupDate, setFollowupDate] = useState(existingVisit?.followupDate || '2026-11-10');
  const [followupNotes, setFollowupNotes] = useState(existingVisit?.followupNotes || 'Routine checkup with fresh HbA1c report');
  const [isRxPrintOpen, setIsRxPrintOpen] = useState(false);

  const bmiData = calculateBMI(vitals.heightCm, vitals.weightKg);

  const handleVitalChange = (field, val) => {
    setVitals(prev => ({ ...prev, [field]: Number(val) || '' }));
  };

  const addPrescriptionRow = () => {
    setPrescriptions(prev => [
      ...prev,
      { medicine: 'Tab Pantoprazole', strength: '40 mg', dosage: '1 tab', frequency: '1-0-0 (Empty Stomach)', duration: '14 days', instructions: 'Take before morning breakfast' }
    ]);
  };

  const removePrescriptionRow = (idx) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== idx));
  };

  const updatePrescription = (idx, field, val) => {
    setPrescriptions(prev => prev.map((p, i) => i === idx ? { ...p, [field]: val } : p));
  };

  const handleSaveConsultation = () => {
    saveVisit({
      id: existingVisit?.id,
      appointmentId: selectedApt?.id,
      patientId: patient?.id,
      patientName: patient?.name,
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      chiefComplaint,
      vitals: {
        ...vitals,
        bmi: bmiData.bmi,
        bmiCategory: bmiData.category
      },
      examinationNotes,
      diagnosisRecords: diagnoses,
      prescriptions,
      followupDate,
      followupNotes,
      status: 'Completed'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Doctor Context */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-700" />
            <span>Consultation Workspace & EMR</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active Consultant: <strong>{doctor?.name}</strong> ({doctor?.specialty}) • Room: {doctor?.roomNo}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRxPrintOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print e-Rx</span>
          </button>
          <button
            onClick={() => onOpenLabOrderModal(patient?.id)}
            className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Order Lab Tests</span>
          </button>
          <button
            onClick={handleSaveConsultation}
            className="px-4 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete & Sign Visit</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Queue Selector */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>OPD Patients Queue</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded-full font-bold">
                {todayApts.length} Waiting
              </span>
            </h3>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {todayApts.map(apt => {
                const isSelected = apt.id === selectedApt?.id;
                const pInfo = patients.find(p => p.id === apt.patientId);

                return (
                  <div
                    key={apt.id}
                    onClick={() => setSelectedAptId(apt.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{apt.tokenNumber}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                        {apt.timeSlot.split(' - ')[0]}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">{apt.patientName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{apt.reason}</p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>Age: {pInfo?.age}y ({pInfo?.gender})</span>
                      <span className="font-medium text-teal-700">{apt.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Active Clinical Record Form */}
        <div className="lg:col-span-3 space-y-4">
          {/* Patient Clinical Profile Strip */}
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                {patient?.name?.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{patient?.name}</h3>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {patient?.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {patient?.age} Years • {patient?.gender} • Blood Group: <strong className="text-slate-700">{patient?.bloodGroup}</strong> • Mobile: {patient?.phone}
                </p>
              </div>
            </div>

            {/* Allergies Highlight */}
            <div className="flex items-center gap-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold">Drug Allergies: </span>
                <span>{patient?.allergies || "None reported"}</span>
              </div>
            </div>
          </div>

          {/* Vitals & Biometrics */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>Patient Vitals & Biometrics (With Auto-BMI)</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">BP (Systolic)</label>
                <input
                  type="number"
                  value={vitals.bpSystolic}
                  onChange={(e) => handleVitalChange('bpSystolic', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">mmHg</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">BP (Diastolic)</label>
                <input
                  type="number"
                  value={vitals.bpDiastolic}
                  onChange={(e) => handleVitalChange('bpDiastolic', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">mmHg</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">Pulse Rate</label>
                <input
                  type="number"
                  value={vitals.pulse}
                  onChange={(e) => handleVitalChange('pulse', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">bpm</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">Temperature</label>
                <input
                  type="number"
                  step="0.1"
                  value={vitals.temperature}
                  onChange={(e) => handleVitalChange('temperature', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">°F</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">SpO2 Oxygen</label>
                <input
                  type="number"
                  value={vitals.spo2}
                  onChange={(e) => handleVitalChange('spo2', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">%</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">Height</label>
                <input
                  type="number"
                  value={vitals.heightCm}
                  onChange={(e) => handleVitalChange('heightCm', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">cm</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-[10px] text-slate-500 block">Weight</label>
                <input
                  type="number"
                  step="0.5"
                  value={vitals.weightKg}
                  onChange={(e) => handleVitalChange('weightKg', e.target.value)}
                  className="w-full font-bold text-slate-800 bg-transparent outline-hidden text-sm"
                />
                <span className="text-[10px] text-slate-400">kg</span>
              </div>

              <div className={`p-2.5 rounded-lg border border-slate-200 ${bmiData.color}`}>
                <label className="text-[10px] opacity-75 block">BMI Index</label>
                <span className="font-extrabold text-sm block">{bmiData.bmi || '—'}</span>
                <span className="text-[9px] font-semibold block truncate">{bmiData.category}</span>
              </div>
            </div>
          </div>

          {/* Chief Complaint & Examination Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">Chief Complaint & Symptoms</label>
              <textarea
                rows={3}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                placeholder="Patient's primary clinical symptoms and duration..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden resize-none"
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-1.5">
              <label className="text-xs font-semibold text-slate-800">Clinical Examination Findings</label>
              <textarea
                rows={3}
                value={examinationNotes}
                onChange={(e) => setExaminationNotes(e.target.value)}
                placeholder="Systemic examination, pallor, chest, abdomen findings..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-teal-600 outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Electronic Prescription Builder */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>e-Prescription & Medication Orders</span>
              </h4>
              <button
                type="button"
                onClick={addPrescriptionRow}
                className="text-xs flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Medicine
              </button>
            </div>

            <div className="space-y-2">
              {prescriptions.map((p, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Medicine Name (e.g. Tab Metformin)"
                    value={p.medicine}
                    onChange={(e) => updatePrescription(idx, 'medicine', e.target.value)}
                    className="flex-2 min-w-[140px] px-2.5 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="Strength (e.g. 500mg)"
                    value={p.strength}
                    onChange={(e) => updatePrescription(idx, 'strength', e.target.value)}
                    className="w-24 px-2 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                  />
                  <select
                    value={p.frequency}
                    onChange={(e) => updatePrescription(idx, 'frequency', e.target.value)}
                    className="w-40 px-2 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                  >
                    <option value="1-0-1 (After Meals)">1-0-1 (After Meals)</option>
                    <option value="1-0-0 (Morning)">1-0-0 (Morning)</option>
                    <option value="0-0-1 (Night)">0-0-1 (Night)</option>
                    <option value="1-1-1 (TDS)">1-1-1 (TDS)</option>
                    <option value="1-0-0 (Empty Stomach)">1-0-0 (Empty Stomach)</option>
                    <option value="SOS (As Needed)">SOS (As Needed)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Duration (30 days)"
                    value={p.duration}
                    onChange={(e) => updatePrescription(idx, 'duration', e.target.value)}
                    className="w-24 px-2 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="Instructions"
                    value={p.instructions}
                    onChange={(e) => updatePrescription(idx, 'instructions', e.target.value)}
                    className="flex-1 min-w-[120px] px-2.5 py-1.5 bg-white rounded border border-slate-200 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => removePrescriptionRow(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up Planning */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span className="font-semibold text-slate-800">Recommended Follow-up Visit:</span>
              <input
                type="date"
                value={followupDate}
                onChange={(e) => setFollowupDate(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded font-medium outline-hidden"
              />
            </div>
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Follow-up clinical notes..."
                value={followupNotes}
                onChange={(e) => setFollowupNotes(e.target.value)}
                className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Print Modal */}
      <PrescriptionPrintModal
        isOpen={isRxPrintOpen}
        onClose={() => setIsRxPrintOpen(false)}
        visit={{
          id: existingVisit?.id || 'VIS-DRAFT',
          appointmentId: selectedApt?.id,
          patientId: patient?.id,
          patientName: patient?.name,
          doctorId: doctor?.id,
          doctorName: doctor?.name,
          date: '10-Oct-2026',
          time: '10:15 AM',
          chiefComplaint,
          vitals: {
            ...vitals,
            bmi: bmiData.bmi,
            bmiCategory: bmiData.category
          },
          diagnosisRecords: diagnoses,
          prescriptions,
          followupDate,
          followupNotes
        }}
      />
    </div>
  );
}
