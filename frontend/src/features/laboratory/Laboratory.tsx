import React, { useState } from 'react';

const mockLabOrders = [
  { id: 1, patient: 'Eleanor Vance', uhid: 'AH-84920', tests: ['CBC', 'Lipid Panel', 'HbA1c'], doctor: 'Dr. Jenkins', priority: 'STAT', status: 'In Progress', time: '09:15 AM' },
  { id: 2, patient: 'Rajesh Sharma', uhid: 'AH-84921', tests: ['LFT', 'KFT'], doctor: 'Dr. Mehta', priority: 'Urgent', status: 'Ordered', time: '09:45 AM' },
  { id: 3, patient: 'Priya Nair', uhid: 'AH-84922', tests: ['Thyroid Panel', 'Vitamin D'], doctor: 'Dr. Rao', priority: 'Routine', status: 'Completed', time: '08:30 AM' },
  { id: 4, patient: 'Mohammed Ali', uhid: 'AH-84923', tests: ['MRI Brain', 'EEG'], doctor: 'Dr. Singh', priority: 'STAT', status: 'Ordered', time: '10:00 AM' },
  { id: 5, patient: 'Sunita Rao', uhid: 'AH-84924', tests: ['Serum Calcium', 'PTH'], doctor: 'Dr. Jenkins', priority: 'Routine', status: 'Sample Collected', time: '10:30 AM' },
  { id: 6, patient: 'Deepak Kumar', uhid: 'AH-84927', tests: ['Tumor Markers', 'PSA'], doctor: 'Dr. Das', priority: 'Urgent', status: 'Completed', time: '07:45 AM' },
];

const priorityStyle: Record<string, string> = { STAT: 'bg-error-container text-on-error-container', Urgent: 'bg-tertiary-container text-on-tertiary', Routine: 'bg-primary/10 text-primary' };
const statusStyle: Record<string, string> = { Ordered: 'bg-surface-container text-on-surface-variant', 'Sample Collected': 'bg-primary/10 text-primary', 'In Progress': 'bg-tertiary/10 text-tertiary', Completed: 'bg-secondary-container text-on-secondary-container', Cancelled: 'bg-error-container text-on-error-container' };

const tabs = ['All Orders', 'Pending', 'In Progress', 'Completed'];


export const NewLabOrderModal = ({ onClose, onSuccess }: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => { setLoading(true); await new Promise(r => setTimeout(r, 800)); setLoading(false); onSuccess(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg p-space-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">New Lab Order</h2>
          <button onClick={onClose} className="material-symbols-outlined p-2 hover:bg-surface-container rounded-lg">close</button>
        </div>
        <input placeholder="Patient Name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <input placeholder="Tests (e.g. CBC, LFT)" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <div className="flex justify-end gap-space-sm mt-space-md">
          <button onClick={onClose} className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-space-md py-space-sm bg-primary text-white rounded-lg">{loading ? 'Saving...' : 'Create Order'}</button>
        </div>
      </div>
    </div>
  );
};

export const Laboratory = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [activeTab, setActiveTab] = useState('All Orders');

  const filtered = mockLabOrders.filter(o => {
    if (activeTab === 'All Orders') return true;
    if (activeTab === 'Pending') return o.status === 'Ordered';
    if (activeTab === 'In Progress') return o.status === 'In Progress' || o.status === 'Sample Collected';
    if (activeTab === 'Completed') return o.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col gap-space-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Laboratory</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Track lab orders, samples, and results</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span> New Lab Order
        </button>
        {showModal && <NewLabOrderModal onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}

      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-space-md">
        {[{ label: 'Orders Today', value: '28', icon: 'science', color: 'text-primary' }, { label: 'Pending', value: '12', icon: 'pending', color: 'text-on-surface-variant' }, { label: 'In Progress', value: '5', icon: 'hourglass_empty', color: 'text-tertiary' }, { label: 'Completed', value: '11', icon: 'check_circle', color: 'text-secondary' }].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-high flex items-center gap-space-md">
            <span className={`material-symbols-outlined text-[28px] ${s.color}`}>{s.icon}</span>
            <div>
              <p className="font-clinical-value-lg text-clinical-value-lg text-on-surface font-bold">{s.value}</p>
              <p className="font-caption text-caption text-on-surface-variant">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-space-sm bg-surface-container-lowest p-1.5 rounded-xl border border-surface-container-high w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-space-lg py-space-sm rounded-lg font-headline-sm text-body-sm transition-colors ${activeTab === t ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}>{t}</button>
        ))}
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-space-md">
        {filtered.map(order => (
          <div key={order.id} className={`bg-surface-container-lowest rounded-xl border ${order.priority === 'STAT' ? 'border-error/40' : 'border-surface-container-high'} p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md shadow-sm`}>
            <div className="flex items-start gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">science</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{order.patient}</span>
                  <span className="font-clinical-code text-clinical-code text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">{order.uhid}</span>
                  <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-bold ${priorityStyle[order.priority]}`}>{order.priority}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {order.tests.map(t => (
                    <span key={t} className="font-caption text-caption bg-primary/5 text-primary px-2 py-0.5 rounded-full border border-primary/20">{t}</span>
                  ))}
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Ordered by {order.doctor} · {order.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className={`font-caption text-caption px-3 py-1.5 rounded-full font-semibold ${statusStyle[order.status]}`}>{order.status}</span>
              {order.status === 'Completed' && (
                <button className="px-space-md py-space-sm bg-secondary-container text-on-secondary-container rounded-lg font-headline-sm text-body-sm hover:opacity-80 transition-opacity">
                  View Report
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
