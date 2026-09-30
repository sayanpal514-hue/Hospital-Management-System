const fs = require('fs');
const path = require('path');

const modules = [
  { name: 'Appointment', model: 'patientId: { type: String }, doctorId: { type: String }, date: Date, status: String' },
  { name: 'Consultation', model: 'appointmentId: { type: String }, subjective: String, objective: String, assessment: String, plan: String' },
  { name: 'Bed', model: 'ward: String, room: String, number: String, status: { type: String, enum: ["Available", "Occupied", "Cleaning"] }' },
  { name: 'LabOrder', model: 'patientId: { type: String }, tests: [String], status: String, resultPdf: String' },
  { name: 'Medicine', model: 'name: String, batch: String, expiry: Date, stock: Number, price: Number' },
  { name: 'Invoice', model: 'patientId: { type: String }, total: Number, status: { type: String, enum: ["Paid", "Pending"] }' }
];

let appImports = `import authRoutes from './routes/auth.routes';\nimport patientRoutes from './routes/patient.routes';\n`;
let appRoutes = `app.use('/api/v1/auth', authRoutes);\napp.use('/api/v1/patients', patientRoutes);\n`;

modules.forEach(mod => {
  const lowerName = mod.name.toLowerCase();
  
  // Model
  const modelCode = `import mongoose, { Schema, Document } from 'mongoose';\n\nexport interface I${mod.name} extends Document { _id: any }\n\nconst ${mod.name}Schema = new Schema({ ${mod.model} }, { timestamps: true });\n\nexport const ${mod.name} = mongoose.model<I${mod.name}>('${mod.name}', ${mod.name}Schema);\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'models', `${mod.name}.model.ts`), modelCode);
  
  // Controller
  const controllerCode = `import { Request, Response, NextFunction } from 'express';\nimport asyncHandler from 'express-async-handler';\nimport { ${mod.name} } from '../models/${mod.name}.model';\n\nexport const get${mod.name}s = asyncHandler(async (req: Request, res: Response) => {\n  const data = await ${mod.name}.find().lean();\n  res.status(200).json({ success: true, data });\n});\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'controllers', `${lowerName}.controller.ts`), controllerCode);
  
  // Routes
  const routeCode = `import { Router } from 'express';\nimport { get${mod.name}s } from '../controllers/${lowerName}.controller';\nimport { protect } from '../middlewares/auth.middleware';\n\nconst router = Router();\n\nrouter.get('/', protect, get${mod.name}s);\n\nexport default router;\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'routes', `${lowerName}.routes.ts`), routeCode);
  
  appImports += `import ${lowerName}Routes from './routes/${lowerName}.routes';\n`;
  appRoutes += `app.use('/api/v1/${lowerName}s', ${lowerName}Routes);\n`;
});

// Update app.ts
let appTs = fs.readFileSync(path.join(__dirname, 'src', 'app.ts'), 'utf-8');
appTs = appTs.replace(/import authRoutes from '\.\/routes\/auth\.routes';\nimport patientRoutes from '\.\/routes\/patient\.routes';/g, appImports);
appTs = appTs.replace(/app\.use\('\/api\/v1\/auth', authRoutes\);\napp\.use\('\/api\/v1\/patients', patientRoutes\);/g, appRoutes);
fs.writeFileSync(path.join(__dirname, 'src', 'app.ts'), appTs);

console.log('Backend matrix expanded across all modules.');
