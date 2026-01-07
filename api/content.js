import { readContent, writeContent, normalizeCategory } from './_utils.js';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET;
const UPLOAD_DIR = path.join(__dirname, 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const authGuard = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '') || req.cookies?.admin_token;

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const items = readContent();
    return res.json({ items });
  }

  if (req.method === 'POST') {
    const user = authGuard(req);
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

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
      imageUrl: imageUrl?.trim() || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const items = [newItem, ...readContent()];
    writeContent(items);

    return res.status(201).json({ item: newItem });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};