const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

//login

app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña requeridos' });
  }
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
  const usuario = rows[0];
  if (!usuario) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  if (usuario.contrasena !== contrasena) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
  delete usuario.contrasena;
  res.json({ usuario });
});

//registrarse

app.post('/register', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING id, nombre, correo, fecha_creacion',
      [nombre, correo, contrasena]
    );
    res.json({ usuario: rows[0] });
  } catch (err) {
    if (err.code === '23505') { // unique_violation
      res.status(409).json({ error: 'El correo ya está registrado' });
    } else {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }
});

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

// Pedidos

app.post('/api/pedidos', async (req, res) => {
  const { usuario_id, items } = req.body;
  if (!usuario_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const pedidoRes = await client.query(
      'INSERT INTO pedidos (usuario_id) VALUES ($1) RETURNING id, fecha_pedido, estado',
      [usuario_id]
    );
    const pedido_id = pedidoRes.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO detalles_pedido (pedido_id, producto_id, coctel_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          pedido_id,
          item.producto_id || null,
          item.coctel_id || null,
          item.cantidad,
          item.precio_unitario
        ]
      );
    }
    await client.query('COMMIT');
    res.json({ pedido_id, fecha_pedido: pedidoRes.rows[0].fecha_pedido, estado: pedidoRes.rows[0].estado });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Error al crear pedido', detalle: err.message });
  } finally {
    client.release();
  }
});

// Obtener Pedidos
app.get('/api/pedidos', async (req, res) => {
  const { usuario_id } = req.query;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
  for (const item of items) {
  await client.query(
    `INSERT INTO detalles_pedido (pedido_id, producto_id, coctel_id, cantidad, precio_unitario)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      pedido_id,
      item.producto_id || null,
      item.coctel_id || null,
      item.cantidad,
      item.precio_unitario
    ]
  );
}
//Actualiza el stock si es producto
    if (item.producto_id) {
    await client.query(
      'UPDATE productos SET inventario = inventario - $1 WHERE id = $2',
      [item.cantidad, item.producto_id]
    );
  }

  res.json(rows);
});

// Obtener Detalles Pedido
app.get('/detalles_pedido', async (req, res) => {
  const { pedido_id } = req.query;
  if (!pedido_id) return res.status(400).json({ error: 'pedido_id requerido' });
  const { rows } = await pool.query(
    `SELECT d.id, d.producto_id, d.coctel_id, d.cantidad, d.precio_unitario,
            p.nombre AS producto_nombre, p.imagen AS imagen,
            c.nombre AS coctel_nombre
     FROM detalles_pedido d
     LEFT JOIN productos p ON d.producto_id = p.id
     LEFT JOIN cocteles_personalizados c ON d.coctel_id = c.id
     WHERE d.pedido_id = $1`,
    [pedido_id]
  );
  res.json(rows);
});

app.get('/carrito', async (req, res) => {
  const { usuario_id } = req.query;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });

  // Buscar o crear carrito
  let result = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);
  let carrito = result.rows[0];
  if (!carrito) {
    result = await pool.query('INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING *', [usuario_id]);
    carrito = result.rows[0];
  }

  // Obtener items
  const { rows: items } = await pool.query('SELECT * FROM carrito_items WHERE carrito_id = $1', [carrito.id]);
  res.json({ carrito_id: carrito.id, items });
});

// Agregar o actualizar un item en el carrito
app.post('/carrito/item', async (req, res) => {
  const { usuario_id, item } = req.body;
  if (!usuario_id || !item) return res.status(400).json({ error: 'usuario_id e item requeridos' });

  // Buscar o crear carrito
  let result = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);
  let carrito = result.rows[0];
  if (!carrito) {
    result = await pool.query('INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING *', [usuario_id]);
    carrito = result.rows[0];
  }

  // Verificar si ya existe el item (por producto_id o coctel_id)
  let where = item.producto_id
    ? 'carrito_id = $1 AND producto_id = $2'
    : 'carrito_id = $1 AND coctel_id = $2';
  let idValue = item.producto_id || item.coctel_id;
  result = await pool.query(`SELECT * FROM carrito_items WHERE ${where}`, [carrito.id, idValue]);
  let existe = result.rows[0];

  if (existe) {
    // Actualizar cantidad
    await pool.query(
      `UPDATE carrito_items SET cantidad = cantidad + $1 WHERE id = $2`,
      [item.cantidad, existe.id]
    );
  } else {
    // Insertar nuevo item
    await pool.query(
      `INSERT INTO carrito_items (carrito_id, producto_id, coctel_id, nombre, cantidad, precio_unitario, imagen)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [carrito.id, item.producto_id || null, item.coctel_id || null, item.nombre, item.cantidad, item.precio_unitario, item.imagen]
    );
  }
  res.json({ ok: true });
});

// Cambiar cantidad de un item
app.put('/carrito/item', async (req, res) => {
  const { usuario_id, item_id, cantidad } = req.body;
  if (!usuario_id || !item_id || cantidad == null) return res.status(400).json({ error: 'Faltan datos' });

  // Buscar carrito
  const result = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);
  const carrito = result.rows[0];
  if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

  await pool.query(
    'UPDATE carrito_items SET cantidad = $1 WHERE id = $2 AND carrito_id = $3',
    [cantidad, item_id, carrito.id]
  );
  res.json({ ok: true });
});

// Quitar un item del carrito
app.delete('/carrito/item', async (req, res) => {
  const { usuario_id, item_id } = req.body;
  if (!usuario_id || !item_id) return res.status(400).json({ error: 'Faltan datos' });

  // Buscar carrito
  const result = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);
  const carrito = result.rows[0];
  if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

  await pool.query(
    'DELETE FROM carrito_items WHERE id = $1 AND carrito_id = $2',
    [item_id, carrito.id]
  );
  res.json({ ok: true });
});

// Vaciar carrito
app.delete('/carrito', async (req, res) => {
  const { usuario_id } = req.body;
  if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });

  // Buscar carrito
  const result = await pool.query('SELECT * FROM carritos WHERE usuario_id = $1', [usuario_id]);
  const carrito = result.rows[0];
  if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });

  await pool.query('DELETE FROM carrito_items WHERE carrito_id = $1', [carrito.id]);
  res.json({ ok: true });
});

app.listen(3001, () => console.log('API corriendo en puerto 3001'));