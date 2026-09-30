import 'dotenv/config';
import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log(`📡 Socket connected: ${socket.id}`);
  socket.on('disconnect', () => console.log(`📡 Socket disconnected: ${socket.id}`));
});

const startServer = async () => {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      console.log('🌌 MongoDB Connected (External)');
    } else {
      throw new Error('No MONGO_URI');
    }
  } catch {
    console.log('⚡ Spinning up in-memory MongoDB...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('🌌 MongoDB Memory Server online (dev mode — data resets on restart)');
  }

  server.listen(PORT, () => {
    console.log(`🚀 HMS API running → http://localhost:${PORT}`);
    console.log(`📋 Health check → http://localhost:${PORT}/api/v1/health`);
  });
};

startServer();
