import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: 'grid_view', label: 'Dashboard', path: '/dashboard', section: null },
  { icon: 'person_search', label: 'Patients', path: '/patients', section: 'Clinical' },
  { icon: 'event_available', label: 'Appointments', path: '/appointments', section: 'Clinical' },
  { icon: 'stethoscope', label: 'OPD Console', path: '/opd-console', section: 'Clinical' },
  { icon: 'single_bed', label: 'IPD / Wards', path: '/ipd-wards', section: 'Clinical' },
  { icon: 'clinical_notes', label: 'EMR / Consultations', path: '/emr', section: 'Clinical' },
  { icon: 'chips', label: 'Laboratory', path: '/laboratory', section: 'Diagnostics', badge: true },
  { icon: 'radiology', label: 'Radiology', path: '/radiology', section: 'Diagnostics' },
  { icon: 'medication', label: 'Pharmacy', path: '/pharmacy', section: 'Operations' },
  { icon: 'receipt_long', label: 'Billing & Finance', path: '/billing', section: 'Operations' },
  { icon: 'badge', label: 'Doctors & Staff', path: '/staff', section: 'Management' },
  { icon: 'analytics', label: 'Reports', path: '/reports', section: 'Management' },
  { icon: 'tune', label: 'Settings', path: '/settings', section: 'Management' },
];

export const Sidebar = () => {
  let currentSection = '';

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-inverse-surface text-inverse-on-surface z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="h-16 px-space-lg flex items-center gap-space-sm bg-inverse-surface">
          <div className="h-8 w-8 bg-primary rounded flex items-center justify-center font-bold text-white">AH</div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-body-sm font-semibold tracking-tight text-white truncate leading-tight">SayanHealth HMS</span>
            <span className="font-caption text-caption text-surface-dim/70 truncate">Metro Medical Ctr</span>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto py-space-sm">
          <nav className="space-y-space-xs px-space-xs">
            {navItems.map((item, idx) => {
              const showSectionHeader = item.section && item.section !== currentSection;
              if (showSectionHeader) {
                currentSection = item.section as string;
              }

              return (
                <React.Fragment key={item.path}>
                  {showSectionHeader && (
                    <div className="px-space-md pt-space-md pb-space-xs font-caption text-caption tracking-wider text-surface-dim/50 uppercase font-semibold">
                      {item.section}
                    </div>
                  )}
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-space-md py-space-sm rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-primary-container text-white font-medium border-l-4 border-secondary-container'
                          : 'text-surface-dim hover:bg-surface-container-highest/20 hover:text-white'
                      }`
                    }
                  >
                    {item.badge ? (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined mr-space-md text-[20px]">{item.icon}</span>
                          <span className="font-body-md text-body-sm">{item.label}</span>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-error ring-2 ring-inverse-surface"></span>
                      </div>
                    ) : (
                      <>
                        <span className="material-symbols-outlined mr-space-md text-[20px]">{item.icon}</span>
                        <span className="font-body-md text-body-sm">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

