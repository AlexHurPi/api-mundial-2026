// api/partidos.js
export default async function handler(req, res) {
  const API_TOKEN = process.env.API_TOKEN;
  const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';

  try {
    const response = await fetch(API_URL, {
      headers: { 'X-Auth-Token': API_TOKEN }
    });

    const data = await response.json();
    
    // Devolvemos el JSON para que lo puedas ver en tu navegador
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
}