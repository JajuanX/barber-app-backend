import 'dotenv/config';
import http from 'http';
import app, { connectToDatabase } from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/barber-study-app';

async function start() {
  try {
    await connectToDatabase(MONGO_URI);
    const server = http.createServer(app);
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
