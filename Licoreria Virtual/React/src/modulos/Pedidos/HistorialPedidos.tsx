import React, { useEffect, useState } from 'react';
import DetallePedido from './DetallePedido';
import supabase from '../../config/supabase';

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
    const fetchPedidos = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select('id, fecha_pedido, estado')
          .eq('usuario_id', usuarioId)
          .order('fecha_pedido', { ascending: false });
        if (error) {
          setError('No se pudo cargar el historial');
          setPedidos([]);
        } else {
          setPedidos(data || []);
        }
      } catch (e) {
        setError('No se pudo cargar el historial');
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
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