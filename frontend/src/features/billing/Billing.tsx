import React, { useState } from 'react';

const mockInvoices = [
  { id: 'INV-2026-0001', patient: 'Eleanor Vance', date: '28 Sep', services: 'OPD + Lab', amount: 4500, paid: 4500, balance: 0, status: 'Paid' },
  { id: 'INV-2026-0002', patient: 'Rajesh Sharma', date: '27 Sep', services: 'Surgery', amount: 12000, paid: 5000, balance: 7000, status: 'Partial' },
  { id: 'INV-2026-0003', patient: 'Priya Nair', date: '25 Sep', services: 'Radiology', amount: 2800, paid: 0, balance: 2800, status: 'Pending' },
  { id: 'INV-2026-0004', patient: 'Mohammed Ali', date: '10 Sep', services: 'IPD + ICU', amount: 45000, paid: 0, balance: 45000, status: 'Overdue' },
  { id: 'INV-2026-0005', patient: 'Sunita Rao', date: '29 Sep', services: 'Pharmacy', amount: 1200, paid: 1200, balance: 0, status: 'Paid' },
  { id: 'INV-2026-0006', patient: 'Arjun Mehta', date: '26 Sep', services: 'OPD', amount: 500, paid: 500, balance: 0, status: 'Paid' },
  { id: 'INV-2026-0007', patient: 'Kavitha Iyer', date: '24 Sep', services: 'Lab + OPD', amount: 3200, paid: 1600, balance: 1600, status: 'Partial' },
  { id: 'INV-2026-0008', patient: 'Deepak Kumar', date: '25 Sep', services: 'Oncology', amount: 18000, paid: 0, balance: 18000, status: 'Overdue' },
];

const statusStyle: Record<string, string> = { Paid: 'bg-secondary-container text-on-secondary-container', Partial: 'bg-tertiary-container text-on-tertiary', Pending: 'bg-surface-container text-on-surface-variant', Overdue: 'bg-error-container text-on-error-container' };


export const NewInvoiceModal = ({ onClose, onSuccess }: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async () => { setLoading(true); await new Promise(r => setTimeout(r, 800)); setLoading(false); onSuccess(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-lg p-space-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">New Invoice</h2>
          <button onClick={onClose} className="material-symbols-outlined p-2 hover:bg-surface-container rounded-lg">close</button>
        </div>
        <input placeholder="Patient Name" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <input placeholder="Amount (₹)" type="number" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary outline-none" />
        <div className="flex justify-end gap-space-sm mt-space-md">
          <button onClick={onClose} className="px-space-md py-space-sm bg-surface-container text-on-surface rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-space-md py-space-sm bg-primary text-white rounded-lg">{loading ? 'Saving...' : 'Generate Invoice'}</button>
        </div>
      </div>
    </div>
  );
};

export const Billing = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [payModal, setPayModal] = useState(false);
  const [selectedInv, setSelectedInv] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-space-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Billing & Finance</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage invoices, payments and financial reports</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">add</span> New Invoice
        </button>
        {showModal && <NewInvoiceModal onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}

      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        {[
          { label: 'Total Revenue', value: '₹4,28,500', icon: 'payments', color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Collected Today', value: '₹84,200', icon: 'account_balance_wallet', color: 'text-secondary', bg: 'bg-secondary/5' },
          { label: 'Pending', value: '₹1,23,400', icon: 'pending_actions', color: 'text-tertiary', bg: 'bg-tertiary/5' },
          { label: 'Overdue', value: '₹63,000', icon: 'warning', color: 'text-error', bg: 'bg-error/5' },
        ].map(c => (
          <div key={c.label} className={`${c.bg} rounded-xl p-space-lg border border-surface-container-high flex items-center gap-space-md`}>
            <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-[26px] ${c.color}`}>{c.icon}</span>
            </div>
            <div>
              <p className="font-clinical-value-md text-clinical-value-md text-on-surface font-bold">{c.value}</p>
              <p className="font-caption text-caption text-on-surface-variant">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-sm overflow-hidden">
        <div className="p-space-lg border-b border-surface-container-high flex items-center justify-between">
          <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold">All Invoices</h2>
          <div className="flex gap-space-sm">
            {['All', 'Paid', 'Partial', 'Pending', 'Overdue'].map(s => (
              <button key={s} className="px-space-md py-1 rounded-full font-caption text-caption bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors">{s}</button>
            ))}
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
              <th className="px-space-lg py-space-md">Invoice #</th>
              <th className="px-space-lg py-space-md">Patient</th>
              <th className="px-space-lg py-space-md">Date</th>
              <th className="px-space-lg py-space-md">Services</th>
              <th className="px-space-lg py-space-md text-right">Amount</th>
              <th className="px-space-lg py-space-md text-right">Balance</th>
              <th className="px-space-lg py-space-md">Status</th>
              <th className="px-space-lg py-space-md text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {mockInvoices.map(inv => (
              <tr key={inv.id} className="hover:bg-surface-container-low/40 transition-colors">
                <td className="px-space-lg py-space-md font-clinical-code text-clinical-code text-primary">{inv.id}</td>
                <td className="px-space-lg py-space-md font-headline-sm text-body-sm text-on-surface font-semibold">{inv.patient}</td>
                <td className="px-space-lg py-space-md font-body-sm text-body-sm text-on-surface-variant">{inv.date}</td>
                <td className="px-space-lg py-space-md font-body-sm text-body-sm text-on-surface-variant">{inv.services}</td>
                <td className="px-space-lg py-space-md text-right font-clinical-value-md text-body-sm text-on-surface font-semibold">₹{inv.amount.toLocaleString()}</td>
                <td className={`px-space-lg py-space-md text-right font-clinical-value-md text-body-sm font-bold ${inv.balance > 0 ? 'text-error' : 'text-secondary'}`}>₹{inv.balance.toLocaleString()}</td>
                <td className="px-space-lg py-space-md">
                  <span className={`font-caption text-caption px-2 py-1 rounded-full font-semibold ${statusStyle[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="px-space-lg py-space-md text-right">
                  {inv.balance > 0 && (
                    <button onClick={() => { setSelectedInv(inv.id); setPayModal(true); }} className="px-space-md py-1.5 bg-primary text-white rounded-lg font-caption text-caption hover:bg-primary-container transition-colors mr-1">
                      Pay
                    </button>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors">
                    <span className="material-symbols-outlined text-[18px]">print</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between mb-space-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Record Payment</h2>
              <button onClick={() => setPayModal(false)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-space-md">
              <div className="bg-surface-container-low rounded-lg p-space-md">
                <p className="font-caption text-caption text-on-surface-variant">Invoice</p>
                <p className="font-clinical-value-md text-clinical-value-md text-primary font-bold">{selectedInv}</p>
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Payment Amount (₹)</label>
                <input type="number" className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Enter amount" />
              </div>
              <div>
                <label className="font-headline-sm text-body-sm text-on-surface font-semibold mb-1 block">Payment Method</label>
                <select className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Cash</option><option>UPI / QR</option><option>Card</option><option>Insurance</option>
                </select>
              </div>
              <button onClick={() => setPayModal(false)} className="w-full h-11 bg-primary text-white rounded-lg font-headline-sm text-body-sm font-semibold hover:bg-primary-container transition-colors mt-space-sm">
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
