import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Rupanta Mazumder Kona';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  console.error(
    'Missing required env vars: ADMIN_EMAIL, ADMIN_PASSWORD_HASH, JWT_SECRET. See server/.env.example.'
  );
  process.exit(1);
}

const DATA_PATH = path.join(__dirname, 'data', 'content.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN.length ? CLIENT_ORIGIN : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  '/uploads',
  express.static(UPLOAD_DIR, {
    maxAge: '7d',
    setHeaders: (res) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    },
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${uuid()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'thumbnail'));
    }
    cb(null, true);
  },
});

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 1000 * 60 * 60 * 12,
};

const readContent = () => {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed.items || [];
  } catch (err) {
    return [];
  }
};

const writeContent = (items) => {
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

const normalizeCategory = (category) => {
  const normalized = String(category || '').toLowerCase();
  if (normalized === 'study') return 'Study';
  if (normalized === 'ugc' || normalized === 'collab' || normalized === 'collaboration') return 'UGC';
  return 'Lifestyle';
};

// Simple in-memory rate limiter for login attempts (per IP)
const loginAttempts = new Map();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX = 5;
const loginRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();
  const attempts = loginAttempts.get(ip)?.filter((ts) => now - ts < LOGIN_WINDOW_MS) || [];
  attempts.push(now);
  loginAttempts.set(ip, attempts);
  if (attempts.length > LOGIN_MAX) {
    return res
      .status(429)
      .json({ message: 'Too many login attempts. Please try again in a few minutes.' });
  }
  return next();
};

const authGuard = (req, res, next) => {
  const token = req.cookies?.admin_token;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid session' });
  }
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'content-backend', timestamp: new Date().toISOString() });
});

app.post('/api/auth/login', loginRateLimit, async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase().trim()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = jwt.sign({ email, name: ADMIN_NAME }, JWT_SECRET, { expiresIn: '12h' });
  res.cookie('admin_token', token, cookieOptions);
  res.json({ user: { email, name: ADMIN_NAME } });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_token', cookieOptions);
  res.json({ ok: true });
});

app.get('/api/auth/me', authGuard, (req, res) => {
  res.json({ user: { email: req.user.email, name: req.user.name || ADMIN_NAME } });
});

app.get('/api/content', (req, res) => {
  const items = readContent();
  res.json({ items });
});

app.post('/api/content', authGuard, upload.single('thumbnail'), (req, res) => {
  const { title, description, category, videoUrl, imageUrl } = req.body || {};
  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Title, description, and category are required' });
  }

  const newItem = {
    id: uuid(),
    title: title.trim(),
    description: description.trim(),
    category: normalizeCategory(category),
    videoUrl: videoUrl?.trim() || '',
    imageUrl: req.file ? `/uploads/${req.file.filename}` : (imageUrl?.trim() || ''),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const items = [newItem, ...readContent()];
  writeContent(items);
  res.status(201).json({ item: newItem });
});

app.put('/api/content/:id', authGuard, upload.single('thumbnail'), (req, res) => {
  const { id } = req.params;
  const { title, description, category, videoUrl, imageUrl } = req.body || {};
  const items = readContent();
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Content not found' });
  }

  const existing = items[idx];
  let nextImage = existing.imageUrl || '';

  if (req.file) {
    if (existing.imageUrl?.startsWith('/uploads/')) {
      const existingPath = path.join(__dirname, existing.imageUrl.replace(/^\//, ''));
      fs.rmSync(existingPath, { force: true });
    }
    nextImage = `/uploads/${req.file.filename}`;
  } else if (imageUrl) {
    nextImage = imageUrl.trim();
  }

  const updatedItem = {
    ...existing,
    title: title ? title.trim() : existing.title,
    description: description ? description.trim() : existing.description,
    category: category ? normalizeCategory(category) : existing.category,
    videoUrl: typeof videoUrl === 'string' ? videoUrl.trim() : existing.videoUrl,
    imageUrl: nextImage,
    updatedAt: new Date().toISOString(),
  };

  items[idx] = updatedItem;
  writeContent(items);
  res.json({ item: updatedItem });
});

app.delete('/api/content/:id', authGuard, (req, res) => {
  const { id } = req.params;
  const items = readContent();
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Content not found' });
  }

  const [removed] = items.splice(idx, 1);
  if (removed?.imageUrl?.startsWith('/uploads/')) {
    const imgPath = path.join(__dirname, removed.imageUrl.replace(/^\//, ''));
    fs.rmSync(imgPath, { force: true });
  }
  writeContent(items);
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  console.error('Unexpected error', err);
  return res.status(500).json({ message: 'Internal server error' });
});

// Serve frontend build if available (single deploy for full-stack)
const CLIENT_DIST = path.join(__dirname, '..', 'dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));

  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Secure content backend running on port ${PORT}`);
});

