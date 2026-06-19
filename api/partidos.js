// api/partidos.js
export default async function handler(req, res) {
  // 1. Configurar los permisos CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://alexhurpi.github.io'); // Solo permite tu web
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Manejar la petición OPTIONS (necesaria para CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const API_TOKEN = process.env.API_TOKEN;
  const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';

  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');

  try {
    const response = await fetch(API_URL, {
      headers: { 'X-Auth-Token': API_TOKEN }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la API' });
  }
}