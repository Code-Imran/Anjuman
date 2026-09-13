import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Reads content directly from the src/content/* files written by the
// Keystatic admin UI (running locally at /keystatic during `npm run dev`).
export const reader = createReader(process.cwd(), keystaticConfig);
