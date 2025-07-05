import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabase';

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
    const fetchDetalles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('detalles_pedido')
          .select(`
            id,
            producto_id,
            coctel_id,
            cantidad,
            precio_unitario,
            producto:producto_id (nombre, imagen),
            coctel:coctel_id (nombre, imagen)
          `)
          .eq('pedido_id', pedidoId);
        if (error) {
          setError('No se pudo cargar el detalle');
          setDetalles([]);
        } else {
          // Normaliza los datos para mostrar nombre e imagen
          const detallesNormalizados = (data || []).map((d: any) => ({
            id: d.id,
            producto_id: d.producto_id,
            coctel_id: d.coctel_id,
            cantidad: d.cantidad,
            precio_unitario: d.precio_unitario,
            producto_nombre: d.producto?.nombre,
            coctel_nombre: d.coctel?.nombre,
            imagen: d.producto?.imagen || d.coctel?.imagen,
          }));
          setDetalles(detallesNormalizados);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetalles();
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