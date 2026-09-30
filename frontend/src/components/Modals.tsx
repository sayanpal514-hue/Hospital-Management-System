import React, { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface PatientForm {
  firstName: string; lastName: string; dob: string; gender: string;
  bloodGroup: string; mobile: string; email: string;
  street: string; city: string; state: string; pincode: string;
  ecName: string; ecRelation: string; ecMobile: string;
  allergies: string; chronicConditions: string;
}

// ─── Register Patient Modal ───────────────────────────────────────────────────
export const RegisterPatientModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: (name: string) => void }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PatientForm>({
    firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '', mobile: '', email: '',
    street: '', city: '', state: '', pincode: '',
    ecName: '', ecRelation: '', ecMobile: '',
    allergies: '', chronicConditions: '',
  });

  const update = (field: keyof PatientForm, val: string) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onSuccess(`${form.firstName} ${form.lastName}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface-container-lowest border-b border-surface-container-high px-space-xl py-space-lg flex items-center justify-between z-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Register New Patient</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 px-space-xl pt-space-lg">
          {['Personal Info', 'Address & Emergency', 'Medical History'].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-space-sm ${i + 1 <= step ? 'text-primary' : 'text-on-surface-variant'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 < step ? 'bg-primary text-white' : i + 1 === step ? 'bg-primary text-white' : 'bg-surface-container border border-outline-variant text-on-surface-variant'}`}>
                  {i + 1 < step ? <span className="material-symbols-outlined text-[14px]">check</span> : i + 1}
                </div>
                <span className="font-headline-sm text-body-sm hidden sm:block">{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 mx-2 ${i + 1 < step ? 'bg-primary' : 'bg-surface-container-high'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="p-space-xl flex flex-col gap-space-md">
            <div className="grid grid-cols-2 gap-space-md">
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">First Name *</label>
                <input value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="e.g. Eleanor" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Last Name *</label>
                <input value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="e.g. Vance" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Date of Birth *</label>
                <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Gender *</label>
                <select value={form.gender} onChange={e => update('gender', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Blood Group</label>
                <select value={form.bloodGroup} onChange={e => update('bloodGroup', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Blood Group</option>
                  {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Mobile Number *</label>
                <input value={form.mobile} onChange={e => update('mobile', e.target.value)} placeholder="10-digit mobile" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
              </div>
              <div className="col-span-2">
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Email Address</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="patient@email.com" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="p-space-xl flex flex-col gap-space-lg">
            <div>
              <h3 className="font-headline-sm text-body-sm text-on-surface font-bold mb-space-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">home</span> Address
              </h3>
              <div className="grid grid-cols-2 gap-space-md">
                <div className="col-span-2">
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Street Address</label>
                  <input value={form.street} onChange={e => update('street', e.target.value)} placeholder="House/Flat No, Street, Area" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
                </div>
                <div>
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">City</label>
                  <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Mumbai" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
                </div>
                <div>
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">State</label>
                  <input value={form.state} onChange={e => update('state', e.target.value)} placeholder="Maharashtra" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
                </div>
                <div>
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Pincode</label>
                  <input value={form.pincode} onChange={e => update('pincode', e.target.value)} placeholder="400001" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-headline-sm text-body-sm text-on-surface font-bold mb-space-md flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-error text-[18px]">emergency</span> Emergency Contact
              </h3>
              <div className="grid grid-cols-3 gap-space-md">
                <div>
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Full Name *</label>
                  <input value={form.ecName} onChange={e => update('ecName', e.target.value)} placeholder="Contact name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
                </div>
                <div>
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Relation *</label>
                  <select value={form.ecRelation} onChange={e => update('ecRelation', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select</option>
                    {['Spouse','Parent','Child','Sibling','Friend','Other'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Mobile *</label>
                  <input value={form.ecMobile} onChange={e => update('ecMobile', e.target.value)} placeholder="10-digit" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Medical History */}
        {step === 3 && (
          <div className="p-space-xl flex flex-col gap-space-md">
            <div>
              <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-error text-[18px]">warning</span> Known Allergies
              </label>
              <textarea rows={3} value={form.allergies} onChange={e => update('allergies', e.target.value)} placeholder="e.g. Penicillin, Sulfa drugs, Aspirin (comma separated)" className="w-full px-space-md py-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-outline" />
            </div>
            <div>
              <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[18px]">monitor_heart</span> Chronic Conditions
              </label>
              <textarea rows={3} value={form.chronicConditions} onChange={e => update('chronicConditions', e.target.value)} placeholder="e.g. Hypertension, Type 2 Diabetes, Asthma (comma separated)" className="w-full px-space-md py-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-outline" />
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-lg">
              <p className="font-headline-sm text-body-sm text-on-surface font-semibold mb-space-md">📋 Registration Summary</p>
              <div className="grid grid-cols-2 gap-space-sm text-body-sm">
                <div className="flex flex-col gap-0.5">
                  <span className="font-caption text-caption text-on-surface-variant">Patient Name</span>
                  <span className="font-body-sm text-on-surface font-semibold">{form.firstName} {form.lastName}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-caption text-caption text-on-surface-variant">Mobile</span>
                  <span className="font-body-sm text-on-surface font-semibold">{form.mobile}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-caption text-caption text-on-surface-variant">Gender / Blood</span>
                  <span className="font-body-sm text-on-surface font-semibold">{form.gender} / {form.bloodGroup || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-caption text-caption text-on-surface-variant">City</span>
                  <span className="font-body-sm text-on-surface font-semibold">{form.city || 'N/A'}</span>
                </div>
              </div>
              <p className="font-caption text-caption text-primary mt-space-md">✦ UHID will be auto-generated upon submission</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="sticky bottom-0 bg-surface-container-lowest border-t border-surface-container-high px-space-xl py-space-lg flex items-center justify-between">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} className="px-space-xl py-space-md border border-outline-variant rounded-lg font-headline-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors">
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 3
            ? <button onClick={() => setStep(s => s + 1)} disabled={step === 1 && (!form.firstName || !form.lastName || !form.mobile || !form.gender)} className="px-space-xl py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continue →</button>
            : <button onClick={handleSubmit} disabled={loading} className="px-space-xl py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-space-sm">
                {loading ? <><span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span> Registering...</> : <><span className="material-symbols-outlined text-[18px]">how_to_reg</span> Register Patient</>}
              </button>
          }
        </div>
      </div>
    </div>
  );
};

// ─── Book Appointment Modal ───────────────────────────────────────────────────
export const BookAppointmentModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [form, setForm] = useState({ patient: '', uhid: '', doctor: '', department: '', date: '', timeSlot: '', type: 'OPD', notes: '' });
  const [loading, setLoading] = useState(false);
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  const doctors = ['Dr. Sarah Jenkins — Cardiology', 'Dr. Arjun Mehta — Orthopedics', 'Dr. Kavita Rao — Gynecology', 'Dr. Suresh Singh — Neurology', 'Dr. Priya Das — Oncology'];
  const slots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'];

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="border-b border-surface-container-high px-space-xl py-space-lg flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Book Appointment</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-space-xl flex flex-col gap-space-md">
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Patient Name *</label>
              <input value={form.patient} onChange={e => update('patient', e.target.value)} placeholder="Search patient name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
            </div>
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">UHID</label>
              <input value={form.uhid} onChange={e => update('uhid', e.target.value)} placeholder="AH-XXXXX" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
            </div>
          </div>
          <div>
            <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Doctor *</label>
            <select value={form.doctor} onChange={e => update('doctor', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Doctor</option>
              {doctors.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Appointment Date *</label>
              <input type="date" value={form.date} onChange={e => update('date', e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Appointment Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                {['OPD','Follow-up','Emergency','IPD'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="font-headline-sm text-body-sm font-semibold mb-2 block">Available Time Slots *</label>
            <div className="grid grid-cols-4 gap-2">
              {slots.map(s => (
                <button key={s} onClick={() => update('timeSlot', s)} className={`py-space-sm rounded-lg font-clinical-code text-clinical-code text-center transition-colors ${form.timeSlot === s ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Notes (optional)</label>
            <textarea rows={2} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Reason for visit, special instructions..." className="w-full px-space-md py-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-outline" />
          </div>
        </div>
        <div className="border-t border-surface-container-high px-space-xl py-space-lg flex justify-between">
          <button onClick={onClose} className="px-space-xl py-space-md border border-outline-variant rounded-lg font-headline-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !form.patient || !form.doctor || !form.date || !form.timeSlot} className="px-space-xl py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-space-sm">
            {loading ? <><span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span> Booking...</> : <><span className="material-symbols-outlined text-[18px]">event_available</span> Confirm Booking</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Admit Patient Modal ──────────────────────────────────────────────────────
export const AdmitPatientModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [form, setForm] = useState({ patient: '', uhid: '', ward: '', bedNumber: '', doctor: '', admissionType: 'Elective', diagnosis: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const update = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));

  const wards = ['General Ward A', 'General Ward B', 'Surgery Ward', 'ICU', 'Pediatric Ward', 'Maternity Ward'];
  const doctors = ['Dr. Sarah Jenkins', 'Dr. Arjun Mehta', 'Dr. Kavita Rao', 'Dr. Suresh Singh', 'Dr. Priya Das'];

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="border-b border-surface-container-high px-space-xl py-space-lg flex items-center justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Admit Patient</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">IPD Admission Form</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="p-space-xl flex flex-col gap-space-md">
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Patient Name *</label>
              <input value={form.patient} onChange={e => update('patient', e.target.value)} placeholder="Full name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
            </div>
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">UHID *</label>
              <input value={form.uhid} onChange={e => update('uhid', e.target.value)} placeholder="AH-XXXXX" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Ward *</label>
              <select value={form.ward} onChange={e => update('ward', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select Ward</option>
                {wards.map(w => <option key={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Bed Number *</label>
              <input value={form.bedNumber} onChange={e => update('bedNumber', e.target.value)} placeholder="e.g. G-04" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Attending Doctor *</label>
              <select value={form.doctor} onChange={e => update('doctor', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select Doctor</option>
                {doctors.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Admission Type</label>
              <select value={form.admissionType} onChange={e => update('admissionType', e.target.value)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary">
                {['Elective','Emergency','Day Care','Transfer'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Provisional Diagnosis *</label>
            <input value={form.diagnosis} onChange={e => update('diagnosis', e.target.value)} placeholder="e.g. Acute Myocardial Infarction" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-outline" />
          </div>
          <div>
            <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Clinical Notes</label>
            <textarea rows={2} value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Additional clinical notes or instructions..." className="w-full px-space-md py-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-outline" />
          </div>
          <div className="bg-error-container/30 rounded-lg p-space-md flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-error text-[18px]">info</span>
            <span className="font-body-sm text-body-sm text-on-error-container">Bed will be marked as <strong>Occupied</strong> immediately upon admission.</span>
          </div>
        </div>
        <div className="border-t border-surface-container-high px-space-xl py-space-lg flex justify-between">
          <button onClick={onClose} className="px-space-xl py-space-md border border-outline-variant rounded-lg font-headline-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={loading || !form.patient || !form.ward || !form.doctor || !form.diagnosis} className="px-space-xl py-space-md bg-error text-white rounded-lg font-headline-sm text-body-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-space-sm">
            {loading ? <><span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span> Admitting...</> : <><span className="material-symbols-outlined text-[18px]">single_bed</span> Admit Patient</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Success Toast ────────────────────────────────────────────────────────────
export const SuccessToast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-2xl flex items-center gap-space-sm animate-[slideUp_0.3s_ease]">
      <span className="material-symbols-outlined text-secondary-container text-[20px]">check_circle</span>
      <span className="font-body-md text-body-sm">{message}</span>
    </div>
  );
};
