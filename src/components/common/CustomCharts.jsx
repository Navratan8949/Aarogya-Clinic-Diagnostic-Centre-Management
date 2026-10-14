import { useState } from 'react';
import { formatCurrency } from '../../lib/formatters.js';

export function WeeklyPatientVisitsChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = [
    { day: 'Mon', visits: 38, labOrders: 24 },
    { day: 'Tue', visits: 42, labOrders: 29 },
    { day: 'Wed', visits: 49, labOrders: 33 },
    { day: 'Thu', visits: 45, labOrders: 31 },
    { day: 'Fri', visits: 52, labOrders: 39 },
    { day: 'Sat (Today)', visits: 44, labOrders: 28, isToday: true },
    { day: 'Sun', visits: 18, labOrders: 11 }
  ];

  const maxVal = 60;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-teal-600 inline-block"></span>
            <span className="text-slate-600">OPD Consultations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>
            <span className="text-slate-600">Diagnostic Tests</span>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-medium">This Week</span>
      </div>

      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100">
        {data.map((item, idx) => {
          const visitHeight = (item.visits / maxVal) * 100;
          const labHeight = (item.labOrders / maxVal) * 100;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded shadow-lg whitespace-nowrap animate-in fade-in duration-150">
                  <span className="font-semibold">{item.day}: </span>
                  <span>{item.visits} OPD / {item.labOrders} Lab</span>
                </div>
              )}

              <div className="w-full flex items-end justify-center gap-1 h-32">
                <div
                  style={{ height: `${visitHeight}%` }}
                  className={`w-3.5 sm:w-4.5 rounded-t-sm transition-all duration-300 ${
                    item.isToday ? 'bg-teal-700 shadow-xs' : 'bg-teal-500 group-hover:bg-teal-600'
                  }`}
                />
                <div
                  style={{ height: `${labHeight}%` }}
                  className={`w-3.5 sm:w-4.5 rounded-t-sm transition-all duration-300 ${
                    item.isToday ? 'bg-blue-600 shadow-xs' : 'bg-blue-400 group-hover:bg-blue-500'
                  }`}
                />
              </div>

              <span
                className={`text-[11px] truncate max-w-full text-center ${
                  item.isToday ? 'font-bold text-teal-800' : 'text-slate-500'
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RevenueBreakdownDonut({ invoices = [] }) {
  // Aggregate revenue by category
  let labRev = 0;
  let consultRev = 0;

  invoices.forEach(inv => {
    (inv.items || []).forEach(it => {
      if (it.type === 'Lab Test') labRev += it.amount;
      else consultRev += it.amount;
    });
  });

  const total = labRev + consultRev || 1;
  const labPercent = Math.round((labRev / total) * 100);
  const consultPercent = 100 - labPercent;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-around py-2">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Simple crisp SVG donut */}
        <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth="3.8"
          />
          {/* Lab share */}
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            stroke="#0F766E"
            strokeWidth="3.8"
            strokeDasharray={`${labPercent} ${100 - labPercent}`}
            strokeDashoffset="0"
          />
          {/* Consult share */}
          <circle
            cx="18"
            cy="18"
            r="15.91549430918954"
            fill="transparent"
            stroke="#2563EB"
            strokeWidth="3.8"
            strokeDasharray={`${consultPercent} ${100 - consultPercent}`}
            strokeDashoffset={`-${labPercent}`}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xs text-slate-500 font-medium block">Total</span>
          <span className="text-sm font-bold text-slate-900">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="space-y-3 text-xs w-full sm:w-auto">
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-700"></span>
            <span className="text-slate-700 font-medium">Pathology Lab ({labPercent}%)</span>
          </div>
          <span className="font-bold text-slate-900">{formatCurrency(labRev)}</span>
        </div>
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
            <span className="text-slate-700 font-medium">OPD Consultations ({consultPercent}%)</span>
          </div>
          <span className="font-bold text-slate-900">{formatCurrency(consultRev)}</span>
        </div>
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
          Calculated from real invoices & receipts
        </div>
      </div>
    </div>
  );
}

export function DoctorLoadProgress({ appointments = [], doctors = [] }) {
  return (
    <div className="space-y-3.5">
      {doctors.map(doc => {
        const count = appointments.filter(a => a.doctorId === doc.id).length;
        const maxExpected = 10;
        const percent = Math.min(100, Math.round((count / maxExpected) * 100));

        return (
          <div key={doc.id} className="text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">{doc.name}</span>
              <span className="text-slate-500">{count} Patients booked today</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                style={{ width: `${percent}%` }}
                className={`h-full rounded-full transition-all duration-500 ${
                  percent > 80 ? 'bg-amber-500' : 'bg-teal-600'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
