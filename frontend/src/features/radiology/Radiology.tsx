import React, { useState } from 'react';

const mockOrders = [
  { id: 1, patient: 'Eleanor Vance', uhid: 'AH-84920', modality: 'X-Ray', study: 'Chest PA View', doctor: 'Dr. Jenkins', priority: 'Routine', status: 'Reported' },
  { id: 2, patient: 'Rajesh Sharma', uhid: 'AH-84921', modality: 'MRI', study: 'MRI Brain with Contrast', doctor: 'Dr. Singh', priority: 'STAT', status: 'In Progress' },
  { id: 3, patient: 'Priya Nair', uhid: 'AH-84922', modality: 'Ultrasound', study: 'USG Abdomen & Pelvis', doctor: 'Dr. Rao', priority: 'Routine', status: 'Scheduled' },
  { id: 4, patient: 'Mohammed Ali', uhid: 'AH-84923', modality: 'CT Scan', study: 'HRCT Chest', doctor: 'Dr. Singh', priority: 'Urgent', status: 'In Progress' },
  { id: 5, patient: 'Sunita Rao', uhid: 'AH-84924', modality: 'ECG', study: '12-Lead ECG', doctor: 'Dr. Jenkins', priority: 'STAT', status: 'Reported' },
  { id: 6, patient: 'Arjun Mehta', uhid: 'AH-84925', modality: 'X-Ray', study: 'X-Ray Knee AP/Lateral', doctor: 'Dr. Mehta', priority: 'Routine', status: 'Ordered' },
  { id: 7, patient: 'Kavitha Iyer', uhid: 'AH-84926', modality: 'CT Scan', study: 'CT Abdomen Plain', doctor: 'Dr. Das', priority: 'Urgent', status: 'Scheduled' },
];

const modalityStyle: Record<string, string> = { 'X-Ray': 'bg-primary/10 text-primary', 'CT Scan': 'bg-error/10 text-error', MRI: 'bg-tertiary/10 text-tertiary', Ultrasound: 'bg-secondary/10 text-secondary', ECG: 'bg-secondary-container text-on-secondary-container' };
const priorityStyle: Record<string, string> = { STAT: 'bg-error-container text-on-error-container', Urgent: 'bg-tertiary-container text-on-tertiary', Routine: 'bg-primary/10 text-primary' };
const statusStyle: Record<string, string> = { Ordered: 'bg-surface-container text-on-surface-variant', Scheduled: 'bg-primary/10 text-primary', 'In Progress': 'bg-tertiary/10 text-tertiary', Reported: 'bg-secondary-container text-on-secondary-container', Delivered: 'bg-secondary/10 text-secondary' };

const modalities = ['All', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound', 'ECG'];


export const NewRadiologyOrderModal = ({ onClose, onSuccess }: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => { setLoading(true); await new Promise(r => setTimeout(r, 800)); setLoading(false); onSuccess(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg p-space-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">New Radiology Order</h2>
          <button onClick={onClose} className="material-symbols-outlined p-2 hover:bg-surface-container rounded-lg">close</button>
        </div>
        <input placeholder="Patient Name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <input placeholder="Study Requested (e.g. Chest X-Ray)" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <div className="flex justify-end gap-space-sm mt-space-md">
          <button onClick={onClose} className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-space-md py-space-sm bg-primary text-white rounded-lg">{loading ? 'Saving...' : 'Create Order'}</button>
        </div>
      </div>
    </div>
  );
};

export const Radiology = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [activeModality, setActiveModality] = useState('All');
  const filtered = mockOrders.filter(o => activeModality === 'All' || o.modality === activeModality);

  return (
    <div className="flex flex-col gap-space-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Radiology</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Imaging orders, scheduling and reports</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span> New Order
        </button>
        {showModal && <NewRadiologyOrderModal onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}

      </div>

      <div className="grid grid-cols-4 gap-space-md">
        {[{ l: 'Orders Today', v: 28, c: 'text-primary', i: 'radiology' }, { l: 'Pending', v: 12, c: 'text-on-surface-variant', i: 'pending' }, { l: 'In Progress', v: 5, c: 'text-tertiary', i: 'hourglass_empty' }, { l: 'Reported', v: 11, c: 'text-secondary', i: 'check_circle' }].map(s => (
          <div key={s.l} className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-high flex items-center gap-space-md">
            <span className={`material-symbols-outlined text-[28px] ${s.c}`}>{s.i}</span>
            <div>
              <p className={`font-clinical-value-lg text-clinical-value-lg font-bold ${s.c}`}>{s.v}</p>
              <p className="font-caption text-caption text-on-surface-variant">{s.l}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modality Tabs */}
      <div className="flex gap-space-sm bg-surface-container-lowest p-1.5 rounded-xl border border-surface-container-high w-fit flex-wrap">
        {modalities.map(m => (
          <button key={m} onClick={() => setActiveModality(m)} className={`px-space-lg py-space-sm rounded-lg font-headline-sm text-body-sm transition-colors ${activeModality === m ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}>{m}</button>
        ))}
      </div>

      <div className="flex flex-col gap-space-md">
        {filtered.map(order => (
          <div key={order.id} className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-space-md">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${modalityStyle[order.modality]}`}>
                <span className="material-symbols-outlined text-[20px]">radiology</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{order.patient}</span>
                  <span className="font-clinical-code text-clinical-code text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{order.uhid}</span>
                  <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${modalityStyle[order.modality]}`}>{order.modality}</span>
                  <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-bold ${priorityStyle[order.priority]}`}>{order.priority}</span>
                </div>
                <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{order.study}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Ordered by {order.doctor}</p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className={`font-caption text-caption px-3 py-1.5 rounded-full font-semibold ${statusStyle[order.status]}`}>{order.status}</span>
              {order.status === 'Reported' && <button className="px-space-md py-space-sm bg-secondary-container text-on-secondary-container rounded-lg font-headline-sm text-body-sm hover:opacity-80 transition-opacity">View Report</button>}
              <button className="px-space-md py-space-sm border border-outline-variant rounded-lg font-headline-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors">Upload</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
