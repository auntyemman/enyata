import { App } from './app';
import { pool } from './config/database';
import { runMigration } from './utils/migrate';
// import { eventListenersService } from './events/event-listeners.service';

class Server {
  private readonly app: App;

  constructor() {
    this.app = new App();
  }

  async start() {
    try {
      await runMigration();
      // eventListenersService;
      await pool.connect();
      this.app.start();
      console.log('Server started successfully.');
    } catch (error) {
      console.error('Failed to start server:');
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
