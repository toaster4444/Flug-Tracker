module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { icao24 } = req.query;
  try {
    const now   = Math.floor(Date.now() / 1000);
    const begin = now - 10800;
    const url = `https://opensky-network.org/api/flights/aircraft?icao24=${icao24}&begin=${begin}&end=${now}`;
    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).json({ error: 'not found' });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
