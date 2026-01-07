import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Rupanta Mazumder Kona';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  throw new Error('Missing required env vars: ADMIN_EMAIL, ADMIN_PASSWORD_HASH, JWT_SECRET');
}

const DATA_PATH = path.join(__dirname, 'content-data.json');

export const readContent = () => {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed.items || [];
  } catch (err) {
    return [];
  }
};

export const writeContent = (items) => {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(
    DATA_PATH,
    JSON.stringify(
      {
        items,
        updatedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
};

export const normalizeCategory = (category) => {
  const normalized = String(category || '').toLowerCase();
  if (normalized === 'study') return 'Study';
  if (normalized === 'ugc' || normalized === 'collab' || normalized === 'collaboration') return 'UGC';
  return 'Lifestyle';
};