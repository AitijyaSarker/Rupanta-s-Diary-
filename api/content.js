import { readContent } from './_utils.js';

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

  // For now, return method not allowed for other methods
  return res.status(405).json({ message: 'Method not allowed' });
}