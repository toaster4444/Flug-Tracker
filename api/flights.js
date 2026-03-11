const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { lamin, lomin, lamax, lomax } = req.query;
  try {
    const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    if (!r.ok) return res.status(r.status).json({ error: 'OpenSky error ' + r.status });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message, detail: e.cause?.message || '' });
  }
}
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { lamin, lomin, lamax, lomax } = req.query;
  try {
    const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;
    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).json({ error: 'OpenSky error ' + r.status });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
