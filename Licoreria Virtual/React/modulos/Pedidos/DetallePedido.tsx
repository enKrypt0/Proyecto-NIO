import React, { useEffect, useState } from 'react';

interface DetallePedidoProps {
  pedidoId: string;
  onVolver: () => void;
}

interface Detalle {
  id: string;
  producto_id?: string;
  coctel_id?: string;
  cantidad: number;
  precio_unitario: number;
  producto_nombre?: string;
  coctel_nombre?: string;
  imagen?: string;
}

const DetallePedido: React.FC<DetallePedidoProps> = ({ pedidoId, onVolver }) => {
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/detalles_pedido?pedido_id=${pedidoId}`)
      .then(res => res.json())
      .then(data => setDetalles(data))
      .catch(() => setError('No se pudo cargar el detalle'))
      .finally(() => setLoading(false));
  }, [pedidoId]);

  return (
    <div className="detalle-pedido">
      <button onClick={onVolver} style={{ marginBottom: 16 }}>Volver</button>
      <h3>Detalle del Pedido</h3>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : detalles.length === 0 ? (
        <div>No hay detalles para este pedido.</div>
      ) : (
        <ul>
          {detalles.map(d => (
            <li key={d.id} style={{ marginBottom: 12 }}>
              {d.imagen && <img src={d.imagen} alt={d.producto_nombre || d.coctel_nombre} width={60} style={{ marginRight: 8 }} />}
              <span>
                {d.producto_nombre || d.coctel_nombre} - {d.cantidad} x ${d.precio_unitario.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DetallePedido;