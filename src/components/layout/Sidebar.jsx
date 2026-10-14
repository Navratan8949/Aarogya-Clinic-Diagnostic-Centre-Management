import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  Activity,
  Users,
  Calendar,
  Clock,
  Stethoscope,
  FlaskConical,
  Receipt,
  Package,
  UserCog,
  DollarSign,
  BarChart3,
  Settings,
  ChevronRight,
  UserCheck,
  TestTube2,
  FileCheck2,
  Lock,
  Globe,
  LogOut,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {
    currentView,
    setCurrentView,
    canAccessModule,
    currentRole,
    currentUser,
    logout,
    stats
  } = useApp();

  const navSections = [
    {
      title: "Core Operations",
      items: [
        { id: "dashboard", label: "Executive Dashboard", icon: Activity, module: "dashboard" }
      ]
    },
    {
      title: "Front Desk & OPD",
      items: [
        { id: "patients", label: "Patient Directory", icon: Users, module: "patients", count: stats.totalPatients },
        { id: "appointments", label: "Appointments", icon: Calendar, module: "appointments", count: stats.todayAppointments },
        { id: "queue", label: "OPD Live Queue", icon: Clock, module: "queue", count: stats.checkedInQueue }
      ]
    },
    {
      title: "Clinical Practice",
      items: [
        { id: "consultations", label: "Consultation Workspace", icon: Stethoscope, module: "consultations", count: stats.inConsultation },
        { id: "doctors", label: "Doctor Schedules", icon: UserCheck, module: "doctors" }
      ]
    },
    {
      title: "Diagnostic Laboratory",
      items: [
        { id: "laboratory", label: "Lab Orders & Samples", icon: FlaskConical, module: "laboratory", count: stats.todayLabOrders },
        { id: "worklist", label: "Technician Worklist", icon: TestTube2, module: "worklist", count: stats.samplesInProcessing },
        { id: "results-review", label: "Pathologist Review", icon: FileCheck2, module: "review", count: stats.reportsAwaitingReview }
      ]
    },
    {
      title: "Finance & Invoicing",
      items: [
        { id: "billing", label: "Billing & Invoices", icon: Receipt, module: "billing" },
        { id: "finance", label: "Daily Cash & Expenses", icon: DollarSign, module: "finance" }
      ]
    },
    {
      title: "Supplies & Admin",
      items: [
        { id: "inventory", label: "Reagents & Stock", icon: Package, module: "inventory", count: stats.lowStockItems },
        { id: "staff", label: "Staff & Attendance", icon: UserCog, module: "staff" },
        { id: "reports", label: "Operational Reports", icon: BarChart3, module: "reports" }
      ]
    },
    {
      title: "Self-Service",
      items: [
        { id: "portal", label: "Patient Portal View", icon: Users, module: "portal" }
      ]
    },
    {
      title: "System",
      items: [
        { id: "settings", label: "Facility Settings", icon: Settings, module: "settings" }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#142B4A] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setCurrentView('dashboard');
              if (onClose) onClose();
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-black shadow-md shadow-teal-900/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-tight">AarogyaDesk</span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-semibold px-1.5 py-0.2 rounded border border-teal-500/30">ERP</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Clinic & Diagnostics</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Card */}
        <div className="px-3.5 py-2.5 bg-slate-800/40 border-b border-slate-800/60 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-800 text-teal-200 flex items-center justify-center text-xs font-bold shrink-0">
            {currentRole.user.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{currentRole.user}</p>
            <p className="text-[11px] text-teal-300/90 truncate">{currentRole.name}</p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <h4 className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </h4>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  const hasAccess = typeof canAccessModule === 'function' ? canAccessModule(item.module) : true;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (hasAccess) {
                          setCurrentView(item.id);
                          if (onClose) onClose();
                        }
                      }}
                      disabled={!hasAccess}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                        isActive
                          ? 'bg-teal-600 text-white font-semibold shadow-xs'
                          : hasAccess
                          ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                          : 'text-slate-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : hasAccess ? 'text-slate-400' : 'text-slate-600'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.count !== undefined && item.count > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                              isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                        {!hasAccess && <Lock className="w-3 h-3 text-slate-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom User Profile & Sign Out Bar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 space-y-2 shrink-0">
          {/* User Profile Card */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                {currentUser?.avatar || 'AS'}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs text-white truncate leading-tight">
                  {currentUser?.name || currentRole.user}
                </div>
                <div className="text-[10px] text-teal-400 truncate leading-tight">
                  {currentRole.name}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Sign Out of AarogyaDesk"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Public Website Link */}
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-teal-300 bg-teal-950/60 hover:bg-teal-900/80 border border-teal-800/40 rounded-lg transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>Public Product Website</span>
          </button>
        </div>
      </aside>
    </>
  );
}
