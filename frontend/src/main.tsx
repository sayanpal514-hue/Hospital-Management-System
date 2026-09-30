import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './features/dashboard/Dashboard';
import { Patients } from './features/patients/Patients';
import { Appointments } from './features/appointments/Appointments';
import { OPDConsole } from './features/opdconsole/OPDConsole';
import { Wards } from './features/wards/Wards';
import { EMR } from './features/emr/EMR';
import { Laboratory } from './features/laboratory/Laboratory';
import { Radiology } from './features/radiology/Radiology';
import { PharmacyPOS } from './features/pharmacy/PharmacyPOS';
import { Billing } from './features/billing/Billing';
import { Staff } from './features/staff/Staff';
import { Reports } from './features/reports/Reports';
import { Settings } from './features/settings/Settings';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="opd-console" element={<OPDConsole />} />
          <Route path="ipd-wards" element={<Wards />} />
          <Route path="emr" element={<EMR />} />
          <Route path="laboratory" element={<Laboratory />} />
          <Route path="radiology" element={<Radiology />} />
          <Route path="pharmacy" element={<PharmacyPOS />} />
          <Route path="billing" element={<Billing />} />
          <Route path="staff" element={<Staff />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
