import fs from 'fs-extra';
import path from 'path';

const sourceDirectory = path.join(__dirname, '..', 'orders', 'migrations');
const destinationDirectory = path.join(__dirname, '..', '..', 'dist', 'orders', 'migrations');

// Ensure the destination directory exists, creating it if it doesn't
fs.ensureDirSync(destinationDirectory);

// Copy HTML templates (including subdirectories)
fs.copySync(sourceDirectory, destinationDirectory, { overwrite: true });
