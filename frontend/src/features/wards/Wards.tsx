import React, { useState } from 'react';
import { AdmitPatientModal, SuccessToast } from '../../components/Modals';

const mockWards = ['General', 'Surgery', 'ICU', 'Pediatric', 'Maternity'];

type BedStatus = 'Available' | 'Occupied' | 'Cleaning';

interface BedType { num: string; status: BedStatus; patient?: string; since?: string; uhid?: string }

const initialBeds: Record<string, BedType[]> = {
  General: [
    { num: 'G-01', status: 'Occupied', patient: 'Eleanor Vance', uhid: 'AH-84920', since: '28 Sep' },
    { num: 'G-02', status: 'Available' }, { num: 'G-03', status: 'Occupied', patient: 'Rajesh Sharma', uhid: 'AH-84921', since: '27 Sep' },
    { num: 'G-04', status: 'Available' }, { num: 'G-05', status: 'Cleaning' }, { num: 'G-06', status: 'Occupied', patient: 'Priya Nair', uhid: 'AH-84922', since: '29 Sep' },
    { num: 'G-07', status: 'Available' }, { num: 'G-08', status: 'Available' }, { num: 'G-09', status: 'Occupied', patient: 'Deepak Kumar', uhid: 'AH-84927', since: '25 Sep' }, { num: 'G-10', status: 'Available' },
  ],
  Surgery: Array.from({ length: 10 }, (_, i): BedType => ({ num: `S-${String(i + 1).padStart(2, '0')}`, status: i % 3 === 0 ? 'Occupied' : i % 7 === 0 ? 'Cleaning' : 'Available', patient: i % 3 === 0 ? `Patient S${i + 1}` : undefined })),
  ICU: Array.from({ length: 10 }, (_, i): BedType => ({ num: `I-${String(i + 1).padStart(2, '0')}`, status: i < 7 ? 'Occupied' : 'Available', patient: i < 7 ? `Critical Patient ${i + 1}` : undefined, since: i < 7 ? '26 Sep' : undefined })),
  Pediatric: Array.from({ length: 10 }, (_, i): BedType => ({ num: `P-${String(i + 1).padStart(2, '0')}`, status: i % 2 === 0 ? 'Occupied' : 'Available', patient: i % 2 === 0 ? `Child Patient ${i + 1}` : undefined })),
  Maternity: Array.from({ length: 10 }, (_, i): BedType => ({ num: `M-${String(i + 1).padStart(2, '0')}`, status: i % 3 === 0 ? 'Available' : i % 5 === 0 ? 'Cleaning' : 'Occupied', patient: i % 3 !== 0 && i % 5 !== 0 ? `Patient M${i + 1}` : undefined })),
};

const bedStyle: Record<BedStatus, string> = { Available: 'bg-secondary-container/40 border-secondary/20 text-on-secondary-container', Occupied: 'bg-primary/10 border-primary/30 text-primary', Cleaning: 'bg-surface-container border-outline-variant text-on-surface-variant' };

export const Wards = () => {
  const [activeWard, setActiveWard] = useState('General');
  const [showAdmit, setShowAdmit] = useState(false);
  const [toast, setToast] = useState('');
  const [wards, setWards] = useState(initialBeds);

  const beds = wards[activeWard] ?? [];
  const allBeds = Object.values(wards).flat();
  const stats = { total: allBeds.length, occupied: allBeds.filter(b => b.status === 'Occupied').length, available: allBeds.filter(b => b.status === 'Available').length, cleaning: allBeds.filter(b => b.status === 'Cleaning').length };

  const handleAdmit = () => {
    // Mark first available bed as occupied in current ward
    setWards(prev => {
      const ward = [...(prev[activeWard] ?? [])];
      const freeIdx = ward.findIndex(b => b.status === 'Available');
      if (freeIdx !== -1) ward[freeIdx] = { ...ward[freeIdx], status: 'Occupied', patient: 'New Patient', since: 'Today' };
      return { ...prev, [activeWard]: ward };
    });
    setShowAdmit(false);
    setToast('✅ Patient admitted and bed allocated successfully!');
  };

  return (
    <div className="flex flex-col gap-space-xl">
      {showAdmit && <AdmitPatientModal onClose={() => setShowAdmit(false)} onSuccess={handleAdmit} />}
      {toast && <SuccessToast message={toast} onClose={() => setToast('')} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">IPD / Ward Management</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Real-time bed status across all wards</p>
        </div>
        <button onClick={() => setShowAdmit(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">single_bed</span> Admit Patient
        </button>
      </div>

      <div className="grid grid-cols-4 gap-space-md">
        {[{ label: 'Total Beds', value: stats.total, color: 'text-on-surface', bg: 'bg-surface-container-lowest' }, { label: 'Occupied', value: stats.occupied, color: 'text-primary', bg: 'bg-primary/5' }, { label: 'Available', value: stats.available, color: 'text-secondary', bg: 'bg-secondary/5' }, { label: 'Cleaning', value: stats.cleaning, color: 'text-on-surface-variant', bg: 'bg-surface-container' }].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-space-lg border border-surface-container-high text-center`}>
            <p className={`font-clinical-value-lg text-clinical-value-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-space-sm bg-surface-container-lowest p-1.5 rounded-xl border border-surface-container-high w-fit">
        {mockWards.map(w => (
          <button key={w} onClick={() => setActiveWard(w)} className={`px-space-lg py-space-sm rounded-lg font-headline-sm text-body-sm transition-colors ${activeWard === w ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-container'}`}>{w}</button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg">
        <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold mb-space-lg">{activeWard} Ward — {beds.length} Beds</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-md">
          {beds.map(bed => (
            <div key={bed.num} className={`rounded-xl border p-space-md flex flex-col gap-space-xs cursor-pointer hover:opacity-90 transition-all ${bedStyle[bed.status]}`}>
              <div className="flex items-center justify-between">
                <span className="font-clinical-code text-clinical-code font-bold">{bed.num}</span>
                <span className="material-symbols-outlined text-[16px]">{bed.status === 'Occupied' ? 'single_bed' : bed.status === 'Cleaning' ? 'cleaning_services' : 'bed_empty'}</span>
              </div>
              {bed.status === 'Occupied' && bed.patient && (
                <>
                  <span className="font-body-sm text-body-sm font-semibold truncate">{bed.patient}</span>
                  {bed.uhid && <span className="font-clinical-code text-[10px] opacity-70">{bed.uhid}</span>}
                  <span className="font-caption text-caption opacity-70">Since {bed.since}</span>
                </>
              )}
              {bed.status === 'Available' && <span className="font-caption text-caption font-semibold text-secondary">Available</span>}
              {bed.status === 'Cleaning' && <span className="font-caption text-caption font-semibold text-on-surface-variant">Cleaning</span>}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-space-lg mt-space-lg pt-space-lg border-t border-surface-container-high">
          {[{ color: 'bg-primary/10 border-primary/30', label: 'Occupied' }, { color: 'bg-secondary-container/40 border-secondary/20', label: 'Available' }, { color: 'bg-surface-container border-outline-variant', label: 'Cleaning' }].map(l => (
            <div key={l.label} className="flex items-center gap-space-xs">
              <div className={`w-4 h-4 rounded border ${l.color}`} />
              <span className="font-caption text-caption text-on-surface-variant">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
