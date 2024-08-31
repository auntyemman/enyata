import fs from 'fs';
import path from 'path';
import { pool } from '../config/database';

export const runMigration = async () => {
  const domains = ['users', 'products', 'orders'];
  const migrationsDir = path.join(__dirname, '..');
  for (const domain of domains) {
    const folderPath = path.join(migrationsDir, `${domain}`, 'migrations');

    if (fs.existsSync(folderPath)) {
      console.log(`Running migrations for ${domain}`);
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const migrationSQL = fs.readFileSync(filePath, 'utf-8');

        try {
          await pool.query(migrationSQL);
          console.log(`Migration ${file} executed successfully for ${domain}`);
        } catch (error) {
          console.error(`Error executing migration ${file} for ${domain}:`, error);
          throw error;
        }
      }
    } else {
      console.log(`No migrations found for ${domain}`);
    }
  }
};
