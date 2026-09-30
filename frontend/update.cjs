const fs = require('fs');

const updateFile = (path, modalCode, modalName, buttonText) => {
  let content = fs.readFileSync(path, 'utf8');
  const compName = path.split('/').pop().replace('.tsx', '');
  
  content = content.replace(
    'export const ' + compName + ' = () => {', 
    modalCode + '\nexport const ' + compName + ' = () => {\n  const [showModal, setShowModal] = React.useState(false);\n'
  );
  
  content = content.replace(
    new RegExp('<button className="flex items-center gap-space-xs([^>]*?)>([\\s\\S]*?)' + buttonText + '([\\s\\S]*?)</button>'),
    '<button onClick={() => setShowModal(true)} className="flex items-center gap-space-xs$1>$2' + buttonText + '$3</button>\n        {showModal && <' + modalName + ' onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}\n'
  );
  
  fs.writeFileSync(path, content);
};

updateFile('src/features/laboratory/Laboratory.tsx', `
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
`, 'NewLabOrderModal', 'New Lab Order');

updateFile('src/features/radiology/Radiology.tsx', `
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
`, 'NewRadiologyOrderModal', 'New Order');

updateFile('src/features/billing/Billing.tsx', `
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
`, 'NewInvoiceModal', 'New Invoice');

updateFile('src/features/staff/Staff.tsx', `
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
`, 'AddStaffModal', 'Add Staff Member');
