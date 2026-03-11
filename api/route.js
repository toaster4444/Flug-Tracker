export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { callsign } = req.query;
  try {
    const url = `https://opensky-network.org/api/routes?callsign=${encodeURIComponent(callsign.trim())}`;
    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).json({ error: 'not found' });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
