import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { BarChart3, FileSpreadsheet, Download, Filter, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters.js';
import { exportToCSV } from '../../lib/exportUtils.js';
import { WeeklyPatientVisitsChart, RevenueBreakdownDonut, DoctorLoadProgress } from '../common/CustomCharts.jsx';

export default function ReportsView() {
  const {
    patients,
    appointments,
    doctors,
    labOrders,
    invoices,
    expenses,
    stats
  } = useApp();

  const handleExportDoctors = () => {
    const data = doctors.map(d => {
      const docApts = appointments.filter(a => a.doctorId === d.id);
      const rev = docApts.reduce((sum, a) => sum + (a.fee || 0), 0);
      return {
        DoctorName: d.name,
        Specialty: d.specialty,
        TotalAppointments: docApts.length,
        EstimatedRevenue: rev
      };
    });

    exportToCSV('AarogyaDesk_Doctor_Consultation_Report', data, [
      { key: 'DoctorName', label: 'Doctor Name' },
      { key: 'Specialty', label: 'Specialty' },
      { key: 'TotalAppointments', label: 'Consultations' },
      { key: 'EstimatedRevenue', label: 'Revenue (INR)' }
    ]);
  };

  const handleExportLabTAT = () => {
    const data = labOrders.map(o => ({
      OrderNo: o.id,
      Date: o.orderDate,
      Patient: o.patientName,
      Status: o.status,
      TestsCount: (o.testIds || []).length,
      Priority: o.priority
    }));

    exportToCSV('AarogyaDesk_Lab_Turnaround_Report', data, [
      { key: 'OrderNo', label: 'Order #' },
      { key: 'Date', label: 'Date' },
      { key: 'Patient', label: 'Patient Name' },
      { key: 'Status', label: 'Report Status' },
      { key: 'TestsCount', label: 'Tests Count' },
      { key: 'Priority', label: 'Priority' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-700" />
            <span>Operational Reports & Clinical Intelligence</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated OPD throughput, doctor consultation volume, diagnostic TAT, and revenue analytics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportDoctors}
            className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Doctor Volume CSV</span>
          </button>
          <button
            onClick={handleExportLabTAT}
            className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Lab TAT CSV</span>
          </button>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly OPD Patient Footfall */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Patient Consultation & Diagnostic Test Volume
          </h3>
          <p className="text-[11px] text-slate-400 mb-4">Daily comparison of OPD walk-ins vs Pathology test investigations</p>
          <WeeklyPatientVisitsChart />
        </div>

        {/* Revenue Contribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Service Revenue Realization
          </h3>
          <p className="text-[11px] text-slate-400 mb-4">Proportion of earnings from Laboratory investigations vs Outpatient doctors</p>
          <RevenueBreakdownDonut invoices={invoices} />
        </div>
      </div>

      {/* Doctor Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Doctor OPD Booking Distribution Today
          </h3>
          <DoctorLoadProgress appointments={appointments} doctors={doctors} />
        </div>

        {/* Turnaround Time Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Pathology Laboratory Turnaround Times (TAT)
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">Complete Blood Count (CBC)</strong>
                <span className="text-[11px] text-slate-500">Target TAT: 4.0 Hours</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Avg 2.8 hrs</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">Biochemistry (LFT / KFT / Lipid)</strong>
                <span className="text-[11px] text-slate-500">Target TAT: 5.0 Hours</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Avg 3.6 hrs</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <strong className="text-slate-900 block">Thyroid Profile (CLIA)</strong>
                <span className="text-[11px] text-slate-500">Target TAT: 6.0 Hours</span>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Avg 4.9 hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
