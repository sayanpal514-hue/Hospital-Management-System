const fs = require('fs');
const path = require('path');

const pages = [
  'Dashboard', 'Patients', 'Appointments', 'OPDConsole', 'Wards', 
  'EMR', 'Laboratory', 'Radiology', 'Billing', 'Staff', 'Reports', 'Settings'
];

const featuresDir = path.join(__dirname, 'src', 'features');

let routesImport = '';
let routesRender = '';

pages.forEach(page => {
  const dir = path.join(featuresDir, page.toLowerCase());
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const compCode = `import React from 'react';\n\nexport const ${page} = () => {\n  return (\n    <div className="p-space-lg">\n      <h1 className="font-headline-xl text-primary mb-4">${page} Module</h1>\n      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-surface-container-high">\n        <p className="text-on-surface-variant font-body-md">\n          The ${page} matrix is online. Real-time telemetry routing established.\n        </p>\n      </div>\n    </div>\n  );\n};\n`;
  
  fs.writeFileSync(path.join(dir, page + '.tsx'), compCode);
  
  routesImport += `import { ${page} } from './features/${page.toLowerCase()}/${page}';\n`;
  
  let routePath = page.toLowerCase();
  if (page === 'OPDConsole') routePath = 'opd-console';
  if (page === 'Wards') routePath = 'ipd-wards';
  if (page === 'EMR') routePath = 'emr';
  
  routesRender += `          <Route path="${routePath}" element={<${page} />} />\n`;
});

const mainCode = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PharmacyPOS } from './features/pharmacy/PharmacyPOS';
${routesImport}
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="pharmacy" element={<PharmacyPOS />} />
${routesRender}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
`;

fs.writeFileSync(path.join(__dirname, 'src', 'main.tsx'), mainCode);
console.log('Frontend matrix fully mapped and expanded.');
