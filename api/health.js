export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.json({
    ok: true,
    service: 'content-backend',
    timestamp: new Date().toISOString()
  });
}