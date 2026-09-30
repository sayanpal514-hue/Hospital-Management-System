import React, { useState } from 'react';
import { BookAppointmentModal, SuccessToast } from '../../components/Modals';

const mockAppts = [
  { id: 1, patient: 'Eleanor Vance', uhid: 'AH-84920', doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', time: '09:00 AM', type: 'OPD', status: 'Confirmed' },
  { id: 2, patient: 'Rajesh Sharma', uhid: 'AH-84921', doctor: 'Dr. Arjun Mehta', dept: 'Orthopedics', time: '09:30 AM', type: 'Follow-up', status: 'Scheduled' },
  { id: 3, patient: 'Priya Nair', uhid: 'AH-84922', doctor: 'Dr. Kavita Rao', dept: 'Gynecology', time: '10:00 AM', type: 'OPD', status: 'Confirmed' },
  { id: 4, patient: 'Mohammed Ali', uhid: 'AH-84923', doctor: 'Dr. Suresh Singh', dept: 'Neurology', time: '10:30 AM', type: 'IPD', status: 'Scheduled' },
  { id: 5, patient: 'Sunita Rao', uhid: 'AH-84924', doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', time: '11:00 AM', type: 'OPD', status: 'Cancelled' },
  { id: 6, patient: 'Deepak Kumar', uhid: 'AH-84927', doctor: 'Dr. Priya Das', dept: 'Oncology', time: '11:30 AM', type: 'Emergency', status: 'No-Show' },
];

const statusStyle: Record<string, string> = { Confirmed: 'bg-secondary-container text-on-secondary-container', Scheduled: 'bg-primary/10 text-primary', Cancelled: 'bg-error-container text-on-error-container', 'No-Show': 'bg-surface-container text-on-surface-variant' };
const typeStyle: Record<string, string> = { OPD: 'bg-primary/10 text-primary', IPD: 'bg-tertiary/10 text-tertiary', 'Follow-up': 'bg-secondary/10 text-secondary', Emergency: 'bg-error/10 text-error' };
const days = ['Today', 'Tomorrow', '+2 Days', '+3 Days', '+4 Days'];

export const Appointments = () => {
  const [showBook, setShowBook] = useState(false);
  const [toast, setToast] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');
  const [appts, setAppts] = useState(mockAppts);

  const filtered = appts.filter(a => statusFilter === 'All' || a.status === statusFilter);

  const handleBooked = () => {
    setShowBook(false);
    setToast('✅ Appointment booked successfully!');
  };

  const handleConfirm = (id: number) => {
    setAppts(prev => prev.map(a => a.id === id ? { ...a, status: 'Confirmed' } : a));
    setToast('✅ Appointment confirmed!');
  };

  const handleCancel = (id: number) => {
    setAppts(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
    setToast('❌ Appointment cancelled.');
  };

  return (
    <div className="flex flex-col gap-space-xl">
      {showBook && <BookAppointmentModal onClose={() => setShowBook(false)} onSuccess={handleBooked} />}
      {toast && <SuccessToast message={toast} onClose={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Appointments</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage and track all patient appointments</p>
        </div>
        <button onClick={() => setShowBook(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span> Book Appointment
        </button>
      </div>

      <div className="flex items-center gap-space-sm bg-surface-container-lowest p-1.5 rounded-xl border border-surface-container-high w-fit">
        {days.map((d, i) => (
          <button key={d} onClick={() => setActiveDay(i)} className={`px-space-lg py-space-sm rounded-lg font-headline-sm text-body-sm transition-colors ${activeDay === i ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}>{d}</button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-space-md">
        <div className="flex gap-space-sm flex-wrap">
          {['All', 'Confirmed', 'Scheduled', 'Cancelled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-space-md py-1.5 rounded-full font-headline-sm text-body-sm transition-colors ${statusFilter === s ? 'bg-primary text-white' : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container'}`}>{s}</button>
          ))}
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">{filtered.length} appointments</span>
      </div>

      <div className="flex flex-col gap-space-md">
        {filtered.length === 0 && (
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-xl flex flex-col items-center gap-space-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] text-surface-container-high">event_busy</span>
            <p className="font-headline-md text-headline-sm">No appointments found</p>
            <button onClick={() => setShowBook(true)} className="px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm">Book One Now</button>
          </div>
        )}
        {filtered.map(appt => (
          <div key={appt.id} className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-space-md">
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-xl text-primary">
                <span className="font-clinical-value-md text-clinical-value-md font-bold">{appt.time.split(' ')[0]}</span>
                <span className="font-caption text-caption">{appt.time.split(' ')[1]}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{appt.patient}</span>
                  <span className="font-clinical-code text-clinical-code text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{appt.uhid}</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{appt.doctor} · {appt.dept}</span>
                <div className="flex items-center gap-space-xs mt-0.5">
                  <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${typeStyle[appt.type] ?? ''}`}>{appt.type}</span>
                  <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${statusStyle[appt.status] ?? ''}`}>{appt.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              {appt.status === 'Scheduled' && (
                <button onClick={() => handleConfirm(appt.id)} className="px-space-md py-space-sm bg-secondary-container text-on-secondary-container rounded-lg font-headline-sm text-body-sm hover:opacity-80 transition-opacity">Confirm</button>
              )}
              {appt.status !== 'Cancelled' && appt.status !== 'No-Show' && appt.status !== 'Completed' && (
                <button onClick={() => handleCancel(appt.id)} className="px-space-md py-space-sm bg-error-container text-on-error-container rounded-lg font-headline-sm text-body-sm hover:opacity-80 transition-opacity">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
