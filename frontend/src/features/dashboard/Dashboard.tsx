import React, { useState, useEffect } from 'react';
import { RegisterPatientModal, BookAppointmentModal, AdmitPatientModal, SuccessToast } from '../../components/Modals';

const kpiData = [
  { icon: 'event_available', label: "Today's Appointments", value: '42', trend: '+8%', trendUp: true },
  { icon: 'people', label: 'Active Patients', value: '1,284', trend: '+3%', trendUp: true },
  { icon: 'bed', label: 'Available Beds', value: '23/120', trend: '19%', trendUp: false },
  { icon: 'payments', label: 'Revenue Today', value: '₹84,200', trend: '+12%', trendUp: true },
];

const recentAppointments = [
  { patient: 'Eleanor Vance', uhid: 'AH-84920', doctor: 'Dr. Jenkins', time: '09:00 AM', status: 'Completed' },
  { patient: 'Rajesh Sharma', uhid: 'AH-84921', doctor: 'Dr. Mehta', time: '09:30 AM', status: 'Confirmed' },
  { patient: 'Priya Nair', uhid: 'AH-84922', doctor: 'Dr. Rao', time: '10:00 AM', status: 'In Queue' },
  { patient: 'Mohammed Ali', uhid: 'AH-84923', doctor: 'Dr. Singh', time: '10:30 AM', status: 'Scheduled' },
  { patient: 'Sunita Rao', uhid: 'AH-84924', doctor: 'Dr. Jenkins', time: '11:00 AM', status: 'Scheduled' },
];

const departments = [
  { name: 'Cardiology', patients: 87, max: 120 }, { name: 'Orthopedics', patients: 65, max: 100 },
  { name: 'Pediatrics', patients: 54, max: 80 }, { name: 'Neurology', patients: 43, max: 70 },
  { name: 'Oncology', patients: 38, max: 60 }, { name: 'General Medicine', patients: 92, max: 120 },
];

const statusColors: Record<string, string> = { Completed: 'bg-secondary-container text-on-secondary-container', Confirmed: 'bg-primary/10 text-primary', 'In Queue': 'bg-tertiary/10 text-tertiary', Scheduled: 'bg-surface-container text-on-surface-variant' };

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [showAdmit, setShowAdmit] = useState(false);
  const [toast, setToast] = useState('');
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-space-lg animate-pulse">
        <div className="h-8 w-64 bg-surface-container rounded-lg" />
        <div className="grid grid-cols-4 gap-space-lg">{[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-surface-container-lowest rounded-xl" />)}</div>
        <div className="grid grid-cols-2 gap-space-lg"><div className="h-64 bg-surface-container-lowest rounded-xl" /><div className="h-64 bg-surface-container-lowest rounded-xl" /></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-space-xl">
      {showRegister && <RegisterPatientModal onClose={() => setShowRegister(false)} onSuccess={(name) => { setShowRegister(false); setToast(`✅ Patient "${name}" registered successfully!`); }} />}
      {showBook && <BookAppointmentModal onClose={() => setShowBook(false)} onSuccess={() => { setShowBook(false); setToast('✅ Appointment booked successfully!'); }} />}
      {showAdmit && <AdmitPatientModal onClose={() => setShowAdmit(false)} onSuccess={() => { setShowAdmit(false); setToast('✅ Patient admitted successfully!'); }} />}
      {toast && <SuccessToast message={toast} onClose={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Dashboard</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{today}</p>
        </div>
        <div className="flex gap-space-sm">
          <button className="flex items-center gap-space-xs px-space-lg py-space-md bg-surface-container-lowest border border-outline-variant rounded-lg font-headline-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {kpiData.map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-high flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">{kpi.icon}</span>
              </div>
              <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${kpi.trendUp ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`}>{kpi.trendUp ? '↑' : '↓'} {kpi.trend}</span>
            </div>
            <div>
              <p className="font-clinical-value-lg text-clinical-value-lg text-on-surface font-bold">{kpi.value}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions — ALL WORKING */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
        {[
          { icon: 'person_add', label: 'New Patient', color: 'text-primary bg-primary/10', action: () => setShowRegister(true) },
          { icon: 'event_available', label: 'Book Appointment', color: 'text-secondary bg-secondary/10', action: () => setShowBook(true) },
          { icon: 'single_bed', label: 'Admit Patient', color: 'text-error bg-error/10', action: () => setShowAdmit(true) },
          { icon: 'clinical_notes', label: 'New Consultation', color: 'text-tertiary bg-tertiary/10', action: () => { window.location.href = '/emr'; } },
        ].map(a => (
          <button key={a.label} onClick={a.action} className="flex items-center gap-space-md px-space-lg py-space-md bg-surface-container-lowest rounded-xl border border-surface-container-high hover:bg-surface-container shadow-sm transition-all hover:shadow-md text-left cursor-pointer">
            <span className={`material-symbols-outlined text-[24px] ${a.color} p-2 rounded-lg`}>{a.icon}</span>
            <span className="font-headline-sm text-body-sm text-on-surface">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-space-lg">
        <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high overflow-hidden">
          <div className="p-space-lg border-b border-surface-container-high flex items-center justify-between">
            <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold">Today's Appointments</h2>
            <a href="/appointments" className="font-body-sm text-body-sm text-primary hover:underline">View all</a>
          </div>
          <table className="w-full text-left">
            <thead className="bg-surface-container-low">
              <tr className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                <th className="px-space-lg py-space-md">Patient</th><th className="px-space-lg py-space-md">Doctor</th><th className="px-space-lg py-space-md">Time</th><th className="px-space-lg py-space-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {recentAppointments.map((appt, i) => (
                <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-space-lg py-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{appt.patient[0]}</div>
                      <div><p className="font-headline-sm text-body-sm text-on-surface font-semibold">{appt.patient}</p><p className="font-caption text-caption text-on-surface-variant">{appt.uhid}</p></div>
                    </div>
                  </td>
                  <td className="px-space-lg py-space-md font-body-sm text-body-sm text-on-surface-variant">{appt.doctor}</td>
                  <td className="px-space-lg py-space-md font-clinical-code text-clinical-code text-on-surface">{appt.time}</td>
                  <td className="px-space-lg py-space-md"><span className={`font-caption text-caption px-2 py-1 rounded-full font-semibold ${statusColors[appt.status] ?? ''}`}>{appt.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high p-space-lg flex flex-col gap-space-md">
          <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold">Department Load</h2>
          {departments.map(dept => {
            const pct = Math.round((dept.patients / dept.max) * 100);
            return (
              <div key={dept.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface">{dept.name}</span>
                  <span className="font-clinical-code text-clinical-code text-on-surface-variant">{dept.patients}/{dept.max}</span>
                </div>
                <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${pct > 80 ? 'bg-error' : pct > 60 ? 'bg-tertiary' : 'bg-secondary'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
