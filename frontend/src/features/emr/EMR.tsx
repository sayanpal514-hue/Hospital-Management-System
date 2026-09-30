import React, { useState } from 'react';

type RxRow = { medicine: string; dose: string; freq: string; duration: string; instructions: string };

export const EMR = () => {
  const [soap, setSoap] = useState({ S: '', O: '', A: '', P: '' });
  const [rx, setRx] = useState<RxRow[]>([{ medicine: 'Metoprolol 25mg', dose: '1 tab', freq: 'Twice daily', duration: '30 days', instructions: 'After meals' }]);
  const [icd, setIcd] = useState('I25 - Chronic ischaemic heart disease');

  const addRx = () => setRx(prev => [...prev, { medicine: '', dose: '', freq: '', duration: '', instructions: '' }]);
  const removeRx = (i: number) => setRx(prev => prev.filter((_, idx) => idx !== i));

  const pastConsults = [
    { date: '15 Sep 2026', doctor: 'Dr. Jenkins', diagnosis: 'Hypertension Stage 1', rx: 3 },
    { date: '20 Aug 2026', doctor: 'Dr. Jenkins', diagnosis: 'Stable Angina', rx: 2 },
    { date: '10 Jul 2026', doctor: 'Dr. Mehta', diagnosis: 'Annual Checkup', rx: 1 },
  ];

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">EMR Console</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Electronic Medical Records & SOAP Consultation</p>
        </div>
        <div className="flex gap-space-sm">
          <button className="px-space-lg py-space-md border border-outline-variant rounded-lg font-headline-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors">Save Draft</button>
          <button className="px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px]">verified</span> Sign & Finalize
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-space-lg">
        {/* Left: Patient + History */}
        <div className="col-span-1 flex flex-col gap-space-md">
          {/* Patient Card */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-space-lg flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold">EV</div>
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface font-bold">Eleanor Vance</p>
                <p className="font-caption text-caption text-on-surface-variant">AH-84920 · 42y Female · O+</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="font-caption text-caption bg-error-container text-on-error-container px-2 py-0.5 rounded-full">⚠ Penicillin Allergy</span>
              <span className="font-caption text-caption bg-primary/10 text-primary px-2 py-0.5 rounded-full">Hypertension</span>
            </div>
          </div>
          {/* Past Consultations */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high overflow-hidden flex flex-col">
            <div className="p-space-md border-b border-surface-container-high">
              <h3 className="font-headline-sm text-body-sm text-on-surface font-semibold">Past Consultations</h3>
            </div>
            <div className="divide-y divide-surface-container-low">
              {pastConsults.map((c, i) => (
                <div key={i} className="p-space-md hover:bg-surface-container-low/50 cursor-pointer transition-colors">
                  <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{c.diagnosis}</p>
                  <p className="font-caption text-caption text-on-surface-variant">{c.date} · {c.doctor}</p>
                  <p className="font-caption text-caption text-primary mt-0.5">{c.rx} prescriptions</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: SOAP + Rx */}
        <div className="col-span-3 flex flex-col gap-space-md">
          {/* SOAP Editor */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg">
            <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold mb-space-lg flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">clinical_notes</span> SOAP Note
            </h2>
            <div className="grid grid-cols-2 gap-space-md">
              {([['S', 'Subjective', 'Patient\'s chief complaint and history...'], ['O', 'Objective', 'Vitals, examination findings...'], ['A', 'Assessment', 'Diagnosis and clinical impression...'], ['P', 'Plan', 'Treatment plan, medications, follow-up...']] as [keyof typeof soap, string, string][]).map(([key, label, ph]) => (
                <div key={key} className="flex flex-col gap-space-xs">
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold flex items-center gap-space-xs">
                    <span className="w-6 h-6 rounded bg-primary text-white text-xs flex items-center justify-center font-bold">{key}</span>
                    {label}
                  </label>
                  <textarea
                    rows={4}
                    value={soap[key]}
                    onChange={e => setSoap(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={ph}
                    className="w-full px-space-md py-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-outline"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ICD-10 Diagnosis */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg">
            <h2 className="font-headline-sm text-body-sm text-on-surface font-semibold mb-space-md flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">diagnosis</span> ICD-10 Diagnosis
            </h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input value={icd} onChange={e => setIcd(e.target.value)} placeholder="Search ICD-10 codes..." className="w-full h-10 pl-10 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          {/* Prescription Builder */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg">
            <div className="flex items-center justify-between mb-space-md">
              <h2 className="font-headline-sm text-body-sm text-on-surface font-semibold flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">medication</span> Prescriptions
              </h2>
              <button onClick={addRx} className="flex items-center gap-space-xs px-space-md py-space-sm bg-primary/10 text-primary rounded-lg font-headline-sm text-body-sm hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-[16px]">add</span> Add Medicine
              </button>
            </div>
            <div className="flex flex-col gap-space-sm">
              {rx.map((row, i) => (
                <div key={i} className="grid grid-cols-5 gap-space-sm items-center bg-surface-container-low rounded-lg p-space-sm">
                  <input value={row.medicine} onChange={e => setRx(prev => prev.map((r, idx) => idx === i ? { ...r, medicine: e.target.value } : r))} placeholder="Medicine name" className="col-span-2 h-8 px-space-sm bg-surface-container-lowest rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input value={row.dose} onChange={e => setRx(prev => prev.map((r, idx) => idx === i ? { ...r, dose: e.target.value } : r))} placeholder="Dose" className="h-8 px-space-sm bg-surface-container-lowest rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input value={row.freq} onChange={e => setRx(prev => prev.map((r, idx) => idx === i ? { ...r, freq: e.target.value } : r))} placeholder="Frequency" className="h-8 px-space-sm bg-surface-container-lowest rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                  <div className="flex gap-1">
                    <input value={row.duration} onChange={e => setRx(prev => prev.map((r, idx) => idx === i ? { ...r, duration: e.target.value } : r))} placeholder="Duration" className="flex-1 h-8 px-space-sm bg-surface-container-lowest rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                    <button onClick={() => removeRx(i)} className="w-8 h-8 rounded text-error hover:bg-error-container transition-colors flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
