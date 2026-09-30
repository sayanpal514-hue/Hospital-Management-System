import React, { useState } from 'react';

const mockStaff = [
  {
    id: 1, name: 'Dr. Sarah Jenkins', role: 'Doctor', designation: 'Chief Medical Officer', dept: 'Cardiology',
    email: 'sarah.jenkins@SayanHealth.com', mobile: '+91 98765-00001', status: 'Active',
    schedule: 'Mon–Fri · 9:00 AM – 5:00 PM', patients: 284, experience: '18 yrs', initials: 'SJ',
    specialization: 'Interventional Cardiology', regNo: 'MH-DOC-2006-4821',
  },
  {
    id: 2, name: 'Dr. Arjun Mehta', role: 'Doctor', designation: 'Senior Consultant', dept: 'Orthopedics',
    email: 'arjun.mehta@SayanHealth.com', mobile: '+91 98765-00002', status: 'Active',
    schedule: 'Mon–Sat · 10:00 AM – 6:00 PM', patients: 192, experience: '14 yrs', initials: 'AM',
    specialization: 'Joint Replacement & Sports Medicine', regNo: 'MH-DOC-2010-3294',
  },
  {
    id: 3, name: 'Nurse Priya Das', role: 'Nurse', designation: 'Head Nurse — ICU', dept: 'ICU',
    email: 'priya.das@SayanHealth.com', mobile: '+91 98765-00003', status: 'On Leave',
    schedule: 'Night Shift · 8:00 PM – 8:00 AM', patients: 0, experience: '9 yrs', initials: 'PD',
    specialization: 'Critical Care Nursing', regNo: 'MH-NRS-2015-1102',
  },
  {
    id: 4, name: 'Ravi Krishnan', role: 'Pharmacist', designation: 'Lead Pharmacist', dept: 'Pharmacy',
    email: 'ravi.k@SayanHealth.com', mobile: '+91 98765-00004', status: 'Active',
    schedule: 'Mon–Sat · 8:00 AM – 8:00 PM', patients: 0, experience: '11 yrs', initials: 'RK',
    specialization: 'Clinical Pharmacy & Dispensing', regNo: 'MH-PHARM-2013-0847',
  },
  {
    id: 5, name: 'Anjali Reddy', role: 'Receptionist', designation: 'Senior Receptionist', dept: 'OPD Front Desk',
    email: 'anjali.r@SayanHealth.com', mobile: '+91 98765-00005', status: 'Active',
    schedule: 'Mon–Fri · 8:00 AM – 4:00 PM', patients: 0, experience: '5 yrs', initials: 'AR',
    specialization: 'Patient Registration & Scheduling', regNo: 'N/A',
  },
  {
    id: 6, name: 'Karan Malhotra', role: 'LabTech', designation: 'Senior Lab Technician', dept: 'Laboratory',
    email: 'karan.m@SayanHealth.com', mobile: '+91 98765-00006', status: 'Off Duty',
    schedule: 'Evening Shift · 2:00 PM – 10:00 PM', patients: 0, experience: '7 yrs', initials: 'KM',
    specialization: 'Hematology & Biochemistry', regNo: 'MH-LAB-2017-2210',
  },
  {
    id: 7, name: 'Dr. Sunita Rao', role: 'Doctor', designation: 'Consultant Neurologist', dept: 'Neurology',
    email: 'sunita.rao@SayanHealth.com', mobile: '+91 98765-00007', status: 'Active',
    schedule: 'Tue–Sat · 9:00 AM – 3:00 PM', patients: 156, experience: '12 yrs', initials: 'SR',
    specialization: 'Epilepsy & Movement Disorders', regNo: 'MH-DOC-2012-5671',
  },
  {
    id: 8, name: 'Meera Patel', role: 'Accountant', designation: 'Finance Manager', dept: 'Finance & Billing',
    email: 'meera.p@SayanHealth.com', mobile: '+91 98765-00008', status: 'Active',
    schedule: 'Mon–Fri · 9:00 AM – 5:00 PM', patients: 0, experience: '8 yrs', initials: 'MP',
    specialization: 'Hospital Finance & Billing', regNo: 'N/A',
  },
  {
    id: 9, name: 'Nurse Pooja Kumar', role: 'Nurse', designation: 'Staff Nurse — General Ward', dept: 'General Ward',
    email: 'pooja.k@SayanHealth.com', mobile: '+91 98765-00009', status: 'Active',
    schedule: 'Day Shift · 8:00 AM – 8:00 PM', patients: 0, experience: '4 yrs', initials: 'PK',
    specialization: 'General & Post-Operative Care', regNo: 'MH-NRS-2020-3341',
  },
];

const roleColors: Record<string, string> = { Doctor: 'bg-primary/10 text-primary', Nurse: 'bg-secondary/10 text-secondary', Pharmacist: 'bg-tertiary/10 text-tertiary', Receptionist: 'bg-surface-container-high text-on-surface-variant border border-outline-variant', LabTech: 'bg-error/10 text-error', Accountant: 'bg-surface-container text-on-surface-variant' };
const statusColors: Record<string, string> = { Active: 'bg-secondary-container text-on-secondary-container', 'On Leave': 'bg-surface-container border border-outline-variant text-on-surface-variant', 'Off Duty': 'bg-error-container text-on-error-container' };
const avatarBg = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-error', 'bg-primary/80', 'bg-secondary/80', 'bg-tertiary/80', 'bg-error/80', 'bg-primary/60'];


