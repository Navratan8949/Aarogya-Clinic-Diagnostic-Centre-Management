import { useApp } from '../../context/AppContext.jsx';
import {
  Users,
  Calendar,
  Clock,
  Stethoscope,
  FlaskConical,
  TestTube2,
  FileCheck2,
  Receipt,
  DollarSign,
  AlertTriangle,
  Package,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2
} from 'lucide-react';
import MetricCard from '../common/MetricCard.jsx';
import StatusBadge from '../common/StatusBadge.jsx';
import { formatCurrency } from '../../lib/formatters.js';
import { WeeklyPatientVisitsChart, RevenueBreakdownDonut, DoctorLoadProgress } from '../common/CustomCharts.jsx';

export default function ExecutiveDashboard({
  onQuickAction,
  onOpenReport,
  onOpenPatient
}) {
  const {
    stats,
    appointments,
    labOrders,
    reports,
    patients,
    inventory,
    activityLogs,
    facility,
    currentRole,
    setCurrentView
  } = useApp();

  const waitingQueue = appointments.filter(a => a.status === 'Checked In' || a.status === 'Waiting');
  const recentOrders = labOrders.slice(0, 4);
  const pendingReviewReports = reports.filter(r => r.status === 'Awaiting Review');

  return (
    <div className="space-y-6">
      {/* Welcome & Facility Health Banner */}
      <div className="bg-gradient-to-r from-[#142B4A] to-[#0F766E] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider uppercase bg-teal-400/20 text-teal-200 px-2.5 py-0.5 rounded-full border border-teal-300/30">
              Live Facility Operations
            </span>
            <span className="text-xs text-teal-200/80">• Tonk Road Main Branch, Jaipur</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {facility.name}
          </h2>
          <p className="text-xs text-teal-100/90 mt-1 max-w-2xl leading-relaxed">
            Welcome back, <strong>{currentRole.user}</strong> ({currentRole.name}). All clinical queues, automated phlebotomy barcodes, and laboratory analyzers are operating normally.
          </p>
        </div>

        {/* Quick OPD & Lab Flow Counters */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 text-xs shrink-0">
          <div className="text-center px-2">
            <span className="text-lg font-black block text-white">{stats.todayAppointments}</span>
            <span className="text-[10px] text-teal-200 font-medium">OPD Bookings</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center px-2">
            <span className="text-lg font-black block text-teal-300">{stats.todayLabOrders}</span>
            <span className="text-[10px] text-teal-200 font-medium">Lab Orders</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="text-center px-2">
            <span className="text-lg font-black block text-emerald-300">{formatCurrency(stats.totalCollections)}</span>
            <span className="text-[10px] text-teal-200 font-medium">Collected</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Registered Patients"
          value={stats.totalPatients}
          subtitle="Longitudinal medical files"
          icon={Users}
          colorScheme="teal"
          trend="+12 this week"
          trendPositive={true}
          onClick={() => setCurrentView('patients')}
        />
        <MetricCard
          title="Active OPD Queue"
          value={stats.checkedInQueue}
          subtitle={`${stats.inConsultation} currently with doctors`}
          icon={Clock}
          colorScheme="blue"
          onClick={() => setCurrentView('queue')}
        />
        <MetricCard
          title="Diagnostic Tests In Lab"
          value={stats.samplesInProcessing}
          subtitle={`${stats.samplesAwaitingCollection} awaiting phlebotomy`}
          icon={FlaskConical}
          colorScheme="indigo"
          onClick={() => setCurrentView('laboratory')}
        />
        <MetricCard
          title="Reports Awaiting Review"
          value={stats.reportsAwaitingReview}
          subtitle={`${stats.reportsReleased} released today`}
          icon={FileCheck2}
          colorScheme="amber"
          onClick={() => setCurrentView('laboratory')}
        />
      </div>

      {/* Financial & Inventory KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Gross Invoiced Revenue"
          value={formatCurrency(stats.totalRevenue)}
          subtitle="Total billing counter charges"
          icon={Receipt}
          colorScheme="teal"
          onClick={() => setCurrentView('billing')}
        />
        <MetricCard
          title="Realized Collections"
          value={formatCurrency(stats.totalCollections)}
          subtitle="Cash & UPI in bank account"
          icon={DollarSign}
          colorScheme="emerald"
          onClick={() => setCurrentView('billing')}
        />
        <MetricCard
          title="Patient Outstanding Dues"
          value={formatCurrency(stats.outstandingBalances)}
          subtitle="Pending receivables across accounts"
          icon={AlertTriangle}
          colorScheme="rose"
          onClick={() => setCurrentView('billing')}
        />
        <MetricCard
          title="Inventory Alerts"
          value={stats.lowStockItems}
          subtitle="Low reagents & expiring batches"
          icon={Package}
          colorScheme="amber"
          onClick={() => setCurrentView('inventory')}
        />
      </div>

      {/* Interactive Charts & Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly OPD & Lab Volumes + Doctor distribution */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart 1: Weekly Throughput */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Weekly Consultation & Diagnostic Throughput
              </h3>
              <button
                onClick={() => setCurrentView('reports')}
                className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
              >
                <span>Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Real patient walk-in appointments vs Pathology investigations</p>
            <WeeklyPatientVisitsChart />
          </div>

          {/* Quick Doctor Consultation Workload */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Doctor Consultation Loads Today
            </h3>
            <p className="text-[11px] text-slate-400 mb-4">Patient appointment allocations across active OPD rooms</p>
            <DoctorLoadProgress appointments={appointments} doctors={facility.branches ? [
              { id: "DOC-01", name: "Dr. Ananya Sharma (General Physician)" },
              { id: "DOC-02", name: "Dr. Rohit Mehta (Orthopedic)" },
              { id: "DOC-03", name: "Dr. Neha Verma (Pediatrician)" },
              { id: "DOC-04", name: "Dr. Arjun Singh (Dermatologist)" }
            ] : []} />
          </div>
        </div>

        {/* Right Col: Live Queue Feed & Awaiting Reports */}
        <div className="space-y-6">
          {/* Live OPD Queue Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>Live OPD Waiting Queue</span>
              </h3>
              <button
                onClick={() => setCurrentView('queue')}
                className="text-xs text-teal-700 hover:underline font-semibold"
              >
                View Board
              </button>
            </div>

            <div className="space-y-2">
              {waitingQueue.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">No patients waiting in queue</p>
              ) : (
                waitingQueue.map(apt => (
                  <div
                    key={apt.id}
                    onClick={() => setCurrentView('queue')}
                    className="p-3 bg-slate-50 hover:bg-teal-50/60 rounded-xl border border-slate-200 cursor-pointer transition-colors text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-teal-900 bg-teal-100/80 px-2 py-0.5 rounded text-xs">
                          {apt.tokenNumber}
                        </span>
                        <strong className="text-slate-900">{apt.patientName}</strong>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{apt.doctorName} • {apt.timeSlot.split(' - ')[0]}</p>
                    </div>
                    <StatusBadge status={apt.status} size="sm" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reports Awaiting Review Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-amber-600" />
                <span>Pathologist Verification Queue</span>
              </h3>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {pendingReviewReports.length} Pending
              </span>
            </div>

            <div className="space-y-2.5">
              {pendingReviewReports.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">All test results verified & released</p>
              ) : (
                pendingReviewReports.map(rep => (
                  <div
                    key={rep.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block font-mono">{rep.id}</span>
                      <span className="text-[11px] text-slate-600">{rep.patientName} ({rep.patientAge}y)</span>
                    </div>
                    <button
                      onClick={() => onOpenReport(rep.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition-colors"
                    >
                      Review
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Action Tiles */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
              Frequent Counter Workflows
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onQuickAction('register_patient')}
                className="p-2.5 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-slate-800 font-semibold text-left transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-teal-700" />
                <span>Register Patient</span>
              </button>
              <button
                onClick={() => onQuickAction('book_appointment')}
                className="p-2.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-800 font-semibold text-left transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Book Slot</span>
              </button>
              <button
                onClick={() => onQuickAction('create_lab_order')}
                className="p-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-slate-800 font-semibold text-left transition-colors flex items-center gap-2"
              >
                <FlaskConical className="w-4 h-4 text-indigo-700" />
                <span>New Lab Order</span>
              </button>
              <button
                onClick={() => onQuickAction('create_invoice')}
                className="p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-slate-800 font-semibold text-left transition-colors flex items-center gap-2"
              >
                <Receipt className="w-4 h-4 text-emerald-700" />
                <span>Issue Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log / Operational Audit Trail */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-teal-700" />
              <span>Real-Time Operational Audit Trail & Activity Log</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Chronological record of front desk, laboratory, clinical and billing actions</p>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {activityLogs?.length || 0} Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Operator & Role</th>
                <th className="py-2.5 px-3">Action Event</th>
                <th className="py-2.5 px-3">Module</th>
                <th className="py-2.5 px-3">Event Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(activityLogs || []).slice(0, 6).map(act => (
                <tr key={act.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {act.timestamp}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {act.user} <span className="font-normal text-slate-500 text-[11px]">({act.role})</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold text-[11px]">
                      {act.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-600">
                    {act.recordType}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 max-w-md truncate">
                    {act.summary}
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
