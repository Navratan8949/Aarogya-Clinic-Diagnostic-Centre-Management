import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Receipt,
  Users,
  Barcode,
  Calendar,
  FileCheck2,
  Clock,
  ChevronRight,
  Sparkles,
  Award,
  Building2,
  CreditCard,
  HeartPulse,
  Smartphone,
  Lock,
  ExternalLink,
  LogIn
} from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';

export default function LandingPage({ onLaunchDemo }) {
  const navigate = useNavigate();
  const { roles, switchRole, setCurrentView, isAuthenticated } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    {
      step: "01",
      title: "Patient Intake & Duplicate Detection",
      desc: "Fast front-desk walk-in registration with automated duplicate checking by mobile/name, allergy logging, and unverified ABHA simulator.",
      badge: "Front Desk"
    },
    {
      step: "02",
      title: "Token Queue & Doctor Room Assignment",
      desc: "Instant token number generation, waiting time estimation, and live public-style OPD waiting hall call display.",
      badge: "OPD Flow"
    },
    {
      step: "03",
      title: "Clinical Consultation & e-Prescriptions",
      desc: "Doctor workspace with Asian-Indian BMI calculator, chief complaints, ICD-10 diagnoses, and structured frequency dosages.",
      badge: "Doctor Practice"
    },
    {
      step: "04",
      title: "Diagnostic Requisition & Barcode Generation",
      desc: "Order individual tests or cost-saving packages. Automatic color-coded tube container specs (EDTA, SST Gel, Fluoride).",
      badge: "Lab Order"
    },
    {
      step: "05",
      title: "Phlebotomy & Sample Tracking",
      desc: "Barcoded collection timestamp, collector assignment, thermal sticker print preview, and controlled specimen rejection workflow.",
      badge: "Specimen"
    },
    {
      step: "06",
      title: "Technician Worklist & Result Entry",
      desc: "Parameter-by-parameter analytical values entry with biological reference intervals and high/low abnormal flags.",
      badge: "Analytical"
    },
    {
      step: "07",
      title: "Pathologist Clinical Verification",
      desc: "Multi-stage authorization! Reports cannot be released to patients without medical sign-off and digital pathologist signature.",
      badge: "Quality & Sign-off"
    },
    {
      step: "08",
      title: "NABL Report Release & GST Billing",
      desc: "Clean report print/PDF layout, simulated WhatsApp notification dispatch, and cashier cash drawer reconciliation.",
      badge: "Release & Finance"
    }
  ];

  const handleLaunchAsRole = (roleId) => {
    switchRole(roleId);
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (roleId === 'patient_portal') {
        setCurrentView('portal');
      } else {
        setCurrentView('dashboard');
      }
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#172033] selection:bg-teal-500 selection:text-white">
      {/* Top Navbar */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F766E] to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-900/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">AarogyaDesk</span>
                <span className="text-[10px] bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded-full border border-teal-200">
                  INDIA HEALTHCARE ERP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Clinic & Diagnostic Centre Management</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#workflow" className="hover:text-teal-700 transition-colors">Clinical Journey</a>
            <a href="#solutions" className="hover:text-teal-700 transition-colors">Clinic vs Lab</a>
            <a href="#roles" className="hover:text-teal-700 transition-colors">10 Demo Roles</a>
            <a href="#pricing" className="hover:text-teal-700 transition-colors">Pricing</a>
            <a href="#compliance" className="hover:text-teal-700 transition-colors">Compliance</a>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/login')}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-teal-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all flex items-center gap-1.5 border border-slate-200 shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-teal-600" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => navigate(isAuthenticated ? '/admin' : '/login')}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md shadow-teal-700/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Launch Live App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-teal-50/60 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Unified Healthcare Operating System for India</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Run OPD Consultations & Diagnostic Labs with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600">Zero Leakages.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              A comprehensive clinical suite uniting patient intake, doctor queues, vitals BMI calculations, barcode phlebotomy, technician result worklists, pathologist report authorization, and cashier reconciliation.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleLaunchAsRole('super_admin')}
                className="px-6 py-3 text-sm font-bold text-white bg-[#0F766E] hover:bg-teal-800 rounded-xl shadow-lg shadow-teal-800/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Enter Live Demo System</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#roles"
                className="px-5 py-3 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors"
              >
                Explore 10 User Roles
              </a>
            </div>

            {/* Live Trust Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-black text-teal-800 block">45%</span>
                <span className="text-xs text-slate-500 font-medium">Faster OPD token queues</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-black text-blue-700 block">100%</span>
                <span className="text-xs text-slate-500 font-medium">Specimen barcode traceability</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-black text-emerald-700 block">Zero</span>
                <span className="text-xs text-slate-500 font-medium">Cash drawer billing leakages</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-2xl font-black text-indigo-700 block">ABHA</span>
                <span className="text-xs text-slate-500 font-medium">DPDPA 2023 Architecture ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 8-Step Clinical Journey */}
      <section id="workflow" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">The Connected Journey</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              End-to-End Operational Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every clinical, phlebotomy, analytical, and accounting stage is interconnected with real validation rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflowSteps.map((ws, idx) => (
              <div
                key={ws.step}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-teal-50/80 border-teal-600 shadow-md ring-1 ring-teal-600'
                    : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-black font-mono px-2 py-0.5 rounded ${
                      activeStep === idx ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {ws.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {ws.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{ws.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ws.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => handleLaunchAsRole('super_admin')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <span>Test This Pipeline in the Live App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Dual Pillars: For Clinics vs For Pathology Labs */}
      <section id="solutions" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Specialized Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Purpose-Built for Both OPD Practice and Pathology LIMS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Doctor Practice & Clinics */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">For Doctors & Outpatient Clinics</h3>
                  <p className="text-xs text-slate-500">Solo consultants, polyclinics, and multi-specialty centres</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Live Token Queue Billboard:</strong> Reduces reception congestion with audio-visual token summon and room alerts.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Automated Vitals & Asian-Indian BMI:</strong> Enter height/weight and instant cut-offs categorize obesity risk.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Electronic Prescriptions:</strong> Pre-formatted frequency chips (1-0-1, empty stomach) and duration calculators.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Conflict-Free Slot Booking:</strong> Prevents overlapping double-bookings for doctors automatically.</span>
                </div>
              </div>

              <button
                onClick={() => handleLaunchAsRole('doctor')}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs rounded-xl border border-blue-200 transition-colors"
              >
                Launch as Doctor (Dr. Ananya Sharma) →
              </button>
            </div>

            {/* For Diagnostic Laboratories */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-700">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">For Pathology & Diagnostic Laboratories</h3>
                  <p className="text-xs text-slate-500">Standalone pathology labs and in-house diagnostic wings</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Specimen Vacutainer Tube Guidance:</strong> Automatically prescribes Lavender EDTA, SST Gel, or Grey Fluoride tubes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sample Barcode Thermal Labels:</strong> Generated specimen stickers for foolproof specimen tracking.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Controlled Pathologist Verification:</strong> Reports cannot be printed or released without medical verification.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Reagent Cold-Chain & Expiry Tracking:</strong> Tracks batch lots and refrigerator storage alerts.</span>
                </div>
              </div>

              <button
                onClick={() => handleLaunchAsRole('pathologist')}
                className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-xl border border-teal-200 transition-colors"
              >
                Launch as Pathologist (Dr. Rajesh Khandelwal) →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Demo Personas Launchpad */}
      <section id="roles" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Role-Based Access Control</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Test AarogyaDesk with 10 Real Operational Roles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Click any role profile below to launch the software directly into that operational view.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {roles.map(r => (
              <div
                key={r.id}
                onClick={() => handleLaunchAsRole(r.id)}
                className="bg-[#F8FAFC] hover:bg-teal-50/60 p-4 rounded-xl border border-slate-200 hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between text-xs group"
              >
                <div>
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
                    {r.name}
                  </span>
                  <strong className="text-slate-900 block font-semibold mb-1">{r.user}</strong>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                    {r.description}
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-bold text-teal-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Open as {r.name.split(' ')[0]}</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing for Indian Clinics */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Affordable Indian SaaS Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Simple, Predictable Plans for Healthcare Providers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              No hidden fees, no per-patient transaction costs. Free demo mode included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-700 text-sm">Clinic Solo</span>
                <p className="text-slate-500 mt-0.5">For single doctor consultation practices</p>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900">₹1,999</span>
                  <span className="text-slate-500 font-medium"> / month</span>
                </div>
                <div className="space-y-2.5 text-slate-600">
                  <p>✓ Up to 2 Doctor OPD Schedules</p>
                  <p>✓ Patient Registration & EMR History</p>
                  <p>✓ Live Token Queue & Check-In</p>
                  <p>✓ Prescription Generator (e-Rx)</p>
                  <p>✓ Basic Billing & Receipts</p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchAsRole('doctor')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
              >
                Try Clinic Solo Demo
              </button>
            </div>

            {/* Plan 2: Pro */}
            <div className="bg-white rounded-2xl border-2 border-teal-600 p-6 shadow-md space-y-5 text-xs flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular
              </span>
              <div>
                <span className="font-bold text-slate-900 text-sm">Clinic + In-House Lab Pro</span>
                <p className="text-slate-500 mt-0.5">For multi-doctor clinics with pathology lab</p>
                <div className="my-4">
                  <span className="text-3xl font-black text-teal-800">₹4,999</span>
                  <span className="text-slate-500 font-medium"> / month</span>
                </div>
                <div className="space-y-2.5 text-slate-700 font-medium">
                  <p>✓ Unlimited Doctors & Staff Logins</p>
                  <p>✓ Complete Pathology LIMS & Test Master</p>
                  <p>✓ Barcoded Specimen Tube Tracking</p>
                  <p>✓ Pathologist Verification & NABL Reports</p>
                  <p>✓ Day-End Cashier Reconciliation</p>
                  <p>✓ Reagent & Consumable Inventory</p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchAsRole('super_admin')}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                Launch Pro Demo Now
              </button>
            </div>

            {/* Plan 3: Network */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 text-xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-slate-700 text-sm">Diagnostic Network</span>
                <p className="text-slate-500 mt-0.5">For diagnostic chains with collection centres</p>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900">₹9,999</span>
                  <span className="text-slate-500 font-medium"> / month</span>
                </div>
                <div className="space-y-2.5 text-slate-600">
                  <p>✓ Multi-Branch Centralized Database</p>
                  <p>✓ Collection Centre Routing & Logistics</p>
                  <p>✓ Bi-directional Analyzer ASTM Interfacing</p>
                  <p>✓ Patient WhatsApp Notification Gateway</p>
                  <p>✓ Dedicated Account Manager</p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchAsRole('super_admin')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
              >
                Try Network Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards Note */}
      <section id="compliance" className="py-12 bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-white font-bold text-sm">India Healthcare Standards & Data Privacy Disclosures</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Architected for Indian regulatory alignment</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">
                NHA ABDM Sandbox Ready
              </span>
              <span className="px-2.5 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">
                DPDPA 2023 Compliant
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-[11px]">
            <strong>Demonstration Notice:</strong> AarogyaDesk is a portfolio prototype demonstrating outpatient clinic and diagnostic laboratory software architecture. All patient profiles (e.g., Ramesh Kumar, Priya Sharma), doctor identities, test investigations, reference intervals, and financial invoices are safe fictional demonstration data. It does not replace certified clinical advice or diagnostic validation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            <span className="font-bold text-white">AarogyaDesk</span>
            <span>• Clinic & Diagnostic Centre Management System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Jaipur, Rajasthan, India</span>
            <span>•</span>
            <button
              onClick={() => handleLaunchAsRole('super_admin')}
              className="text-teal-400 hover:underline font-semibold"
            >
              Open Application Now →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