export const AddStaffModal = ({ onClose, onSuccess }: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => { setLoading(true); await new Promise(r => setTimeout(r, 800)); setLoading(false); onSuccess(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg p-space-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Add Staff Member</h2>
          <button onClick={onClose} className="material-symbols-outlined p-2 hover:bg-surface-container rounded-lg">close</button>
        </div>
        <input placeholder="Staff Name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <input placeholder="Role (e.g. Doctor, Nurse)" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <div className="flex justify-end gap-space-sm mt-space-md">
          <button onClick={onClose} className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-space-md py-space-sm bg-primary text-white rounded-lg">{loading ? 'Saving...' : 'Add Staff'}</button>
        </div>
      </div>
    </div>
  );
};

export const Staff = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [roleFilter, setRoleFilter] = useState('All');
  const [selected, setSelected] = useState<typeof mockStaff[0] | null>(null);

  const filtered = mockStaff.filter(s => roleFilter === 'All' || s.role === roleFilter);

  return (
    <div className="flex flex-col gap-space-xl">
      {/* Staff Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-surface-container-lowest h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="p-space-xl border-b border-surface-container-high flex items-center justify-between sticky top-0 bg-surface-container-lowest z-10">
              <h2 className="font-headline-md text-headline-sm text-on-surface font-bold">Staff Profile</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-space-xl flex flex-col gap-space-lg">
              <div className="flex items-center gap-space-lg">
                <div className={`w-20 h-20 rounded-2xl ${avatarBg[selected.id - 1] ?? 'bg-primary'} flex items-center justify-center text-white text-2xl font-bold`}>{selected.initials}</div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-lg text-headline-sm text-on-surface font-bold">{selected.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{selected.designation}</p>
                  <div className="flex gap-space-xs">
                    <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${roleColors[selected.role]}`}>{selected.role}</span>
                    <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${statusColors[selected.status]}`}>{selected.status}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-space-sm">
                {[['Department', selected.dept, 'business'], ['Specialization', selected.specialization, 'star'], ['Experience', selected.experience, 'schedule'], ['Registration No', selected.regNo, 'badge'], ['Email', selected.email, 'mail'], ['Mobile', selected.mobile, 'call'], ['Schedule', selected.schedule, 'calendar_today']].map(([label, value, icon]) => (
                  <div key={label} className="bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">{icon}</span>
                    <div>
                      <p className="font-caption text-caption text-on-surface-variant">{label}</p>
                      <p className="font-body-sm text-body-sm text-on-surface font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
                {selected.patients > 0 && (
                  <div className="bg-primary/5 rounded-xl p-space-md flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">people</span>
                    <div>
                      <p className="font-caption text-caption text-on-surface-variant">Total Patients Seen</p>
                      <p className="font-clinical-value-md text-clinical-value-md text-primary font-bold">{selected.patients}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-space-sm">
                <button className="flex-1 py-space-md bg-primary text-white rounded-xl font-headline-sm text-body-sm hover:bg-primary-container transition-colors">Edit Profile</button>
                <button className="flex-1 py-space-md bg-error-container text-on-error-container rounded-xl font-headline-sm text-body-sm hover:opacity-80 transition-opacity">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Doctors & Staff</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{mockStaff.length} staff members · {mockStaff.filter(s => s.status === 'Active').length} active today</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">person_add</span> Add Staff Member
        </button>
        {showModal && <AddStaffModal onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}

      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-space-md">
        {[{ label: 'Total Staff', value: mockStaff.length, icon: 'badge', color: 'text-primary' }, { label: 'Doctors', value: mockStaff.filter(s => s.role === 'Doctor').length, icon: 'stethoscope', color: 'text-secondary' }, { label: 'Nursing Staff', value: mockStaff.filter(s => s.role === 'Nurse').length, icon: 'medical_services', color: 'text-tertiary' }, { label: 'On Leave', value: mockStaff.filter(s => s.status === 'On Leave').length, icon: 'event_busy', color: 'text-error' }].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-high flex items-center gap-space-md">
            <span className={`material-symbols-outlined text-[28px] ${s.color}`}>{s.icon}</span>
            <div>
              <p className="font-clinical-value-md text-clinical-value-md text-on-surface font-bold">{s.value}</p>
              <p className="font-caption text-caption text-on-surface-variant">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-space-sm">
        {['All', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'LabTech', 'Accountant'].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} className={`px-space-lg py-space-sm rounded-full font-headline-sm text-body-sm transition-colors ${roleFilter === r ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container'}`}>{r}</button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {filtered.map((staff, idx) => (
          <div key={staff.id} className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-md">
                <div className={`w-12 h-12 rounded-full ${avatarBg[idx] ?? 'bg-primary'} flex items-center justify-center text-white font-bold text-lg`}>{staff.initials}</div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">{staff.name}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{staff.designation}</p>
                </div>
              </div>
              <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${statusColors[staff.status]}`}>{staff.status}</span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-space-sm">
              <p className="font-caption text-caption text-on-surface-variant">Specialization</p>
              <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{staff.specialization}</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-space-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">business</span>
                <span className="font-body-sm text-body-sm">{staff.dept}</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span className="font-body-sm text-body-sm">{staff.schedule}</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">call</span>
                <span className="font-body-sm text-body-sm">{staff.mobile}</span>
              </div>
              {staff.experience && (
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                  <span className="font-body-sm text-body-sm">{staff.experience} experience</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-container-high">
              <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${roleColors[staff.role]}`}>{staff.role}</span>
              <div className="ml-auto flex gap-1">
                <button onClick={() => setSelected(staff)} className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors" title="View Profile">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </button>
                <button className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-secondary transition-colors" title="Edit">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

