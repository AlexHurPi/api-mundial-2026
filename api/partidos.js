// api/partidos.js
export default async function handler(req, res) {
  const API_TOKEN = process.env.API_TOKEN;
  const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';

  // 1. "s-maxage=120" le dice a Vercel que guarde el JSON por 120 segundos (2 minutos).
  // 2. "stale-while-revalidate" es la magia: Si alguien entra a los 121 segundos, 
  //    le entregas el dato viejo INSTANTÁNEAMENTE y, en segundo plano, 
  //    Vercel refresca el JSON de la API.
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