import React, { useEffect, useState } from 'react';
import DetallePedido from './DetallePedido';

interface Pedido {
  id: string;
  fecha_pedido: string;
  estado: string;
}

interface HistorialPedidosProps {
  usuarioId: string;
}

const HistorialPedidos: React.FC<HistorialPedidosProps> = ({ usuarioId }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/pedidos?usuario_id=${usuarioId}`)
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(() => setError('No se pudo cargar el historial'))
      .finally(() => setLoading(false));
  }, [usuarioId]);

  if (pedidoSeleccionado) {
    return (
      <DetallePedido pedidoId={pedidoSeleccionado} onVolver={() => setPedidoSeleccionado(null)} />
    );
  }

  return (
    <div className="historial-pedidos">
      <h2>Historial de Pedidos</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : pedidos.length === 0 ? (
        <div>No tienes pedidos previos.</div>
      ) : (
        <ul>
          {pedidos.map(p => (
            <li key={p.id} style={{ marginBottom: 16 }}>
              <span>
                <b>Fecha:</b> {new Date(p.fecha_pedido).toLocaleString()} | <b>Estado:</b> {p.estado}
              </span>
              <button style={{ marginLeft: 16 }} onClick={() => setPedidoSeleccionado(p.id)}>
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorialPedidos;