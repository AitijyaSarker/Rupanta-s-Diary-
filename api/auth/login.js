import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || 'Rupanta Mazumder Kona';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  console.log('Login attempt:', { method: req.method, hasBody: !!req.body });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  console.log('Login data:', { email: email ? 'provided' : 'missing', password: password ? 'provided' : 'missing' });

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  console.log('Env vars check:', {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? 'set' : 'missing',
    JWT_SECRET: process.env.JWT_SECRET ? 'set' : 'missing'
  });

  if (email.toLowerCase().trim() !== process.env.ADMIN_EMAIL.toLowerCase().trim()) {
    console.log('Email mismatch:', { provided: email.toLowerCase().trim(), expected: process.env.ADMIN_EMAIL.toLowerCase().trim() });
    return res.status(401).json({ message: 'Unauthorized - email mismatch' });
  }

  try {
    // Temporary: use hardcoded hash for testing
    const hardcodedHash = '$2a$12$dlhyUbUJyOemXxM0ygcaZOFrdFACOWrtBQOCfuJcglJzcnhzWf7iW';
    console.log('About to compare password with hardcoded hash');
    const isValid = await bcrypt.compare(password, hardcodedHash);
    console.log('Password validation result:', isValid);

    if (!isValid) {
      console.log('Password invalid');
      return res.status(401).json({ message: 'Unauthorized - invalid password' });
    }

    const token = jwt.sign({ email, name: ADMIN_NAME }, JWT_SECRET, { expiresIn: '12h' });

    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 12}; SameSite=Lax`);

    res.json({ user: { email, name: ADMIN_NAME } });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}