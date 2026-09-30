import React, { useState } from 'react';

const settingsTabs = ['General', 'Users & Roles', 'Security'];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="flex flex-col gap-space-xl">
      <div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface">Settings</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Configure your hospital management system</p>
      </div>

      <div className="flex gap-space-lg">
        {/* Sidebar Tabs */}
        <div className="w-48 flex flex-col gap-1">
          {settingsTabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`flex items-center gap-space-sm px-space-md py-space-md rounded-lg font-headline-sm text-body-sm text-left transition-colors ${activeTab === t ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container'}`}>
              <span className="material-symbols-outlined text-[18px]">{t === 'General' ? 'settings' : t === 'Users & Roles' ? 'manage_accounts' : 'security'}</span>
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-xl">
          {activeTab === 'General' && (
            <div className="flex flex-col gap-space-lg">
              <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold">Hospital Information</h2>
              <div className="grid grid-cols-2 gap-space-md">
                {[['Hospital Name', 'SayanHealth Metro Medical Centre'], ['Registration Number', 'MH-HOSP-2018-4821'], ['Address', '42, Bandra West, Mumbai - 400050'], ['City / State', 'Mumbai, Maharashtra'], ['Phone', '+91-22-4000-5000'], ['Email', 'info@SayanHealth.com']].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <label className="font-headline-sm text-body-sm text-on-surface font-semibold">{label}</label>
                    <input defaultValue={value} className="h-10 px-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                ))}
              </div>
              <button className="w-fit px-space-xl py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">Save Changes</button>
            </div>
          )}
          {activeTab === 'Users & Roles' && (
            <div className="flex flex-col gap-space-lg">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold">System Users</h2>
                <button className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">person_add</span> Invite User
                </button>
              </div>
              <div className="flex flex-col divide-y divide-surface-container-low">
                {[{ name: 'Dr. Sarah Jenkins', email: 'sarah@aegis.com', role: 'Admin' }, { name: 'Dr. Arjun Mehta', email: 'arjun@aegis.com', role: 'Doctor' }, { name: 'Nurse Priya Das', email: 'priya@aegis.com', role: 'Nurse' }, { name: 'Ravi Pharmacist', email: 'ravi@aegis.com', role: 'Pharmacist' }, { name: 'Anjali Receptionist', email: 'anjali@aegis.com', role: 'Receptionist' }].map(u => (
                  <div key={u.email} className="flex items-center justify-between py-space-md">
                    <div className="flex items-center gap-space-md">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{u.name[0]}</div>
                      <div>
                        <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{u.name}</p>
                        <p className="font-caption text-caption text-on-surface-variant">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <span className="font-caption text-caption px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{u.role}</span>
                      <button className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'Security' && (
            <div className="flex flex-col gap-space-xl">
              <h2 className="font-headline-md text-headline-sm text-on-surface font-semibold">Security Settings</h2>
              <div className="flex flex-col gap-space-md max-w-md">
                {[['Current Password', 'password'], ['New Password', 'password'], ['Confirm Password', 'password']].map(([label, type]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <label className="font-headline-sm text-body-sm text-on-surface font-semibold">{label}</label>
                    <input type={type} placeholder="••••••••" className="h-10 px-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                ))}
                <button className="w-fit px-space-xl py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors">Update Password</button>
              </div>
              <div className="border-t border-surface-container-high pt-space-lg flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-headline-sm text-body-sm text-on-surface font-semibold">Two-Factor Authentication</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Secure your account with 2FA</p>
                  </div>
                  <div className="w-12 h-6 bg-secondary rounded-full flex items-center px-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-white ml-auto shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-headline-sm text-body-sm text-on-surface font-semibold">Session Timeout</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Auto-logout after inactivity</p>
                  </div>
                  <select className="h-9 px-space-md bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>15 minutes</option><option>30 minutes</option><option>1 hour</option><option>Never</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

