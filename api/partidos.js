// api/partidos.js
export default async function handler(req, res) {
  const API_TOKEN = process.env.API_TOKEN; // Esto lo configuraremos en el panel de Vercel
  const URL = 'https://api.football-data.org/v4/competitions/WC/matches';

  try {
    const response = await fetch(URL, {
      headers: { 'X-Auth-Token': API_TOKEN }
    });
    
    const data = await response.json();
    
    // Le decimos al navegador que esto es JSON
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la API' });
  }
}