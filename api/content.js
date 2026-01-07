import { readContent, writeContent, normalizeCategory } from './_utils.js';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET;

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
    try {
      const items = readContent();
      return res.json({ items });
    } catch (error) {
      console.error('Error reading content:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
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

  if (req.method === 'PUT') {
    const user = authGuard(req);
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { id, title, description, category, videoUrl, imageUrl } = req.body || {};

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const items = readContent();
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const updatedItem = {
      ...items[itemIndex],
      title: title?.trim() || items[itemIndex].title,
      description: description?.trim() || items[itemIndex].description,
      category: category ? normalizeCategory(category) : items[itemIndex].category,
      videoUrl: videoUrl?.trim() || items[itemIndex].videoUrl,
      imageUrl: imageUrl?.trim() || items[itemIndex].imageUrl,
      updatedAt: new Date().toISOString(),
    };

    items[itemIndex] = updatedItem;
    writeContent(items);

    return res.json({ item: updatedItem });
  }

  if (req.method === 'DELETE') {
    const user = authGuard(req);
    if (!user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const { id } = req.query || {};

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const items = readContent();
    const filteredItems = items.filter(item => item.id !== id);

    if (filteredItems.length === items.length) {
      return res.status(404).json({ message: 'Item not found' });
    }

    writeContent(filteredItems);

    return res.json({ message: 'Item deleted successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}