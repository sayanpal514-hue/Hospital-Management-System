import React, { useState } from 'react';
import { RegisterPatientModal, SuccessToast } from '../../components/Modals';

const mockPatients = [
  { id: 1, name: 'Eleanor Vance', uhid: 'AH-84920', age: 42, gender: 'Female', blood: 'O+', mobile: '98765-43210', lastVisit: '28 Sep 2026', status: 'Active' },
  { id: 2, name: 'Rajesh Sharma', uhid: 'AH-84921', age: 51, gender: 'Male', blood: 'B+', mobile: '98765-43211', lastVisit: '27 Sep 2026', status: 'Active' },
  { id: 3, name: 'Priya Nair', uhid: 'AH-84922', age: 36, gender: 'Female', blood: 'A+', mobile: '98765-43212', lastVisit: '25 Sep 2026', status: 'Active' },
  { id: 4, name: 'Mohammed Ali', uhid: 'AH-84923', age: 58, gender: 'Male', blood: 'AB+', mobile: '98765-43213', lastVisit: '20 Sep 2026', status: 'Inactive' },
  { id: 5, name: 'Sunita Rao', uhid: 'AH-84924', age: 31, gender: 'Female', blood: 'O-', mobile: '98765-43214', lastVisit: '18 Sep 2026', status: 'Active' },
  { id: 6, name: 'Arjun Mehta', uhid: 'AH-84925', age: 45, gender: 'Male', blood: 'A-', mobile: '98765-43215', lastVisit: '15 Sep 2026', status: 'Active' },
  { id: 7, name: 'Kavitha Iyer', uhid: 'AH-84926', age: 29, gender: 'Female', blood: 'B-', mobile: '98765-43216', lastVisit: '12 Sep 2026', status: 'Active' },
  { id: 8, name: 'Deepak Kumar', uhid: 'AH-84927', age: 63, gender: 'Male', blood: 'O+', mobile: '98765-43217', lastVisit: '10 Sep 2026', status: 'Critical' },
];

const bloodColors: Record<string, string> = { 'O+': 'bg-error/10 text-error', 'O-': 'bg-error/20 text-error', 'A+': 'bg-primary/10 text-primary', 'A-': 'bg-primary/20 text-primary', 'B+': 'bg-secondary/10 text-secondary', 'B-': 'bg-secondary/20 text-secondary', 'AB+': 'bg-tertiary/10 text-tertiary', 'AB-': 'bg-tertiary/20 text-tertiary' };
const statusColors: Record<string, string> = { Active: 'bg-secondary-container text-on-secondary-container', Inactive: 'bg-surface-container text-on-surface-variant', Critical: 'bg-error-container text-on-error-container' };

export const Patients = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [patients, setPatients] = useState(mockPatients);

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.uhid.toLowerCase().includes(search.toLowerCase());
    const matchGender = genderFilter === 'All' || p.gender === genderFilter;
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchGender && matchStatus;
  });

  const handleRegistered = (name: string) => {
    const newPatient = { id: patients.length + 1, name, uhid: `AH-${85000 + patients.length}`, age: 30, gender: 'Unknown', blood: 'N/A', mobile: 'N/A', lastVisit: 'Today', status: 'Active' };
    setPatients(p => [newPatient, ...p]);
    setShowRegister(false);
    setToast(`✅ Patient "${name}" registered successfully!`);
  };

  return (
    <div className="flex flex-col gap-space-xl">
      {showRegister && <RegisterPatientModal onClose={() => setShowRegister(false)} onSuccess={handleRegistered} />}
      {toast && <SuccessToast message={toast} onClose={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Patients</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage patient records and registrations</p>
        </div>
        <button onClick={() => setShowRegister(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">person_add</span> Register New Patient
        </button>
      </div>

      <div className="grid grid-cols-4 gap-space-md">
        {[{ label: 'Total Patients', value: patients.length.toLocaleString(), icon: 'people', color: 'text-primary' }, { label: 'New This Month', value: '47', icon: 'person_add', color: 'text-secondary' }, { label: 'Active', value: patients.filter(p => p.status === 'Active').length.toString(), icon: 'check_circle', color: 'text-secondary' }, { label: 'Critical', value: patients.filter(p => p.status === 'Critical').length.toString(), icon: 'emergency', color: 'text-error' }].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-space-lg flex items-center gap-space-md border border-surface-container-high">
            <span className={`material-symbols-outlined text-[28px] ${s.color}`}>{s.icon}</span>
            <div>
              <p className="font-clinical-value-md text-clinical-value-md text-on-surface font-bold">{s.value}</p>
              <p className="font-caption text-caption text-on-surface-variant">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-high flex flex-col sm:flex-row gap-space-md">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, UHID, or mobile..." className="w-full h-10 pl-10 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)} className="h-10 px-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface border-0 focus:ring-1 focus:ring-primary">
          <option value="All">All Genders</option><option value="Male">Male</option><option value="Female">Female</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface border-0 focus:ring-1 focus:ring-primary">
          <option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Critical">Critical</option>
        </select>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-surface-container-high">
            <tr className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
              <th className="px-space-lg py-space-md">Patient</th><th className="px-space-lg py-space-md">Age / Gender</th><th className="px-space-lg py-space-md">Blood Group</th><th className="px-space-lg py-space-md">Mobile</th><th className="px-space-lg py-space-md">Last Visit</th><th className="px-space-lg py-space-md">Status</th><th className="px-space-lg py-space-md text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-space-lg py-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{p.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{p.name}</p>
                      <p className="font-clinical-code text-clinical-code text-on-surface-variant">{p.uhid}</p>
                    </div>
                  </div>
                </td>
                <td className="px-space-lg py-space-md font-body-sm text-body-sm text-on-surface">{p.age}y / {p.gender}</td>
                <td className="px-space-lg py-space-md"><span className={`font-caption text-caption px-2 py-0.5 rounded-full font-bold ${bloodColors[p.blood] ?? 'bg-surface-container text-on-surface-variant'}`}>{p.blood}</span></td>
                <td className="px-space-lg py-space-md font-clinical-code text-clinical-code text-on-surface-variant">{p.mobile}</td>
                <td className="px-space-lg py-space-md font-body-sm text-body-sm text-on-surface-variant">{p.lastVisit}</td>
                <td className="px-space-lg py-space-md"><span className={`font-caption text-caption px-2 py-1 rounded-full font-semibold ${statusColors[p.status] ?? ''}`}>{p.status}</span></td>
                <td className="px-space-lg py-space-md text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors" title="View"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                    <button className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-secondary transition-colors" title="Edit"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => { setToast(`📋 Booking appointment for ${p.name}`); }} className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-tertiary transition-colors" title="Book Appointment"><span className="material-symbols-outlined text-[18px]">event_available</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-space-lg py-space-md border-t border-surface-container-high flex items-center justify-between">
          <p className="font-body-sm text-body-sm text-on-surface-variant">Showing 1–{filtered.length} of {patients.length} patients</p>
        </div>
      </div>
    </div>
  );
};
