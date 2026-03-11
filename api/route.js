const https = require('https');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { callsign } = req.query;
  try {
    const url = `https://opensky-network.org/api/routes?callsign=${encodeURIComponent(callsign.trim())}`;
    const r = await httpsGet(url);
    if (r.status !== 200) return res.status(r.status).json({ error: 'not found' });
    res.json(r.body);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
