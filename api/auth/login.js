import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Rupanta Mazumder Kona';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase().trim()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Using hardcoded hash for now since env var isn't working
    const hardcodedHash = '$2a$12$dlhyUbUJyOemXxM0ygcaZOFrdFACOWrtBQOCfuJcglJzcnhzWf7iW';
    const isValid = await bcrypt.compare(password, hardcodedHash);

    if (!isValid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = jwt.sign({ email, name: ADMIN_NAME }, JWT_SECRET, { expiresIn: '12h' });

    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 12}; SameSite=Lax`);

    res.json({ user: { email, name: ADMIN_NAME } });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}