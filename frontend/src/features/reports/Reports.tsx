import React, { useState } from 'react';

const reportTypes = [
  { icon: 'people', title: 'Patient Census', desc: 'Daily/monthly patient visits and admissions', color: 'text-primary bg-primary/10' },
  { icon: 'payments', title: 'Revenue Report', desc: 'Billing, collections, outstanding payments', color: 'text-secondary bg-secondary/10' },
  { icon: 'stethoscope', title: 'OPD Statistics', desc: 'OPD footfall, doctor-wise consultations', color: 'text-tertiary bg-tertiary/10' },
  { icon: 'science', title: 'Lab Turnaround', desc: 'Sample collection to result delivery time', color: 'text-error bg-error/10' },
  { icon: 'bed', title: 'Bed Utilization', desc: 'Occupancy rate per ward over time', color: 'text-primary bg-primary/10' },
  { icon: 'medication', title: 'Pharmacy Dispensing', desc: 'Medicine dispensing and stock movement', color: 'text-secondary bg-secondary/10' },
];

const chartData = [
  { day: 'Mon', patients: 87 }, { day: 'Tue', patients: 65 }, { day: 'Wed', patients: 102 },
  { day: 'Thu', patients: 78 }, { day: 'Fri', patients: 94 }, { day: 'Sat', patients: 55 }, { day: 'Sun', patients: 32 },
];
const maxPts = Math.max(...chartData.map(d => d.patients));

export const Reports = () => {
  const [range, setRange] = useState('This Month');

  return (
    <div className="flex flex-col gap-space-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Reports & Analytics</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Generate and export hospital performance reports</p>
        </div>
        <div className="flex gap-1 bg-surface-container-lowest border border-surface-container-high rounded-xl p-1">
          {['This Week', 'This Month', 'This Quarter'].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-space-lg py-space-sm rounded-lg font-headline-sm text-body-sm transition-colors ${range === r ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg">
        <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold mb-space-lg">Daily Patient Volume (Last 7 Days)</h2>
        <div className="flex items-end gap-space-md h-40">
          {chartData.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-space-xs">
              <span className="font-clinical-code text-clinical-code text-on-surface-variant">{d.patients}</span>
              <div className="w-full bg-primary rounded-t-md transition-all" style={{ height: `${(d.patients / maxPts) * 120}px` }} />
              <span className="font-caption text-caption text-on-surface-variant">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {reportTypes.map(r => (
          <div key={r.title} className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-space-md">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${r.color}`}>
                <span className="material-symbols-outlined text-[22px]">{r.icon}</span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">{r.title}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{r.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container-high">
              {[{ icon: 'picture_as_pdf', label: 'PDF' }, { icon: 'table_view', label: 'CSV' }, { icon: 'grid_on', label: 'Excel' }].map(e => (
                <button key={e.label} className="flex-1 flex items-center justify-center gap-space-xs py-space-sm rounded-lg bg-surface-container-low text-on-surface-variant font-caption text-caption hover:bg-surface-container hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-[14px]">{e.icon}</span>{e.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
