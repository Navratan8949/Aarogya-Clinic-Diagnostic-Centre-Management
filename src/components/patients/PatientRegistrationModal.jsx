import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Modal from '../common/Modal.jsx';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export default function PatientRegistrationModal({ isOpen, onClose, onRegistered }) {
  const { registerPatient, checkDuplicatePatient } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: '',
    bloodGroup: 'B+',
    allergies: '',
    medicalHistory: '',
    emergencyContact: '',
    abhaId: ''
  });

  const [duplicates, setDuplicates] = useState([]);
  const [duplicateWarningAcknowledged, setDuplicateWarningAcknowledged] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Reset duplicate warnings when editing phone/name
    if (name === 'phone' || name === 'name') {
      setDuplicateWarningAcknowledged(false);
    }
  };

  const handlePhoneBlur = () => {
    if (formData.name || formData.phone) {
      const dups = checkDuplicatePatient(formData.name, formData.phone);
      setDuplicates(dups);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Patient full name is required');
      return;
    }
    if (!formData.age || Number(formData.age) <= 0) {
      setErrorMsg('Please enter a valid age');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    // Check duplicate check
    const dups = checkDuplicatePatient(formData.name, formData.phone);
    if (dups.length > 0 && !duplicateWarningAcknowledged) {
      setDuplicates(dups);
      return;
    }

    const created = registerPatient({
      name: formData.name.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone.trim(),
      email: formData.email.trim() || '—',
      address: formData.address.trim() || 'Jaipur, Rajasthan',
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies.trim() || 'None reported',
      medicalHistory: formData.medicalHistory.trim() || 'None',
      emergencyContact: formData.emergencyContact.trim() || '—',
      abhaId: formData.abhaId.trim() ? `${formData.abhaId.trim()} (Demo Unverified)` : 'Demo Unlinked'
    });

    if (onRegistered) onRegistered(created);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Patient"
      subtitle="Complete front-desk patient intake. ABHA & identity details are for demonstration only."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Duplicate Patient Alert */}
        {duplicates.length > 0 && !duplicateWarningAcknowledged && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Potential Duplicate Patient Record Detected!</span>
            </div>
            <p className="text-amber-700 leading-relaxed">
              We found {duplicates.length} existing patient(s) with matching contact number or name:
            </p>
            <div className="space-y-1.5 pl-2 border-l-2 border-amber-400">
              {duplicates.map(d => (
                <div key={d.id} className="font-medium">
                  • <strong>{d.name}</strong> ({d.id}) — Phone: {d.phone}, Age: {d.age}y
                </div>
              ))}
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-amber-700">Would you still like to proceed with creating a new record?</span>
              <button
                type="button"
                onClick={() => setDuplicateWarningAcknowledged(true)}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold text-xs"
              >
                Acknowledge & Continue
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={handleChange}
              onBlur={handlePhoneBlur}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Age (Years) *</label>
            <input
              type="number"
              name="age"
              required
              min="0"
              max="125"
              placeholder="e.g. 45"
              value={formData.age}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Mobile Number *</label>
            <input
              type="text"
              name="phone"
              required
              placeholder="+91 98290 12345"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handlePhoneBlur}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden bg-white"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address (Optional)</label>
            <input
              type="email"
              name="email"
              placeholder="patient@example.in"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              placeholder="Name & Contact (e.g. Spouse +91...)"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Residential Address / City</label>
          <input
            type="text"
            name="address"
            placeholder="Plot / Street, Colony, Jaipur"
            value={formData.address}
            onChange={handleChange}
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Drug / Environmental Allergies</label>
            <input
              type="text"
              name="allergies"
              placeholder="e.g. Penicillin, Sulfa, Dust"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Past Medical History</label>
            <input
              type="text"
              name="medicalHistory"
              placeholder="e.g. Hypertension, Diabetes, Thyroid"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
            />
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">Ayushman Bharat Health Account (ABHA) ID</label>
            <span className="text-[10px] text-slate-500 font-medium">Demo Simulator</span>
          </div>
          <input
            type="text"
            name="abhaId"
            placeholder="e.g. 91-4421-8890-1234 (Simulated placeholder)"
            value={formData.abhaId}
            onChange={handleChange}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:border-teal-600 outline-hidden"
          />
          <p className="text-[10px] text-slate-500 italic">
            Note: This field does not generate verified government ABHA credentials in demo mode.
          </p>
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
            Register Patient
          </button>
        </div>
      </form>
    </Modal>
  );
}
