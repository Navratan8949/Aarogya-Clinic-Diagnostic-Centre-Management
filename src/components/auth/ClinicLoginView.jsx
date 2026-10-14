'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { CLINIC_DEMO_USERS } from './clinicDemoUsers.js';
import {
  Activity,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  FlaskConical,
  FileCheck2,
  Receipt,
  AlertCircle,
  HelpCircle,
  Globe,
  X,
  ChevronRight,
  KeyRound,
  Shield,
  Building2,
  Users
} from 'lucide-react';

export default function ClinicLoginView({ onLoginSuccess, onBackToLanding }) {
  const { login } = useApp();

  const [email, setEmail] = useState('director.singhal@aarogyadesk-demo.in');
  const [password, setPassword] = useState('admin@aarogya');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(CLINIC_DEMO_USERS[0]);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Handle selecting a demo persona
  const handleSelectDemoUser = (user, autoLogin = false) => {
    setSelectedUser(user);
    setEmail(user.email);
    setPassword(user.password);
    setError('');

    if (autoLogin) {
      triggerLogin(user);
    }
  };

  // Perform login with realistic healthcare verification steps
  const triggerLogin = async (userToAuth = null) => {
    setError('');
    setIsLoading(true);

    const targetUser =
      userToAuth ||
      CLINIC_DEMO_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        roleId: 'super_admin',
        roleName: 'Authorized Clinical Staff',
        email: email.trim(),
        avatar: email.slice(0, 2).toUpperCase(),
        badge: 'Hospital Staff',
        department: 'Jaipur Main Facility',
        accessLevel: 'Standard Access'
      };

    if (!email.trim()) {
      setError('Please enter your hospital work email or staff ID');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter your security password');
      setIsLoading(false);
      return;
    }

    setLoadingStep('Verifying clinical digital credentials...');
    await new Promise((resolve) => setTimeout(resolve, 350));

    setLoadingStep(`Applying ${targetUser.roleName} access permissions...`);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setLoadingStep('Connecting to Jaipur clinic & laboratory registers...');
    await new Promise((resolve) => setTimeout(resolve, 250));

    login(targetUser);
    setIsLoading(false);

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerLogin();
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4]/30 text-slate-800 flex flex-col justify-between selection:bg-teal-600 selection:text-white relative overflow-hidden">
      {/* Light Clean Medical Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 148, 136, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 148, 136, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Soft Ambient Colorful Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-100 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-100 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-cyan-100 rounded-full blur-3xl pointer-events-none opacity-50" />

      {/* Top Header Bar (Clean Medical White) */}
      <header className="relative z-10 border-b border-slate-200/90 bg-white/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F766E] to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-900/15">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                AarogyaDesk
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wider">
                Clinic & Lab ERP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Aarogya Multispeciality Clinic & Diagnostics • Tonk Road, Jaipur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono">OPD & Lab Node: 99.98% Live</span>
          </div>

          {/* Back to Public Site Button */}
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Public Website</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Login Workspace */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clinical Highlights (Crisp Light Cards) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>NABL & NABH-Ready Hospital Operating Portal</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Seamless OPD Care <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600">
                  & Precision Diagnostics.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal">
                Log in to coordinate appointments, live patient queues, doctor e-prescriptions, barcoded specimen tracking, and NABL diagnostic report release.
              </p>
            </div>

            {/* Feature Modules Cards (Clean Light Medical Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2.5">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-slate-900 mb-1">Doctor OPD Workspace</h2>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Vitals, past history, ICD-10 e-prescriptions, and one-click pathology test ordering.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-slate-900 mb-1">Diagnostic Laboratory</h2>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Barcoded sample collection, automated analyzer worklist & multi-test entry.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-cyan-300 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-2.5">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-slate-900 mb-1">Pathologist Review</h2>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Panic critical value review, clinical verification, and digital doctor stamp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-300 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2.5">
                  <Receipt className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-slate-900 mb-1">Billing & Reception</h2>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Fast patient check-in, token generation, combined OPD+Lab invoices & UPI receipts.
                </p>
              </div>
            </div>

            {/* Accreditation Badge */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">NABL / NABH Quality Standard</div>
                  <div className="text-[11px] text-slate-500">Tonk Road Main Facility • SMS Hospital Circle</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                ACCREDITED
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Light Theme Sign In Console */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 relative">
              
              {/* Form Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Sign In to AarogyaDesk</span>
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                      LIVE DEMO
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select a 1-click medical demo role below or enter staff credentials.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 self-start sm:self-center cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Credential Guide</span>
                </button>
              </div>

              {/* 1-Click Demo Personas Grid */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Quick 1-Click Medical Personas</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Click to autofill or login instantly
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {CLINIC_DEMO_USERS.map((user) => {
                    const isSelected = selectedUser.id === user.id;
                    return (
                      <div
                        key={user.id}
                        onClick={() => handleSelectDemoUser(user)}
                        className={`p-3 rounded-2xl border text-left cursor-pointer transition-all relative group ${
                          isSelected
                            ? 'bg-teal-50/70 border-teal-600 shadow-sm shadow-teal-500/10 ring-1 ring-teal-600'
                            : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs`}>
                              {user.avatar}
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                                {user.name}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                {user.roleName}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                          )}
                        </div>

                        <div className="text-[10px] text-slate-600 truncate font-mono bg-white px-2 py-0.5 rounded border border-slate-200 mb-2">
                          {user.email}
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/70">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                            {user.badge}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectDemoUser(user, true);
                            }}
                            className="text-[10px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-0.5 hover:underline cursor-pointer"
                          >
                            <span>Quick In</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form Inputs (Light Modern Medical Style) */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email / Username Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Hospital Work Email / Staff ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. director.singhal@aarogyadesk-demo.in"
                      disabled={isLoading}
                      required
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-teal-600 focus:ring-3 focus:ring-teal-100 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium placeholder:text-slate-400 transition-all focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Security Password / PIN
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Demo password:{' '}
                      <code className="text-teal-700 font-mono font-bold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/80">
                        {password || 'admin@aarogya'}
                      </code>
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      disabled={isLoading}
                      required
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-teal-600 focus:ring-3 focus:ring-teal-100 text-slate-900 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm font-medium placeholder:text-slate-400 transition-all focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Selected Role Preview */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-800">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Remember this clinical session</span>
                  </label>

                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Role:</span>
                    <strong className="text-slate-800">
                      {selectedUser?.roleName || 'Super Admin'}
                    </strong>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-teal-700/25 hover:shadow-lg hover:shadow-teal-700/35 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2.5">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>{loadingStep || 'Verifying credentials...'}</span>
                      </div>
                    ) : (
                      <>
                        <span>Sign In to Healthcare Console</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Security & Deployment Notice Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Licensed to Aarogya Multispeciality Clinic & Diagnostics, Jaipur</span>
                </p>
                <div className="flex items-center justify-center gap-3 mt-1 text-[10px] text-slate-400">
                  <span>Reg: RJ/JPR/CLINIC/2023/8842</span>
                  <span>•</span>
                  <span>GSTIN: 08AABCA1234F1Z8</span>
                  <span>•</span>
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Login Page Bottom Footer */}
      <footer className="relative z-10 border-t border-slate-200/90 bg-white/80 backdrop-blur-md px-4 sm:px-8 py-3.5 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} AarogyaDesk ERP. Comprehensive Clinic & Diagnostic Centre Management Software.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Jaipur Main Facility: Plot 42-45, Tonk Road</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-slate-700 font-semibold">Emergency: +91 141 278 4500</span>
        </div>
      </footer>

      {/* Help / Demo Credentials Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Healthcare Staff Credentials</h3>
                <p className="text-xs text-slate-500">Configured medical accounts for live demonstration</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 mb-6 leading-relaxed">
              <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-900">
                <span className="font-bold text-teal-800 block mb-1">Demo Access Instructions:</span>
                Clicking any of the <strong>6 role cards</strong> on the login screen will immediately load that medical persona with appropriate clinical permissions.
              </div>

              <div className="space-y-2 text-slate-600 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                  <span><strong>Medical Director:</strong> director.singhal@aarogyadesk-demo.in</span>
                  <span className="font-mono text-teal-700 font-semibold">admin@aarogya</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                  <span><strong>Consultant Doctor:</strong> dr.ananya@aarogyadesk-demo.in</span>
                  <span className="font-mono text-teal-700 font-semibold">doctor@aarogya</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                  <span><strong>Receptionist:</strong> reception.priya@aarogyadesk-demo.in</span>
                  <span className="font-mono text-teal-700 font-semibold">reception@aarogya</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                  <span><strong>Lab Technician:</strong> lab.rahul@aarogyadesk-demo.in</span>
                  <span className="font-mono text-teal-700 font-semibold">lab@aarogya</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                  <span><strong>Pathologist:</strong> pathology.rajesh@aarogyadesk-demo.in</span>
                  <span className="font-mono text-teal-700 font-semibold">pathology@aarogya</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                  <span><strong>Accountant / Cashier:</strong> billing.amit@aarogyadesk-demo.in</span>
                  <span className="font-mono text-teal-700 font-semibold">billing@aarogya</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Understood, Return to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
