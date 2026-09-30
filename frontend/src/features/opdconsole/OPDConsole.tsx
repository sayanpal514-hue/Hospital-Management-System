import React, { useState, useEffect } from 'react';

const queue = [
  { token: 'T-001', name: 'Eleanor Vance', uhid: 'AH-84920', time: '09:00 AM', waited: '5 min', status: 'Completed' },
  { token: 'T-002', name: 'Rajesh Sharma', uhid: 'AH-84921', time: '09:30 AM', waited: '12 min', status: 'In Consultation' },
  { token: 'T-003', name: 'Priya Nair', uhid: 'AH-84922', time: '10:00 AM', waited: '32 min', status: 'Waiting' },
  { token: 'T-004', name: 'Mohammed Ali', uhid: 'AH-84923', time: '10:30 AM', waited: '2 min', status: 'Waiting' },
  { token: 'T-005', name: 'Sunita Rao', uhid: 'AH-84924', time: '11:00 AM', waited: 'Upcoming', status: 'Waiting' },
  { token: 'T-006', name: 'Arjun Mehta', uhid: 'AH-84925', time: '11:30 AM', waited: 'Upcoming', status: 'Waiting' },
  { token: 'T-007', name: 'Kavitha Iyer', uhid: 'AH-84926', time: '12:00 PM', waited: 'Upcoming', status: 'Waiting' },
  { token: 'T-008', name: 'Deepak Kumar', uhid: 'AH-84927', time: '12:30 PM', waited: 'Upcoming', status: 'Waiting' },
  { token: 'T-009', name: 'Meera Singh', uhid: 'AH-84928', time: '01:00 PM', waited: 'Upcoming', status: 'Waiting' },
  { token: 'T-010', name: 'Ravi Kumar', uhid: 'AH-84929', time: '01:30 PM', waited: 'Upcoming', status: 'Waiting' },
];

const statusStyle: Record<string, string> = {
  Waiting: 'bg-surface-container text-on-surface-variant',
  'In Consultation': 'bg-primary/10 text-primary',
  Completed: 'bg-secondary-container text-on-secondary-container',
};

export const OPDConsole = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  const current = queue.find(q => q.status === 'In Consultation');

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">OPD Console</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Cardiology OPD · Dr. Sarah Jenkins</p>
        </div>
        <div className="flex items-center gap-space-md bg-surface-container-lowest border border-surface-container-high px-space-lg py-space-md rounded-xl">
          <span className="material-symbols-outlined text-primary">schedule</span>
          <span className="font-clinical-value-md text-clinical-value-md text-on-surface font-bold">{time}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-space-md">
        {[{ l: 'Waiting', v: 7, c: 'text-on-surface' }, { l: 'In Consultation', v: 1, c: 'text-primary' }, { l: 'Completed', v: 2, c: 'text-secondary' }, { l: 'Total', v: 10, c: 'text-on-surface' }].map(s => (
          <div key={s.l} className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-high text-center">
            <p className={`font-clinical-value-lg text-clinical-value-lg font-bold ${s.c}`}>{s.v}</p>
            <p className="font-caption text-caption text-on-surface-variant">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-space-lg h-[calc(100vh-320px)] min-h-[500px]">
        {/* Queue Panel */}
        <div className="col-span-2 bg-surface-container-lowest rounded-xl border border-surface-container-high flex flex-col overflow-hidden">
          <div className="p-space-lg border-b border-surface-container-high">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Today's Queue</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-surface-container-low">
            {queue.map(p => (
              <div key={p.token} className={`flex items-center justify-between px-space-lg py-space-md ${p.status === 'In Consultation' ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-surface-container-low/50'} transition-colors cursor-pointer`}>
                <div className="flex items-center gap-space-sm">
                  <span className="font-clinical-code text-clinical-code text-primary font-bold w-12">{p.token}</span>
                  <div>
                    <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{p.name}</p>
                    <p className="font-caption text-caption text-on-surface-variant">{p.time} · {p.waited}</p>
                  </div>
                </div>
                <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${statusStyle[p.status]}`}>{p.status === 'In Consultation' ? '🟢' : p.status === 'Completed' ? '✓' : '⏳'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Patient Panel */}
        <div className="col-span-3 bg-surface-container-lowest rounded-xl border border-surface-container-high flex flex-col overflow-hidden">
          {current ? (
            <>
              <div className="p-space-lg bg-primary/5 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">{current.name[0]}</div>
                  <div>
                    <div className="flex items-center gap-space-sm">
                      <span className="font-headline-md text-headline-sm text-on-surface font-bold">{current.name}</span>
                      <span className="font-clinical-code text-clinical-code text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{current.uhid}</span>
                      <span className="font-clinical-code text-clinical-code bg-primary text-white px-2 py-0.5 rounded font-bold">{current.token}</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">42y Female · Cardiology · OPD</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">
                {/* Vitals */}
                <div>
                  <h3 className="font-headline-sm text-body-sm text-on-surface font-semibold mb-space-md flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-primary">vital_signs</span> Vitals
                  </h3>
                  <div className="grid grid-cols-3 gap-space-md">
                    {[['BP (Sys/Dia)', 'mmHg', '120 / 80'], ['Pulse', 'bpm', '72'], ['Temperature', '°F', '98.6'], ['SpO2', '%', '99'], ['Weight', 'kg', '65'], ['Height', 'cm', '162']].map(([label, unit, placeholder]) => (
                      <div key={label} className="flex flex-col gap-1">
                        <label className="font-caption text-caption text-on-surface-variant">{label} <span className="text-outline">({unit})</span></label>
                        <input defaultValue={placeholder} className="h-9 px-space-md bg-surface-container-low rounded-lg font-clinical-value-md text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Chief Complaint */}
                <div>
                  <h3 className="font-headline-sm text-body-sm text-on-surface font-semibold mb-space-sm flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-primary">chat</span> Chief Complaint
                  </h3>
                  <textarea rows={2} defaultValue="Patient presents with chest tightness and mild dyspnea on exertion for 2 weeks." className="w-full px-space-md py-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                </div>
                {/* Quick Actions */}
                <div>
                  <h3 className="font-headline-sm text-body-sm text-on-surface font-semibold mb-space-sm">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-space-sm">
                    {[{ icon: 'clinical_notes', label: 'Start Consultation', style: 'bg-primary text-white' }, { icon: 'science', label: 'Order Lab Test', style: 'bg-surface-container-low text-on-surface border border-outline-variant' }, { icon: 'medication', label: 'Prescribe Medicine', style: 'bg-surface-container-low text-on-surface border border-outline-variant' }, { icon: 'single_bed', label: 'Admit Patient', style: 'bg-error-container text-on-error-container' }].map(a => (
                      <button key={a.label} className={`flex items-center gap-space-sm px-space-md py-space-md rounded-xl font-headline-sm text-body-sm ${a.style} hover:opacity-90 transition-opacity`}>
                        <span className="material-symbols-outlined text-[18px]">{a.icon}</span>
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-space-lg border-t border-surface-container-high">
                <button className="w-full h-11 bg-secondary text-white rounded-xl font-headline-sm text-body-sm font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-space-sm">
                  <span className="material-symbols-outlined text-[18px]">skip_next</span>
                  Call Next Patient (T-003 · Priya Nair)
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col gap-space-lg text-on-surface-variant">
              <span className="material-symbols-outlined text-[64px] text-surface-container-high">person_search</span>
              <p className="font-headline-md text-headline-sm">No active consultation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
