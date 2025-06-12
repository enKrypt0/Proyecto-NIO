const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: 'postgresql://master_owner:npg_o2sP6MfDNxuw@ep-falling-voice-a8xo4jgh-pooler.eastus2.azure.neon.tech/master?sslmode=require'
});

// Usuarios
app.get('/usuarios', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM usuarios');
  res.json(rows);
});

// Tipos de licor
app.get('/tipos_licor', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tipos_licor');
  res.json(rows);
});

// Marcas
app.get('/marcas', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM marcas');
  res.json(rows);
});

// Productos
app.get('/productos', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM productos');
  res.json(rows);
});

// Pedidos
app.get('/pedidos', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM pedidos');
  res.json(rows);
});

// Detalles de pedido
app.get('/detalles_pedido', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM detalles_pedido');
  res.json(rows);
});

// Cócteles personalizados
app.get('/cocteles_personalizados', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM cocteles_personalizados');
  res.json(rows);
});

// Ingredientes
app.get('/ingredientes', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM ingredientes');
  res.json(rows);
});

// Frutas
app.get('/frutas', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM frutas');
  res.json(rows);
});

// Coctel_ingredientes
app.get('/coctel_ingredientes', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM coctel_ingredientes');
  res.json(rows);
});

// Coctel_frutas
app.get('/coctel_frutas', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM coctel_frutas');
  res.json(rows);
});

app.listen(3001, () => console.log('API corriendo en puerto 3001'));