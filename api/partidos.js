// api/partidos.js
/**
 ** Este programa es un Backend en Vercel que se encarga de consultar la API de la web https://www.football-data.org/ **
 ** El objetivo es mostrar los datos del mundial usando la API de (https://www.football-data.org/) **
 **Se genera un archivo JSON con los datos del mundial.
*/
export default async function handler(req, res) {
  // 1. Configurar los permisos CORS
  //res.setHeader('Access-Control-Allow-Origin', 'https://alexhurpi.github.io'); // Solo permite tu web
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen ya sea local o en github o cloudflare
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Manejar la petición OPTIONS (necesaria para CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const API_TOKEN = process.env.API_TOKEN; // esta es la clave de la api, queda guardada en el servidor de vercel para que no se vea
  const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';// esta es la url de la api

  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');

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